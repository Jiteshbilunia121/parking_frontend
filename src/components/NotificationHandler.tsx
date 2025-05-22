// NotificationHandler.tsx
// 'use client';

// import { useEffect } from 'react';
// import { getToken, onMessage } from 'firebase/messaging';
// import { messaging } from '../lib/firebaseClient';
// import toast from 'react-hot-toast';
// import { registerFcmToken } from '@/components/registerFCMtoken';

// // Adding the correct type for navigator
// declare global {
//   interface Navigator {
//     vibrate?: (pattern: number | number[]) => boolean;
//   }
// }

// const NotificationHandler = () => {
//   useEffect(() => {
//     console.log('[NotificationHandler] Mounted');
//     registerFcmToken();
//     const requestPermission = async () => {
//       try {
//         const permission = await Notification.requestPermission();
//         if (permission === 'granted') {
//           const token = await getToken(messaging);
//           console.log('Token:', token);
//           // Save this token to your backend
//         }
//       } catch (error) {
//         console.error('Error getting token:', error);
//       }
//     };

//     const listenForMessages = () => {
//       onMessage(messaging, (payload) => {
//         console.log('Message received:', payload);
//         toast.custom((t) => (
//           <div className="bg-white rounded-lg shadow-lg p-4 border border-blue-500">
//             <h3 className="font-semibold text-lg text-blue-600">{payload.notification?.title}</h3>
//             <p className="text-gray-700">{payload.notification?.body}</p>
//           </div>
//         ));
//         if (navigator.vibrate) {
//           navigator.vibrate([200, 100, 200]); // Simple vibration pattern
//         }
//         const audio = new Audio('/notification_sound.mp3');
//         audio.play();
//       });
//     };

//     requestPermission();
//     listenForMessages();
//   }, []);

//   return null;
// };

// export default NotificationHandler;
'use client';

import { useEffect } from 'react';
import { onMessage } from 'firebase/messaging';
import { getFirebaseMessaging } from '@/lib/firebaseClient';
import toast from 'react-hot-toast';
import { registerFcmToken } from '@/components/registerFCMtoken';

declare global {
  interface Navigator {
    vibrate?: (pattern: number | number[]) => boolean;
  }
}

const NotificationHandler = () => {
  useEffect(() => {
    console.log('[NotificationHandler] Mounted');

    const setupNotifications = async () => {
      try {
        // Initialize Firebase Messaging
        const messaging = await getFirebaseMessaging();
        if (!messaging) return;

        // Register FCM token
        await registerFcmToken();

        // Set up message listener
        const unsubscribe = onMessage(messaging, (payload) => {
          console.log('Message received:', payload);

          // Show toast notification
          toast.custom((t) => (
            <div className="bg-white rounded-lg shadow-lg p-4 border border-blue-500">
              <h3 className="font-semibold text-lg text-blue-600">
                {payload.notification?.title || payload.data?.title}
              </h3>
              <p className="text-gray-700">
                {payload.notification?.body || payload.data?.message}
              </p>
            </div>
          ));

          // Show browser notification
          if (Notification.permission === 'granted') {
            new Notification(
              payload.notification?.title || payload.data?.title || 'Notification',
              {
                body: payload.notification?.body || payload.data?.message || '',
                icon: '/icon.png',
              }
            );
          }

          // Handle vibration
          if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200]);
          }

          // Play notification sound
          const audio = new Audio('/notification_sound.mp3');
          audio.play().catch(err => {
            console.warn('Audio playback failed:', err);
          });
        });

        return unsubscribe; // Return cleanup function
      } catch (error) {
        console.error('Notification setup failed:', error);
      }
    };

    // Initialize notification setup
    const cleanupPromise = setupNotifications();

    // Cleanup function
    return () => {
      cleanupPromise.then(unsubscribe => unsubscribe && unsubscribe());
    };
  }, []);

  return null;
};

export default NotificationHandler;
