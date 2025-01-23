import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import Header from './components/header';

function App() {
  return (
    <div className="w-full p-6">
      <Header />
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
