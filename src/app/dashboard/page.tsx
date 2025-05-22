// 'use client';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import "../globals.css";
// import { loadStripe } from '@stripe/stripe-js';

// export default function DashboardPage() {
//   const router = useRouter();
//   const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
//   const [isCheckedIn, setIsCheckedIn] = useState(false); // New state
//   const [checkInDetails, setCheckInDetails] = useState<{
//     slotNumber: string;
//     vehicleNumber: string;
//     pricePerHour: number;
//     checkInTime: number;
//   } | null>(null);
//   const [elapsedTime, setElapsedTime] = useState('');

//   // Check for existing check-in on initial load
//   useEffect(() => {
//     const id = localStorage.getItem('userId');
//     const name = `Parkingspace user ${id}`;
//     const email = localStorage.getItem('userEmail');
//     const slotNumber = localStorage.getItem('slotNumber'); // Check for active check-in
//     const storedCheckIn = localStorage.getItem('checkInDetails');


//     if (id && name && email) {
//       setUser({ id, name, email });
//     }
//     if (slotNumber) {
//       setIsCheckedIn(true);
//     }
//     if (storedCheckIn) {
//       const details = JSON.parse(storedCheckIn);
//       setCheckInDetails(details);
//       startTimer(details.checkInTime);
//     }
//   }, []);
//   const startTimer = (checkInTimestamp: number) => {
//     const updateElapsedTime = () => {
//       const now = Date.now();
//       const diff = now - checkInTimestamp;
//       const hours = Math.floor(diff / (1000 * 60 * 60));
//       const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//       setElapsedTime(`${hours}h ${minutes}m`);
//     };

//     updateElapsedTime(); // Initial update
//     const timer = setInterval(updateElapsedTime, 60000); // Update every minute
//     return () => clearInterval(timer);
//   };
//   const calculateCost = () => {
//     if (!checkInDetails) {
//       console.log("taking zero");
//       return 0;

//     }
//     const checkInTime = Number(checkInDetails.checkInTime);
//     const pricePerHour = Number(checkInDetails.pricePerHour);

//     if (isNaN(checkInTime) || isNaN(pricePerHour)) return 0;

//     const hoursElapsed = (Date.now() - checkInTime) / (1000 * 60 * 60);
//     const cost = hoursElapsed * pricePerHour;

//     // Return at least 1 if the amount is too low
//     return Math.max(1, cost).toFixed(2);
//   };

//   const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);

//   const handleCheckout = async () => {
//     try {
//       const slotNumber = localStorage.getItem('slotNumber');
//       if (!slotNumber) {
//         alert('No active check-in found.');
//         return;
//       }

//       const response = await fetch(`${process.env.NEXT_PUBLIC_PARKING_API_URL}/api/parking/checkout`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ slotNumber, message: `Freed the slot ${slotNumber}` }),
//       });

//       const stripe = await stripePromise;
//       const amount = 4 * 100; // Convert to paise/cents

//       const paymentResponse = await fetch(`${process.env.NEXT_PUBLIC_USERS_API_URL}/api/users/create-checkout-session`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({

//           userId: user?.id,
//           vehicleNumber: checkInDetails?.vehicleNumber,
//           amount
//           // paymentMethodId : paymentMethod?.id

//         }),
//       });

//       console.log("PaymentResponse", paymentResponse);


//       if (response.ok) {
//         console.log("checkout out properly");
//         localStorage.removeItem('slotNumber');
//         localStorage.removeItem('checkInDetails');
//         setIsCheckedIn(false); // Update state to hide button
//         setCheckInDetails(null);
//         alert('Checked out successfully!');
//       } else {
//         alert('Checkout failed. Please try again.');
//       }

//       const data = await paymentResponse.json();

//       if (data.sessionId) {
//         const result = await stripe?.redirectToCheckout({ sessionId: data.sessionId });
//         if (result?.error) {
//           alert(result.error.message);
//         }
//       }
//       if (!paymentResponse.ok) {
//         alert('Failed to initiate payment.');
//         return;
//       }

//     } catch (error) {
//       alert('Checkout failed due to network error.');
//     }
//   };

//   return (
//     <>
//       <div className="flex flex-col items-center justify-center min-h-screen">
//         <button
//           className="bg-primary text-white px-8 py-3 rounded-xl shadow-soft text-xl font-bold hover:scale-105 transition"
//           onClick={() => router.push('/find-parking')}
//         >
//           Find Parking
//         </button>
//       </div>

//       <div className="min-h-screen bg-gray-100 p-6">
//         <div className="max-w-4xl mx-auto">
//           {user && (
//             <div className="bg-white rounded-xl shadow p-6 mt-4 w-full max-w-md flex flex-col items-center">
//               <h2 className="font-bold text-lg mb-2 text-primary">User Info</h2>
//               <div className="mb-1"><span className="font-semibold">Name:</span> {user.name}</div>
//               <div className="mb-1"><span className="font-semibold">Email:</span> {user.email}</div>
//               <div className="mb-1"><span className="font-semibold">User ID:</span> {user.id}</div>


