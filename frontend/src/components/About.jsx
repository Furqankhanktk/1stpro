
import React from 'react';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-title">
          <h2>About Our School</h2>
          <p>Nurturing young minds for a brighter future</p>
        </div>
        <div className="about-content">
          <div className="about-text">
            <p>PAKHTUNKHWA GROUP OF SCHOOLS is a premier educational institution committed to providing a nurturing and stimulating learning environment for students from kindergarten through high school.</p>
            <p>Founded in 1995, our school has a long-standing tradition of academic excellence, character development, and community engagement. We believe in educating the whole child - intellectually, socially, emotionally, and physically.</p>
            <p>Our dedicated faculty and state-of-the-art facilities provide students with the resources they need to succeed in an ever-changing global community.</p>
            <a href="#contact" className="btn">Schedule a Visit</a>
          </div>
          <div className="about-image">
            <img src="/about-us.jpg" alt="PAKHTUNKHWA GROUP OF SCHOOLS" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
