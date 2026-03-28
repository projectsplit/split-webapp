import styled, { keyframes } from 'styled-components';

const slideUp = keyframes`
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  padding: 16px;
  z-index: 9999;
  pointer-events: none; /* Allows clicking through the overlay itself */
`;

export const PromptContainer = styled.div`
  background: ${({ theme }) => theme.layer2};
  border: 1px solid ${({ theme }) => theme.lightBorder};
  border-radius: 16px;
  padding: 16px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  pointer-events: auto; /* Re-enable pointer events for the banner */
  animation: ${slideUp} 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Icon = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  object-fit: contain;
  background: ${({ theme }) => theme.layer1};
`;

export const Title = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.primaryTextColor};
  font-size: 16px;
  font-weight: 600;
`;

export const Description = styled.p`
  margin: 4px 0 0 0;
  color: ${({ theme }) => theme.secondaryTextColor};
  font-size: 13px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export const ButtonBase = styled.button`
  border: none;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  border-radius: 8px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.2s;
`;

export const DismissButton = styled(ButtonBase)`
  background: transparent;
  color: ${({ theme }) => theme.secondaryTextColor};
  
  &:hover {
    color: ${({ theme }) => theme.primaryTextColor};
    background: ${({ theme }) => theme.layer1};
  }
`;

export const InstallButton = styled(ButtonBase)`
  background: ${({ theme }) => theme.highlightColor};
  color: #ffffff;
  
  &:hover {
    filter: brightness(1.1);
  }
`;
