import styled from 'styled-components';

export const StyledCalendarAndErrorsWrapper = styled.div<{
  $inputError: boolean;
}>`
  display: flex;
  flex-direction: column;
  border: 1px solid
    ${({ theme, $inputError }) =>
      $inputError ? theme.direction.owe : theme.surface.hairline};
  border-radius: ${({ theme }) => theme.radius.surface};
  overflow: hidden;
  background-color: ${({ theme }) => theme.surface.card};

  .customPropmtPills {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: ${({ theme }) => theme.space.s6};

    .prompt {
      font-size: ${({ theme }) => theme.size.s15};
      color: ${({ theme }) => theme.ink.secondary};
    }

    .pill {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: ${({ theme }) => `2px ${theme.space.s8}`};
      border-radius: ${({ theme }) => theme.radius.control};
      background-color: ${({ theme }) => theme.surface.raised};
      color: ${({ theme }) => theme.ink.primary};
      font-size: ${({ theme }) => theme.size.s13};
      cursor: pointer;

      &:hover {
        opacity: 0.7;
      }
    }
  }
`;
