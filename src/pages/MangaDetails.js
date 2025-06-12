import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MangaContext } from '../context/MangaContext';
import { FaStar, FaBookmark, FaRegBookmark, FaList, FaCalendar, FaUser, FaArrowLeft } from 'react-icons/fa';

const MangaDetails = () => {
  const { id } = useParams();
  const { popularManga, favorites, addToFavorites, removeFromFavorites, loading, error } = useContext(MangaContext);
  const [manga, setManga] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState('chapters');

  useEffect(() => {
    // In a real app, you would fetch the manga details by ID from an API
    // For this demo, we'll just find it in the popularManga array
    const foundManga = popularManga.find(m => m.id === id);
    if (foundManga) {
      setManga(foundManga);
      setIsFavorite(favorites.some(fav => fav.id === id));
    }
  }, [id, popularManga, favorites]);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(id);
    } else {
      addToFavorites(manga);
    }
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return <LoadingContainer>Loading manga details...</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  if (!manga) {
    return <ErrorContainer>Manga not found</ErrorContainer>;
  }

  // Generate some dummy chapters for the demo
  const chapters = Array.from({ length: 20 }, (_, i) => ({
    id: `chapter-${i + 1}`,
    number: i + 1,
    title: `Chapter ${i + 1}`,
    releaseDate: new Date(Date.now() - i * 86400000).toLocaleDateString(),
  }));

  return (
    <DetailsContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <BackButton to="/">
        <FaArrowLeft /> Back
      </BackButton>
      
      <HeroSection style={{ backgroundImage: `url(${manga.coverImage})` }}>
        <HeroOverlay />
        <DetailsContent>
          <CoverContainer>
            <CoverImage src={manga.coverImage} alt={manga.title} />
          </CoverContainer>
          
          <InfoContainer>
            <Title>{manga.title}</Title>
            
            <GenreList>
              {manga.genres.map(genre => (
                <GenreTag key={genre}>{genre}</GenreTag>
              ))}
            </GenreList>
            
            <RatingContainer>
              <FaStar /> <RatingText>{manga.rating}</RatingText>
            </RatingContainer>
            
            <Description>
              {manga.description || 'No description available for this manga. The story follows the protagonist on an epic journey through a fantastical world filled with adventure, friendship, and challenges to overcome.'}
            </Description>
            
            <MetaInfo>
              <MetaItem>
                <FaUser /> <span>Author: {manga.author || 'Unknown'}</span>
              </MetaItem>
              <MetaItem>
                <FaCalendar /> <span>Status: {manga.status || 'Ongoing'}</span>
              </MetaItem>
            </MetaInfo>
            
            <ActionButtons>
              <ReadButton to={`/read/${manga.id}/chapter-1`}>
                Start Reading
              </ReadButton>
              <FavoriteButton onClick={handleFavoriteToggle}>
                {isFavorite ? <FaBookmark /> : <FaRegBookmark />}
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </FavoriteButton>
            </ActionButtons>
          </InfoContainer>
        </DetailsContent>
      </HeroSection>
      
      <ContentSection>
        <TabsContainer>
          <Tab 
            $isActive={activeTab === 'chapters'} 
            onClick={() => setActiveTab('chapters')}
          >
            <FaList /> Chapters
          </Tab>
          <Tab 
            $isActive={activeTab === 'comments'} 
            onClick={() => setActiveTab('comments')}
          >
            Comments
          </Tab>
        </TabsContainer>
        
        {activeTab === 'chapters' && (
          <ChaptersList>
            {chapters.map(chapter => (
              <ChapterItem 
                key={chapter.id}
                to={`/read/${manga.id}/${chapter.id}`}
                whileHover={{ backgroundColor: 'rgba(108, 92, 231, 0.1)' }}
              >
                <ChapterInfo>
                  <ChapterTitle>Chapter {chapter.number}</ChapterTitle>
                  <ChapterSubtitle>{chapter.title}</ChapterSubtitle>
                </ChapterInfo>
                <ChapterDate>{chapter.releaseDate}</ChapterDate>
              </ChapterItem>
            ))}
          </ChaptersList>
        )}
        
        {activeTab === 'comments' && (
          <CommentsSection>
            <EmptyState>
              No comments yet. Be the first to share your thoughts!
            </EmptyState>
          </CommentsSection>
        )}
      </ContentSection>
    </DetailsContainer>
  );
};

// Styled Components
const DetailsContainer = styled(motion.div)`
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

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  margin: 1rem 0 0 2rem;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const HeroSection = styled.section`
  position: relative;
  background-size: cover;
  background-position: center;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(15, 22, 36, 0.8) 0%, rgba(15, 22, 36, 0.95) 100%);
  z-index: 1;
`;

const DetailsContent = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  max-width: 1200px;
  width: 100%;
  padding: 2rem;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const CoverContainer = styled.div`
  flex-shrink: 0;
`;

const CoverImage = styled.img`
  width: 250px;
  height: 350px;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.cardShadow};
  
  @media (max-width: 768px) {
    width: 200px;
    height: 300px;
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const GenreList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const GenreTag = styled.span`
  background: rgba(108, 92, 231, 0.2);
  color: ${({ theme }) => theme.primary};
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.accent};
  margin-bottom: 0.5rem;
`;

const RatingText = styled.span`
  font-weight: 700;
  font-size: 1.2rem;
`;

const Description = styled.p`
  color: ${({ theme }) => theme.textSecondary};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const ReadButton = styled(Link)`
  padding: 0.8rem 1.5rem;
  background: ${({ theme }) => theme.gradientPrimary};
  color: white;
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(108, 92, 231, 0.4);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 20px rgba(108, 92, 231, 0.6);
  }
`;

const FavoriteButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: 2px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const TabsContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  padding-bottom: 1rem;
`;

const Tab = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ $isActive, theme }) => $isActive ? theme.primary : theme.textSecondary};
  padding-bottom: 0.5rem;
  cursor: pointer;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1rem;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ $isActive, theme }) => $isActive ? theme.primary : 'transparent'};
    border-radius: 3px 3px 0 0;
    transition: all 0.3s ease;
  }
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const ChaptersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ChapterItem = styled(motion(Link))`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 8px;
  background: ${({ theme }) => theme.cardBg};
  transition: all 0.3s ease;
`;

const ChapterInfo = styled.div``;

const ChapterTitle = styled.h3`
  font-weight: 600;
  margin-bottom: 0.2rem;
`;

const ChapterSubtitle = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const ChapterDate = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const CommentsSection = styled.div`
  padding: 2rem 0;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${({ theme }) => theme.textSecondary};
  background: ${({ theme }) => theme.cardBg};
  border-radius: 12px;
`;

export default MangaDetails;