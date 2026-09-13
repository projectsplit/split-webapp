import styled from 'styled-components';

export const StyledSegmentedControl = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.space.s3};
  padding: ${({ theme }) => theme.space.s3};
  background-color: ${({ theme }) => theme.surface.card};
  border: 1px solid ${({ theme }) => theme.surface.hairline};
  border-radius: ${({ theme }) => theme.radius.iconButton};

  .segment {
    flex: 1;
    text-align: center;
    padding: ${({ theme }) => `${theme.space.s6} 0`};
    border-radius: ${({ theme }) => theme.radius.control};
    font-size: ${({ theme }) => theme.size.s13};
    font-weight: ${({ theme }) => theme.weight.medium};
    color: ${({ theme }) => theme.ink.secondary};
    cursor: pointer;
    transition:
      background-color 0.2s ease-in-out,
      color 0.2s ease-in-out;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .segment.active {
    background-color: ${({ theme }) => theme.surface.hairline};
    color: ${({ theme }) => theme.ink.primary};
    font-weight: ${({ theme }) => theme.weight.semibold};
  }
`;
