import styled from 'styled-components';

export const StyledMembersInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.s10};
  padding: ${({ theme }) => `${theme.space.s12} ${theme.space.s14}`};
  background-color: ${({ theme }) => theme.surface.page};
  border: 1px solid ${({ theme }) => theme.surface.hairline};
  border-radius: ${({ theme }) => theme.radius.surface};

  .memberLines {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s8};
  }

  .memberLine {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    gap: ${({ theme }) => theme.space.s8};
  }

  .memberName {
    flex: 1;
    min-width: 0;
    font-size: ${({ theme }) => theme.size.s13};
    color: ${({ theme }) => theme.ink.secondary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .memberLine.you .memberName {
    font-weight: ${({ theme }) => theme.weight.medium};
    color: ${({ theme }) => theme.ink.primary};
  }

  .memberAmount {
    flex-shrink: 0;
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s13};
    text-align: right;
    color: ${({ theme }) => theme.ink.secondary};
  }

  .memberLine.you .memberAmount {
    font-weight: ${({ theme }) => theme.weight.medium};
    color: ${({ theme }) => theme.ink.primary};
  }

  .memberShare {
    width: 38px;
    flex-shrink: 0;
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s11};
    text-align: right;
    color: ${({ theme }) => theme.ink.tertiary};
  }
`;
