import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%,
  100% {
    opacity: 0.45;
  }
  50% {
    opacity: 0.9;
  }
`;

export const StyledBudgetCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.s12};
  padding: ${({ theme }) => theme.space.s16};
  background-color: ${({ theme }) => theme.surface.card};
  border: 1px solid ${({ theme }) => theme.surface.hairline};
  border-radius: ${({ theme }) => theme.radius.surface};
  cursor: pointer;
  transition: border-color 220ms ease;

  .cardTop {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.s12};
  }

  .cardIdentity {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s3};
    min-width: 0;
  }

  .cardName {
    font-size: ${({ theme }) => theme.size.s15};
    font-weight: ${({ theme }) => theme.weight.semibold};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .cardMeta {
    font-size: ${({ theme }) => theme.size.s12};
    color: ${({ theme }) => theme.ink.tertiary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .cardFigures {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.s12};
  }

  .cardSpent {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s17};
    font-weight: ${({ theme }) => theme.weight.medium};
    color: ${({ theme }) => theme.accent.you.ink};
  }

  .cardCapRow {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: ${({ theme }) => theme.space.s8};
    min-width: 0;
  }

  .cardCapLabel {
    font-size: ${({ theme }) => theme.size.s13};
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .cardCap {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s17};
    font-weight: ${({ theme }) => theme.weight.medium};
    color: ${({ theme }) => theme.ink.secondary};
  }

  .cardGoal {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s13};
    color: ${({ theme }) => theme.ink.secondary};
  }

  .cardSpentLoading {
    width: 96px;
    border-radius: ${({ theme }) => theme.space.s6};
    color: transparent;
    background-color: ${({ theme }) => theme.surface.raised};
    animation: ${pulse} 1.2s ease-in-out infinite;
  }

  .cardTrack {
    display: flex;
    height: ${({ theme }) => theme.space.s6};
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => theme.surface.raised};
    overflow: hidden;
  }

  .cardTrack.loading {
    animation: ${pulse} 1.2s ease-in-out infinite;
  }

  .cardFill {
    height: 100%;
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => theme.accent.you.fill};
    transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1);
  }
`;
