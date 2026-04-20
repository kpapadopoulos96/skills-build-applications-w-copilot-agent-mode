import React, { useState, useEffect } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log('Fetching users from:', API_URL);
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        console.log('Users data:', data);
        const items = data.results || data;
        setUsers(Array.isArray(items) ? items : []);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2 className="mb-0" style={{ border: 'none', color: '#fff' }}>Users</h2>
        </div>
        <div className="card-body p-0">
          <table className="table table-striped table-hover mb-0">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr key={user.id || index}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center text-muted py-3">No users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
