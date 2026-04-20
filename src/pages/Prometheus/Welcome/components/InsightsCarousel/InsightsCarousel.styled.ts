import styled from 'styled-components';

export const CarouselSection = styled.section`
  position: relative;
  margin-bottom: 3rem;
`;

export const CarouselHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
`;

export const CarouselTitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #cfc2d6;
  margin: 0;
`;

export const NavButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const NavButton = styled.button`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  border: none;
  background: #1f1f1f;
  color: #cfc2d6;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease;

  &:hover {
    background: #393939;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  svg {
    font-size: 1rem;
  }
`;

export const Track = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 1.5rem;
  padding-bottom: 2rem;
  margin: 0 -1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`;
