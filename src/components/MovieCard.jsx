import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';
import { LikeIcon, WatchLaterIcon } from './Icons'; // make sure path is correct

const MovieCard = ({ movie }) => {
  const { likeMovie, saveToWatchLater } = useMovieContext();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.imdbID}`);
  };

  const randomViews = Math.floor(Math.random() * 500000) + 10000;

  return (
    <div
      className="relative bg-[#1c1c1c] rounded-xl overflow-hidden shadow-md transform hover:scale-105 transition duration-300 cursor-pointer group"
      onClick={handleClick}
    >
      {/* Poster */}
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="w-full h-80 object-cover group-hover:brightness-75 transition"
      />

      {/* Like + Watch Later Buttons */}
      <div className="absolute top-2 right-2 flex flex-col gap-2 z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            likeMovie(movie);
          }}
          className="bg-black/50 hover:bg-red-600 p-2 rounded-full transition text-white"
        >
          <LikeIcon className="text-xl" />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            saveToWatchLater(movie);
          }}
          className="bg-black/50 hover:bg-blue-600 p-2 rounded-full transition text-white"
        >
          <WatchLaterIcon className="text-xl" />
        </button>
      </div>

      {/* Movie Info */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3 text-white">
        <h3 className="text-lg font-bold truncate">{movie.Title}</h3>
        <div className="text-sm text-gray-300 mt-1 flex flex-col gap-1">
          <span>📅 {movie.Year || 'Unknown'}</span>
          <span>⭐ IMDb: {movie.imdbRating || 'N/A'}</span>
          <span>👁️ {randomViews.toLocaleString()} watched</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
