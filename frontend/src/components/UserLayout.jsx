import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import UserNavbar from './user/UserNavbar/UserNavbar';
import UserFooter from './user/UserFooter/UserFooter';

function UserLayout() {
  return (
    <div>
        <UserNavbar/>
        {/* Render the nested routes for the User role */}
        <Outlet />
        <UserFooter/>
      </div>
  );
}

export default UserLayout;
