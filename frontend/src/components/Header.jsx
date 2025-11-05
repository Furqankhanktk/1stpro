
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavLinkClick = (path) => {
    toggleMenu(); // Close mobile menu
    navigate(path);
  };

  useEffect(() => {
    const body = document.body;
    if (isMenuOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  }, [isMenuOpen]);

  return (
    <header>
      <div className="container header-container">
        <div className="logo">
          <img src="/logopgs.jpg" alt="PGSlogo" />
          <h1>PAKHTUNKHWA GROUP OF SCHOOLS</h1>
        </div>
        <button className="mobile-menu-btn" id="mobileMenuBtn" onClick={toggleMenu}>
          {isMenuOpen ? '✕' : '☰'}
        </button>
        <nav className={`nav-menu-container ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-menu">
            <li><Link to="/" className="nav-link" onClick={() => handleNavLinkClick('/')}>Home</Link></li>
            <li><Link to="/about" className="nav-link" onClick={() => handleNavLinkClick('/about')}>About</Link></li>
            <li><Link to="/academics" className="nav-link" onClick={() => handleNavLinkClick('/academics')}>Academics</Link></li>
            <li><Link to="/news" className="nav-link" onClick={() => handleNavLinkClick('/news')}>News</Link></li>
            <li><Link to="/events" className="nav-link" onClick={() => handleNavLinkClick('/events')}>Events</Link></li>
            <li><Link to="/contact" className="nav-link" onClick={() => handleNavLinkClick('/contact')}>Contact</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
