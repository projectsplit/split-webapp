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
  pointer-events: none;
`;

export const PromptContainer = styled.div`
  background: ${({ theme }) => theme.surface.card};
  border: 1px solid ${({ theme }) => theme.surface.hairline};
  border-radius: ${({ theme }) => theme.radius.dialog};
  padding: ${({ theme }) => theme.space.s16};
  width: 100%;
  max-width: 400px;
  box-shadow: ${({ theme }) => theme.shadow.banner};
  pointer-events: auto;
  animation: ${slideUp} 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.s16};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.s12};
`;

export const Icon = styled.img`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radius.iconButton};
  object-fit: contain;
  background: ${({ theme }) => theme.surface.hairline};
`;

export const Title = styled.h3`
  margin: 0;
  color: ${({ theme }) => theme.ink.primary};
  font-size: ${({ theme }) => theme.size.s15};
  font-weight: ${({ theme }) => theme.weight.semibold};
  letter-spacing: -0.01em;
`;

export const Description = styled.p`
  margin: ${({ theme }) => `${theme.space.s4} 0 0 0`};
  color: ${({ theme }) => theme.ink.secondary};
  font-size: ${({ theme }) => theme.size.s13};
  line-height: 1.5;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space.s10};
  justify-content: flex-end;
`;

const ButtonBase = styled.button`
  border: 1px solid transparent;
  font-family: inherit;
  font-size: ${({ theme }) => theme.size.s13};
  font-weight: ${({ theme }) => theme.weight.semibold};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: ${({ theme }) => `7px ${theme.space.s14}`};
  cursor: pointer;
  transition: all 0.2s;
`;

export const DismissButton = styled(ButtonBase)`
  background: transparent;
  border-color: ${({ theme }) => theme.surface.outline};
  color: ${({ theme }) => theme.ink.primary};

  &:hover {
    background: ${({ theme }) => theme.surface.raised};
  }
`;

export const InstallButton = styled(ButtonBase)`
  background: ${({ theme }) => theme.ink.primary};
  color: ${({ theme }) => theme.surface.page};

  &:hover {
    background: ${({ theme }) => theme.ink.secondary};
  }
`;
