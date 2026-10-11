import styled from 'styled-components';
import { StyledMiddleScreenMenu } from '../Menus/Layouts/MiddleScreenMenu/MiddleScreenMenu.styled';

export const StyledPlusInfoMenu = styled(StyledMiddleScreenMenu)`
  max-height: 86vh;
  overflow-y: auto;
  gap: ${({ theme }) => theme.space.s16};
  padding-top: ${({ theme }) => theme.space.s24};

  .lockup {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.space.s8};
  }

  .brand {
    font-size: 26px;
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.ink.primary};
  }

  .headline {
    margin: 0;
    text-align: center;
    font-size: ${({ theme }) => theme.size.s17};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.ink.primary};
  }

  .subhead {
    margin: 0;
    text-align: center;
    font-size: ${({ theme }) => theme.size.s14};
    line-height: 1.45;
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .features {
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.surface.raised};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.surface};
    overflow: hidden;
  }

  .feature {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s14};
    padding: ${({ theme }) => `${theme.space.s12} ${theme.space.s14}`};

    & + .feature {
      border-top: 1px solid ${({ theme }) => theme.surface.hairline};
    }
  }

  .featureIcon {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    border-radius: ${({ theme }) => theme.radius.control};
    background-color: ${({ theme }) => theme.surface.raisedHigh};
    border: 1px solid ${({ theme }) => theme.surface.outline};
    color: ${({ theme }) => theme.ink.primary};
    font-size: ${({ theme }) => theme.icon.sm};
  }

  .featureBody {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s2};
    min-width: 0;
  }

  .featureName {
    font-size: ${({ theme }) => theme.size.s14};
    font-weight: ${({ theme }) => theme.weight.semibold};
    color: ${({ theme }) => theme.ink.primary};
  }

  .featureText {
    font-size: ${({ theme }) => theme.size.s12};
    line-height: 1.4;
    color: ${({ theme }) => theme.ink.secondary};
  }

  .footnote {
    margin: 0;
    text-align: center;
    font-size: ${({ theme }) => theme.size.s12};
    line-height: 1.5;
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .close {
    align-self: center;
    background: none;
    border: none;
    padding: ${({ theme }) => theme.space.s4};
    font-family: inherit;
    font-size: ${({ theme }) => theme.size.s13};
    color: ${({ theme }) => theme.ink.secondary};
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.ink.primary};
    }
  }
`;

/* Sits above every other menu (settings at 4, the search sheet at 3, their inner sheets at 999)
   so the dimming lands on whatever the mark was tapped from. */
export const PlusBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 998;
  background-color: ${({ theme }) => theme.scrim.sheet};
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
`;
