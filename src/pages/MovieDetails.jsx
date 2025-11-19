import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMovieContext } from '../context/MovieContext';
import { toast } from 'react-toastify';
import { Icon } from '@iconify/react';
import { BackIcon } from '../components/Icons';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { likeMovie, saveToWatchLater } = useMovieContext();

  const [movie, setMovie] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [showPoster, setShowPoster] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `https://www.omdbapi.com/?apikey=16c5c67a&i=${id}&plot=full`
        );
        setMovie(res.data);
      } catch (error) {
        toast.error('Failed to fetch movie details');
      }
    };

    fetchMovie();
  }, [id]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(parseFloat(rating || 0));
    return [...Array(fullStars)].map((_, i) => (
      <Icon key={i} icon="mdi:star" className="text-yellow-400 text-xl" />
    ));
  };

  if (!movie) return <div className="text-white text-center mt-10">Loading...</div>;

  return (
    <div
      className="min-h-screen pt-24 px-6 pb-10 text-[#FAF0E6]"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(20, 20, 20, 0.85), rgba(20, 20, 20, 0.85)), url('https://images.unsplash.com/photo-1606937295547-bc0f668595b3?w=600&auto=format&fit=crop&q=60')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-[#B9B4C7] hover:bg-[#A79CB0] text-[#352F44] font-semibold rounded flex items-center gap-2"
      >
        <BackIcon />
        Back
      </button>

      {/* Glass Card */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl shadow-2xl max-w-5xl mx-auto p-6 md:flex md:gap-8 text-[#FAF0E6]">
        {/* Poster with click to enlarge */}
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
          alt={movie.Title}
          className="w-full md:w-1/3 h-auto object-cover rounded-lg shadow-lg cursor-pointer"
          onClick={() => setShowPoster(true)}
        />

        {/* Info */}
        <div className="mt-6 md:mt-0 flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{movie.Title}</h1>
          <p className="text-sm">{movie.Year} • {movie.Genre} • {movie.Runtime}</p>

          <div className="flex items-center gap-2">
            <span className="text-yellow-300 font-semibold">IMDb: ⭐ {movie.imdbRating}</span>
            <div className="flex">{renderStars(movie.imdbRating)}</div>
          </div>

          <p className="text-white/90">{movie.Plot}</p>

          <ul className="mt-4 space-y-1 text-sm text-[#C8E4FF]">
            <li>🎬 Director: {movie.Director}</li>
            <li>🎭 Actors: {movie.Actors}</li>
            <li>⏱ Runtime: {movie.Runtime}</li>
            <li>🌍 Language: {movie.Language}</li>
            <li>🎟 Rated: {movie.Rated}</li>
          </ul>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            <button
              onClick={() => likeMovie(movie)}
              className="px-4 py-2 bg-pink-500 hover:bg-pink-600 rounded text-white flex items-center gap-2"
            >
              <Icon icon="mdi:heart" />
              Like
            </button>

            <button
              onClick={() => saveToWatchLater(movie)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white flex items-center gap-2"
            >
              <Icon icon="material-symbols:watch-later" />
              Watch Later
            </button>

            <a
              href="https://samplelib.com/lib/preview/mp4/sample-5s.mp4"
              download={`${movie.Title}.mp4`}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white flex items-center gap-2"
            >
              <Icon icon="mdi:download" />
              Download
            </a>

            <button
              onClick={() => setShowTrailer(true)}
              className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded text-black flex items-center gap-2"
            >
              <Icon icon="mdi:play-circle" />
              Watch Trailer
            </button>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6">
          <div className="relative w-full max-w-3xl aspect-video bg-black">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed?autoplay=1&listType=search&list=${movie.Title} official trailer`}
              title="Trailer"
              allowFullScreen
            ></iframe>
            <button
              onClick={() => setShowTrailer(false)}
              className="absolute top-2 right-2 text-white text-2xl"
            >
              ✖
            </button>
          </div>
        </div>
      )}

      {/* Poster Fullscreen Preview */}
      {showPoster && (
        <div
          onClick={() => setShowPoster(false)}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
        >
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
            alt="Fullscreen Poster"
            className="max-w-[90%] max-h-[90%] rounded-xl shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
