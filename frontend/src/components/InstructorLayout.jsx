import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import InstructorNavbar from './instructor/InstructorNavbar/InstructorNavbar';
import InstructorFooter from './instructor/InstructorFooter/InstructorFooter';

function InstructorLayout() {
  return (
    <div>
        <InstructorNavbar/>
        {/* Render the nested routes for the Instructor role */}
        <Outlet />
        <InstructorFooter/>
      </div>
  );
}

export default InstructorLayout;