//               {checkInDetails && (
//                 <div className="mt-4 w-full border-t pt-4">
//                   <h3 className="font-semibold mb-2 text-secondary">Current Check-in</h3>
//                   <div className="space-y-1">
//                     <p><span className="font-medium">Vehicle:</span> {checkInDetails.vehicleNumber}</p>
//                     <p><span className="font-medium">Slot:</span> {checkInDetails.slotNumber}</p>
//                     <p><span className="font-medium">Duration:</span> {elapsedTime}</p>
//                     {/* <p><span className="font-medium">Current Cost:</span> ₹{calculateCost()}</p> */}
//                     <p><span className="font-medium">Current Cost:</span>
//                       {isNaN(Number(calculateCost())) ? 'Calculating...' : `₹${calculateCost()}`}
//                     </p>
//                   </div>
//                 </div>
//               )}

//               {/* Only show Checkout button if checked in */}
//               {isCheckedIn && (
//                 <button
//                   className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
//                   onClick={handleCheckout}
//                 >
//                   Checkout
//                 </button>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }
'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import "../globals.css";
import { loadStripe } from '@stripe/stripe-js';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInDetails, setCheckInDetails] = useState<{
    slotNumber: string;
    vehicleNumber: string;
    pricePerHour: number;
    checkInTime: number;
  } | null>(null);
  const [elapsedTime, setElapsedTime] = useState('');

  const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`);

  useEffect(() => {
    const id = localStorage.getItem('userId');
    const name = `Parkingspace user ${id}`;
    const email = localStorage.getItem('userEmail');
    const slotNumber = localStorage.getItem('slotNumber');
    const storedCheckIn = localStorage.getItem('checkInDetails');

    if (id && name && email) {
      setUser({ id, name, email });
    }
    if (slotNumber) {
      setIsCheckedIn(true);
    }
    if (storedCheckIn) {
      const details = JSON.parse(storedCheckIn);
      setCheckInDetails(details);
      startTimer(details.checkInTime);
    }
  }, []);

  const startTimer = (checkInTimestamp: number) => {
    const updateElapsedTime = () => {
      const now = Date.now();
      const diff = now - checkInTimestamp;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setElapsedTime(`${hours}h ${minutes}m`);
    };

    updateElapsedTime();
    const timer = setInterval(updateElapsedTime, 60000);
    return () => clearInterval(timer);
  };

  const calculateCost = () => {
    if (!checkInDetails) return 0;
    const checkInTime = Number(checkInDetails.checkInTime);
    const pricePerHour = Number(checkInDetails.pricePerHour);
    if (isNaN(checkInTime) || isNaN(pricePerHour)) return 0;
    const hoursElapsed = (Date.now() - checkInTime) / (1000 * 60 * 60);
    return Math.max(1, hoursElapsed * pricePerHour).toFixed(2);
  };

  const handleCheckout = async () => {
    try {
      const slotNumber = localStorage.getItem('slotNumber');
      if (!slotNumber) {
        alert('No active check-in found.');
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_PARKING_API_URL}/api/parking/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slotNumber, message: `Freed the slot ${slotNumber}` }),
      });

      const stripe = await stripePromise;
      const amount = 4 * 100; // Convert to paise/cents

      const paymentResponse = await fetch(`${process.env.NEXT_PUBLIC_USERS_API_URL}/api/users/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          vehicleNumber: checkInDetails?.vehicleNumber,
          amount,
        }),
      });

      if (response.ok) {
        localStorage.removeItem('slotNumber');
        localStorage.removeItem('checkInDetails');
        setIsCheckedIn(false);
        setCheckInDetails(null);
        alert('Checked out successfully!');
      } else {
        alert('Checkout failed. Please try again.');
      }

      const data = await paymentResponse.json();

      if (data.sessionId) {
        const result = await stripe?.redirectToCheckout({ sessionId: data.sessionId });
        if (result?.error) {
          alert(result.error.message);
        }
      }
      if (!paymentResponse.ok) {
        alert('Failed to initiate payment.');
        return;
      }

    } catch (error) {
      alert('Checkout failed due to network error.');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10">
      {/* Welcome Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-md mb-10 w-full max-w-3xl flex flex-col items-center text-gray-900 p-8">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Welcome, {user?.name.split(" ")[0] || "Guest"}! 🚗
        </h2>
        <p className="text-lg text-center text-gray-600">Ready to park your vehicle? Let's make it quick and easy.</p>
      </div>

      {/* Find Parking Button */}
      <button
        className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg text-lg mb-8 
        hover:bg-blue-700 transition-all transform hover:scale-105"
        onClick={() => router.push('/find-parking')}
      >
        🚗 Find Parking
      </button>

      {/* User Info Card */}
      {user && (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg w-full max-w-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">User Info</h2>
          <p className="mb-2"><span className="font-semibold">Name:</span> {user.name}</p>
          <p className="mb-2"><span className="font-semibold">Email:</span> {user.email}</p>
          <p className="mb-4"><span className="font-semibold">User ID:</span> {user.id}</p>

          {/* Check-In Info */}
          {checkInDetails && (
            <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg shadow-inner mb-4">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">Current Check-in</h3>
              <p><span className="font-medium">Vehicle:</span> {checkInDetails.vehicleNumber}</p>
              <p><span className="font-medium">Slot:</span> {checkInDetails.slotNumber}</p>
              <p><span className="font-medium">Duration:</span> {elapsedTime}</p>
              <p><span className="font-medium">Current Cost:</span> ₹{calculateCost()}</p>
            </div>
          )}

          {/* Checkout Button */}
          {isCheckedIn && (
            <button
              className="mt-4 bg-red-600 text-white px-6 py-2 rounded-xl shadow-lg text-lg hover:bg-red-700 transition"
              onClick={handleCheckout}
            >
              Checkout
            </button>
          )}
        </div>
      )}
    </div>
  );
}
