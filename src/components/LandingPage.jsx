import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Facebook, Twitter, Instagram, Youtube, Star, BookOpen, Heart, Eye } from "lucide-react";

const LandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentBookSlide, setCurrentBookSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carousel images
  const carouselImages = [
    "/assets/images/corousel1.png",
    "/assets/images/corousel2.png",
    "/assets/images/corousel3.png"
  ];

  // Book slider data
  const bookSlides = [
    {
      img: "/assets/images/image1.png",
      title: "Whispers of the Veil",
      description: "Eleanor inherits a locket that lets her speak to spirits, but when the veil between worlds starts collapsing, she must uncover its true power to save both realms.",
      rating: 4.8,
      readers: "12.5K"
    },
    {
      img: "/assets/images/image2.png",
      title: "The Crimson Moon Pact",
      description: "Maya becomes the leader of a cursed werewolf clan and must break an ancient curse tied to the crimson moon before a dark force destroys them all.",
      rating: 4.9,
      readers: "18.2K"
    },
    {
      img: "/assets/images/image3.png",
      title: "Ethereal Warden",
      description: "After gaining powers as a guardian of realms, Alex must battle celestial and demonic forces to protect Earth from a universe-shattering artifact.",
      rating: 4.7,
      readers: "9.8K"
    }
  ];

  // Book grid data
  const books = [
    { img: "/assets/images/image4.png", title: "The Time Machine", genre: "Science Fiction", link: "/pdfs/novel1.pdf", rating: 4.6 },
    { img: "/assets/images/image5.png", title: "The Metamorphosis", genre: "Surrealism", link: "/pdfs/novel2.pdf", rating: 4.4 },
    { img: "/assets/images/image6.png", title: "The Three Perils of Man", genre: "Adventure", link: "/pdfs/novel3.pdf", rating: 4.2 },
    { img: "/assets/images/image7.png", title: "Northanger Abbey", genre: "Romance", link: "/pdfs/novel4.pdf", rating: 4.5 },
    { img: "/assets/images/image8.png", title: "High School DxD", genre: "Fantasy", link: "/pdfs/novel5.pdf", rating: 4.3 },
    { img: "/assets/images/image9.png", title: "Software Engineering", genre: "Technical", link: "/pdfs/novel6.pdf", rating: 4.1 },
    { img: "/assets/images/image10.png", title: "The Trial", genre: "Philosophy", link: "/pdfs/novel7.pdf", rating: 4.7 },
    { img: "/assets/images/image11.png", title: "Brave New World", genre: "Dystopian", link: "/pdfs/novel8.pdf", rating: 4.8 },
    { img: "/assets/images/image12.png", title: "Women in Love", genre: "Literary", link: "/pdfs/novel9.pdf", rating: 4.0 },
    { img: "/assets/images/image13.png", title: "Solo Leveling", genre: "Fantasy", link: "/pdfs/novel10.pdf", rating: 4.9 },
    { img: "/assets/images/image14.png", title: "Chainsaw Man", genre: "Action", link: "/pdfs/novel11.pdf", rating: 4.6 },
    { img: "/assets/images/image15.png", title: "Monster", genre: "Thriller", link: "/pdfs/novel12.pdf", rating: 4.8 },
  ];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-play book slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBookSlide((prev) => (prev + 1) % bookSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  const nextBookSlide = () => {
    setCurrentBookSlide((prev) => (prev + 1) % bookSlides.length);
  };

  const prevBookSlide = () => {
    setCurrentBookSlide((prev) => (prev - 1 + bookSlides.length) % bookSlides.length);
  };

  return (
    <div className="bg-gradient-to-br from-slate-950 via-gray-900 to-black text-white min-h-screen overflow-x-hidden">
      {/* ===== Hero Carousel Section ===== */}
      <section className="relative w-full h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60 z-10" />
        
        <div className="relative w-full h-full">
          {carouselImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
                index === currentSlide 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-110'
              }`}
            >
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover filter brightness-75"
              />
            </div>
          ))}
        </div>

        {/* Enhanced Navigation Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 -translate-y-1/2 z-30 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 backdrop-blur-md rounded-full p-4 transition-all duration-500 hover:scale-125 group shadow-2xl border border-red-400/30"
        >
          <ChevronLeft className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 z-30 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 backdrop-blur-md rounded-full p-4 transition-all duration-500 hover:scale-125 group shadow-2xl border border-red-400/30"
        >
          <ChevronRight className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
        </button>

        {/* Enhanced Slide Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex space-x-4">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-500 rounded-full ${
                index === currentSlide 
                  ? 'w-12 h-3 bg-gradient-to-r from-rose-500 to-red-500 shadow-lg shadow-red-500/50' 
                  : 'w-3 h-3 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        {/* Enhanced Hero Content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className={`text-center px-8 max-w-6xl transition-all duration-1500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            
            <p className="text-2xl md:text-3xl text-gray-100 mb-12 leading-relaxed font-light tracking-wide">
              Bloody Cold Stories That <span className="text-red-400 font-semibold">Chill Your Soul</span>
            </p>
            <div className="flex justify-center space-x-8 text-gray-300">
              <div className="flex items-center space-x-2">
                <BookOpen className="w-6 h-6 text-red-400" />
                <span className="text-lg">10,000+ Stories</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-6 h-6 text-red-400" />
                <span className="text-lg">5M+ Readers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Featured Books Slider ===== */}
      <section className="container mx-auto my-32 px-8">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-rose-400 to-red-400 bg-clip-text text-transparent">
            Featured Stories
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover our most captivating tales that will keep you awake at night
          </p>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="border border-gradient-to-r from-rose-500/30 to-red-500/30 rounded-3xl shadow-[0_0_60px_rgba(239,68,68,0.25)] bg-gradient-to-br from-slate-900/80 to-gray-900/80 backdrop-blur-xl overflow-hidden">
            <div className="relative w-full h-96">
              {bookSlides.map((book, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    index === currentBookSlide 
                      ? 'opacity-100 translate-x-0' 
                      : index < currentBookSlide 
                        ? 'opacity-0 -translate-x-full' 
                        : 'opacity-0 translate-x-full'
                  }`}
                >
                  <div className="flex items-center h-full p-12">
                    <div className="relative group flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-red-500/20 rounded-3xl blur-xl"></div>
                      <img
                        src={book.img}
                        alt={book.title}
                        className="relative w-72 h-72 rounded-3xl object-cover shadow-2xl group-hover:scale-105 transition-transform duration-500 border border-red-500/20"
                      />
                    </div>
                    <div className="flex-1 ml-16">
                      <h3 className="text-4xl font-bold text-transparent bg-gradient-to-r from-rose-400 to-red-400 bg-clip-text mb-6 hover:from-rose-300 hover:to-red-300 transition-all duration-300">
                        {book.title}
                      </h3>
                      <p className="text-gray-300 text-xl leading-relaxed max-w-3xl mb-6">
                        {book.description}
                      </p>
                      <div className="flex items-center space-x-8">
                        <div className="flex items-center space-x-2">
                          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                          <span className="text-lg font-semibold text-white">{book.rating}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Eye className="w-5 h-5 text-blue-400" />
                          <span className="text-lg text-gray-300">{book.readers} readers</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Heart className="w-5 h-5 text-red-400" />
                          <span className="text-lg text-gray-300">Featured</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Book Slider Controls */}
          <button
            onClick={prevBookSlide}
            className="absolute -left-6 top-1/2 -translate-y-1/2 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 rounded-full p-4 transition-all duration-300 hover:scale-110 z-20 shadow-2xl border border-red-400/30"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextBookSlide}
            className="absolute -right-6 top-1/2 -translate-y-1/2 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 rounded-full p-4 transition-all duration-300 hover:scale-110 z-20 shadow-2xl border border-red-400/30"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          {/* Enhanced Book Slider Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {bookSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBookSlide(index)}
                className={`transition-all duration-500 rounded-full ${
                  index === currentBookSlide 
                    ? 'w-8 h-2 bg-gradient-to-r from-rose-500 to-red-500 shadow-lg shadow-red-500/50' 
                    : 'w-2 h-2 bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Book Collection Grid ===== */}
      <section className="container mx-auto py-20 px-8">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-rose-400 to-red-400 bg-clip-text text-transparent">
            Our Collection
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore thousands of stories across every genre imaginable
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {books.map((book, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-slate-800/90 to-gray-900/90 backdrop-blur-sm rounded-3xl border border-red-500/30 shadow-[0_20px_40px_rgba(0,0,0,0.7)] transform transition-all duration-700 hover:scale-105 hover:-rotate-1 hover:shadow-[0_30px_60px_rgba(239,68,68,0.4)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-600/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-3xl"></div>
              
              <a href={book.link} target="_blank" rel="noopener noreferrer" className="block">
                <div className="relative overflow-hidden rounded-t-3xl">
                  <img
                    src={book.img}
                    alt={book.title}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-md rounded-full px-4 py-2 flex items-center space-x-2 border border-yellow-400/30">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-sm font-bold">{book.rating}</span>
                  </div>
                </div>
              </a>
              
              <div className="p-8 relative z-10 bg-gradient-to-b from-transparent to-black/10">
                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-white text-2xl font-bold hover:text-red-400 transition-all duration-300 mb-4 leading-tight group-hover:text-red-300"
                >
                  {book.title}
                </a>
                <div className="flex items-center justify-between mt-6">
                  <span className="text-gray-300 font-semibold text-sm bg-gradient-to-r from-slate-700/80 to-gray-700/80 backdrop-blur-sm px-4 py-2 rounded-full border border-red-500/30 tracking-wide">
                    {book.genre}
                  </span>
                  <button className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-all duration-300 bg-red-500/10 hover:bg-red-500/20 px-3 py-2 rounded-full border border-red-500/30 group">
                    <Heart className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-sm font-medium">Save</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Enhanced Footer ===== */}
      <footer className="bg-gradient-to-r from-slate-950 via-gray-950 to-black border-t border-red-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-900/5"></div>
        <div className="container mx-auto px-8 py-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* About Us */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-rose-400 to-red-400 bg-clip-text text-transparent">
                About Us
              </h3>
              <p className="text-gray-300 leading-relaxed text-lg">
                Welcome to our dark and thrilling world. We craft killer stories that keep you on edge while embracing the cold aesthetic of mystery and thrill.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4 text-red-400" />
                  <span>10K+ Stories</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4 text-red-400" />
                  <span>5M+ Readers</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-rose-400 to-red-400 bg-clip-text text-transparent">
                Quick Links
              </h3>
              <ul className="space-y-4">
                {['Home', 'Genres', 'New Arrivals', 'Contact'].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-red-400 transition-all duration-300 flex items-center group text-lg"
                    >
                      <span className="w-0 group-hover:w-3 h-0.5 bg-red-400 transition-all duration-300 mr-0 group-hover:mr-3 rounded-full"></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Follow Us */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-rose-400 to-red-400 bg-clip-text text-transparent">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                {[
                  { Icon: Facebook, href: "#", color: "hover:bg-blue-600" },
                  { Icon: Twitter, href: "#", color: "hover:bg-sky-600" },
                  { Icon: Instagram, href: "#", color: "hover:bg-pink-600" },
                  { Icon: Youtube, href: "#", color: "hover:bg-red-600" }
                ].map(({ Icon, href, color }, index) => (
                  <a
                    key={index}
                    href={href}
                    className={`bg-slate-800 ${color} p-4 rounded-full transition-all duration-500 hover:scale-125 hover:-rotate-12 group shadow-lg border border-red-500/20`}
                  >
                    <Icon className="w-6 h-6 text-gray-300 group-hover:text-white transition-colors duration-300" />
                  </a>
                ))}
              </div>
              <p className="text-gray-400 text-sm">
                Join our community of horror enthusiasts
              </p>
            </div>
          </div>

          {/* Enhanced Footer Bottom */}
          <div className="border-t border-red-500/20 pt-8 text-center">
            <p className="text-gray-400 text-base leading-relaxed">
              © 2025 Novel Nest Bloody Cold Stories. All rights reserved.
            </p>
            <p className="text-red-400 font-semibold text-lg mt-2 tracking-wide">
              YUG BOTHRA • DEVASISH MOGHE • DAKSH TRIVEDI
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;