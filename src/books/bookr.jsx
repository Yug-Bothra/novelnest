// src/books/BookR.jsx
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import Sentiment from "sentiment";

const sentiment = new Sentiment();

const BookR = () => {
  const [books, setBooks] = useState([]);
  const [genreInput, setGenreInput] = useState("");
  const [textInput, setTextInput] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    Papa.parse("/data/BooksDatasetClean.csv", {
      download: true,
      header: true,
      complete: (result) => {
        // ✅ filter out empty rows
        setBooks(result.data.filter((b) => b.title && b.author && b.genre));
      },
    });
  }, []);

  const recommendByGenre = (genre, n = 5) => {
    const filtered = books.filter(
      (b) => b.genre && b.genre.toLowerCase().includes(genre.toLowerCase())
    );
    if (filtered.length === 0) return [];
    return filtered.sort(() => 0.5 - Math.random()).slice(0, n);
  };

  const recommendBySentiment = (text, n = 5) => {
    const score = sentiment.analyze(text).score;
    let sentimentCategory =
      score > 0 ? "Positive" : score < 0 ? "Negative" : "Neutral";

    let genresToSearch =
      sentimentCategory === "Positive"
        ? ["Fiction", "Adventure", "Romance"]
        : sentimentCategory === "Negative"
        ? ["Drama", "Mystery"]
        : ["Classic", "Non-Fiction", "Biography"]; // ✅ fixed

    const filtered = books.filter((b) =>
      genresToSearch.some((g) =>
        b.genre ? b.genre.toLowerCase().includes(g.toLowerCase()) : false
      )
    );

    if (filtered.length === 0) return [];
    return filtered.sort(() => 0.5 - Math.random()).slice(0, n);
  };

  const handleRecommend = () => {
    if (genreInput.trim()) {
      setRecommendations(recommendByGenre(genreInput, 5));
    } else if (textInput.trim()) {
      setRecommendations(recommendBySentiment(textInput, 5));
    } else {
      setRecommendations([]);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-red-600 font-[cursive] overflow-hidden">
      {/* Creepy floating pages */}
      <div className="absolute top-10 left-20 w-24 h-32 bg-white/10 rotate-6 blur-sm animate-pulse"></div>
      <div className="absolute top-40 right-32 w-28 h-40 bg-white/10 -rotate-12 blur-sm animate-bounce"></div>
      <div className="absolute bottom-20 left-10 w-20 h-28 bg-white/10 rotate-3 blur-sm animate-ping"></div>

      {/* Blood drips pouring into pond */}
      {[...Array(8)].map((_, i) => (
        <div key={`drip-${i}`} className="blood-drip-container" style={{ left: `${10 + i * 10}%` }}>
          {/* Main drip line */}
          <div 
            className="blood-drip" 
            style={{ 
              animationDelay: `${i * 0.5}s`,
              height: '60vh'
            }}
          ></div>
          
          {/* Dripping droplets */}
          <div 
            className="blood-droplet"
            style={{ 
              animationDelay: `${i * 0.5 + 1}s`,
            }}
          ></div>
          <div 
            className="blood-droplet"
            style={{ 
              animationDelay: `${i * 0.5 + 2}s`,
              top: '20vh'
            }}
          ></div>
          <div 
            className="blood-droplet"
            style={{ 
              animationDelay: `${i * 0.5 + 3}s`,
              top: '40vh'
            }}
          ></div>
        </div>
      ))}

      {/* Main Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center p-12 bg-black/80 border-2 border-red-900 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.7)]">
        <h1 className="text-6xl font-bold text-red-700 drop-shadow-[0_0_14px_rgba(220,38,38,0.9)] mb-10">
          ☠️ Book Recommender ☠️
        </h1>

        <input
          type="text"
          placeholder="Enter your favorite genre..."
          value={genreInput}
          onChange={(e) => setGenreInput(e.target.value)}
          className="w-full mb-6 p-5 bg-black/70 border-2 border-red-800 rounded-md text-white placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-red-600"
        />

        <textarea
          placeholder="Tell us what kind of books you enjoy..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className="w-full mb-6 p-5 h-40 bg-black/70 border-2 border-red-800 rounded-md text-white placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-red-600"
        ></textarea>

        <button
          onClick={handleRecommend}
          className="px-10 py-5 bg-red-800 hover:bg-red-900 text-white text-xl rounded-md shadow-lg shadow-red-900/60 transition-all"
        >
          🔪 Recommend
        </button>

        {/* Recommendations */}
        <div className="mt-10 grid gap-8">
          {recommendations.length > 0 ? (
            recommendations.map((book, idx) => (
              <div
                key={idx}
                className="bg-black/80 border border-red-800 rounded-lg p-6 text-left shadow-md hover:shadow-red-900 transition-all"
              >
                <h3 className="text-2xl font-bold text-red-500">
                  {book.title}
                </h3>
                <p className="text-sm text-red-300">
                  <strong>Author:</strong> {book.author}
                </p>
                <p className="text-sm text-red-300">
                  <strong>Genre:</strong> {book.genre}
                </p>
              </div>
            ))
          ) : (
            <p className="text-red-400 italic">
              No recommendations yet... feed me your soul (or a genre)!
            </p>
          )}
        </div>
      </div>

      {/* Blood pond at bottom with ripples */}
      <div className="blood-pond">
        {/* Main pond */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-red-900 via-red-800 to-red-900/50 rounded-t-[100px] shadow-[0_-10px_30px_rgba(139,0,0,0.8)]">
          {/* Ripple effects */}
          <div className="ripple ripple-1"></div>
          <div className="ripple ripple-2"></div>
          <div className="ripple ripple-3"></div>
          
          {/* Surface shimmer */}
          <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-transparent via-red-600 to-transparent animate-pulse opacity-60"></div>
          
          {/* Blood bubbles */}
          <div className="blood-bubble" style={{ left: '15%', animationDelay: '0s' }}></div>
          <div className="blood-bubble" style={{ left: '35%', animationDelay: '1s' }}></div>
          <div className="blood-bubble" style={{ left: '55%', animationDelay: '2s' }}></div>
          <div className="blood-bubble" style={{ left: '75%', animationDelay: '3s' }}></div>
        </div>
      </div>

      <style jsx>{`
        .blood-drip-container {
          position: absolute;
          top: 0;
          width: 3px;
        }

        .blood-drip {
          position: absolute;
          top: 0;
          width: 3px;
          background: linear-gradient(to bottom, 
            rgba(139, 0, 0, 1) 0%,
            rgba(185, 28, 28, 0.9) 30%,
            rgba(220, 38, 38, 0.8) 60%,
            rgba(239, 68, 68, 0.6) 100%
          );
          border-radius: 0 0 50% 50%;
          animation: bloodFlow 4s ease-in-out infinite;
          box-shadow: 0 0 8px rgba(139, 0, 0, 0.8);
        }

        .blood-droplet {
          position: absolute;
          width: 6px;
          height: 8px;
          background: radial-gradient(ellipse, #dc2626, #991b1b);
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          animation: dropFall 3s ease-in infinite;
          opacity: 0;
        }

        .blood-pond {
          position: relative;
          z-index: 5;
        }

        .ripple {
          position: absolute;
          border: 2px solid rgba(220, 38, 38, 0.4);
          border-radius: 50%;
          animation: rippleEffect 3s ease-out infinite;
        }

        .ripple-1 {
          width: 40px;
          height: 40px;
          top: -20px;
          left: 20%;
          animation-delay: 0s;
        }

        .ripple-2 {
          width: 60px;
          height: 60px;
          top: -30px;
          left: 50%;
          animation-delay: 1s;
        }

        .ripple-3 {
          width: 50px;
          height: 50px;
          top: -25px;
          left: 80%;
          animation-delay: 2s;
        }

        .blood-bubble {
          position: absolute;
          width: 8px;
          height: 8px;
          background: rgba(220, 38, 38, 0.6);
          border-radius: 50%;
          bottom: 2px;
          animation: bubbleRise 4s ease-in-out infinite;
        }

        @keyframes bloodFlow {
          0% {
            height: 0;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          80% {
            height: 60vh;
            opacity: 0.9;
          }
          100% {
            height: 60vh;
            opacity: 0.3;
          }
        }

        @keyframes dropFall {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateY(60vh);
            opacity: 0;
          }
        }

        @keyframes rippleEffect {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }

        @keyframes bubbleRise {
          0% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          50% {
            transform: translateY(-20px) scale(1);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-40px) scale(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default BookR;