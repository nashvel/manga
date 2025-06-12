import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MangaContext } from '../context/MangaContext';
import { FaArrowLeft, FaArrowRight, FaCog, FaList, FaHome } from 'react-icons/fa';

const Reader = () => {
  const { mangaId, chapterId } = useParams();
  const { popularManga, updateReadingHistory } = useContext(MangaContext);
  const [manga, setManga] = useState(null);
  const [chapter, setChapter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isReaderSettingsOpen, setIsReaderSettingsOpen] = useState(false);
  const [readerMode, setReaderMode] = useState('vertical'); // vertical or horizontal

  useEffect(() => {
    // In a real app, you would fetch the manga and chapter details from an API
    // For this demo, we'll just find the manga in the popularManga array
    const foundManga = popularManga.find(m => m.id === mangaId);
    if (foundManga) {
      setManga(foundManga);
      
      // Create a dummy chapter
      const chapterNumber = parseInt(chapterId.split('-')[1]);
      const dummyChapter = {
        id: chapterId,
        number: chapterNumber,
        title: `Chapter ${chapterNumber}`,
        pages: Array.from({ length: 20 }, (_, i) => ({
          id: `page-${i + 1}`,
          imageUrl: foundManga.coverImage, // Using cover image as page image for demo
        })),
      };
      
      setChapter(dummyChapter);
      
      // Update reading history
      updateReadingHistory(foundManga, dummyChapter);
    }
  }, [mangaId, chapterId, popularManga, updateReadingHistory]);

  const handleNextPage = () => {
    if (chapter && currentPage < chapter.pages.length) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextChapter = () => {
    // In a real app, you would navigate to the next chapter
    // For this demo, we'll just increment the chapter number
    const nextChapterNumber = parseInt(chapterId.split('-')[1]) + 1;
    window.location.href = `/read/${mangaId}/chapter-${nextChapterNumber}`;
  };

  const handlePrevChapter = () => {
    // In a real app, you would navigate to the previous chapter
    // For this demo, we'll just decrement the chapter number
    const prevChapterNumber = Math.max(1, parseInt(chapterId.split('-')[1]) - 1);
    window.location.href = `/read/${mangaId}/chapter-${prevChapterNumber}`;
  };

  const toggleReaderSettings = () => {
    setIsReaderSettingsOpen(!isReaderSettingsOpen);
  };

  if (!manga || !chapter) {
    return <LoadingContainer>Loading chapter...</LoadingContainer>;
  }

  return (
    <ReaderContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      $readerMode={readerMode}
    >
      <ReaderHeader>
        <HeaderLeft>
          <HomeButton to="/">
            <FaHome />
          </HomeButton>
          <MangaLink to={`/manga/${mangaId}`}>
            <span>{manga.title}</span>
          </MangaLink>
          <ChapterInfo>
            Chapter {chapter.number}: {chapter.title}
          </ChapterInfo>
        </HeaderLeft>
        
        <HeaderRight>
          <ReaderButton onClick={toggleReaderSettings}>
            <FaCog />
          </ReaderButton>
          <ChaptersButton to={`/manga/${mangaId}`}>
            <FaList />
          </ChaptersButton>
        </HeaderRight>
      </ReaderHeader>
      
      {isReaderSettingsOpen && (
        <ReaderSettings>
          <SettingsTitle>Reader Settings</SettingsTitle>
          <SettingsOption>
            <SettingsLabel>Reading Mode:</SettingsLabel>
            <SettingsButtons>
              <SettingsButton 
                $isActive={readerMode === 'vertical'}
                onClick={() => setReaderMode('vertical')}
              >
                Vertical
              </SettingsButton>
              <SettingsButton 
                $isActive={readerMode === 'horizontal'}
                onClick={() => setReaderMode('horizontal')}
              >
                Horizontal
              </SettingsButton>
            </SettingsButtons>
          </SettingsOption>
        </ReaderSettings>
      )}
      
      <ReaderContent $readerMode={readerMode}>
        {readerMode === 'vertical' ? (
          // Vertical reading mode - all pages in a column
          chapter.pages.map((page, index) => (
            <PageContainer key={page.id}>
              <PageImage 
                src={page.imageUrl} 
                alt={`Page ${index + 1}`} 
                loading="lazy"
              />
            </PageContainer>
          ))
        ) : (
          // Horizontal reading mode - one page at a time
          <PageContainer>
            <PageImage 
              src={chapter.pages[currentPage - 1].imageUrl} 
              alt={`Page ${currentPage}`} 
            />
            <PageNavigation>
              <PageNumber>
                Page {currentPage} of {chapter.pages.length}
              </PageNumber>
              <PageButtons>
                <PageButton 
                  onClick={handlePrevPage} 
                  disabled={currentPage === 1}
                >
                  <FaArrowLeft /> Previous
                </PageButton>
                <PageButton 
                  onClick={handleNextPage} 
                  disabled={currentPage === chapter.pages.length}
                >
                  Next <FaArrowRight />
                </PageButton>
              </PageButtons>
            </PageNavigation>
          </PageContainer>
        )}
      </ReaderContent>
      
      <ReaderFooter>
        <FooterButton 
          onClick={handlePrevChapter}
          disabled={chapter.number === 1}
        >
          <FaArrowLeft /> Previous Chapter
        </FooterButton>
        
        <FooterButton onClick={handleNextChapter}>
          Next Chapter <FaArrowRight />
        </FooterButton>
      </ReaderFooter>
    </ReaderContainer>
  );
};

// Styled Components
const ReaderContainer = styled(motion.div)`
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  padding-top: ${({ $readerMode }) => $readerMode === 'vertical' ? '60px' : '0'};
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.primary};
`;

const ReaderHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: ${({ theme }) => theme.cardBg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  z-index: 100;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const HomeButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primary};
  color: white;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const MangaLink = styled(Link)`
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme.primary};
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const ChapterInfo = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};
  
  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

const ReaderButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.border};
  }
`;

const ChaptersButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: transparent;
  color: ${({ theme }) => theme.text};
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.border};
  }
