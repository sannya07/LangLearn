import React from "react";
import LandingPage from "./components/LandingPage";
import { Routes, Route } from "react-router-dom";
import UserLayout from "./components/UserLayout";
import UserHome from "./components/user/UserHome/UserHome";
import InstructorLayout from "./components/InstructorLayout";
import InstructorHome from "./components/instructor/InstructorHome/InstructorHome";
import NotFound from "./components/NotFound";
import UserSignup from "./components/user/UserSignup/UserSignup";
import InstructorSignup from "./components/instructor/InstructorSignup/InstructorSignup";
import UserLogin from "./components/user/UserLogin/UserLogin";
import InstructorLogin from "./components/instructor/InstructorLogin/InstructorLogin";
import UserSelectCourse from "./components/user/UserSelectCourse/UserSelectCourse";
import InstructorCourses from "./components/instructor/InstructorCourses/InstructorCourses";
import UserCourses from "./components/user/UserCourses/UserCourses";
import UserProfile from "./components/user/UserProfile/UserProfile";
import InstructorProfile from "./components/instructor/InstructorProfile/InstructorProfile";

function App() {
  return (
    <Routes>
    {/* Main Route Setup */}
    <Route path="/" element={<LandingPage />} />  {/* Home Page */}
    
    {/* Nested Routes for User */}
    <Route path="/user/" element={<UserLayout />}>
      <Route path="home" element={<UserHome/>} />
      <Route path="signup" element={<UserSignup/>} />
      <Route path="login" element={<UserLogin/>} />
      <Route path="select-course" element={<UserSelectCourse/>} />
      <Route path="courses" element={<UserCourses/>} />
      <Route path="profile" element={<UserProfile/>} />
    </Route>

    {/* Nested Routes for Instructor */}
    <Route path="/instructor/" element={<InstructorLayout />}>
      <Route path="home" element={<InstructorHome/>} />
      <Route path="signup" element={<InstructorSignup/>} />
      <Route path="login" element={<InstructorLogin/>} />
      <Route path="courses" element={<InstructorCourses/>} />
      <Route path="profile" element={<InstructorProfile/>} />
      
    </Route>

    {/* Catch-all Route for Undefined Pages */}
    <Route path="*" element={<NotFound />} />
  </Routes>
  );
}

export default App;

