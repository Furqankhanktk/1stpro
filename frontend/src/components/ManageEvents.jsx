
import React, { useState, useEffect } from 'react';

const ManageEvents = () => {
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [allEvents, setAllEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);

  const [editingEventId, setEditingEventId] = useState(null);
  const [editEventTitle, setEditEventTitle] = useState('');
  const [editEventDescription, setEditEventDescription] = useState('');
  const [editEventDate, setEditEventDate] = useState('');
  const [editEventTime, setEditEventTime] = useState('');
  const [editEventLocation, setEditEventLocation] = useState('');

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const token = userInfo?.token;

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      fetchEvents();
    }
  }, []);

  useEffect(() => {
    if (!loadingEvents && allEvents.length === 0 && userInfo && userInfo.role === 'admin') {
      const seedEvents = async () => {
        const initialEvents = [
          { title: 'Parent-Teacher Conferences', description: 'Discuss student progress.', date: '2025-10-25', time: '15:00', location: 'School Campus' },
          { title: 'Halloween Celebration', description: 'Costume party and games.', date: '2025-10-31', time: '13:00', location: 'School Gymnasium' },
          { title: 'Fall Art Exhibition', description: 'Display of student artwork.', date: '2025-11-15', time: '18:00', location: 'School Art Gallery' },
          { title: 'Science Fair', description: 'Student science projects.', date: '2025-11-20', time: '09:00', location: 'School Auditorium' },
          { title: 'Winter Concert', description: 'Annual winter music performance.', date: '2025-12-05', time: '19:00', location: 'School Auditorium' },
          { title: 'Annual Sports Day', description: 'Inter-house sports competition.', date: '2025-12-12', time: '08:00', location: 'School Sports Ground' },
          { title: 'Christmas Play', description: 'Festive theatrical performance.', date: '2025-12-18', time: '18:00', location: 'School Theater' },
          { title: 'New Year Gala', description: 'Celebrate the new year with us.', date: '2026-01-10', time: '19:00', location: 'Grand Ballroom' },
        ];

        for (const event of initialEvents) {
          const exists = allEvents.some(e => e.title === event.title && e.date.startsWith(event.date));
          if (!exists) {
            try {
              const response = await fetch('http://localhost:5000/api/events', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(event),
              });
              if (response.ok) {
                console.log(`Seeded event: ${event.title}`);
              } else {
                const errorData = await response.json();
                console.error(`Failed to seed event ${event.title}:`, errorData.message);
              }
            } catch (error) {
              console.error(`Error seeding event ${event.title}:`, error);
            }
          }
        }
        fetchEvents(); // Re-fetch events after seeding
      };
      seedEvents();
    }
  }, [loadingEvents, allEvents, userInfo, token]);

  const fetchEvents = async () => {
    try {
      setLoadingEvents(true);
      const response = await fetch('http://localhost:5000/api/events');
      const data = await response.json();
      setAllEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoadingEvents(false);
    }
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      if (!token || userInfo.role !== 'admin') {
        alert('You are not authorized to add events.');
        return;
      }

      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: eventTitle, description: eventDescription, date: eventDate, time: eventTime, location: eventLocation }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Event added successfully!');
        setEventTitle('');
        setEventDescription('');
        setEventDate('');
        setEventTime('');
        setEventLocation('');
        fetchEvents(); // Refresh events list
      } else {
        alert(data.message || 'Failed to add event.');
      }
    } catch (error) {
      console.error('Error adding event:', error);
      alert('An error occurred while adding the event.');
    }
  };

  const handleEditClick = (eventItem) => {
    setEditingEventId(eventItem._id);
    setEditEventTitle(eventItem.title);
    setEditEventDescription(eventItem.description);
    setEditEventDate(eventItem.date.substring(0, 10)); // Format date for input type="date"
    setEditEventTime(eventItem.time);
    setEditEventLocation(eventItem.location);
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      if (!token || userInfo.role !== 'admin') {
        alert('You are not authorized to update events.');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/events/${editingEventId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: editEventTitle, description: editEventDescription, date: editEventDate, time: editEventTime, location: editEventLocation }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Event updated successfully!');
        setEditingEventId(null);
        setEditEventTitle('');
        setEditEventDescription('');
        setEditEventDate('');
        setEditEventTime('');
        setEditEventLocation('');
        fetchEvents(); // Refresh events list
      } else {
        alert(data.message || 'Failed to update event.');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      alert('An error occurred while updating the event.');
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) {
      return;
    }
    try {
      if (!token || userInfo.role !== 'admin') {
        alert('You are not authorized to delete events.');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Event deleted successfully!');
        fetchEvents(); // Refresh events list
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to delete event.');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('An error occurred while deleting the event.');
    }
  };

  return (
    <div className="manage-events">
      <h3>Add New Event</h3>
      <form onSubmit={handleAddEvent}>
        <div className="form-group">
          <label htmlFor="event-title">Event Title</label>
          <input
            type="text"
            id="event-title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="event-description">Event Description</label>
          <textarea
            id="event-description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="event-date">Event Date</label>
          <input
            type="date"
            id="event-date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="event-time">Event Time</label>
          <input
            type="time"
            id="event-time"
            value={eventTime}
            onChange={(e) => setEventTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="event-location">Event Location</label>
          <input
            type="text"
            id="event-location"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">Add Event</button>
      </form>

      <h4 className="mt-4">Existing Events</h4>
      {loadingEvents ? (
        <p>Loading events...</p>
      ) : allEvents.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="list-group">
          {allEvents.map((item) => (
            <div key={item._id} className="list-group-item d-flex justify-content-between align-items-center mb-2">
              <span>{item.title} - {new Date(item.date).toLocaleDateString()} at {item.time} ({item.location})</span>
              <div>
                <button className="btn btn-sm btn-info mr-2" onClick={() => handleEditClick(item)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteEvent(item._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingEventId && (
        <div className="edit-event-section mt-5">
          <h3>Edit Event</h3>
          <form onSubmit={handleUpdateEvent}>
            <div className="form-group">
              <label htmlFor="edit-event-title">Title</label>
              <input
                type="text"
                id="edit-event-title"
                value={editEventTitle}
                onChange={(e) => setEditEventTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-event-description">Description</label>
              <textarea
                id="edit-event-description"
                value={editEventDescription}
                onChange={(e) => setEditEventDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="edit-event-date">Date</label>
              <input
                type="date"
                id="edit-event-date"
                value={editEventDate}
                onChange={(e) => setEditEventDate(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-event-time">Time</label>
              <input
                type="time"
                id="edit-event-time"
                value={editEventTime}
                onChange={(e) => setEditEventTime(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-event-location">Location</label>
              <input
                type="text"
                id="edit-event-location"
                value={editEventLocation}
                onChange={(e) => setEditEventLocation(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary mr-2">Update Event</button>
            <button type="button" className="btn btn-secondary" onClick={() => setEditingEventId(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;
