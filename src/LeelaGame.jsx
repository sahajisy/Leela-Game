import './LeelaGame.css';

function LeelaGame() {
  return (
    <div className="leela-container">
      <h1>About Leela Game</h1>
      <p style={{ fontWeight: 500, color: '#3730a3', marginBottom: '1.2rem' }}>
        Leela Game is a collection of 108 excerpts from the talks of the founder of Sahaja Yoga, Shri Mataji Nirmala Devi.
      </p>
      <p style={{ color: '#555', marginBottom: '1.2rem' }}>
        This application is created purely for hobby and fun. It is not an official Sahaja Yoga resource and is not intended for any serious or formal Sahaja element—please enjoy it in a light-hearted spirit!
      </p>
      <p style={{ color: '#888', fontSize: '0.98rem', marginBottom: '1.8rem' }}>
        Created by Sahaj Balgunde (かんたんです)
        <br />
        <a href="https://github.com/sahajisy/leela-game" target="_blank" rel="noopener noreferrer" style={{ color: '#6366f1', textDecoration: 'underline', fontSize: '0.98rem' }}>
          View on GitHub
        </a>
        <br />
        <a href="/history" style={{ color: '#6366f1', textDecoration: 'underline', fontSize: '0.98rem', marginTop: '1.2rem', display: 'inline-block' }}>
          View History
        </a>
        <br/>
        <span style={{color:'#6366f1'}}>
          <b>Note:</b> Notifications are only available on supported browsers (e.g. Chrome, Android, most desktops). iOS Safari and some browsers do not support notifications.
        </span>
        <br/>
        <span style={{color:'#6366f1', display:'block', marginTop:'1.2rem'}}>
          <span role="img" aria-label="bell">🔔</span> Enable notifications to get a daily reminder for your Leela card!<br />
          For best experience, <b>add this app to your home screen</b> (PWA) from your browser menu.
        </span>
      </p>
    </div>
  );
}

export default LeelaGame;
