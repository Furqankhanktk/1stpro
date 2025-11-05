
import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-title">
          <h2>Contact Us</h2>
          <p>We'd love to hear from you</p>
        </div>
        <div className="contact-container">
          <div className="contact-info">
            <h3>Get In Touch</h3>
            <div className="contact-detail">
              <i>📍</i>
              <p>123 Education Lane, Learning City, LC 12345</p>
            </div>
            <div className="contact-detail">
              <i>📞</i>
              <p>(555) 123-4567</p>
            </div>
            <div className="contact-detail">
              <i>✉️</i>
              <p>info@pakhtunkhwaschools.edu</p>
            </div>
            <div className="contact-detail">
              <i>🕒</i>
              <p>Monday - Friday: 8:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
