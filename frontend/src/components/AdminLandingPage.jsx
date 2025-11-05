
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const AdminLandingPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    localStorage.removeItem('userInfo'); // Clear user info
    alert('Logged out successfully!'); // Alert user
    navigate('/'); // Redirect to home page
  };

  return (
    <section id="admin-landing" className="admin-landing">
      <div className="container">
        <div className="section-title">
          <h2>Admin Panel</h2>
          <p>Select a management section</p>
        </div>
        <div className="admin-navigation d-flex justify-content-center">
          <Link to="/admin/users" className="btn btn-primary mr-2">Manage Users</Link>
          <Link to="/admin/news" className="btn btn-primary mr-2">Manage News</Link>
          <Link to="/admin/events" className="btn btn-primary mr-2">Manage Events</Link> {/* Added mr-2 for spacing */}
          <button onClick={handleLogout} className="btn btn-secondary">Logout</button> {/* Logout button */}
        </div>
      </div>
    </section>
  );
};

export default AdminLandingPage;
