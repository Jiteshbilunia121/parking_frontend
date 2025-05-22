// components/SuccessAnimation.tsx
'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Lottie with SSR disabled
const Lottie = dynamic(
  () => import('react-lottie-player'),
  { ssr: false }
);

export default function SuccessAnimation({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => onComplete(), 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 flex flex-col items-center shadow-xl">
        <Lottie
          loop={false}
          animationData={require('@/public/animations/success-tick.json')}
          play
          style={{ width: 150, height: 150 }}
        />
        <h2 className="text-2xl font-bold text-green-600 mt-4">Check-in Successful!</h2>
      </div>
    </div>
  );
}