`;

const ReaderSettings = styled.div`
  position: fixed;
  top: 60px;
  right: 0;
  width: 300px;
  background: ${({ theme }) => theme.cardBg};
  border-radius: 0 0 0 12px;
  padding: 1rem;
  z-index: 99;
  box-shadow: ${({ theme }) => theme.shadow};
`;

const SettingsTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const SettingsOption = styled.div`
  margin-bottom: 1rem;
`;

const SettingsLabel = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const SettingsButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SettingsButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  background: ${({ $isActive, theme }) => $isActive ? theme.primary : theme.border};
  color: ${({ $isActive }) => $isActive ? 'white' : 'inherit'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ $isActive, theme }) => $isActive ? theme.primary : theme.borderHover};
  }
`;

const ReaderContent = styled.div`
  display: flex;
  flex-direction: ${({ $readerMode }) => $readerMode === 'vertical' ? 'column' : 'row'};
  align-items: center;
  justify-content: center;
  padding: ${({ $readerMode }) => $readerMode === 'vertical' ? '0' : '60px 0 0'};
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  margin: 0 auto;
`;

const PageImage = styled.img`
  max-width: 100%;
  height: auto;
  object-fit: contain;
`;

const PageNavigation = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1rem;
  gap: 1rem;
`;

const PageNumber = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.textSecondary};
`;

const PageButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const PageButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: ${({ theme }) => theme.cardBg};
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ReaderFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background: ${({ theme }) => theme.cardBg};
  margin-top: 2rem;
`;

const FooterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 4px 15px rgba(108, 92, 231, 0.4);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: ${({ theme }) => theme.border};
    color: ${({ theme }) => theme.textSecondary};
  }
`;

export default Reader;