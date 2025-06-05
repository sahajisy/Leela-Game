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
  const [hasFirstCard, setHasFirstCard] = useState(false);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    // Scroll to top on mount so the user always sees the top info first
    window.scrollTo(0, 0);
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
    function getAchievements(streak, uniqueSeen, hasSpiritCard, hasAllPowerCard, hasFirstCard) {
      const badges = [];
      if (hasFirstCard) badges.push('First Card Pulled!');
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
    // Check if the user has ever pulled a card (any quote- key exists)
    // and if the current history contains the very first card ever pulled
    let hasFirstCard = false;
    const allQuoteKeys = Object.keys(localStorage).filter(key => key.startsWith('quote-'));
    if (allQuoteKeys.length > 0) {
      // Find the earliest date
      const firstDate = allQuoteKeys.map(k => k.replace('quote-', '')).sort()[0];
      const firstCard = localStorage.getItem('quote-' + firstDate);
      // If the user's history includes the first card ever pulled, show badge
      hasFirstCard = history.some(entry => entry.date === firstDate);
    }
    setStreak(streakVal);
    setUniqueSeen(uniqueSeenVal);
    setHasSpiritCard(spirit);
    setHasAllPowerCard(allPower);
    setHasFirstCard(hasFirstCard);
    setAchievements(getAchievements(streakVal, uniqueSeenVal, spirit, allPower, hasFirstCard));
  }, [history.length]);

  return (
    <div className="app-container" style={{overflowY: 'auto', maxHeight: '100vh'}}>
      <h1>Leela History</h1>
      <div style={{ margin: '0.5rem 0 1.2rem 0', color: '#6366f1', fontWeight: 500, fontSize: '1.02rem' }}>
        You have seen {uniqueSeen} unique Leela cards.<br/>
        <span style={{color:'#3730a3'}}>Streak: {streak} day{streak !== 1 ? 's' : ''}</span>
      </div>
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
      <a href="/" style={{
        marginTop: '2rem',
        display: 'inline-block',
        color: '#6366f1',
        textDecoration: 'underline',
        position: 'sticky',
        bottom: 0,
        background: '#fff',
        zIndex: 10,
        padding: '0.7rem 0',
        width: '100%',
        textAlign: 'center',
        boxShadow: '0 -2px 8px rgba(55,48,163,0.04)'
      }}>Back to Leela</a>
    </div>
  );
}
