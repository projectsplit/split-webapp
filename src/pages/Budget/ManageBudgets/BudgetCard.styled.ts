import styled from 'styled-components';

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
`;
