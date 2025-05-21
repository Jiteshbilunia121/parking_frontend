// 'use client';
// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import Image from "next/image";
// import { useRouter } from 'next/navigation';
// import "./globals.css";
// import { FaCar } from 'react-icons/fa';
// import { motion } from 'framer-motion';




// export default function Home() { 
//   const router = useRouter();
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     setIsLoggedIn(!!localStorage.getItem('token'));
//   }, []);

//   useEffect(() => {
//       return () => sessionStorage.removeItem('autoRedirect');
//   }, []);
  
//   return (
//     // <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
//     <div className='min-h-screen bg-gradient-to-br from-primary via-secondary to-accent flex flex-col items-center justify-center font-sans'
//       style={{
//         backgroundImage: "url('/bg-home.jpg')", // Place your image in /public/parking-bg.jpg
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat',
//         opacity:10
//       }} >
//     <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1 }}
//         className="flex flex-col items-center"></motion.div>
//         <motion.div
//           animate={{ y: [0, -10, 0] }}
//           transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
//         >
//           <FaCar size={64} className="text-white mb-4" />
//         </motion.div>
//       <h1 className="text-4xl font-bold text-primary mb-4 animate-glow">Welcome to the Car Parking System!</h1>
//       <p className="text-lg text-dark mb-8">Find, reserve, and manage parking effortlessly.</p>
//       <div className="flex space-x-4">
//         {isLoggedIn ? (
//           <Link href="/dashboard">
//             <button className="bg-blue-600 text-white px-4 py-2 rounded">Go to Dashboard</button>
//           </Link>
//         ) : (
//           <>
//             <Link href="/auth/login">
//             <button className="bg-primary text-white px-6 py-2 rounded-xl shadow-soft hover:brightness-90 transition-all">Login</button>
//             </Link>
//             <Link href="/auth/register">
//             <button className="bg-secondary text-white px-6 py-2 rounded-xl shadow-soft hover:brightness-90 transition-all">Register</button>
//             </Link>
//           </>
//         )}
//       </div>
//     </div>

//   );
  // return (
  //   <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
  //     <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
  //       <Image
  //         className="dark:invert"
  //         src="/next.svg"
  //         alt="Next.js logo"
  //         width={180}
  //         height={38}
  //         priority
  //       />
  //       <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
  //         <li className="mb-2 tracking-[-.01em]">
  //           Get started by editing{" "}
  //           <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
  //             src/app/page.tsx
  //           </code>
  //           .
  //         </li>
  //         <li className="tracking-[-.01em]">
  //           Save and see your changes instantly.
  //         </li>
  //       </ol>

  //       <div className="flex gap-4 items-center flex-col sm:flex-row">
  //         <a
  //           className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
  //           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           <Image
  //             className="dark:invert"
  //             src="/vercel.svg"
  //             alt="Vercel logomark"
  //             width={20}
  //             height={20}
  //           />
  //           Deploy now
  //         </a>
  //         <a
  //           className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
  //           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           Read our docs
  //         </a>
  //       </div>
  //     </main>
  //     <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
  //       <a
  //         className="flex items-center gap-2 hover:underline hover:underline-offset-4"
  //         href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         <Image
  //           aria-hidden
  //           src="/file.svg"
  //           alt="File icon"
  //           width={16}
  //           height={16}
  //         />
  //         Learn
  //       </a>
  //       <a
  //         className="flex items-center gap-2 hover:underline hover:underline-offset-4"
  //         href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         <Image
  //           aria-hidden
  //           src="/window.svg"
  //           alt="Window icon"
  //           width={16}
  //           height={16}
  //         />
  //         Examples
  //       </a>
  //       <a
  //         className="flex items-center gap-2 hover:underline hover:underline-offset-4"
  //         href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         <Image
  //           aria-hidden
  //           src="/globe.svg"
  //           alt="Globe icon"
  //           width={16}
  //           height={16}
  //         />
  //         Go to nextjs.org →
  //       </a>
  //     </footer>
  //   </div>
  // );
// }
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { FaBiking, FaCar } from "react-icons/fa";
import "./globals.css";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center bg-gradient-to-r from-blue-900 via-gray-900 to-black text-white">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: "transparent",
          },
          fpsLimit: 60,
          particles: {
            color: { value: "#ffffff" },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
            },
            number: {
              value: 50,
            },
            opacity: {
              value: 0.3,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: 3,
            },
          },
        }}
      />

      {/* Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="backdrop-blur-md bg-white/10 p-12 rounded-3xl shadow-lg text-center"
        style={{ zIndex: 1 }}
      >
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <FaCar size={64} className="text-primary mb-4" />
          <FaBiking size={64} className="text-primary mb-4" />
        </motion.div>
        <h1 className="text-5xl font-extrabold mb-6 text-gradient">ParkEase</h1>
        <p className="text-lg mb-8 text-gray-300">
          Find, reserve, and manage parking with ease.
        </p>

        {isLoggedIn ? (
          <Link href="/dashboard">
            <button className="px-8 py-3 bg-primary rounded-full text-white text-lg font-semibold hover:bg-opacity-90 transition-all">
              Go to Dashboard
            </button>
          </Link>
        ) : (
          <div className="flex space-x-4">
            <Link href="/auth/login">
              <button className="px-8 py-3 bg-green-500 rounded-full text-white text-lg font-semibold hover:bg-opacity-90 transition-all">
                Login
              </button>
            </Link>
            <Link href="/auth/register">
              <button className="px-8 py-3 bg-blue-600 rounded-full text-white text-lg font-semibold hover:bg-opacity-90 transition-all">
                Register
              </button>
            </Link>
          </div>
        )}
      </motion.div>

      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-blue-700 to-purple-900 opacity-20 z-0"></div>
    </div>
  );
}
