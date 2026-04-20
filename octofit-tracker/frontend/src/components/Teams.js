import React, { useState, useEffect } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    console.log('Fetching teams from:', API_URL);
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        console.log('Teams data:', data);
        const items = data.results || data;
        setTeams(Array.isArray(items) ? items : []);
      })
      .catch(error => console.error('Error fetching teams:', error));
  }, []);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <h2 className="mb-0" style={{ border: 'none', color: '#fff' }}>Teams</h2>
        </div>
        <div className="card-body p-0">
          <table className="table table-striped table-hover mb-0">
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {teams.length > 0 ? (
                teams.map((team, index) => (
                  <tr key={team.id || index}>
                    <td>{team.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center text-muted py-3">No teams found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Teams;
