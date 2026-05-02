import styled, { css } from 'styled-components';

export const DesktopSidebar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 40;
  width: 16rem;
  background: #0a0a0a;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
  display: none;
  flex-direction: column;
  padding: 2rem 0;

  @media (min-width: 1024px) {
    display: flex;
  }
`;

export const LogoBlock = styled.div`
  padding: 0 2rem;
  margin-bottom: 3rem;
`;

export const LogoText = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  color: #ddb7ff;
`;

export const NavList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const navItemBase = css`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1rem 2rem;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.15s ease;
  border: none;
  background: none;
  width: 100%;
  text-align: left;

  svg {
    font-size: 1.25rem;
    flex-shrink: 0;
  }
`;

export const NavItem = styled.button<{ $active?: boolean }>`
  ${navItemBase}

  ${({ $active }) =>
    $active
      ? css`
          color: #ddb7ff;
          background: rgba(221, 183, 255, 0.05);
          border-left: 3px solid #ddb7ff;
          padding-left: calc(2rem - 3px);
        `
      : css`
          color: #71717a;
          border-left: 3px solid transparent;
          padding-left: calc(2rem - 3px);

          &:hover {
            color: #ddb7ff;
          }
        `}
`;

export const MobileBar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  height: 4rem;
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const MobileLogoText = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.625rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  color: #ddb7ff;
`;

export const MobileNavRow = styled.nav`
  position: fixed;
  top: 4rem;
  left: 0;
  right: 0;
  z-index: 49;
  display: flex;
  align-items: center;
  gap: 0;
  background: rgba(10, 10, 10, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const MobileNavItem = styled.button<{ $active?: boolean }>`
  flex-shrink: 0;
  padding: 0.75rem 1rem;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.5625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  border: none;
  background: none;
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.15s ease;

  ${({ $active }) =>
    $active
      ? css`
          color: #ddb7ff;
          border-bottom: 2px solid #ddb7ff;
        `
      : css`
          color: #71717a;
          border-bottom: 2px solid transparent;

          &:hover {
            color: #ddb7ff;
          }
        `}
`;

export const ProfileCircle = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: #2a2a2a;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(221, 183, 255, 0.2);
  color: #ddb7ff;
  cursor: pointer;

  svg {
    font-size: 1rem;
  }
`;
