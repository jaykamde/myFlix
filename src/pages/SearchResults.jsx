import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { BackIcon } from '../components/Icons';

const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://www.omdbapi.com/?apikey=16c5c67a&s=${query}`);
        if (res.data.Search) {
          setMovies(res.data.Search);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  return (
    <div className="relative min-h-screen pt-24 px-6 pb-10 overflow-hidden text-[#FAF0E6]">
      {/* 🔥 Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/websitevideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔒 Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-10" />

      {/* 🔍 Search Results Content */}
      <div className="relative z-20">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-[#5C5470] hover:bg-[#B9B4C7] hover:text-[#352F44] text-[#FAF0E6] rounded-full flex items-center gap-2 transition"
        >
          <BackIcon />
          Back
        </button>

        {/* Heading */}
        <h2 className="text-3xl font-bold mb-6">
          🔍 Search Results for: <span className="text-[#FFB22C]">{query}</span>
        </h2>

        {/* Movie Cards */}
        {movies.length === 0 ? (
          <p className="text-center text-[#B9B4C7] text-lg mt-10">No movies found for your search.</p>
        ) : (
          <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
            {movies.map((movie) => (
              <MovieCard key={movie.imdbID} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
