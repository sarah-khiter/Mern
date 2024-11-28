import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'; 
const Navbar = () => {
    const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/Login");
  };
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/Register" className="navbar-link">Register</Link>
        <Link to="/Login" className="navbar-link">Login</Link>
      </div>
      <button onClick={handleLogout} className="logout-button">Déconnexion</button>
    </nav>
  );
};

export default Navbar;
