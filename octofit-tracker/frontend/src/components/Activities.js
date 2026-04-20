import React, { useState, useEffect } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    console.log('Fetching activities from:', API_URL);
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        console.log('Activities data:', data);
        const items = data.results || data;
        setActivities(Array.isArray(items) ? items : []);
      })
      .catch(error => console.error('Error fetching activities:', error));
  }, []);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2 className="mb-0" style={{ border: 'none', color: '#fff' }}>Activities</h2>
        </div>
        <div className="card-body p-0">
          <table className="table table-striped table-hover mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>User</th>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {activities.length > 0 ? (
                activities.map((activity, index) => (
                  <tr key={activity.id || index}>
                    <td>{activity.name}</td>
                    <td>{activity.user}</td>
                    <td>{activity.team}</td>
                    <td><span className="badge-points">{activity.points}</span></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-3">No activities found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Activities;
