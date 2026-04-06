import styled from 'styled-components';

export const StyledShareExpenseButtons = styled.div`
  .shareExpenseOption {
    text-align: center;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 5px;
    justify-content: center;
    .button {
      font-weight: bold;
      display: inline-block;
      border: 1px solid ${({ theme }) => theme.highlightColor};
      border-radius: 5px;
      padding: 4px 6px;
      cursor: pointer;
      .textAndIcon{
        display:flex;
        flex-direction: row;

        align-items: center;
        .icon{
          margin-left: 5px;
          font-size: 20px;
        }
      }
    }
  }
`;
