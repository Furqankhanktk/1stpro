
import React from 'react';

const Academics = () => {
  return (
    <section id="academics" className="academics">
      <div className="container">
        <div className="section-title">
          <h2>Academic Programs</h2>
          <p>Comprehensive education for all grade levels</p>
        </div>
        <div className="programs-grid">
          <div className="program-card">
            <div className="program-image">
              <i>🎒</i>
            </div>
            <div className="program-content">
              <h3>Elementary School</h3>
              <p>Our elementary program focuses on building strong foundations in literacy, numeracy, and social skills through engaging, hands-on learning experiences.</p>
            </div>
          </div>
          <div className="program-card">
            <div className="program-image">
              <i>📚</i>
            </div>
            <div className="program-content">
              <h3>Middle School</h3>
              <p>Our middle school curriculum challenges students to think critically and explore their interests while providing a supportive transition to higher grades.</p>
            </div>
          </div>
          <div className="program-card">
            <div className="program-image">
              <i>🧪</i>
            </div>
            <div className="program-content">
              <h3>High School</h3>
              <p>Our college-preparatory high school program offers rigorous academics, advanced placement courses, and diverse extracurricular opportunities.</p>
            </div>
          </div>
          <div className="program-card">
            <div className="program-image">
              <i>🧩</i>
            </div>
            <div className="program-content">
              <h3>Special Education Program</h3>
              <p>Tailored support and individualized learning plans for students with diverse needs, ensuring every student reaches their full potential.</p>
            </div>
          </div>
          <div className="program-card">
            <div className="program-image">
              <i>🎨</i>
            </div>
            <div className="program-content">
              <h3>Arts & Music Program</h3>
              <p>Fostering creativity and expression through visual arts, drama, and instrumental music, encouraging students to explore their artistic talents.</p>
            </div>
          </div>
          <div className="program-card">
            <div className="program-image">
              <i>🏅</i>
            </div>
            <div className="program-content">
              <h3>Sports & Athletics</h3>
              <p>Promoting physical fitness, teamwork, and sportsmanship through a variety of athletic programs, including team sports and individual activities.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Academics;
