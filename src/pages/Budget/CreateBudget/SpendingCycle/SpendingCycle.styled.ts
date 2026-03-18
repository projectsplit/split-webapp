import styled from 'styled-components';

export const StyledSpendingCycle = styled.div<{$calendarIsOpen:boolean}>`
  display: flex;
  flex-direction: column;
  font-size: 16px;

  .errorMsg {
    font-size: 12px;
    color: ${({ theme }) => theme.errorColor};
    display: flex;
    justify-content: start;
    padding: 0px 4px;
  }
  .calendarAndErrorsWrapper,
  .inputAndErrorsWrapper {
    display: flex;
    flex-direction: column;
  }
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
  .categoryButtons{
    margin:${({$calendarIsOpen})=> $calendarIsOpen ? '10px' : '0px'} ;
  }
`;
