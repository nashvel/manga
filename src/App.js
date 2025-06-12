import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import GlobalStyle from './components/styles/GlobalStyle';
import { theme } from './components/styles/Theme';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MangaDetails from './pages/MangaDetails';
import Reader from './pages/Reader';
import Discover from './pages/Discover';
import Favorites from './pages/Favorites';
import { MangaProvider } from './context/MangaContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MangaProvider>
        <Router>
          <GlobalStyle />
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/manga/:id" element={<MangaDetails />} />
              <Route path="/read/:mangaId/:chapterId" element={<Reader />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </AnimatePresence>
        </Router>
      </MangaProvider>
    </ThemeProvider>
  );
}

export default App;
