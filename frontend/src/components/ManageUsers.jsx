
import React, { useState, useEffect } from 'react';

const ManageUsers = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role for new users

  const [allUsers, setAllUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [editingUserId, setEditingUserId] = useState(null);
  const [editUserName, setEditUserName] = useState('');
  const [editUserEmail, setEditUserEmail] = useState('');
  const [editUserRole, setEditUserRole] = useState('');

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const token = userInfo?.token;

  useEffect(() => {
    if (userInfo && userInfo.role === 'admin') {
      fetchUsers();
    }
  }, []);

  const fetchUsers = async () => {
    try {
      setLoadingUsers(true);
      const response = await fetch('http://localhost:5000/api/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setAllUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (!token || userInfo.role !== 'admin') {
        alert('You are not authorized to register new users.');
        return;
      }

      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(`User ${name} (${role}) registered successfully!`);
        setName('');
        setEmail('');
        setPassword('');
        setRole('student');
        fetchUsers(); // Refresh user list
      } else {
        alert(data.message || 'User registration failed.');
      }
    } catch (error) {
      console.error('Error during user registration:', error);
      alert('An error occurred during user registration.');
    }
  };

  const handleEditClick = (userItem) => {
    setEditingUserId(userItem._id);
    setEditUserName(userItem.name);
    setEditUserEmail(userItem.email);
    setEditUserRole(userItem.role);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      if (!token || userInfo.role !== 'admin') {
        alert('You are not authorized to update users.');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/users/${editingUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: editUserName, email: editUserEmail, role: editUserRole }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('User updated successfully!');
        setEditingUserId(null);
        setEditUserName('');
        setEditUserEmail('');
        setEditUserRole('');
        fetchUsers(); // Refresh user list
      } else {
        alert(data.message || 'Failed to update user.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('An error occurred while updating the user.');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }
    try {
      if (!token || userInfo.role !== 'admin') {
        alert('You are not authorized to delete users.');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('User deleted successfully!');
        fetchUsers(); // Refresh user list
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to delete user.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('An error occurred while deleting the user.');
    }
  };

  return (
    <div className="manage-users">
      <h3>Register New User</h3>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="admin-name">Name</label>
          <input
            type="text"
            id="admin-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="admin-email">Email</label>
          <input
            type="email"
            id="admin-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="admin-password">Password</label>
          <input
            type="password"
            id="admin-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="admin-role">Role</label>
          <select id="admin-role" value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="admin">Administrator</option>
          </select>
        </div>
        <button type="submit" className="btn">Register User</button>
      </form>

      <h4 className="mt-4">Existing Users</h4>
      {loadingUsers ? (
        <p>Loading users...</p>
      ) : allUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <div className="list-group">
          {allUsers.map((userItem) => (
            <div key={userItem._id} className="list-group-item d-flex justify-content-between align-items-center mb-2">
              <span>{userItem.name} ({userItem.email}) - {userItem.role}</span>
              <div>
                <button className="btn btn-sm btn-info mr-2" onClick={() => handleEditClick(userItem)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDeleteUser(userItem._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingUserId && (
        <div className="edit-user-section mt-5">
          <h3>Edit User</h3>
          <form onSubmit={handleUpdateUser}>
            <div className="form-group">
              <label htmlFor="edit-user-name">Name</label>
              <input
                type="text"
                id="edit-user-name"
                value={editUserName}
                onChange={(e) => setEditUserName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-user-email">Email</label>
              <input
                type="email"
                id="edit-user-email"
                value={editUserEmail}
                onChange={(e) => setEditUserEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="edit-user-role">Role</label>
              <select id="edit-user-role" value={editUserRole} onChange={(e) => setEditUserRole(e.target.value)}>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary mr-2">Update User</button>
            <button type="button" className="btn btn-secondary" onClick={() => setEditingUserId(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
