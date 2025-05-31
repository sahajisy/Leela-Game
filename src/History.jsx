import React, { useEffect, useState } from 'react';

function getHistory() {
  const history = JSON.parse(localStorage.getItem('leelaHistory') || '[]');
  return history.slice(-7).reverse();
}

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  return (
    <div className="app-container">
      <h1>Leela History</h1>
      {history.length === 0 ? (
        <p style={{color: '#888'}}>No history yet. Come back after drawing some Leela cards!</p>
      ) : (
        <ul style={{listStyle: 'none', padding: 0, width: '100%', maxWidth: 370}}>
          {history.map((entry, idx) => (
            <li key={idx} style={{marginBottom: '1.2rem', background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(55,48,163,0.07)', padding: '1rem'}}>
              <div style={{fontSize: '0.95rem', color: '#3730a3', marginBottom: 6}}>{entry.date}</div>
              <div style={{fontStyle: 'italic', color: '#22223b'}}>{entry.quote}</div>
            </li>
          ))}
        </ul>
      )}
      <a href="/" style={{marginTop: '2rem', display: 'inline-block', color: '#6366f1', textDecoration: 'underline'}}>Back to Leela</a>
    </div>
  );
}
