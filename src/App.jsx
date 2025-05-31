import { useState, useEffect } from 'react'
import './App.css'

// Unregister all service workers on load to fix blank screen on revisit
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(reg => reg.unregister());
  });
}

const QUOTES = [
"You are a very special type of human race and beautiful patterns are showing in your life, in your lifestyle, in your behavior.", 
"If a person is very much indulgent and thinks so much of things which are not so important for spirituality, then Kundalini is falling again and again.", 
"If you don't use your Kundalini power, she stops working! Use your vibrations and give it to everybody and everything who is alive!", 
"When ego is there, you cannot be a witness. To make the ego disappear, say the mantra of Shri Jesus.", 
"Shri Mahakali is the power of your left side, the power of desire. If your desire is pure then Paramchaitanya will act.", 
"Take help from the ganas, you can become very intuitive. 50% of SY is based on intuition. You have to develop a proper sense of Shri Ganesha.", 
"How collective are you? How many people can you get along with? How many things can you laugh at?", 
"Kaalateet. Beyond time. Timeless.", 
"Everything happens just in the right moment.", 
"You have to clear your problems, face yourself and introspect. Then the lotus that you are can spread.", 
"A person who thinks she is very exclusive and special should not come to SY, you have to become a part and parcel of the whole.", 
"Learn through your introspection to improve yourself and to become a better and loving personality.", 
"'I need this, I need that, I need that.' We should know what other people need. What is their need?", 
"Feel this beautiful peace and silence of your Spirit. Through silence you can feel God, the Paramchaitanya.", 
"You have to be connected with me, then this feeling is so satisfying, so joy-giving, that you feel this joy for yourself and others.", 
"The best way to stop your thoughts is to think: 'What can I do for SY? Then you will become thoughtlessly aware.'", 
"If your heart is clean you can see other persons clearly through and through. Innocence is such a powerful thing.", 
"It is an inside war. You have to fight the six enemies within yourself, then only can you rise and ascend in your spiritual growth.", 
"As soon as you decide to please others, the tongue becomes different. It becomes sweet, like honey.", 
"However great a man may be in society, without love he will lack the force of gravity, the sweet fragrance of a flower.", 
"You have to give realisation, to bring your light outside into the society. You have this responsibility.", 
"Life is a game - play it, enjoy it and love it!", 
"If you are the instrument of God Almighty, the instrument of Adi Shakti, then your life will be full of love and joy… beautiful.", 
"All the drama is played to prove the existence of that great power, the power of God.", 
"Forgive everyone completely and do not react. Ego itself has many reactions. Establish your witness state.", 
"The only thing that will really give me happiness is that the way I love you, you love each other.", 
"Pray: 'Give me natural humility, by which I can penetrate into the hearts of people.'", 
"Put your right and your left side in balance! If you are in the center then you are in the present.", 
"How does a tree grow? By itself. Allow yourself to grow by yourself, through introspection and meditation.", 
"Chitta Nirodh. Teach me how to avoid things that tempt me, that take away my attention.", 
"Please keep me away from Ego, that gives me the idea that I am superior to others.", 
"Negativity of the left side is very dangerous and it can lead to serious emotional and psychological problems.", 
"You have to have complete faith in yourself, and that 'yourself' is nothing but innocence.", 
"Putting one's attention on problems and having the faith that the Divine Power will work it out will solve all your problems.", 
"Why are you wasting so much time with trivial and unimportant nonsensical things? What is your destiny?", 
"You all must clear your chakras every day. Keep yourself clean and auspicious.", 
"A person who is left-sided cannot be collective. He cannot enjoy the fun of collectivity.", 
"Shiva loves everyone who is humble for truth, because He is the total source of pure knowledge.", 
"You have found Sahaja Yoga through your desire and you have gone through many lives before you achieved it.", 
"When you become thoughtlessly aware then you become completely peaceful within.", 
"You must understand that angels are always around you and watch you, so you have to love God with all your heart!", 
"You have to meditate and try to go into the state of thoughtless awareness!", 
"She - the Kundalini - knows everything. You cannot hide things, but you have to work it out!", 
"You might feel a little bit cheated, a little bit dominated or disgraced, but Sahaja Yogis have to be innocent.", 
"To become a great Sahaja Yogi, you have to look after your Mahalaxmi principle. Now you have found reality, the truth, now you can progress.", 
"You have to count how many people you love. All the Sahaja Yogis are in my heart.", 
"Pray: 'Take away my thoughts, give me the witness state by which I can see the whole drama.'", 
"Sangam saranam gachami. I surrender myself to the collectivity.", 
"Where the women are respected and respectable, there resides the Goddess of our well-being.", 
"Introspect and let go of all the negative feelings inside the collective… and only feel love towards each other.", 
"Allow your heart to be drenched in your Mother's love. Just allow. See how much I love you.", 
"Let us pray to Shri Bhairava to give us a sense to laugh, to enjoy, to have fun.", 
"Love is the life-giving force of the family. It binds, nourishes and sustains the family.", 
"You are here to do the work of Adi Shakti, the work of transformation of human beings.", 
"Be aware about yourself and about your action. Don’t think too much, be Sahaj!", 
"Shri Ganesha is the principle of innocence and purity. Feel these qualities in yourself.", 
"We have to be very humble to reach the Lotus feet of Shri Mahadeva, Shiva.", 
"Shri Hanumana was so devoted to Rama. Devotion will bring you further on!", 
"Ask in your prayer: 'O Lord, give me the sense of security of my SPIRIT.'", 
"The biggest thing one has to know is to bend down towards the Mother Earth.", 
"When you are desireless, you are happy, because you are never disappointed.", 
"If you could make yourself stronger than your memory, then nothing can possess you…", 
"It is not necessary to become ritualistic and fanatic, it's dangerous. Your action should come from the heart.", 
"Pray: 'Let me be a courageous person and feel Shri Durga in my heart.'", 
"Pray with your heart. Prayer is a very great thing for a Sahaja Yogi.", 
"The one who is not innocent is never wise. Wisdom comes only with innocence.", 
"Use your introspection and ask yourself: What is your level, what sort of a 'reflector' are you?", 
"If you are a compassionate person then you have the desire to give your love and your knowledge to others.", 
"No use feeling guilty. If you have done something wrong, just face it.", 
"Buddham saranam gachami. I surrender myself to my Self-Realization.", 
"Dharmam saranam gachami. I surrender to the Nirmala Dharma in me.", 
"If there is a disappointment, just smile at it and know it is for your good.", 
"Pray: Give me a sweet tongue by which I become communicative with others.", 
"Feel your spirit and enjoy this wonderful life… the life of a realised soul!", 
"Pray with your heart: 'lease give me the strength so that I am genuine.'", 
"We have to be tolerant with others and accept all the differences.", 
"Be collective! Don't think that you are something special!", 
"Shri Durga Mata is giving you confidence in yourself!", 
"Modesty will let you grow inside and you will become beautiful!", 
"Sahaja Yoga is to be worked out, not to be thought out.", 
"In thoughtless awareness nobody can touch you, that is your fortress.", 
"The best calibre of the subtlest form is just seeking union with God.", 
"We have to share, we are one body, part and parcel of the whole!", 
"Pray: 'Let me see my mistakes, not the mistakes of others.'", 
"Your own attention is important, not the attention of others.", 
"Protect people who are good people and give them realisation.", 
"Pray: 'Let me see why people are not happy with me.'", 
"A right-sided person doesn't allow anyone to enjoy collectivity.", 
"Pray: 'Give me the sense of my own dignity.'", 
"You have to have compassion for people who cannot understand!", 
"A strong center heart is the basis of a healthy personality.", 
"Let me be the witness and let me feel this witness state.", 
"The purpose of life is to worship God Almighty.", 
"If you live a holy life in dharma, you will enjoy this life!", 
"Shri Laxmi is the principle of wealth and peace.", 
"Shri Adi Shakti is your Mother! Where is your attention now?", 
"Money cannot replace reality, it's just there.", 
"Feel joy and let this joy spread through you.", 
"Let your intuition, your left side, act!", 
"Be a constructive and good person!", 
"Ascent is the aim of your life, and to perfect it is your job.", 
"It is all myth that upsets you. Just throw it away!", 
"Love that is attachment cannot be love.", 
"Believe in yourself and your creative powers!", 
"Talk to everyone with an open heart.", 
"Be patient with yourself and with others.", 
"Respect yourself, you are the reflection of God Almighty!", 
"I am a Sahaja Yogi.' You have all the power! May God bless you.'"

]

