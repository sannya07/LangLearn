require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors'); // Import cors

// Environment variables
const { MONGODB_URI, JWT_SECRET, PORT = 3000 } = process.env;

// Initialize Express app
const app = express();

// Enable CORS for requests from the React frontend (running on localhost:5173)
app.use(cors({
  origin: 'http://localhost:5173',  // React app URL (adjust if needed)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies (optional)
}));

app.use(express.json()); // Middleware to parse JSON requests

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// User schema and model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  courses: { type: [String], default: [] }, // Array to store course IDs, initially empty
  role: { type: String, default: 'user' }, // Default role as 'user'
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});
const User = mongoose.model('User', userSchema);

// Instructor schema
const instructorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  selfCourses: { type: [String], default: [] }, // Courses the instructor has created, initially empty
  rating: { type: Number, default: 5 }, // Rating of the instructor, initially set to 5
  role: { type: String, default: 'instructor' }, // Default role as 'instructor'
}, { collection: 'instructors' }); // Specify the collection name

// Hash the password before saving it
instructorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const Instructor = mongoose.model('Instructor', instructorSchema);


// Middleware for authenticating JWT
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid Token' });
    req.user = user;
    next();
  });
};

// Middleware for role-based access control
const authorizeInstructor = (req, res, next) => {
  if (req.user.role !== 'instructor') {
    return res.status(403).json({ message: 'Access denied: Instructor only' });
  }
  next();
};

const authorizeUser = (req, res, next) => {
  if (req.user.role !== 'user') {
    return res.status(403).json({ message: 'Access denied: User only' });
  }
  next();
};

// Routes

// Signup route for users (default role: user)
app.post('/user/signup', async (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create and save user with role as 'user'
    const newUser = new User({ 
      name, 
      username, 
      email, 
      password,
      role: 'user'  // Default role as 'user'
    });
    await newUser.save();

    // Generate JWT token with role as 'user'
    const token = jwt.sign({ 
      id: newUser._id, 
      username: newUser.username, 
      role: newUser.role // Including role in JWT token
    }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Login route
app.post('/user/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ 
      id: user._id, 
      username: user.username, 
      role: user.role 
    }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });

  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Protected route to test JWT authentication
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Update user's selected course (PATCH request)
app.put('/user/select-course', authenticateToken, async (req, res) => {
  const { courseId } = req.body;  // Get the selected course ID from the request body

  if (!courseId) {
    return res.status(400).json({ message: 'Course ID is required' });
  }

  try {
    // Find the user by the decoded token
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Replace the user's current course selection with the new one
    user.courses = [courseId];  // Overwrite the courses array with the new selection

    await user.save();  // Save the updated user document

    res.status(200).json({ message: 'Course selected successfully' });
  } catch (error) {
    console.error('Error selecting course:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get user info and enrolled courses (protected route)
app.get('/user/home', authenticateToken, async (req, res) => {
  try {
    // Find the user based on the ID in the token
    const user = await User.findById(req.user.id).populate('courses');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the user's data and the courses they are enrolled in
    res.json({
      user: {
        name: user.name,
        username: user.username,
        email: user.email,
      },
      courses: user.courses, // Assume 'courses' is populated with course info
    });
  } catch (error) {
    console.error('Error fetching user home data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/instructor/signup', async (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  try {
    // Check if instructor already exists
    const existingInstructor = await Instructor.findOne({ username });
    if (existingInstructor) {
      return res.status(400).json({ message: 'Instructor already exists' });
    }

    // Create and save instructor with role as 'instructor'
    const newInstructor = new Instructor({ 
      name, 
      username, 
      email, 
      password,
      selfCourses: [],  // Initially empty
      rating: 5,        // Default rating is 5
      role: 'instructor' // Explicitly setting role as 'instructor'
    });
    await newInstructor.save();

    // Generate JWT token for the instructor
    const token = jwt.sign({ 
      id: newInstructor._id, 
      username: newInstructor.username, 
      role: newInstructor.role // Including role as 'instructor' in JWT payload
    }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'Instructor created successfully', token });
  } catch (error) {
    console.error('Error creating instructor:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Route to handle instructor login
app.post('/instructor/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const instructor = await Instructor.findOne({ username });
    if (!instructor) {
      return res.status(400).json({ message: 'Instructor not found' });
    }

    const isMatch = await bcrypt.compare(password, instructor.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: instructor._id, username: instructor.username, role: 'instructor' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in instructor:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Assuming you are using Express.js and have a middleware to authenticate the token
app.get('/instructor/data', authenticateToken, async (req, res) => {
  try {
    const instructor = await Instructor.findById(req.user.id); // Assuming authenticateToken adds user info to req
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }

    res.json({
      name: instructor.name,
      username: instructor.username,
      email: instructor.email,
      selfCourses: instructor.selfCourses,
      rating: instructor.rating,
    });
  } catch (error) {
    console.error('Error fetching instructor data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





// Example Instructor-only route (protected by role-based access control)
app.get('/instructor/home', authenticateToken, authorizeInstructor, (req, res) => {
  res.json({ message: 'Welcome to the instructor dashboard' });
});

// Example User-only route (protected by role-based access control)
app.get('/user/home', authenticateToken, authorizeUser, (req, res) => {
  res.json({ message: 'Welcome to the user home page' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
