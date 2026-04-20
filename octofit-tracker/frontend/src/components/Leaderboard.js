import React, { useState, useEffect } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    console.log('Fetching leaderboard from:', API_URL);
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        console.log('Leaderboard data:', data);
        const items = data.results || data;
        setLeaderboard(Array.isArray(items) ? items : []);
      })
      .catch(error => console.error('Error fetching leaderboard:', error));
  }, []);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2 className="mb-0" style={{ border: 'none', color: '#fff' }}>Leaderboard</h2>
        </div>
        <div className="card-body p-0">
          <table className="table table-striped table-hover mb-0">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length > 0 ? (
                leaderboard.map((entry, index) => (
                  <tr key={entry.id || index}>
                    <td><strong>#{index + 1}</strong></td>
                    <td>{entry.team}</td>
                    <td><span className="badge-points">{entry.points}</span></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-muted py-3">No leaderboard data found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
