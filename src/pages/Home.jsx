import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

const Home = () => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/search?q=${searchText}`);
    }
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* 🎥 Background Video - No Blur */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/websitevideo.mp4" type="video/mp4" />
      </video>

      {/* Clear overlay text and content */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        {/* Hero Text */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#B9B4C7] via-[#FAF0E6] to-[#B9B4C7] drop-shadow-lg">
          <Typewriter
            words={['Welcome to MyFlix', 'Watch, Like & Save', 'Your Movie Universe']}
            loop
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={40}
            delaySpeed={2000}
          />
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl mt-6 text-white/90 max-w-2xl font-medium leading-relaxed">
          Dive into endless entertainment. Explore, like, and save your favorite films in one stunning platform.
        </p>

        {/* Genre Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          {['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Romance'].map((genre) => (
            <button
              key={genre}
              onClick={() => navigate(`/genre/${genre.toLowerCase()}`)}
              className="px-5 py-2 rounded-full bg-[#352F44]/80 text-[#FAF0E6] hover:bg-[#5C5470] backdrop-blur-sm transition font-semibold"
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Scroll Down Arrow */}
        <motion.div
          className="mt-16 text-white text-3xl animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          ↓
        </motion.div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className="mt-8 bg-white/20 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 w-full max-w-md"
        >
          <input
            type="text"
            placeholder="Search movies..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 bg-transparent text-white placeholder-white/70 focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-1 rounded-full bg-[#5C5470] text-[#FAF0E6] hover:bg-[#B9B4C7] transition"
          >
            🔍
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Home;
