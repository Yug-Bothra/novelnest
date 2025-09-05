// src/components/Login.jsx
import React, { useState } from "react";
import { auth, googleProvider } from "../firebase/firebase.js";
import {
  signInWithPopup,
  signOut,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUser(result.user);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAnonymousLogin = async () => {
    try {
      const result = await signInAnonymously(auth);
      setUser(result.user);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEmailLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEmailSignUp = async () => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setUser(result.user);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setEmail("");
      setPassword("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
      {/* Background gradient and glow effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/20 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(150,0,0,0.15)_0%,transparent_70%)]"></div>
      
      {/* Animated blood drip on the right side */}
      <div className="absolute top-0 right-32 w-0.5 h-0 bg-gradient-to-b from-red-600 to-red-900 blood-drip"></div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="bg-black/95 border border-red-900/50 rounded-lg p-8 shadow-2xl backdrop-blur-sm login-card">
          {!user ? (
            <>
              {/* Title with dripping effect */}
              <div className="text-center mb-8">
                <h2 className="text-5xl font-bold text-red-600 mb-4 relative dripping-title tracking-wider">
                  Login
                </h2>
              </div>

              {/* Email Field */}
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-black/80 border border-red-900/30 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all duration-300"
                />
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-black/80 border border-red-900/30 rounded-md text-gray-200 placeholder-gray-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all duration-300"
                />
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleEmailLogin}
                  className="w-full bg-red-800 hover:bg-red-900 text-white font-semibold py-3 rounded-md transition-all duration-300 hover:shadow-lg hover:shadow-red-900/50 relative overflow-hidden login-btn"
                >
                  LOGIN WITH EMAIL
                </button>
                
                <button
                  onClick={handleEmailSignUp}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-md transition-all duration-300"
                >
                  SIGN UP
                </button>
                
                <button
                  onClick={handleGoogleLogin}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-md transition-all duration-300"
                >
                  LOGIN WITH GOOGLE
                </button>
                
                <button
                  onClick={handleAnonymousLogin}
                  className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 rounded-md transition-all duration-300"
                >
                  CONTINUE AS GUEST
                </button>
              </div>

              {error && (
                <p className="mt-6 text-red-400 text-center text-sm font-medium">
                  {error}
                </p>
              )}
            </>
          ) : (
            <>
              {/* Logged in state */}
              <div className="text-center">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center bg-red-700 border-2 border-red-600 text-white text-3xl font-bold">
                  {user.displayName
                    ? user.displayName.charAt(0).toUpperCase()
                    : "G"}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {user.displayName || "Guest User"}
                </h3>
                <p className="text-sm text-gray-400 mb-6">
                  {user.email || "Anonymous"}
                </p>
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-700 hover:bg-red-800 text-white px-5 py-3 rounded-lg font-medium transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes eerieGlow {
          0% { opacity: 0.4; }
          50% { opacity: 0.7; }
          100% { opacity: 0.9; }
        }

        @keyframes bloodDrip {
          0% { 
            height: 0;
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          100% { 
            height: 30vh;
            opacity: 0.6;
          }
        }

        @keyframes heartbeatGlow {
          0%, 100% {
            box-shadow: 0 0 40px rgba(120, 0, 0, 0.3);
          }
          50% {
            box-shadow: 0 0 60px rgba(140, 0, 0, 0.5);
          }
        }

        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 120%; }
        }

        .login-card {
          animation: heartbeatGlow 5s infinite alternate;
          position: relative;
        }

        .login-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(180, 0, 0, 0.8), transparent);
        }

        .blood-drip {
          animation: bloodDrip 10s ease-in infinite;
        }

        .dripping-title {
          text-shadow: 0 0 20px rgba(220, 0, 0, 0.8);
          filter: drop-shadow(0 0 10px rgba(255, 0, 0, 0.5));
        }

        .login-btn {
          position: relative;
          overflow: hidden;
        }

        .login-btn::after {
          content: '';
          position: absolute;
          top: -50%;
          left: -100%;
          width: 70%;
          height: 200%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: rotate(25deg);
          transition: all 0.8s ease;
        }

        .login-btn:hover::after {
          animation: shimmer 0.8s ease;
        }

        /* Background ambient glow */
        .min-h-screen::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(
            circle at 50% 30%, 
            rgba(150, 0, 0, 0.2) 0%, 
            rgba(0, 0, 0, 0) 80%
          );
          pointer-events: none;
          animation: eerieGlow 6s infinite alternate;
        }
      `}</style>
    </div>
  );
};

export default Login;