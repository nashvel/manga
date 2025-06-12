import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaBookmark, FaHome, FaCompass, FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setMobileMenuOpen(false);
  }, [location]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching for:', searchQuery);
    setSearchOpen(false);
    setSearchQuery('');
  };

  return (
    <NavContainer 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      $isScrolled={isScrolled}
    >
      <NavContent>
        <LogoContainer to="/">
          <LogoText>Manga<LogoSpan>Verse</LogoSpan></LogoText>
        </LogoContainer>

        <NavLinks $mobileMenuOpen={mobileMenuOpen}>
          <NavLink 
            to="/"
            $isActive={location.pathname === '/'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaHome /> <span>Home</span>
          </NavLink>
          <NavLink 
            to="/discover"
            $isActive={location.pathname === '/discover'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaCompass /> <span>Discover</span>
          </NavLink>
          <NavLink 
            to="/favorites"
            $isActive={location.pathname === '/favorites'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaBookmark /> <span>Favorites</span>
          </NavLink>
        </NavLinks>

        <NavActions>
          <IconButton 
            onClick={() => setSearchOpen(!searchOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaSearch />
          </IconButton>
          <IconButton 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaMoon />
          </IconButton>
          <MobileMenuButton 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </MobileMenuButton>
        </NavActions>
      </NavContent>

      <AnimatePresence>
        {searchOpen && (
          <SearchContainer
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <SearchForm onSubmit={handleSearchSubmit}>
              <SearchInput 
                type="text" 
                placeholder="Search manga..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <SearchButton type="submit">
                <FaSearch />
              </SearchButton>
            </SearchForm>
          </SearchContainer>
        )}
      </AnimatePresence>
    </NavContainer>
  );
};

const NavContainer = styled(motion.nav)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${({ theme }) => theme.navHeight};
  background: ${({ $isScrolled, theme }) => 
    $isScrolled ? 'rgba(15, 22, 36, 0.95)' : 'transparent'};
  backdrop-filter: ${({ $isScrolled }) => 
    $isScrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${({ $isScrolled, theme }) => 
    $isScrolled ? theme.shadow : 'none'};
  z-index: 1000;
  transition: all 0.3s ease;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
`;

const LogoText = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  background: ${({ theme }) => theme.gradientPrimary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const LogoSpan = styled.span`
  background: ${({ theme }) => theme.gradientSecondary};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    position: fixed;
    top: ${({ theme }) => theme.navHeight};
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.background};
    flex-direction: column;
    padding: 2rem;
    gap: 1.5rem;
    transform: ${({ $mobileMenuOpen }) => 
      $mobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)'};
    opacity: ${({ $mobileMenuOpen }) => 
      $mobileMenuOpen ? '1' : '0'};
    visibility: ${({ $mobileMenuOpen }) => 
      $mobileMenuOpen ? 'visible' : 'hidden'};
    transition: all 0.3s ease;
    box-shadow: ${({ theme }) => theme.shadow};
    z-index: 999;
  }
`;

const NavLink = styled(motion(Link))`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: ${({ $isActive, theme }) => 
    $isActive ? theme.primary : theme.text};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: ${({ $isActive }) => $isActive ? '100%' : '0'};
    height: 2px;
    background: ${({ theme }) => theme.gradientPrimary};
    transition: width 0.3s ease;
  }
  
  &:hover::after {
    width: 100%;
  }
  
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.cardBg};
  color: ${({ theme }) => theme.text};
  font-size: 1.2rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.primary};
    color: white;
  }
`;

const MobileMenuButton = styled(IconButton)`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const SearchContainer = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.cardBg};
  box-shadow: ${({ theme }) => theme.shadow};
`;

const SearchForm = styled.form`
  display: flex;
  max-width: 600px;
  margin: 0 auto;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 8px 0 0 8px;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;
  
  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  padding: 0 1.5rem;
  background: ${({ theme }) => theme.primary};
  color: white;
  border-radius: 0 8px 8px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme.secondary};
  }
`;

export default Navbar;