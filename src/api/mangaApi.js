import axios from 'axios';

// For demo purposes, we'll use mock data
// In a real app, you would connect to a real API

// Mock data for popular manga
const mockPopularManga = [
  {
    id: '1',
    title: 'One Piece',
    description: 'Follow Monkey D. Luffy and his swashbuckling crew in their search for the ultimate treasure, One Piece.',
    coverImage: 'https://cdn.myanimelist.net/images/manga/3/55539.jpg',
    author: 'Eiichiro Oda',
    status: 'Ongoing',
    genres: ['Action', 'Adventure', 'Comedy', 'Fantasy'],
    rating: 9.8,
  },
  {
    id: '2',
    title: 'Berserk',
    description: 'Guts, a former mercenary now known as the "Black Swordsman," seeks revenge.',
    coverImage: 'https://cdn.myanimelist.net/images/manga/1/157897.jpg',
    author: 'Kentaro Miura',
    status: 'Ongoing',
    genres: ['Action', 'Adventure', 'Drama', 'Fantasy', 'Horror'],
    rating: 9.7,
  },
  {
    id: '3',
    title: 'Vagabond',
    description: 'A portrayal of the life of Japanese swordsman Miyamoto Musashi.',
    coverImage: 'https://cdn.myanimelist.net/images/manga/1/259070.jpg',
    author: 'Takehiko Inoue',
    status: 'On Hiatus',
    genres: ['Action', 'Adventure', 'Drama', 'Historical'],
    rating: 9.5,
  },
  {
    id: '4',
    title: 'Vinland Saga',
    description: 'Thorfinn pursues a journey with his father\'s killer in order to take revenge.',
    coverImage: 'https://cdn.myanimelist.net/images/manga/2/188925.jpg',
    author: 'Makoto Yukimura',
    status: 'Ongoing',
    genres: ['Action', 'Adventure', 'Drama', 'Historical'],
    rating: 9.3,
  },
  {
    id: '5',
    title: 'Attack on Titan',
    description: 'In a world where giant humanoid Titans prey on humans, Eren joins the scouting legion to get revenge.',
    coverImage: 'https://cdn.myanimelist.net/images/manga/2/37846.jpg',
    author: 'Hajime Isayama',
    status: 'Completed',
    genres: ['Action', 'Drama', 'Fantasy', 'Horror'],
    rating: 9.4,
  },
  {
    id: '6',
    title: 'Chainsaw Man',
    description: 'Denji has a simple dream—to live a happy and peaceful life, spending time with a girl he likes.',
    coverImage: 'https://cdn.myanimelist.net/images/manga/3/216464.jpg',
    author: 'Tatsuki Fujimoto',
    status: 'Ongoing',
    genres: ['Action', 'Adventure', 'Comedy', 'Horror'],
    rating: 9.2,
  },
  {
    id: '7',
    title: 'Jujutsu Kaisen',
    description: 'A boy swallows a cursed talisman - the finger of a demon - and becomes cursed himself.',
    coverImage: 'https://cdn.myanimelist.net/images/manga/3/211050.jpg',
    author: 'Gege Akutami',
    status: 'Ongoing',
    genres: ['Action', 'Fantasy', 'Horror'],
    rating: 9.1,
  },
  {
    id: '8',
    title: 'Demon Slayer',
    description: 'Tanjiro sets out to become a demon slayer after his family is slaughtered and his sister turned into a demon.',
    coverImage: 'https://cdn.myanimelist.net/images/manga/3/179023.jpg',
    author: 'Koyoharu Gotouge',
    status: 'Completed',
    genres: ['Action', 'Fantasy', 'Historical'],
    rating: 9.0,
  },
];

// Mock chapters data
const mockChapters = {
  '1': [
    { id: '101', number: 1, title: 'Romance Dawn', date: '2023-01-01', pages: 45 },
    { id: '102', number: 2, title: 'They Call Him Luffy', date: '2023-01-08', pages: 42 },
    { id: '103', number: 3, title: 'Enter Zoro', date: '2023-01-15', pages: 40 },
    // More chapters...
  ],
  '2': [
    { id: '201', number: 1, title: 'The Black Swordsman', date: '2023-01-01', pages: 48 },
    { id: '202', number: 2, title: 'The Brand', date: '2023-01-08', pages: 46 },
    { id: '203', number: 3, title: 'The Guardians of Desire', date: '2023-01-15', pages: 44 },
    // More chapters...
  ],
  // More manga chapters...
};

// Mock pages data (URLs to page images)
const mockPages = {
  '101': Array(45).fill().map((_, i) => `https://picsum.photos/800/1200?random=${i+1}`),
  '102': Array(42).fill().map((_, i) => `https://picsum.photos/800/1200?random=${i+100}`),
  '201': Array(48).fill().map((_, i) => `https://picsum.photos/800/1200?random=${i+200}`),
  // More chapter pages...
};

// API functions
export const fetchPopularManga = async () => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPopularManga);
    }, 500);
  });
};

export const fetchMangaDetails = async (mangaId) => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const manga = mockPopularManga.find(m => m.id === mangaId);
      if (manga) {
        resolve(manga);
      } else {
        reject(new Error('Manga not found'));
      }
    }, 300);
  });
};

export const fetchMangaChapters = async (mangaId) => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const chapters = mockChapters[mangaId];
      if (chapters) {
        resolve(chapters);
      } else {
        reject(new Error('Chapters not found'));
      }
    }, 300);
  });
};

export const fetchChapterPages = async (chapterId) => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const pages = mockPages[chapterId];
      if (pages) {
        resolve(pages);
      } else {
        reject(new Error('Pages not found'));
      }
    }, 300);
  });
};

export const searchManga = async (query) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = mockPopularManga.filter(manga => 
        manga.title.toLowerCase().includes(query.toLowerCase())
      );
      resolve(results);
    }, 300);
  });
};