function getRandomQuote() {
  return QUOTES[Math.floor(Math.random() * QUOTES.length)]
}

function getTodayKey() {
  const today = new Date()
  return today.toISOString().slice(0, 10) // YYYY-MM-DD
}

function App() {
  const [quote, setQuote] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(false)
  

  useEffect(() => {
    // TEMP: Disable service worker registration for Vercel blank screen debug
    // if ('serviceWorker' in navigator) {
    //   navigator.serviceWorker.register('/service-worker.js').catch(() => {
    //     // Ignore registration errors
    //   });
    // }
    // Notification logic
    function requestNotificationPermission() {
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
      }
    }
    function showDailyNotification(quote) {
      if ('Notification' in window && Notification.permission === 'granted') {
        const todayKey = getTodayKey();
        const notifiedKey = 'notified-' + todayKey;
        if (!localStorage.getItem(notifiedKey)) {
          if (navigator.serviceWorker && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({ type: 'SHOW_DAILY_NOTIFICATION' });
          } else {
            new Notification('Your Leela Card is ready!', {
              body: 'Tap to see your daily Leela card.',
              icon: '/vite.svg',
            });
          }
          localStorage.setItem(notifiedKey, 'yes');
        }
      }
    }
    const todayKey = getTodayKey()
    const stored = localStorage.getItem('quote-' + todayKey)
    const used = localStorage.getItem('leela-btn-' + todayKey)
    if (stored) {
      setQuote(stored)
    } else {
      const newQuote = getRandomQuote()
      setQuote(newQuote)
      localStorage.setItem('quote-' + todayKey, newQuote)
    }
    if (used) {
      setButtonDisabled(true)
    }
    requestNotificationPermission();
    if (Notification.permission === 'granted') {
      showDailyNotification(stored)
    }
  }, [])

  const handleNewQuote = () => {
    const todayKey = getTodayKey()
    const newQuote = getRandomQuote()
    setQuote(newQuote)
    localStorage.setItem('quote-' + todayKey, newQuote)
    setButtonDisabled(true)
    localStorage.setItem('leela-btn-' + todayKey, 'used')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Leela Game',
        text: quote,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(quote);
      alert('Quote copied to clipboard!');
    }
  };

  return (
    <div className="app-container">
      <h1>Leela Game</h1>
      <div style={{ fontSize: '1.05rem', color: '#444', marginBottom: '1.2rem', fontWeight: 500 }}>
        by Sahaja Yogis for Sahaja Yogis
      </div>
      <blockquote className="quote">{quote}</blockquote>
      <button onClick={handleNewQuote} disabled={buttonDisabled}>New Leela</button>
      <button onClick={handleShare} style={{ marginTop: '1rem', background: '#818cf8' }}>
        Share Leela
      </button>
      {buttonDisabled && (
        <div style={{ marginTop: '1rem', color: '#6366f1', fontWeight: 500 }}>
          Come again tomorrow for the next Leela card.
        </div>
      )}
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
        <a href="/leela" style={{ color: '#6366f1', textDecoration: 'underline', fontSize: '1rem' }}>
          About Leela Game
        </a>
        <a href="/history" style={{ color: '#6366f1', textDecoration: 'underline', fontSize: '1rem' }}>
          History
        </a>
      </div>
      <div style={{ marginTop: '2.5rem', color: '#888', fontSize: '0.98rem' }}>
        <span role="img" aria-label="bell">🔔</span> Enable notifications to get a daily reminder for your Leela card!<br />
        <span style={{ fontSize: '0.92em' }}>
          For best experience, <b>add this app to your home screen</b> (PWA) from your browser menu.
        </span>
      </div>
    </div>
  )
}

export default App
