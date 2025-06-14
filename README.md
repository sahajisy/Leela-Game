# Leela Game – Daily Sahaja Yoga Quotes

A mobile-friendly, theme-aware React (Vite) app that displays a daily random quote from 108 Sahaja Yoga quotes. Each user gets one card per day, with a personal history, sharing, and PWA support.

## Features
- **Daily Leela Card:** Get a new random quote each day (resets at local midnight).
- **New Leela Button:** Draw your daily card (usable once per day).
- **Welcome Card:** On first visit each day, see a welcome message until you draw your card.
- **Personal History:** View your last 7 Leela cards.
- **Share:** Share your card via Web Share API or copy to clipboard.
- **Theme Support:** Light, dark, purple, and blue themes (auto-detected).
- **Responsive & Centered:** Looks great on mobile and desktop.
- **PWA:** Add to home screen, works offline, and supports notifications (where available).
- **About Page:** Learn more about the app and its inspiration.
- **Achievements:** Earn badges for 7-day streak, 30-day streak, 50 unique cards, all cards unlocked, unlocking a Spirit card, and unlocking the "All the Power" card.

## Getting Started
1. **Install dependencies:**
   ```powershell
   npm install
   ```
2. **Start the development server:**
   ```powershell
   npm run dev
   ```
3. **Open in browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or as shown in your terminal).

## Project Structure
- `src/App.jsx` – Main app logic, daily quote, history, sharing, and UI.
- `src/History.jsx` – Personal Leela history page.
- `src/LeelaGame.jsx` – About page.
- `src/App.css`, `src/LeelaGame.css` – Responsive, theme-aware styles.
- `public/manifest.json` – PWA manifest.
- `public/service-worker.js` – Service worker (for PWA/notifications).
- `vercel.json` – SPA routing for Vercel deployment.

## Deployment
- Deployed on [Vercel](https://vercel.com/).
- SPA routing is handled by `vercel.json`.

## Notes
- **Notifications:** Only supported on some browsers (not iOS Safari).
- **PWA:** For best experience, add to your home screen.
- **Quote Logic:** Cards are picked randomly each day (repeats possible), but your unique cards seen are tracked.

## Feedback & Contributions
- [GitHub Issues](https://github.com/sahajisy/leela-game/issues) – Suggestions and bug reports welcome!

---
- Inspired by the teachings of **H.H Shri Mataji Nirmala Devi.**
- Project backed by: Georgiana Nicoara (Indian Studies Enthusiast)
- Created by Sahaj Balgunde (かんたんです).