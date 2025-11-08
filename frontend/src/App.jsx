import React, { useLayoutEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css'; // Import App.css
import Header from './components/Header';
import Footer from './components/Footer';

// Import page components
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import AcademicsPage from './pages/AcademicsPage';
import NewsPage from './pages/NewsPage';
import EventsPage from './pages/EventsPage';
import ContactPage from './pages/ContactPage';
import Sitemap from './pages/Sitemap';

// Admin components
import AdminLogin from './components/AdminLogin';
import AdminLandingPage from './components/AdminLandingPage';
import ManageUsers from './components/ManageUsers';
import ManageNews from './components/ManageNews';
import ManageEvents from './components/ManageEvents';

// Security components
import PrivateRoute from './components/PrivateRoute';

function App() {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/academics" element={<AcademicsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/sitemap" element={<Sitemap />} />

          {/* Admin Login Route */}
          <Route path="/securepanel396" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route element={<PrivateRoute adminOnly={true} />}>
            <Route path="/admin/dashboard" element={<AdminLandingPage />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/news" element={<ManageNews />} />
            <Route path="/admin/events" element={<ManageEvents />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;