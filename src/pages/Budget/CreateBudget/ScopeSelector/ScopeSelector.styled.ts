import styled from 'styled-components';

export const StyledScopeSelector = styled.div<{ $inputError: boolean }>`
  .spendingCycleHeader {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    margin-bottom: 10px;
    .information {
      cursor: pointer;
      font-size: 23px;
      font-weight: bold;
      color: ${({ theme }) => theme.yellow};
    }
  }
  .scopeSelector {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 100%;
    justify-content: space-evenly;
    border-style: ${({ $inputError }) => ($inputError ? 'solid' : 'none')};
    border-width: ${({ $inputError }) => ($inputError ? '1px' : '0')};
    border-color: ${({ theme, $inputError }) =>
      $inputError ? theme.pink : 'transparent'};

    border-radius: 4px;
    padding: 0.8rem;
    outline: none;
    color: ${({ theme }) => theme.whiteText};
    background-color: ${({ theme }) => theme.layer2};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size: 18px;
    cursor: pointer;
    text-align: left;
  }
`;
