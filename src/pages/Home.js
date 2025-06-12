import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MangaContext } from '../context/MangaContext';
import { FaStar, FaBookmark, FaHistory, FaArrowRight } from 'react-icons/fa';

const Home = () => {
  const { 
    popularManga, 
    recentUpdates, 
    readingHistory, 
    loading, 
    error 
  } = useContext(MangaContext);

  if (loading) {
    return <LoadingContainer>Loading amazing manga content...</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>{error}</ErrorContainer>;
  }

  return (
    <HomeContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection>
        <HeroContent>
          <HeroTitle
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Discover and Read <GradientText>Manga</GradientText> Like Never Before
          </HeroTitle>
          <HeroSubtitle
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Immerse yourself in stunning visuals and seamless reading experience
          </HeroSubtitle>
          <HeroButtons
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <PrimaryButton to="/discover">
              Explore Manga <FaArrowRight />
            </PrimaryButton>
          </HeroButtons>
        </HeroContent>
        <HeroImageContainer
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <HeroImage src={popularManga[0]?.coverImage} alt="Featured Manga" />
        </HeroImageContainer>
      </HeroSection>

      {readingHistory.length > 0 && (
        <Section>
          <SectionHeader>
            <SectionTitle><FaHistory /> Continue Reading</SectionTitle>
            <ViewAllLink to="/history">View All</ViewAllLink>
          </SectionHeader>
          <ContinueReadingGrid>
            {readingHistory.slice(0, 3).map((item) => (
              <ContinueReadingCard 
                key={`${item.mangaId}-${item.chapterId}`}
                to={`/read/${item.mangaId}/${item.chapterId}`}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <ContinueReadingCover src={item.mangaCover} alt={item.mangaTitle} />
                <ContinueReadingInfo>
                  <ContinueReadingTitle>{item.mangaTitle}</ContinueReadingTitle>
                  <ContinueReadingChapter>Chapter {item.chapterNumber}</ContinueReadingChapter>
                  <ReadingProgress>
                    <ProgressBar $progress={Math.random() * 100} />
                  </ReadingProgress>
                </ContinueReadingInfo>
              </ContinueReadingCard>
            ))}
          </ContinueReadingGrid>
        </Section>
      )}

      <Section>
        <SectionHeader>
          <SectionTitle><FaStar /> Popular Manga</SectionTitle>
          <ViewAllLink to="/discover">View All</ViewAllLink>
        </SectionHeader>
        <MangaGrid>
          {popularManga.slice(0, 8).map((manga, index) => (
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
                transition: { delay: 0.1 * index, duration: 0.5 }
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
      </Section>

      <Section>
        <SectionHeader>
          <SectionTitle><FaBookmark /> Recent Updates</SectionTitle>
          <ViewAllLink to="/recent">View All</ViewAllLink>
        </SectionHeader>
        <RecentUpdatesGrid>
          {recentUpdates.slice(0, 6).map((manga, index) => (
            <RecentUpdateCard 
              key={manga.id}
              to={`/manga/${manga.id}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                transition: { delay: 0.1 * index, duration: 0.5 }
              }}
            >
              <RecentUpdateCover src={manga.coverImage} alt={manga.title} />
              <RecentUpdateContent>
                <RecentUpdateTitle>{manga.title}</RecentUpdateTitle>
                <RecentUpdateInfo>
                  <RecentUpdateChapter>Chapter {Math.floor(Math.random() * 100) + 1}</RecentUpdateChapter>
                  <RecentUpdateDate>{new Date().toLocaleDateString()}</RecentUpdateDate>
                </RecentUpdateInfo>
              </RecentUpdateContent>
            </RecentUpdateCard>
          ))}
        </RecentUpdatesGrid>
      </Section>
      
      <FooterSection>
        <FooterContent>
          <FooterLogo>Manga<FooterLogoSpan>Verse</FooterLogoSpan></FooterLogo>
          <FooterText>
            The ultimate manga reading experience. Discover, read, and enjoy your favorite manga titles.
          </FooterText>
          <FooterLinks>
            <FooterLink to="/about">About</FooterLink>
            <FooterLink to="/terms">Terms</FooterLink>
            <FooterLink to="/privacy">Privacy</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
          </FooterLinks>
          <FooterCopyright>
            © {new Date().getFullYear()} MangaVerse. All rights reserved.
          </FooterCopyright>
        </FooterContent>
      </FooterSection>
    </HomeContainer>
  );
};

// Styled Components
const HomeContainer = styled(motion.div)`
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

const Section = styled.section`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
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

const ViewAllLink = styled(Link)`
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.secondary};
  }
`;

const HeroSection = styled.section`
  display: flex;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 992px) {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
`;

const HeroContent = styled.div`
  flex: 1;
  padding-right: 2rem;
  
  @media (max-width: 992px) {
    padding-right: 0;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  
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
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.textSecondary};
  max-width: 500px;
  
  @media (max-width: 992px) {
    margin: 0 auto 2rem;
  }
`;

const HeroButtons = styled(motion.div)`
  display: flex;
  gap: 1rem;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
`;

const PrimaryButton = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
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

const HeroImageContainer = styled(motion.div)`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(108, 92, 231, 0.2) 0%, rgba(15, 22, 36, 0) 70%);
    z-index: -1;
  }
`;

const HeroImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 20px;
  box-shadow: ${({ theme }) => theme.cardShadow};
  transform: perspective(1000px) rotateY(-5deg);
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

const ContinueReadingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ContinueReadingCard = styled(motion(Link))`
  display: flex;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.cardShadow};
`;

const ContinueReadingCover = styled.img`
  width: 80px;
  height: 120px;
  object-fit: cover;
`;

const ContinueReadingInfo = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const ContinueReadingTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
`;

const ContinueReadingChapter = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};
  margin-bottom: auto;
`;

const ReadingProgress = styled.div`
  height: 4px;
  background: ${({ theme }) => theme.border};
  border-radius: 2px;
  overflow: hidden;
  margin-top: 0.5rem;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: ${({ $progress }) => `${$progress}%`};
  background: ${({ theme }) => theme.gradientPrimary};
`;

const RecentUpdatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const RecentUpdateCard = styled(motion(Link))`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 12px;
  overflow: hidden;
  padding: 0.5rem;
  box-shadow: ${({ theme }) => theme.cardShadow};
`;

const RecentUpdateCover = styled.img`
  width: 60px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
`;

const RecentUpdateContent = styled.div`
  flex: 1;
  padding: 0 1rem;
`;

const RecentUpdateTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RecentUpdateInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RecentUpdateChapter = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
`;

const RecentUpdateDate = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const FooterSection = styled.footer`
  background: ${({ theme }) => theme.cardBg};
  padding: 3rem 2rem;
  margin-top: 3rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const FooterLogo = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: ${({ theme }) => theme.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const FooterLogoSpan = styled.span`
  background: ${({ theme }) => theme.gradientSecondary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const FooterText = styled.p`
  max-width: 600px;
  margin: 0 auto 2rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

const FooterLink = styled(Link)`
  color: ${({ theme }) => theme.text};
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
`;

const FooterCopyright = styled.div`
  color: ${({ theme }) => theme.textSecondary};
  font-size: 0.9rem;
`;

export default Home;