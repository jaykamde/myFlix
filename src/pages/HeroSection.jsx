import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/search?q=${searchText}`);
    }
  };

  return (
    <div className="relative h-[92vh] w-full bg-[#F7F7F7] text-black overflow-hidden">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F7F7F7]/90 via-white/60 to-[#F7F7F7]/90" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center h-full px-4 animate-fade-in">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-md text-[#000000]">
          Welcome to <span className="text-[#854836]">BingeBox🎥</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mb-8 text-[#854836]">
          Discover top-rated movies, like and save for later. Watch trailers in one click!
        </p>

        <form
          onSubmit={handleSearch}
          className="w-full max-w-md flex shadow-md rounded-md overflow-hidden"
        >
          <input
            type="text"
            placeholder="Search movies..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full px-4 py-2 text-black focus:outline-none bg-white"
          />
          <button
            type="submit"
            className="bg-[#FFB22C] hover:bg-[#e69e1f] px-6 text-white font-semibold transition"
          >
            🔍
          </button>
        </form>
      </div>
    </div>
  );
};

export default HeroSection;
