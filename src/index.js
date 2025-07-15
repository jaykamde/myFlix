import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import MovieProvider from './context/MovieContext'; // 👈 import context provider
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <MovieProvider> {/* ✅ context wraps App inside Router */}
        <App />
      </MovieProvider>
    </BrowserRouter>
  </React.StrictMode>
);
