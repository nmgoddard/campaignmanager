import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Outlet, Link } from 'react-router-dom';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="w-full p-6">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App