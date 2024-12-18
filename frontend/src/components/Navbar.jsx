import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ role }) {
  return (
    <nav>
      {role === 'user' ? (
        <>
          <Link to="/user/profile">User Profile</Link>
          <Link to="/user/courses">Courses</Link>
        </>
      ) : (
        <>
          <Link to="/instructor/profile">Instructor Profile</Link>
          <Link to="/instructor/courses">My Courses</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
