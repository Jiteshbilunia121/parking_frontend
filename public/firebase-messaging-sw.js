importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging.js');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyByM18xmud1BmAA7ZIUubM6tyK4syx-BA8",
  authDomain: "parking-notification-f3e64.firebaseapp.com",
  projectId: "parking-notification-f3e64",
  storageBucket: "parking-notification-f3e64.firebasestorage.app",
  messagingSenderId: "172771117353",
  appId: "1:172771117353:web:355089e0975a8948cc0f38",
  measurementId: "G-N2LLTT8W57"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const notificationTitle = payload.notification.title || 'New Notification';
  const notificationOptions = {
    body: payload.notification.body || 'You have a new message.',
    icon: '✅', // Replace with your custom icon
    sound: '/notification-sound.mp3', // Replace with your custom sound
    badge: '/badge.png', // Optional: Replace with your badge icon
    data: payload.data, // Pass any custom data here
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
