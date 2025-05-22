// 'use client';

// import Link from 'next/link';
// import { useEffect, useState } from 'react';

// export default function Navbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const checkLogin = () => setIsLoggedIn(!!localStorage.getItem('token'));
//     checkLogin();
//     window.addEventListener('storage', checkLogin);
//     return () => window.removeEventListener('storage', checkLogin);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userId');
//     setIsLoggedIn(false);
//     sessionStorage.removeItem('autoRedirect');
//     // Trigger storage event to update Navbar
//     window.dispatchEvent(new Event('storage')); // 👈 Add this line
//     window.location.href = '/';
//   };

//   return (
//     <nav className="bg-white shadow p-4 flex justify-between">
//       <div className="font-bold text-xl">Car Parking System</div>
//       <div className="space-x-4">
//         <Link href="/">Home</Link>
//         <Link href="/dashboard">Dashboard</Link>
//         {!isLoggedIn ? (
//           <>
//             <Link href="/auth/login">Login</Link>
//             <Link href="/auth/register">Register</Link>
//           </>
//         ) : (
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 text-white px-3 py-1 rounded"
//           >
//             Logout
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// // }
// 'use client';

// import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { FaCar } from 'react-icons/fa';

// export default function Navbar() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const checkLogin = () => setIsLoggedIn(!!localStorage.getItem('token'));
//     checkLogin();
//     window.addEventListener('storage', checkLogin);
//     return () => window.removeEventListener('storage', checkLogin);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('userId');
//     setIsLoggedIn(false);
//     sessionStorage.removeItem('autoRedirect');
//     window.dispatchEvent(new Event('storage'));
//     window.location.href = '/';
//   };

//   return (
//     <motion.nav
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.8, ease: 'easeOut' }}
//       className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg py-4 px-8 flex items-center justify-between sticky top-0 z-50"
//     >
//       <Link href="/" className="flex items-center space-x-2 text-2xl font-bold">
//         <FaCar className="text-white" />
//         <span>ParkingSpace</span>
//       </Link>
//       <div className="flex space-x-6 text-lg">
//         <Link href="/" className="hover:text-gray-200 transition">Home</Link>
//         {isLoggedIn && (
//           <Link href="/dashboard" className="hover:text-gray-200 transition">Dashboard</Link>
//         )}
//         {!isLoggedIn ? (
//           <>
//             <Link href="/auth/login" className="hover:text-gray-200 transition">Login</Link>
//             <Link href="/auth/register" className="hover:text-gray-200 transition">Register</Link>
//           </>
//         ) : (
//           <button
//             onClick={handleLogout}
//             className="bg-red-500 px-4 py-0 rounded-lg shadow hover:bg-red-600 transition"
//           >
//             Logout
//           </button>
//         )}
//       </div>
//     </motion.nav>
//   );
// }

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaCar, FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkLogin = () => setIsLoggedIn(!!localStorage.getItem('token'));
    checkLogin();
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    sessionStorage.removeItem('autoRedirect');
    window.dispatchEvent(new Event('storage'));
    window.location.href = '/';
    setIsMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="bg-gradient-to-r from-blue-600 to-purple-700 text-white shadow-lg py-4 px-8 flex items-center justify-between sticky top-0 z-50"
    >
      {/* Logo */}
      <Link href="/" className="flex items-center space-x-2 text-2xl font-bold">
        <FaCar className="text-white" />
        <span>ParkingSpace</span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 text-lg">
        <NavLink href="/">Home</NavLink>
        {isLoggedIn && <NavLink href="/dashboard">Dashboard</NavLink>}
        {!isLoggedIn ? (
          <>
            <NavLink href="/auth/login">Login</NavLink>
            <NavLink href="/auth/register">Register</NavLink>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-0 rounded-lg shadow hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile Hamburger Icon */}
      <button
        className="md:hidden text-2xl p-2 hover:text-gray-200 transition"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="absolute right-0 top-0 h-full w-3/4 bg-gradient-to-b from-blue-600 to-purple-700 shadow-lg p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col space-y-6 text-xl">
              <NavLinkMobile href="/" onClick={() => setIsMenuOpen(false)}>
                Home
              </NavLinkMobile>
              {isLoggedIn && (
                <NavLinkMobile href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </NavLinkMobile>
              )}
              {!isLoggedIn ? (
                <>
                  <NavLinkMobile href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </NavLinkMobile>
                  <NavLinkMobile href="/auth/register" onClick={() => setIsMenuOpen(false)}>
                    Register
                  </NavLinkMobile>
                </>
              ) : (
                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-4 py-2 rounded-lg shadow hover:bg-red-600 transition w-full text-left"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

// Reusable component for desktop links
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="hover:text-gray-200 transition">
    {children}
  </Link>
);

// Reusable component for mobile links
const NavLinkMobile = ({ href, children, onClick }: { 
  href: string; 
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="hover:text-gray-200 transition py-2 border-b border-white/20"
  >
    {children}
  </Link>
);
