import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MovieContext } from '../context/MovieContext';
import { FaHeart, FaClock, FaSearch } from 'react-icons/fa';

const GenrePage = () => {
  const { genre } = useParams();
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [searchText, setSearchText] = useState('');

  const { addToLiked, addToWatchLater } = useContext(MovieContext);

  const genreTitleMap = {
    action: 'Avengers',
    comedy: 'Friends',
    drama: 'Breaking Bad',
    'sci-fi': 'Interstellar',
    romance: 'The Notebook',
  };

  const fetchGenreMovies = async (query) => {
    try {
      const genreKeyword = genreTitleMap[genre.toLowerCase()] || genre;
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=16c5c67a&s=${query || genreKeyword}`
      );
      setMovies(res.data.Search || []);
    } catch (error) {
      console.error('Error fetching genre movies:', error);
      setMovies([]);
    }
  };

  useEffect(() => {
    fetchGenreMovies();
  }, [genre]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      fetchGenreMovies(searchText);
    }
  };

  return (
    <div className="min-h-screen bg-[#352F44] text-[#FAF0E6] pt-24 px-6 pb-10">
      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="backdrop-blur-lg bg-[#5C5470]/70 border border-[#B9B4C7]/30 max-w-3xl mx-auto rounded-full flex items-center px-4 py-2 shadow-lg"
      >
        <input
          type="text"
          placeholder="Search within this genre..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="flex-1 bg-transparent text-[#FAF0E6] placeholder-[#B9B4C7] outline-none px-2"
        />
        <button
          type="submit"
          className="bg-[#B9B4C7] hover:bg-[#FAF0E6] text-[#352F44] font-semibold rounded-full px-4 py-1 flex items-center gap-2 transition"
        >
          <FaSearch />
          Search
        </button>
      </form>

      {/* Heading */}
      <h2 className="text-4xl font-bold mt-10 text-center capitalize drop-shadow-md">
        {searchText ? `Results for "${searchText}"` : `Genre: ${genre}`}
      </h2>

      {/* Movie Cards */}
      {movies.length === 0 ? (
        <p className="text-center text-[#B9B4C7] mt-10">No movies found.</p>
      ) : (
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="relative bg-[#5C5470] rounded-xl overflow-hidden shadow-xl group hover:scale-[1.03] transition-transform duration-300"
            >
              {/* Top Buttons */}
              <div className="absolute top-2 right-2 flex gap-2 z-10">
                <button
                  onClick={() => addToLiked(movie)}
                  className="bg-black/60 hover:bg-red-600 text-white p-2 rounded-full"
                  title="Like"
                >
                  <FaHeart />
                </button>
                <button
                  onClick={() => addToWatchLater(movie)}
                  className="bg-black/60 hover:bg-blue-600 text-white p-2 rounded-full"
                  title="Watch Later"
                >
                  <FaClock />
                </button>
              </div>

              {/* Poster */}
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder.png'}
                alt={movie.Title}
                className="w-full h-72 object-cover cursor-pointer"
                onClick={() => navigate(`/movie/${movie.imdbID}`)}
              />

              {/* Info Overlay */}
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-[#352F44] via-transparent to-transparent p-3">
                <h3 className="text-[#FAF0E6] font-semibold text-sm truncate">
                  {movie.Title}
                </h3>
                <div className="flex items-center text-xs text-[#FAF0E6]/70 mt-1 gap-2">
                  <span>📅 {movie.Year}</span>
                  <span>
                    👁️‍🗨️{' '}
                    {Math.floor(Math.random() * 900000 + 100000).toLocaleString()} views
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenrePage;