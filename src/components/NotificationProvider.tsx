'use client';
import { useEffect } from 'react';
// import saveFcmToken from '../app/api/save-fcm-token';

export default function NotificationProvider() {
  useEffect(() => {
    const registerServiceWorker = async () => {
      try {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        console.log('Service Worker registered with scope:', registration.scope);
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    };

    // Check for service worker support
    if ('serviceWorker' in navigator) {
      registerServiceWorker();
    }
  }, []);

  return null;
}
