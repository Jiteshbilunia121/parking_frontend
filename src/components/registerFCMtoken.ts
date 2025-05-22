// utils/registerFcmToken.ts

import { getToken } from 'firebase/messaging';
import { messaging } from '@/lib/firebaseClient';
import { toast } from 'react-hot-toast';

export const registerFcmToken = async () => {
  try {
    const userId = localStorage.getItem('userId'); // or from your auth context/session
    if (!userId) {
      console.warn('User ID not found in localStorage');
      return;
    }

  const currentToken = await getToken(messaging, {
      vapidKey: "BFbqtfOGlbUMlOTojC_jsfrcqf6xSI1RCNeOTYX_Vib_UOKS7wJ-tNytJO5No6f0ZqKp0j3ZsluenrYd5CwM7y4",
    });

    if (!currentToken) {
      console.warn('FCM token not available');
      return;
    }
    console.log("FCM token : ", currentToken);

    const res = await fetch('/api/save-fcm-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, token : currentToken }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);
    toast.success('Notifications enabled!');
  } catch (err: any) {
    console.error('Error registering FCM token:', err.message);
    toast.error('Failed to register notifications');
  }
};
