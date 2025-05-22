"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import Confetti from 'react-confetti';
import { Player } from '@lottiefiles/react-lottie-player';
import { useRouter } from "next/navigation";

export default function PaymentSuccess() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showConfetti, setShowConfetti] = useState(false);
    const [message, setMessage] = useState("Processing payment...");
    const [shareUrl, setShareUrl] = useState('');


    useEffect(() => {
        const fetchSession = async () => {
            const sessionId = searchParams.get("session_id");
            console.log("SessionId", sessionId);
            if (!sessionId) return;

            try {
                const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

                // Retrieve session details
                const session = await fetch(`${process.env.NEXT_PUBLIC_USERS_API_URL}/api/users/check-session?sessionId=${sessionId}`);
                const sessionData = await session.json();
                if (session.ok) {

                    console.log("Session Data:", sessionData);
                    setMessage("Payment successful! Thank you for your purchase.");

                    // Clear local storage on success

                } else {
                    setMessage("Payment failed or session not found. Please try again.");
                }
                if (sessionData.success) {
                    setTimeout(() => router.push('/dashboard'), 3000);
                }

            } catch (error) {
                console.error("Error fetching session:", error);
                setMessage("Payment verification failed. Please try again.");
            }
        };

        fetchSession();
    }, [searchParams]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setShareUrl(encodeURIComponent(window.location.origin));
        }

        // Simulate a loading delay for the animation
        setTimeout(() => {
            setMessage('Payment successful! Thank you for your purchase.');
            setShowConfetti(true);  // Start confetti
        }, 1000);

        // Stop confetti after a few seconds
        setTimeout(() => {
            setShowConfetti(false);
        }, 8000);
    }, []);


    const shareText = encodeURIComponent("I just paid for my parking successfully using ParkingSpace! 🚗🎉 Check it out:");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white">
            {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}

            {message === 'Payment successful! Thank you for your purchase.' ? (
                <>
                    <Player
                        src="https://assets9.lottiefiles.com/packages/lf20_touohxv0.json"
                        background="transparent"
                        speed={1}
                        style={{ width: 200, height: 200 }}
                        loop={false}
                        autoplay
                    />
                    <h1 className="text-3xl font-bold text-green-600 mt-4">{message}</h1>

                    {/* Share Buttons */}
                    <div className="mt-6 flex gap-4">
                        <a
                            href={`https://api.whatsapp.com/send?text=${shareText} ${shareUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition"
                        >
                            Share on WhatsApp
                        </a>
                        <a
                            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition"
                        >
                            Share on Twitter
                        </a>
                        <a
                            href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=ParkingSpace&summary=${shareText}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-700 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-800 transition"
                        >
                            Share on LinkedIn
                        </a>
                    </div>

                    <div className="flex space-x-4 mt-8">
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-600 transition"
                        >
                            Go Back to Dashboard
                        </button>
                        <button
                            onClick={() => router.push('/find-parking')}
                            className="bg-yellow-500 text-white px-6 py-3 rounded-lg shadow hover:bg-yellow-600 transition"
                        >
                            Book Another Slot
                        </button>
                    </div>
                </>
            ) : (
                <h1 className="text-3xl font-bold text-gray-600">Processing payment...</h1>
            )}
        </div>
    );
}