import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tasks from '../components/Tasks';
import MainLayout from '../layouts/MainLayout';

const Home = () => {
  const authState = useSelector((state) => state.authReducer);
  const { isLoggedIn } = authState;

  useEffect(() => {
    document.title = isLoggedIn ? `${authState.user.name}'s Tasks` : "Task Manager";
  }, [authState, isLoggedIn]);

  return (
    <MainLayout>
      {!isLoggedIn ? (
        <div className="flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 text-white h-screen py-8 text-center">
          <h1 className="text-3xl font-semibold mb-6">Welcome to Task Manager App</h1>
          <Link to="/signup" className="text-xl flex items-center space-x-2 hover:space-x-4">
            <span className="transition-margin">Join now to manage your tasks</span>
            <span className="relative ml-4 text-base transition-margin"><i className="fa-solid fa-arrow-right"></i></span>
          </Link>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-semibold mt-8 mb-4 text-purple-600">Welcome, {authState.user.name}</h1>
          <Tasks />
        </div>
      )}
    </MainLayout>
  );
};

export default Home;
