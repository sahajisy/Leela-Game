// Minimal service worker for PWA and notification support
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  self.clients.claim();
});

// Listen for notification trigger messages (future use)
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SHOW_DAILY_NOTIFICATION') {
    self.registration.showNotification('Your Leela Card is ready!', {
      body: 'Tap to see your daily Leela card.',
      icon: '/vite.svg',
      tag: 'leela-daily',
      renotify: true
    });
  }
});
