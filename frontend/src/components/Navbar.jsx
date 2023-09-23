import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';

const Navbar = () => {
  const authState = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <>
      <header className="flex justify-between sticky top-0 p-4 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 shadow-lg items-center">
        <h2 className="cursor-pointer uppercase text-white text-2xl font-semibold">
          <Link to="/">Task Manager</Link>
        </h2>
        <ul className="hidden md:flex gap-4 uppercase font-medium">
          {authState.isLoggedIn ? (
            <>
              <li className="bg-blue-600 text-white hover:bg-blue-700 font-medium rounded-md">
                <Link to="/tasks/add" className="block w-full h-full px-4 py-2">
                  <i className="fa-solid fa-plus"></i> Add Task
                </Link>
              </li>
              <li
                className="py-2 px-3 cursor-pointer text-white hover:bg-gray-200 transition rounded-sm"
                onClick={handleLogoutClick}
              >
                Logout
              </li>
            </>
          ) : (
            <li className="py-2 px-3 cursor-pointer text-white hover:bg-gray-200 transition rounded-sm">
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
        <span className="md:hidden cursor-pointer text-white" onClick={toggleNavbar}>
          <i className={`fa-solid ${isNavbarOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </span>

        {/* Navbar displayed as sidebar on smaller screens */}
        <div
          className={`absolute md:hidden right-0 top-0 bottom-0 transition ${
            isNavbarOpen === true ? 'translate-x-0' : 'translate-x-full'
          } bg-gray-100 shadow-md w-screen sm:w-9/12 h-screen`}
        >
          <div className="flex">
            <span className="m-4 ml-auto cursor-pointer text-gray-600" onClick={toggleNavbar}>
              <i className="fa-solid fa-times"></i>
            </span>
          </div>
          <ul className="flex flex-col gap-4 uppercase font-medium text-center">
            {authState.isLoggedIn ? (
              <>
                <li className="bg-blue-600 text-white hover:bg-blue-700 font-medium transition py-2 px-3">
                  <Link to="/tasks/add" className="block w-full h-full">
                    <i className="fa-solid fa-plus"></i> Add Task
                  </Link>
                </li>
                <li
                  className="py-2 px-3 cursor-pointer text-gray-800 hover:bg-gray-200 transition rounded-sm"
                  onClick={handleLogoutClick}
                >
                  Logout
                </li>
              </>
            ) : (
              <li className="py-2 px-3 cursor-pointer text-gray-800 hover:bg-gray-200 transition rounded-sm">
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </header>
    </>
  );
};

export default Navbar;
