import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar';
import SearchResults from './pages/SearchResults';
import LikedMovies from './pages/LikedMovies';
import WatchLater from './pages/WatchLater';
import MovieDetails from './pages/MovieDetails';
import Home from './pages/Home';
import GenrePage from './pages/GenrePage'; // ✅ Genre page route
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#111] text-white' : 'bg-[#FFFBF5] text-black'}`}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/liked" element={<LikedMovies />} />
        <Route path="/watch-later" element={<WatchLater />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/genre/:genre" element={<GenrePage />} />

  {/* ✅ Working Genre Page */}
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme={darkMode ? 'dark' : 'light'}
      />
    </div>
  );
}

export default App;
