// 'use client';

// import { useEffect, useState } from 'react';
// import { useSearchParams, useRouter } from 'next/navigation';
// import Lottie from 'react-lottie-player';
// import successAnimation from '@/app/animations/success-tick.json';
// import { FaCar, FaMotorcycle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// export default function BookSlotPage() {
//   const searchParams = useSearchParams();
//   const router = useRouter();
//   const city = searchParams.get('city');
//   const spot = searchParams.get('spot');
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [slots, setSlots] = useState<any[]>([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [checkingIn, setCheckingIn] = useState(false);

//   const [userId, setUserId] = useState<string | null>(null);
//   // const [slotNumber, setSlotNumber] = useState<String | null>(null);
//   const [vehicleNumber, setVehicleNumber] = useState('');


//   function SuccessOverlay({ onComplete }: { onComplete: () => void }) {
//   useEffect(() => {
//     const timer = setTimeout(onComplete, 4000);
//     return () => clearTimeout(timer);
//   }, [onComplete]);

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-2xl p-8 flex flex-col items-center shadow-xl animate-pop-in">
//         <Lottie
//           loop={false}
//           animationData={successAnimation}
//           play
//           style={{ width: 150, height: 150 }}
//         />
//         <h2 className="text-2xl font-bold text-green-600 mt-4">Check-in Successful!</h2>
//         <p className="text-gray-600 mt-2">Redirecting to dashboard...</p>
//       </div>
//     </div>
//   );
// }

//   useEffect(() => {
//     setUserId(localStorage.getItem('userId'));
//   }, []);

//   useEffect(() => {
//     // if (city && spot) {
//     fetch(`${process.env.NEXT_PUBLIC_PARKING_API_URL}/api/parking/availability`)
//       .then(res => res.json())
//       .then(data => {
//         setSlots(data || []);
//         setLoading(false);
//       });

//     // }
//   }, [city, spot]);

//   const handleCheckIn = async () => {
//     if(!userId){
//       alert('please Login to continue');
//       router.push('/auth/login');
//       return;
//     }
//     if (!selectedSlot || !vehicleNumber ) {
//       alert('Please select a slot and enter your vehicle number.');
//       return;
//     }

//     setCheckingIn(true);
//     const res = await fetch(`${process.env.NEXT_PUBLIC_PARKING_API_URL}/api/parking/checkin`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         slotNumber: slots.find(s => s.id === selectedSlot)?.slotNumber,
//         vehicleNumber,
//         userId: userId
//       }),
//     });
//     setCheckingIn(false);
//     if (res.ok) {

//       localStorage.setItem('slotNumber', slots.find(s => s.id === selectedSlot)?.slotNumber)
//       const checkInDetails = {
//       slotNumber: slots.find(s => s.id === selectedSlot)?.slotNumber,
//       vehicleNumber,
//       pricePerHour: slots.find(s => s.id === selectedSlot)?.price,
//       checkInTime: Date.now()
//     };

//     localStorage.setItem('checkInDetails', JSON.stringify(checkInDetails));
//       setShowSuccess(true); // sShow animation
//       setTimeout(() => {
//         router.push('/dashboard');
//       }, 4000);
//       // alert('Checked in successfully!');
//       // router.push('/dashboard');
//     } else {
//       alert('Check-in failed. Please try again.');
//     }
//   };

//   return (


//     <div className="min-h-screen flex flex-col items-center py-10 bg-gradient-to-br from-background to-primary/10">
//       <h1 className="text-3xl font-bold mb-6 text-primary">
//         Book a Slot at <span className="text-accent">{spot}</span>, <span className="text-secondary">{city}</span>
//       </h1>
//       {loading ? (
//         <p className="text-lg text-gray-500">Loading available slots...</p>
//       ) : slots.length === 0 ? (
//         <p className="text-lg text-red-500">No slots available.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl mb-8">
//           {slots.map(slot => (
//             <div
//               key={slot.id}
//               className={`relative bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border-2 transition
//                 ${selectedSlot === slot.id ? 'border-primary ring-2 ring-primary/40' : 'border-transparent'}
//                 ${slot.status !== 'VACANT' ? 'opacity-60 pointer-events-none' : 'hover:border-primary/60'}
//               `}
//               onClick={() => slot.status === 'VACANT' && setSelectedSlot(slot.id)}
//               style={{ cursor: slot.status === 'VACANT' ? 'pointer' : 'not-allowed' }}
//             >
//               <div className="mb-4">
//                 {slot.type === 'Bike' ? (
//                   <FaMotorcycle className="text-3xl text-secondary" />
//                 ) : (
//                   <FaCar className="text-3xl text-primary" />
//                 )}
//               </div>
//               <div className="font-bold text-xl mb-2">{slot.slotNumber}</div>
//               <div className="mb-2 flex items-center space-x-2">
//                 {slot.status === 'VACANT' ? (
//                   <>
//                     <FaCheckCircle className="text-green-500" />
//                     <span className="text-green-600 font-semibold">Available</span>
//                   </>
//                 ) : (
//                   <>
//                     <FaTimesCircle className="text-red-400" />
//                     <span className="text-red-500 font-semibold">Occupied</span>
//                   </>
//                 )}
//               </div>
//               {/* Optionally show vehicle type, price, etc. */}
//               {slot.price && (
//                 <div className="text-gray-600 mb-2">₹{slot.price} /hr</div>
//               )}
//               <input
//                 type="radio"
//                 name="slot"
//                 className="absolute top-4 right-4 accent-primary"
//                 checked={selectedSlot === slot.id}
//                 onChange={() => setSelectedSlot(slot.id)}
//                 disabled={slot.status !== 'VACANT'}
//               />
//             </div>
//           ))}
//         </div>
//       )}
//       {selectedSlot && (
//         <div className="mb-4">
//           <label className="block font-semibold mb-1">Vehicle Number</label>
//           <input
//             type="text"
//             className="w-full px-3 py-2 border rounded focus:outline-none focus:border-primary"
//             value={vehicleNumber}
//             onChange={e => setVehicleNumber(e.target.value)}
//             placeholder="Enter your vehicle number"
//           />
//         </div>
//       )}

//       <button
//         className="bg-primary text-white px-8 py-3 rounded-xl shadow-soft text-lg font-bold transition hover:bg-primary/90 disabled:opacity-50"
//         disabled={!selectedSlot || checkingIn}
//         onClick={handleCheckIn}
//       >
//         {checkingIn ? 'Checking In...' : 'Check In'}
//       </button>
//       {showSuccess && <SuccessOverlay onComplete={() => router.push('/dashboard')} />}
//     </div>
//   );
// }
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Lottie from 'react-lottie-player';
import successAnimation from '@/app/animations/success-tick.json';
import { FaCar, FaMotorcycle, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// Separate client component for the booking content
function BookSlotContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const city = searchParams.get('city');
  const spot = searchParams.get('spot');
  const [showSuccess, setShowSuccess] = useState(false);
  const [slots, setSlots] = useState<any[]>([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkingIn, setCheckingIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [vehicleNumber, setVehicleNumber] = useState('');

  useEffect(() => {
    setUserId(localStorage.getItem('userId'));
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_PARKING_API_URL}/api/parking/availability`)
      .then(res => res.json())
      .then(data => {
        setSlots(data || []);
        setLoading(false);
      });
  }, [city, spot]);

  const handleCheckIn = async () => {
    if (!userId) {
      alert('Please login to continue');
      router.push('/auth/login');
      return;
    }

    if (!selectedSlot || !vehicleNumber) {
      alert('Please select a slot and enter your vehicle number.');
      return;
    }

    setCheckingIn(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_PARKING_API_URL}/api/parking/checkin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slotNumber: slots.find(s => s.id === selectedSlot)?.slotNumber,
          vehicleNumber,
          userId: userId
        }),
      });

      if (res.ok) {
        localStorage.setItem('slotNumber', slots.find(s => s.id === selectedSlot)?.slotNumber);
        const checkInDetails = {
          slotNumber: slots.find(s => s.id === selectedSlot)?.slotNumber,
          vehicleNumber,
          pricePerHour: slots.find(s => s.id === selectedSlot)?.price,
          checkInTime: Date.now()
        };
        localStorage.setItem('checkInDetails', JSON.stringify(checkInDetails));
        setShowSuccess(true);
        setTimeout(() => {
          router.push('/dashboard');
        }, 4000);
      } else {
        alert('Check-in failed. Please try again.');
      }
    } finally {
      setCheckingIn(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 bg-gradient-to-br from-background to-primary/10">
      <h1 className="text-3xl font-bold mb-6 text-primary">
        Book a Slot at <span className="text-accent">{spot}</span>, <span className="text-secondary">{city}</span>
      </h1>
      {loading ? (
        <p className="text-lg text-gray-500">Loading available slots...</p>
      ) : slots.length === 0 ? (
        <p className="text-lg text-red-500">No slots available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl mb-8">
          {slots.map(slot => (
            <div
              key={slot.id}
              className={`relative bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border-2 transition
                ${selectedSlot === slot.id ? 'border-primary ring-2 ring-primary/40' : 'border-transparent'}
                ${slot.status !== 'VACANT' ? 'opacity-60 pointer-events-none' : 'hover:border-primary/60'}
              `}
              onClick={() => slot.status === 'VACANT' && setSelectedSlot(slot.id)}
              style={{ cursor: slot.status === 'VACANT' ? 'pointer' : 'not-allowed' }}
            >
              <div className="mb-4">
                {slot.type === 'Bike' ? (
                  <FaMotorcycle className="text-3xl text-secondary" />
                ) : (
                  <FaCar className="text-3xl text-primary" />
                )}
              </div>
              <div className="font-bold text-xl mb-2">{slot.slotNumber}</div>
              <div className="mb-2 flex items-center space-x-2">
                {slot.status === 'VACANT' ? (
                  <>
                    <FaCheckCircle className="text-green-500" />
                    <span className="text-green-600 font-semibold">Available</span>
                  </>
                ) : (
                  <>
                    <FaTimesCircle className="text-red-400" />
                    <span className="text-red-500 font-semibold">Occupied</span>
                  </>
                )}
              </div>
              {/* Optionally show vehicle type, price, etc. */}
              {slot.price && (
                <div className="text-gray-600 mb-2">₹{slot.price} /hr</div>
              )}
              <input
                type="radio"
                name="slot"
                className="absolute top-4 right-4 accent-primary"
                checked={selectedSlot === slot.id}
                onChange={() => setSelectedSlot(slot.id)}
                disabled={slot.status !== 'VACANT'}
              />
            </div>
          ))}
        </div>
      )}
      {selectedSlot && (
        <div className="mb-4">
          <label className="block font-semibold mb-1">Vehicle Number</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:border-primary"
            value={vehicleNumber}
            onChange={e => setVehicleNumber(e.target.value)}
            placeholder="Enter your vehicle number"
          />
        </div>
      )}
      <button
        className="bg-primary text-white px-8 py-3 rounded-xl shadow-soft text-lg font-bold transition hover:bg-primary/90 disabled:opacity-50"
        disabled={!selectedSlot || checkingIn}
        onClick={handleCheckIn}
      >
        {checkingIn ? 'Checking In...' : 'Check In'}
      </button>
      {showSuccess && <SuccessOverlay onComplete={() => router.push('/dashboard')} />}
    </div>
  );
}

// SuccessOverlay component (move outside or to separate file)
function SuccessOverlay({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 4000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 flex flex-col items-center shadow-xl animate-pop-in">
        <Lottie
          loop={false}
          animationData={successAnimation}
          play
          style={{ width: 150, height: 150 }}
        />
        <h2 className="text-2xl font-bold text-green-600 mt-4">Check-in Successful!</h2>
        <p className="text-gray-600 mt-2">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function BookSlotPage() {
  return (
    <Suspense fallback={<div className="text-center p-8">Loading booking details...</div>}>
      <BookSlotContent />
    </Suspense>
  );
}
