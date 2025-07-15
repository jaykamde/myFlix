import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';
import { Icon } from '@iconify/react';

const LikedMovies = () => {
  const navigate = useNavigate();
  const { likedMovies } = useMovieContext();

  return (
    <div className="relative min-h-screen pt-24 px-6 pb-10 text-[#FAF0E6] overflow-hidden">
      {/* 🎥 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 brightness-90"
      >
        <source src="/websitevideo.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Main Content */}
      <div className="relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-4 py-2 bg-[#B9B4C7] hover:bg-[#A79CB0] text-[#352F44] rounded font-semibold flex items-center gap-2"
        >
          <Icon icon="mdi:arrow-left" />
          Back
        </button>

        <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
          <Icon icon="mdi:heart" className="text-red-500 text-4xl" />
          Liked Movies
        </h1>

        {likedMovies.length === 0 ? (
          <div className="text-center mt-20 text-white text-xl flex flex-col items-center gap-2">
            <Icon icon="mdi:movie-off-outline" className="text-6xl text-white/60" />
            No movies liked yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {likedMovies.map((movie) => (
              <div
                key={movie.imdbID}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-md transition hover:scale-[1.02]"
              >
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
                  alt={movie.Title}
                  className="w-full h-64 object-cover rounded-md mb-3"
                />
                <h3 className="text-lg font-semibold truncate">{movie.Title}</h3>
                <p className="text-sm text-white/70 mt-1">📅 {movie.Year}</p>
                <button
                  onClick={() => navigate(`/movie/${movie.imdbID}`)}
                  className="mt-4 w-full bg-[#FAF0E6] text-[#352F44] hover:bg-[#ece1d3] font-semibold py-1 rounded transition"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedMovies;
