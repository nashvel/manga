import React, { createContext, useState, useEffect } from 'react';
import { fetchPopularManga, fetchMangaDetails, fetchMangaChapters } from '../api/mangaApi';

export const MangaContext = createContext();

export const MangaProvider = ({ children }) => {
  const [popularManga, setPopularManga] = useState([]);
  const [recentUpdates, setRecentUpdates] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readingHistory, setReadingHistory] = useState([]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const popular = await fetchPopularManga();
        setPopularManga(popular);
        
        // Simulate recent updates with the same data for demo
        setRecentUpdates(popular.slice(0, 6));
        
        // Load favorites from localStorage
        const savedFavorites = localStorage.getItem('mangaFavorites');
        if (savedFavorites) {
          setFavorites(JSON.parse(savedFavorites));
        }
        
        // Load reading history from localStorage
        const savedHistory = localStorage.getItem('readingHistory');
        if (savedHistory) {
          setReadingHistory(JSON.parse(savedHistory));
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load manga data');
        setLoading(false);
      }
    };

    loadInitialData();
  }, []);

  const addToFavorites = (manga) => {
    const newFavorites = [...favorites, manga];
    setFavorites(newFavorites);
    localStorage.setItem('mangaFavorites', JSON.stringify(newFavorites));
  };

  const removeFromFavorites = (mangaId) => {
    const newFavorites = favorites.filter(manga => manga.id !== mangaId);
    setFavorites(newFavorites);
    localStorage.setItem('mangaFavorites', JSON.stringify(newFavorites));
  };

  const updateReadingHistory = (manga, chapter) => {
    const historyItem = {
      mangaId: manga.id,
      mangaTitle: manga.title,
      mangaCover: manga.coverImage,
      chapterId: chapter.id,
      chapterNumber: chapter.number,
      lastRead: new Date().toISOString(),
      pageRead: 1,
    };

    // Remove if exists and add to the beginning
    const filteredHistory = readingHistory.filter(
      item => !(item.mangaId === manga.id && item.chapterId === chapter.id)
    );
    
    const newHistory = [historyItem, ...filteredHistory].slice(0, 20); // Keep only last 20
    setReadingHistory(newHistory);
    localStorage.setItem('readingHistory', JSON.stringify(newHistory));
  };

  return (
    <MangaContext.Provider
      value={{
        popularManga,
        recentUpdates,
        favorites,
        loading,
        error,
        readingHistory,
        addToFavorites,
        removeFromFavorites,
        updateReadingHistory,
      }}
    >
      {children}
    </MangaContext.Provider>
  );
};