// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for login/logout changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setMenuOpen(false);
    navigate("/"); // redirect after logout
  };

  return (
    <section className="bg-gradient-to-r from-black via-gray-900 to-black border-b border-red-500/30 shadow-[0_0_30px_rgba(220,38,38,0.3)] backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
       {/* Logo */}
{/* Logo */}
<div className="group cursor-pointer">
  <h3 className="text-2xl font-bold relative inline-block hover:scale-105 transition-transform duration-300">
    <span
      className="relative z-10 text-black"
      style={{
        textShadow: "0 0 5px red, 0 0 10px red, 0 0 20px red",
      }}
    >
      NovelNest
    </span>
  </h3>
</div>





        {/* Navigation Links */}
        <div className="flex items-center space-x-8">
          {/* Nav Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="relative text-red-400 text-lg font-medium hover:text-red-300 transition-all duration-300 group"
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 h-full w-full scale-0 group-hover:scale-100 bg-gradient-to-r from-red-600/20 to-pink-600/20 rounded-lg blur transition-transform duration-300"></div>
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-300"></div>
            </Link>

            <Link
              to="/ai-generate"
              className="relative text-red-400 text-lg font-medium hover:text-red-300 transition-all duration-300 group"
            >
              <span className="relative z-10">AI Generate</span>
              <div className="absolute inset-0 h-full w-full scale-0 group-hover:scale-100 bg-gradient-to-r from-red-600/20 to-pink-600/20 rounded-lg blur transition-transform duration-300"></div>
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-300"></div>
            </Link>

            <Link
              to="/books"
              className="relative text-red-400 text-lg font-medium hover:text-red-300 transition-all duration-300 group"
            >
              <span className="relative z-10">Books</span>
              <div className="absolute inset-0 h-full w-full scale-0 group-hover:scale-100 bg-gradient-to-r from-red-600/20 to-pink-600/20 rounded-lg blur transition-transform duration-300"></div>
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-red-500 to-pink-500 transition-all duration-300"></div>
            </Link>
          </nav>

          {/* Mobile Menu Button (for responsive design) */}
          <button className="md:hidden text-red-400 hover:text-red-300 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Auth Section */}
          {!user ? (
            <button
              id="sign-in-btn"
              onClick={() => navigate("/login")}
              className="relative group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-2.5 rounded-lg font-semibold shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
            >
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg blur opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="absolute inset-0 bg-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          ) : (
            <div className="relative">
              {/* Enhanced Avatar */}
              <button
                className="relative w-11 h-11 rounded-full flex items-center justify-center bg-gradient-to-br from-red-500 to-red-700 text-white font-bold text-lg border-2 border-red-400/50 shadow-lg hover:shadow-red-500/30 hover:scale-110 transition-all duration-300 group"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span className="relative z-10">
                  {user.displayName
                    ? user.displayName.charAt(0).toUpperCase()
                    : "G"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-pink-500 rounded-full blur opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              {/* Enhanced Popup Menu */}
              {menuOpen && (
                <div className="absolute right-0 mt-3 w-56 z-50">
                  <div className="bg-gray-900/95 backdrop-blur-md border border-red-500/30 rounded-xl shadow-2xl shadow-red-500/10 overflow-hidden">
                    {/* User Info */}
                    <div className="px-4 py-3 bg-gradient-to-r from-red-900/20 to-pink-900/20 border-b border-red-500/20">
                      <p className="text-sm font-medium text-gray-200">
                        Signed in as
                      </p>
                      <p className="text-sm text-red-400 font-semibold truncate">
                        {user.email || "Anonymous"}
                      </p>
                    </div>
                    
                    {/* Menu Items */}
                    <div className="py-1">
                      <button
                        className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:text-white hover:bg-red-600/20 transition-all duration-200 flex items-center space-x-3 group"
                        onClick={handleLogout}
                      >
                        <svg className="w-4 h-4 text-red-400 group-hover:text-red-300 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Navbar;