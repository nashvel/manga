import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MangaContext } from '../context/MangaContext';
import { FaFilter, FaSearch, FaStar, FaBookmark } from 'react-icons/fa';

const Discover = () => {
  const { popularManga, loading, error } = useContext(MangaContext);
  const [activeGenre, setActiveGenre] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sample genres for the filter
  const genres = [
    'All', 'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 
    'Horror', 'Mystery', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports'
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleGenreChange = (genre) => {
    setActiveGenre(genre);
    setIsFilterOpen(false);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Filter manga based on search query and selected genre
  const filteredManga = popularManga.filter(manga => {
    const matchesSearch = manga.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = activeGenre === 'All' || manga.genres.includes(activeGenre);
    return matchesSearch && matchesGenre;
  });

  if (loading) {
    return <LoadingContainer>Loading manga collection...</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  return (
    <DiscoverContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection>
        <HeroContent>
          <HeroTitle
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Discover Amazing <GradientText>Manga</GradientText>
          </HeroTitle>
          <HeroSubtitle
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Find your next favorite series from our vast collection
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        <SearchFilterContainer>
          <SearchContainer>
            <SearchIcon>
              <FaSearch />
            </SearchIcon>
            <SearchInput 
              type="text" 
              placeholder="Search manga..." 
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </SearchContainer>
          
          <FilterButton onClick={toggleFilter}>
            <FaFilter /> Filter
          </FilterButton>
        </SearchFilterContainer>
        
        {isFilterOpen && (
          <FilterContainer
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <FilterTitle>Genres</FilterTitle>
            <GenreList>
              {genres.map(genre => (
                <GenreButton 
                  key={genre}
                  $isActive={activeGenre === genre}
                  onClick={() => handleGenreChange(genre)}
                >
                  {genre}
                </GenreButton>
              ))}
            </GenreList>
          </FilterContainer>
        )}
        
        <ResultsInfo>
          <ResultsCount>
            {filteredManga.length} {filteredManga.length === 1 ? 'manga' : 'manga series'} found
          </ResultsCount>
          {activeGenre !== 'All' && (
            <ActiveFilter>
              Genre: {activeGenre} <ClearButton onClick={() => setActiveGenre('All')}>×</ClearButton>
            </ActiveFilter>
          )}
        </ResultsInfo>
        
        <MangaGrid>
          {filteredManga.map((manga, index) => (
            <MangaCard 
              key={manga.id}
              to={`/manga/${manga.id}`}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.05 * index, duration: 0.5 }
              }}
            >
              <MangaCover src={manga.coverImage} alt={manga.title} />
              <MangaOverlay>
                <MangaTitle>{manga.title}</MangaTitle>
                <MangaInfo>
                  <MangaRating>
                    <FaStar /> {manga.rating}
                  </MangaRating>
                  <MangaGenres>
                    {manga.genres.slice(0, 2).join(', ')}
                  </MangaGenres>
                </MangaInfo>
              </MangaOverlay>
            </MangaCard>
          ))}
        </MangaGrid>
        
        {filteredManga.length === 0 && (
          <EmptyState>
            <EmptyStateText>No manga found matching your criteria</EmptyStateText>
            <EmptyStateButton onClick={() => {
              setSearchQuery('');
              setActiveGenre('All');
            }}>
              Clear Filters
            </EmptyStateButton>
          </EmptyState>
        )}
      </ContentSection>
    </DiscoverContainer>
  );
};

// Styled Components
const DiscoverContainer = styled(motion.div)`
  padding-top: ${({ theme }) => theme.navHeight};
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary};
`;

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.error};
`;

const HeroSection = styled.section`
  background: linear-gradient(to right, rgba(15, 22, 36, 0.9), rgba(15, 22, 36, 0.7)), 
              url('https://images.unsplash.com/photo-1560942485-b5c7132a3631?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  padding: 4rem 2rem;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const GradientText = styled.span`
  background: ${({ theme }) => theme.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.textSecondary};
  max-width: 600px;
  margin: 0 auto;
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const SearchFilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const SearchContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 8px;
  padding: 0 1rem;
  box-shadow: ${({ theme }) => theme.cardShadow};
`;

const SearchIcon = styled.div`
  color: ${({ theme }) => theme.textSecondary};
  margin-right: 0.5rem;
`;

const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  padding: 1rem 0;
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  
  &:focus {
    outline: none;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.textSecondary};
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1.5rem;
  background: ${({ theme }) => theme.cardBg};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${({ theme }) => theme.cardShadow};
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const FilterContainer = styled(motion.div)`
  background: ${({ theme }) => theme.cardBg};
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: ${({ theme }) => theme.cardShadow};
`;

const FilterTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const GenreButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: none;
  background: ${({ $isActive, theme }) => $isActive ? theme.primary : theme.border};
  color: ${({ $isActive, theme }) => $isActive ? 'white' : theme.text};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ $isActive, theme }) => $isActive ? theme.primary : theme.borderHover};
  }
`;

const ResultsInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
`;

const ResultsCount = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const ActiveFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.8rem;
  background: ${({ theme }) => theme.primary};
  color: white;
  border-radius: 20px;
  font-size: 0.9rem;
`;

const ClearButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MangaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 2rem;
  
  @media (max-width: 576px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
  }
`;

const MangaCard = styled(motion(Link))`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.cardShadow};
  aspect-ratio: 2/3;
`;

const MangaCover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${MangaCard}:hover & {
    transform: scale(1.05);
  }
`;

const MangaOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem 1rem 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
  transition: all 0.3s ease;
  
  ${MangaCard}:hover & {
    padding-bottom: 2rem;
  }
`;

const MangaTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
`;

const MangaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MangaRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  color: ${({ theme }) => theme.accent};
  font-weight: 600;
  font-size: 0.9rem;
`;

const MangaGenres = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 12px;
  margin-top: 2rem;
`;

const EmptyStateText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const EmptyStateButton = styled.button`
  padding: 0.8rem 1.5rem;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 15px rgba(108, 92, 231, 0.4);
  }
`;

export default Discover;