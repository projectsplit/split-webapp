import styled from 'styled-components';

export const StyledBudgetCarousel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.s10};

  .budgetHeader {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
  }

  .budgetLabel {
    font-size: ${({ theme }) => theme.size.s11};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .budgetAside {
    font-size: ${({ theme }) => theme.size.s11};
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .budgetCard {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s12};
    padding: ${({ theme }) => theme.space.s16};
    background-color: ${({ theme }) => theme.surface.card};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.surface};
    cursor: pointer;
  }

  .budgetFigures {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.s12};
  }

  .budgetSpent {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.figure.card};
    font-weight: ${({ theme }) => theme.weight.medium};
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.accent.you.ink};
  }

  .budgetCap {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s13};
    color: ${({ theme }) => theme.ink.secondary};
  }

  .budgetTrack {
    position: relative;
    height: ${({ theme }) => theme.space.s8};
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => theme.surface.raised};
    overflow: hidden;
    display: flex;
  }

  .budgetFill {
    height: 100%;
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => theme.accent.you.fill};
    transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .budgetMarker {
    position: absolute;
    top: -3px;
    width: 1px;
    height: 14px;
    background-color: ${({ theme }) => theme.ink.tertiary};
  }

  .budgetCaptions {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: ${({ theme }) => theme.size.s11};
    color: ${({ theme }) => theme.ink.secondary};
  }

  .budgetClose {
    position: absolute;
    top: ${({ theme }) => theme.space.s6};
    right: ${({ theme }) => theme.space.s6};
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: ${({ theme }) => theme.surface.mark};
    cursor: pointer;
  }
`;
