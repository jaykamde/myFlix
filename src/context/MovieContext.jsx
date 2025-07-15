import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

export const MovieContext = createContext();

// Custom Hook to use Movie Context
export const useMovieContext = () => useContext(MovieContext);

const MovieProvider = ({ children }) => {
  const [likedMovies, setLikedMovies] = useState(() => {
    const stored = localStorage.getItem('likedMovies');
    return stored ? JSON.parse(stored) : [];
  });

  const [watchLater, setWatchLater] = useState(() => {
    const stored = localStorage.getItem('watchLater');
    return stored ? JSON.parse(stored) : [];
  });

  // Save liked to localStorage
  useEffect(() => {
    localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
  }, [likedMovies]);

  // Save watch later to localStorage
  useEffect(() => {
    localStorage.setItem('watchLater', JSON.stringify(watchLater));
  }, [watchLater]);

  // Add to Liked
  const addToLiked = (movie) => {
    if (!likedMovies.find((m) => m.imdbID === movie.imdbID)) {
      setLikedMovies((prev) => [...prev, movie]);
      toast.success('Added to Liked ❤️');
    } else {
      toast.info('Already in Liked!');
    }
  };

  // Add to Watch Later
  const addToWatchLater = (movie) => {
    if (!watchLater.find((m) => m.imdbID === movie.imdbID)) {
      setWatchLater((prev) => [...prev, movie]);
      toast.success('Saved to Watch Later ⏰');
    } else {
      toast.info('Already in Watch Later!');
    }
  };

  return (
    <MovieContext.Provider
      value={{
        likedMovies,
        watchLater,
        addToLiked,
        addToWatchLater,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export default MovieProvider;
