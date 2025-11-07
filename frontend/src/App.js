
import './App.css';
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import Home from './pages/Home.js';

import RefreshHandler from "./RefreshHandler";



function App() {

  const [isAuthinticated, setIsAuthinticated] = useState(false);



  const PrivateRoute = ({ element }) => {
    return isAuthinticated ? element : <Navigate to="/login" />
  }

  return (
    <div>
      <RefreshHandler setIsAuthinticated={setIsAuthinticated} />
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/home' element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </div>
  );
}

export default App;
