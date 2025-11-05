
import React, { useState, useEffect } from 'react';

const ManageNews = () => {
  const [newsTitle, setNewsTitle] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [allNews, setAllNews] = useState([]);
  const [loadingNews, setLoadingNews] = useState(true);

  const [editingNewsId, setEditingNewsId] = useState(null);
  const [editNewsTitle, setEditNewsTitle] = useState('');
  const [editNewsContent, setEditNewsContent] = useState('');

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const token = userInfo?.token;

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      fetchNews();
    }
  }, []);

  const fetchNews = async () => {
    try {
      setLoadingNews(true);
      const response = await fetch('http://localhost:5000/api/news');
      const data = await response.json();
      setAllNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoadingNews(false);
    }
  };

  const handleAddNews = async (e) => {
    e.preventDefault();
    try {
      if (!token || userInfo.role !== 'admin') {
        alert('You are not authorized to add news.');
        return;
      }

      const response = await fetch('http://localhost:5000/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newsTitle, content: newsContent }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('News article added successfully!');
        setNewsTitle('');
        setNewsContent('');
        fetchNews(); // Refresh news list
      } else {
        alert(data.message || 'Failed to add news article.');
      }
    } catch (error) {
      console.error('Error adding news:', error);
      alert('An error occurred while adding the news article.');
    }
  };

  const handleEditClick = (newsItem) => {
    setEditingNewsId(newsItem._id);
    setEditNewsTitle(newsItem.title);
    setEditNewsContent(newsItem.content);
  };

  const handleUpdateNews = async (e) => {
    e.preventDefault();
    try {
      if (!token || userInfo.role !== 'admin') {
        alert('You are not authorized to update news.');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/news/${editingNewsId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: editNewsTitle, content: editNewsContent }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('News article updated successfully!');
        setEditingNewsId(null);
        setEditNewsTitle('');
        setEditNewsContent('');
        fetchNews(); // Refresh news list
      } else {
        alert(data.message || 'Failed to update news article.');
      }
    } catch (error) {
      console.error('Error updating news:', error);
      alert('An error occurred while updating the news article.');
    }
  };

  const handleDeleteNews = async (id) => {
    if (!window.confirm('Are you sure you want to delete this news article?')) {
      return;
    }
    try {
      if (!token || userInfo.role !== 'admin') {
        alert('You are not authorized to delete news.');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/news/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('News article deleted successfully!');
        fetchNews(); // Refresh news list
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to delete news article.');
      }
    } catch (error) {
      console.error('Error deleting news:', error);
      alert('An error occurred while deleting the news article.');
    }
  };

  return (
    <div className="manage-news">
      <h3>Add New News Article</h3>
      <form onSubmit={handleAddNews}>
        <div className="form-group">
          <label htmlFor="news-title">News Title</label>
          <input
            type="text"
            id="news-title"
            value={newsTitle}
            onChange={(e) => setNewsTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="news-content">News Content</label>
          <textarea
            id="news-content"
            value={newsContent}
            onChange={(e) => setNewsContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn">Add News</button>
      </form>

      <h4 className="mt-4">Existing News Articles</h4>
      {loadingNews ? (
        <p>Loading news...</p>
      ) : allNews.length === 0 ? (
        <p>No news articles found.</p>
      ) : (
        <div className="list-group">
          {allNews.map((item) => (
            <div key={item._id} className="list-group-item d-flex justify-content-between align-items-center mb-2">
              <span>{item.title} - {new Date(item.date).toLocaleDateString()}</span>
              <div>
                <button className="btn btn-sm btn-info mr-2" onClick={() => handleEditClick(item)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteNews(item._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingNewsId && (
        <div className="edit-news-section mt-5">
          <h3>Edit News Article</h3>
          <form onSubmit={handleUpdateNews}>
            <div className="form-group">
              <label htmlFor="edit-news-title">Title</label>
              <input
                type="text"
                id="edit-news-title"
                value={editNewsTitle}
                onChange={(e) => setEditNewsTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-news-content">Content</label>
              <textarea
                id="edit-news-content"
                value={editNewsContent}
                onChange={(e) => setEditNewsContent(e.target.value)}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary mr-2">Update News</button>
            <button type="button" className="btn btn-secondary" onClick={() => setEditingNewsId(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageNews;
