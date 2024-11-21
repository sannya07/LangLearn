import React, { useState } from "react";
import { motion } from "framer-motion";
import RevealLinks from "./languages";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-black text-white py-4 shadow-lg fixed top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo */}
        <div className="text-3xl font-extrabold text-purple-500">LangLearn.</div>

        {/* Links for Desktop */}
        <div className="hidden md:flex gap-6">
        <a href="#login" className="hover:text-purple-400 transition">
            Login
          </a>
          <a href="#features" className="hover:text-purple-400 transition">
            Features
          </a>
          <a href="#about" className="hover:text-purple-400 transition">
            About
          </a>
          <a href="#contact" className="hover:text-purple-400 transition">
            Contact
          </a>
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.1 }}
          className="flex flex-col items-center bg-black text-white md:hidden"
        >
          <a href="#Signin" className="py-2 hover:text-purple-400">
            Login
          </a>
          <a href="#features" className="py-2 hover:text-purple-400">
            Features
          </a>
          <a href="#about" className="py-2 hover:text-purple-400">
            About
          </a>
          <a href="#contact" className="py-2 hover:text-purple-400">
            Contact
          </a>
        </motion.div>
      )}
    </nav>
  );
};

const LandingPage = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <main className="flex flex-col md:flex-row items-center justify-center gap-12 px-8 pt-32 pb-20 bg-gradient-to-br from-purple-800 to-black">
      {/* <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src=""
            alt="Giphy"
            className="rounded-[50%]"
          /> */}
        {/* </motion.div> */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg text-center md:text-left"
        >
          <h2 className="text-5xl font-extrabold text-purple-400 mb-6">
            Unlock Your Language Potential
          </h2>
          <p className="text-gray-300 mb-8 text-lg leading-relaxed ">
            Learn languages the smart way with AI-powered lessons, interactive
            games, and real-world practice. Progress at your pace and stay
            motivated with gamified rewards.
          </p>
          {/* Updated Button */}
          <button className="relative z-0 rounded bg-purple-500 text-white px-10 py-3 transition-[all_0.3s_ease] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-0 after:rounded after:bg-purple-800 after:transition-[all_0.3s_ease] hover:after:w-full font-medium">
          Start Learning
        </button>
        </motion.div>

        
      </main>

      {/* Features Section */}
      <section id="features" className="w-full bg-black py-16 px-10">
        <h3 className="text-4xl font-bold text-center mb-10 text-purple-400">
          Why Choose Us?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <Feature
            title="Interactive Lessons"
            description="Engaging, hands-on activities to make language learning enjoyable."
          />
          <Feature
            title="AI Assistance"
            description="Personalized feedback and conversations tailored to your progress."
          />
          <Feature
            title="Gamified Learning"
            description="Stay motivated with rewards like badges, streaks, and milestones."
          />
        </div>
      </section>


 {/* About Section */}
 <section className="bg-gradient-to-r from-purple-800 to-black md:flex hidden md:text-lg lg:text-xl md:flex-row ">

{/* Languages Links */}
<div className="md:flex hidden md:text-lg lg:text-xl md:flex-row md:w-1/2">
  <RevealLinks />
</div>
<div className="flex flex-col justify-center items-center  mx-auto w-1/2 my-7 p-7 ">
  <h1 className="text-center text-4xl font-extrabold text-purple-100 mt-9">
    Want to be able to learn and speak multiple languages fluently as well?
  </h1>
  <motion.div
    initial={{ x: 50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: 0.8 }}
  >
    <img
      src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExamNmeGc2YzJuZXc4MHdnYmVra3VhdzJ4eDBicnRsNmIwN3l2cm5pNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vrcxO2t1CLV0k/giphy.gif"
      alt="Multiple Languages"
      className="rounded-lg pt-7 my-8 max-width: 100%"
    />
  </motion.div>
  {/* <motion.h3
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-purple-400 mb-2 mt-3"
        >
          About us
        </motion.h3>
        <p className="text-gray-300 text-center max-w-4xl mx-auto text-lg leading-relaxed">
          LangLearn is your ultimate partner for mastering new languages. Our
          cutting-edge AI technology adapts to your learning style, making the
          process both effective and enjoyable. With LangLearn, you’re not just
          learning a language—you’re experiencing it.
        </p> */}
</div>
</section>



      <section
        id="about"
        className="w-full bg-gradient-to-r from-purple-800 to-black py-16 px-10
        md:hidden"
      >
        <motion.h3
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-purple-400 mb-8"
        >
          About LangLearn
        </motion.h3>
        <p className="text-gray-300 text-center max-w-4xl mx-auto text-lg leading-relaxed">
          LangLearn is your ultimate partner for mastering new languages. Our
          cutting-edge AI technology adapts to your learning style, making the
          process both effective and enjoyable. With LangLearn, you’re not just
          learning a language—you’re experiencing it.
        </p>
      </section>

      {/* Call to Action Section */}
      <section className="w-full bg-black py-16 px-10 text-center">
        <motion.h3
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-purple-400 mb-8"
        >
          Ready to Start Your Language Journey?
        </motion.h3>
        <p className="text-gray-300 text-lg mb-8">
          Join thousands of learners and experience the future of language
          learning today!
        </p>
        {/* Updated Button */}
        <button className="relative z-0 rounded bg-purple-500 text-white px-10 py-3 transition-[all_0.3s_ease] after:absolute after:left-0 after:top-0 after:-z-10 after:h-full after:w-0 after:rounded after:bg-purple-800 after:transition-[all_0.3s_ease] hover:after:w-full font-medium">
          Sign Up Now
        </button>

      </section>
        <hr/ >
      {/* Footer */}
      <footer
        id="contact"
        className="w-full bg-black text-white text-center py-6"
      >
        <div className="container mx-auto">
          <p>&copy; 2024 LangLearn. All rights reserved.</p>
          <p>
            Contact us at{" "}
            <a
              href="mailto:support@languagelearn.com"
              className="underline text-purple-400 hover:text-purple-300"
            >
              support@languagelearn.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

const Feature = ({ title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center p-8 border text-white border-gray-700 rounded-lg shadow-xl bg-black hover:bg-purple-700 transition hover:border-white"
  >
    <h4 className="text-xl font-semibold mb-4 text-white ">{title}</h4>
    <p className="text-gray-300">{description}</p>

  </motion.div>
);

export default LandingPage;