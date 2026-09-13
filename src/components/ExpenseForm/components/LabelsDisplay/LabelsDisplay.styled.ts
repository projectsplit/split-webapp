import styled from 'styled-components';

export const StyledLabelsDisplay = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 0;

  .labelsAndTag {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    max-width: 100%;
    min-width: 0;
    padding: ${({ theme }) => `5px ${theme.space.s10}`};
    background-color: ${({ theme }) => theme.surface.card};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.surface};
    cursor: pointer;
  }

  .tagIcon {
    display: block;
    flex-shrink: 0;
    align-self: center;
    margin-right: ${({ theme }) => theme.space.s2};
    font-size: ${({ theme }) => theme.size.s13};
    color: ${({ theme }) => theme.ink.secondary};
  }

  .labels {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.space.s6};
    min-width: 0;

    .selected-label {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme.space.s6};
      padding: ${({ theme }) => `5px ${theme.space.s10}`};
      border-radius: ${({ theme }) => theme.radius.chip};
      font-size: ${({ theme }) => theme.size.s12};
      font-weight: ${({ theme }) => theme.weight.medium};
      cursor: pointer;

      svg {
        flex-shrink: 0;
        font-size: ${({ theme }) => theme.icon.xs};
        opacity: 0.6;
      }
    }
  }
`;
