import React, { useEffect, useState } from 'react';

function getHistory() {
  const history = JSON.parse(localStorage.getItem('leelaHistory') || '[]');
  return history.slice(-7).reverse();
}

export default function History() {
  const [history, setHistory] = useState([]);
  const [streak, setStreak] = useState(0);
  const [uniqueSeen, setUniqueSeen] = useState(0);
  const [hasSpiritCard, setHasSpiritCard] = useState(false);
  const [hasAllPowerCard, setHasAllPowerCard] = useState(false);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    setHistory(getHistory());
    // Calculate streak, uniqueSeen, and badges
    function getUniqueSeenCount() {
      const seen = new Set();
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('quote-')) {
          const val = localStorage.getItem(key);
          if (val) seen.add(val);
        }
      });
      return seen.size;
    }
    function getStreak() {
      const keys = Object.keys(localStorage).filter(k => k.startsWith('quote-'));
      const days = keys.map(k => k.replace('quote-', ''));
      const sorted = days.sort();
      let streak = 0;
      let prev = null;
      for (let i = sorted.length - 1; i >= 0; i--) {
        const d = sorted[i];
        const date = new Date(d);
        if (i === sorted.length - 1) {
          const todayKey = new Date().toISOString().slice(0, 10);
          if (d !== todayKey) break;
          streak = 1;
          prev = date;
        } else {
          const diff = (prev - date) / (1000 * 60 * 60 * 24);
          if (diff === 1) {
            streak++;
            prev = date;
          } else {
            break;
          }
        }
      }
      return streak;
    }
    function getAchievements(streak, uniqueSeen, hasSpiritCard, hasAllPowerCard) {
      const badges = [];
      if (streak >= 7) badges.push('7-day Streak');
      if (streak >= 30) badges.push('30-day Streak');
      if (uniqueSeen >= 50) badges.push('50 Unique Cards');
      if (uniqueSeen >= 108) badges.push('All Cards Unlocked!');
      if (hasSpiritCard) badges.push('Spirit Card Unlocked!');
      if (hasAllPowerCard) badges.push('All the Power Card!');
      return badges;
    }
    const streakVal = getStreak();
    const uniqueSeenVal = getUniqueSeenCount();
    const spirit = localStorage.getItem('spiritCardUnlocked') === 'true';
    const allPower = localStorage.getItem('allPowerCardUnlocked') === 'true';
    setStreak(streakVal);
    setUniqueSeen(uniqueSeenVal);
    setHasSpiritCard(spirit);
    setHasAllPowerCard(allPower);
    setAchievements(getAchievements(streakVal, uniqueSeenVal, spirit, allPower));
  }, []);

  return (
    <div className="app-container">
      <h1>Leela History</h1>
      {achievements.length > 0 && (
        <div style={{marginBottom: '1.5rem'}}>
          <div style={{color:'#a16207', fontWeight:600, fontSize:'1.01rem', marginBottom:4}}>Achievements</div>
          <div>
            {achievements.map(badge => (
              <span key={badge} style={{marginRight:10, background:'#fef08a', color:'#a16207', borderRadius:6, padding:'2px 8px', fontSize:'0.98rem', border:'1px solid #fde047'}}>
                {badge}
              </span>
            ))}
          </div>
        </div>
      )}
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
