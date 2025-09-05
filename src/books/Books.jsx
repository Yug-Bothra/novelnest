// src/books/Books.jsx
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Link } from "react-router-dom"; // ✅ Import Link

const booksData = [
  { id: 1, title: "The Enchanted Forest", genre: "Fantasy", img: "/assets/images/book1.png" },
  { id: 2, title: "Into the Future", genre: "Science Fiction", img: "/assets/images/book2.png" },
  { id: 3, title: "The Detective's Clue", genre: "Mystery", img: "/assets/images/book3.png" },
  { id: 4, title: "Heartstrings", genre: "Romance", img: "/assets/images/book4.png" },
  { id: 5, title: "Legends of the Brave", genre: "Adventure", img: "/assets/images/book5.png" },
  { id: 6, title: "Whispers of Horror", genre: "Horror", img: "/assets/images/book6.png" },
  { id: 7, title: "Culinary Delights", genre: "Cooking", img: "/assets/images/book7.png" },
  { id: 8, title: "Mind Over Matter", genre: "Self-Help", img: "/assets/images/book8.png" },
  { id: 9, title: "Chronicles of the Kings", genre: "Historical Fiction", img: "/assets/images/book9.png" },
  { id: 10, title: "Code Master", genre: "Tech", img: "/assets/images/book10.png" },
  { id: 11, title: "Secrets of the Jungle", genre: "Wildlife", img: "/assets/images/book11.png" },
  { id: 12, title: "Stellar Adventures", genre: "Space", img: "/assets/images/book12.png" },
  { id: 13, title: "Fabled Beasts", genre: "Mythology", img: "/assets/images/book13.png" },
  { id: 14, title: "Songs of the Sea", genre: "Poetry", img: "/assets/images/book14.png" },
  { id: 15, title: "Survival Tactics", genre: "Survival", img: "/assets/images/book15.png" },
];

const carouselImages = ["corousel1.png", "corousel4.png", "corousel5.png"];

const Books = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  return (
    <div className="bg-gradient-to-br from-[#0d0d0d] to-[#1c1c1c] min-h-screen text-white font-poppins">
{/* === Navbar === */}
<header className="bg-[#111] shadow-[0_0_15px_rgba(255,0,0,0.6)]">
  <div className="flex items-center justify-between px-6 py-4">
    {/* Logo with red glow */}
    <h3
      className="text-2xl font-bold relative inline-block text-black hover:scale-105 transition-transform duration-300"
      style={{
        textShadow: "0 0 5px red, 0 0 10px red, 0 0 20px red",
      }}
    >
      NovelNest
    </h3>

    {/* Nav links */}
    <nav className="flex space-x-6">
      <Link
        to="/"
        className="text-red-400 hover:text-red-600 hover:shadow-[0_0_10px_#ff0000] transition"
      >
        Home
      </Link>
      <Link
        to="/bookr"
        className="text-red-400 hover:text-red-600 hover:shadow-[0_0_10px_#ff0000] transition"
      >
        Books-Recommend
      </Link>
    </nav>
  </div>
</header>


      {/* === Carousel === */}
      <div className="relative mt-6 h-[400px] md:h-[650px] overflow-hidden rounded-xl">
        {carouselImages.map((img, idx) => (
          <img
            key={idx}
            src={`/assets/images/${img}`}
            alt={`Slide ${idx + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
              idx === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-110"
            }`}
          />
        ))}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-red-600/70 hover:bg-red-500 p-3 rounded-full"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-red-600/70 hover:bg-red-500 p-3 rounded-full"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* === Heading === */}
      <h1 className="text-center text-4xl md:text-5xl font-bold text-red-500 mt-12 mb-6">
        MOST PICKED BOOKS!!!
      </h1>

      {/* === Book Grid === */}
      <section className="px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {booksData.map((book) => (
          <div
            key={book.id}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#2b2b2b] border border-red-600 rounded-xl shadow-[0_0_15px_rgba(255,0,0,0.8),0_0_30px_rgba(50,0,0,0.5)] overflow-hidden transition-transform transform hover:scale-105 hover:shadow-[0_0_20px_rgba(255,0,0,1),0_0_40px_rgba(50,0,0,0.7)]"
          >
            <img
              src={book.img}
              alt={book.title}
              className="w-full h-44 object-cover border-b border-red-600 rounded-t-xl transition-opacity hover:opacity-90"
            />
            <div className="p-4 bg-[#1a1a1a] border-t border-gray-800">
              <h3 className="text-red-500 font-mono text-lg font-bold text-center mb-1">
                {book.title}
              </h3>
              <p className="text-gray-300 italic text-center mb-2">{book.genre}</p>
              <div className="flex justify-center items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300">4.5</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* === Footer === */}
      <footer className="bg-[#1b1b1b] text-gray-300 py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-red-400 text-xl font-bold mb-4">About Us</h3>
            <p>
              Welcome to our dark and thrilling world. We craft killer stories that keep you on edge while embracing the cold aesthetic of mystery and thrill.
            </p>
          </div>

          <div>
            <h3 className="text-red-400 text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link className="hover:text-red-500 transition" to="/">Home</Link></li>
              <li><a className="hover:text-red-500 transition" href="/">Genres</a></li>
              <li><a className="hover:text-red-500 transition" href="/">New Arrivals</a></li>
              <li><a className="hover:text-red-500 transition" href="/">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-red-400 text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-600 transition">Facebook</a>
              <a href="#" className="hover:text-sky-400 transition">Twitter</a>
              <a href="#" className="hover:text-pink-500 transition">Instagram</a>
              <a href="#" className="hover:text-red-600 transition">YouTube</a>
            </div>
          </div>
        </div>
        <div className="text-center text-gray-400 mt-8 text-sm">
          © 2025 Novel Nest. All rights reserved. YUG BOTHRA • DEVASISH MOGHE • DAKSH TRIVEDI
        </div>
      </footer>
    </div>
  );
};

export default Books;
