
import React from 'react';
import { Link } from 'react-router-dom';
import './Sitemap.css';

const Sitemap = () => {
  return (
    <section id="sitemap" className="sitemap">
      <div className="container">
        <div className="section-title">
          <h2>Sitemap</h2>
          <p>Explore our website structure</p>
        </div>
        <div className="sitemap-links">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/academics">Academics</Link></li>
            <li><Link to="/news">News</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Sitemap;
