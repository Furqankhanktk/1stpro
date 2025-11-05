
import React, { useState, useEffect } from 'react';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/news');
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <section id="news" className="news">
      <div className="container">
        <div className="section-title">
          <h2>School News</h2>
          <p>Latest updates from our community</p>
        </div>
        <div className="news-grid">
          {loading ? (
            <p>Loading news...</p>
          ) : (
            news.map((item) => (
              <div className="news-card" key={item._id}>
                <div className="news-image">
                  {/* You might want to add an image field to your News model */}
                  <img src="/science-fair.jpg" alt={item.title} />
                </div>
                <div className="news-content">
                  <div className="news-date">{new Date(item.date).toLocaleDateString()}</div>
                  <h3>{item.title}</h3>
                  <p>{item.content}</p>
                  <a href="#" className="btn">Read More</a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default News;
