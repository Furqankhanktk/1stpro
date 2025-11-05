
import React, { useState, useEffect } from 'react';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to load events.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <section id="events" className="events">
        <div className="container">
          <div className="section-title">
            <h2>Upcoming Events</h2>
            <p>Loading events...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="events" className="events">
        <div className="container">
          <div className="section-title">
            <h2>Upcoming Events</h2>
            <p className="error-message">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="events">
      <div className="container">
        <div className="section-title">
          <h2>Upcoming Events</h2>
          <p>Join us for these special occasions</p>
        </div>
        <div className="events-list">
          {events.length === 0 ? (
            <p>No upcoming events at the moment. Please check back later!</p>
          ) : (
            events.map((event) => (
              <div className="event-item" key={event._id}>
                <div className="event-date">
                  <div className="day">{new Date(event.date).getDate()}</div>
                  <div className="month">{new Date(event.date).toLocaleString('default', { month: 'short' })}</div>
                </div>
                <div className="event-details">
                  <h3>{event.title}</h3>
                  <p>Time: {event.time}</p>
                  <p>Location: {event.location}</p>
                  <p>{event.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Events;
