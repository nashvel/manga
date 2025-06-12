import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MangaContext } from '../context/MangaContext';
import { FaStar, FaBookmark, FaTrash } from 'react-icons/fa';

const Favorites = () => {
  const { favorites, removeFromFavorites, loading, error } = useContext(MangaContext);

  if (loading) {
    return <LoadingContainer>Loading your favorites...</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  return (
    <FavoritesContainer
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
            Your <GradientText>Favorites</GradientText>
          </HeroTitle>
          <HeroSubtitle
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Your personally curated collection of amazing manga
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <ContentSection>
        {favorites.length === 0 ? (
          <EmptyState>
            <FaBookmark size={48} />
            <EmptyStateText>Your favorites list is empty</EmptyStateText>
            <EmptyStateSubtext>
              Start adding manga to your favorites to see them here
            </EmptyStateSubtext>
            <ExploreButton to="/discover">
              Explore Manga
            </ExploreButton>
          </EmptyState>
        ) : (
          <>
            <SectionHeader>
              <SectionTitle>
                <FaBookmark /> {favorites.length} {favorites.length === 1 ? 'Manga' : 'Manga Series'}
              </SectionTitle>
            </SectionHeader>
            
            <MangaGrid>
              {favorites.map((manga, index) => (
                <MangaCard 
                  key={manga.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.1 * index, duration: 0.5 }
                  }}
                >
                  <MangaLink to={`/manga/${manga.id}`}>
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
                  </MangaLink>
                  <RemoveButton 
                    onClick={() => removeFromFavorites(manga.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaTrash />
                  </RemoveButton>
                </MangaCard>
              ))}
            </MangaGrid>
          </>
        )}
      </ContentSection>
    </FavoritesContainer>
  );
};

// Styled Components
const FavoritesContainer = styled(motion.div)`
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

const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    color: ${({ theme }) => theme.primary};
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
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

const MangaCard = styled(motion.div)`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.cardShadow};
  aspect-ratio: 2/3;
`;

const MangaLink = styled(Link)`
  display: block;
  height: 100%;
`;

const MangaCover = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${MangaLink}:hover & {
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
  
  ${MangaLink}:hover & {
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

const RemoveButton = styled(motion.button)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: ${({ theme }) => theme.error};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.error};
    color: white;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 12px;
  color: ${({ theme }) => theme.textSecondary};
  
  svg {
    margin-bottom: 1.5rem;
  }
`;

const EmptyStateText = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.text};
`;

const EmptyStateSubtext = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const ExploreButton = styled(Link)`
  display: inline-block;
  padding: 0.8rem 1.5rem;
  background: ${({ theme }) => theme.gradientPrimary};
  color: white;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 15px rgba(108, 92, 231, 0.4);
  }
`;

export default Favorites;