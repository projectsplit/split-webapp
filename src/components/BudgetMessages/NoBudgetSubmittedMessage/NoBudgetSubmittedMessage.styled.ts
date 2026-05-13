import { styled } from 'styled-components';

export const StyledNoBudgetSubmittedMessage = styled.div`
  background-color: ${({ theme }) => theme.layer2};
  border-radius: 6px;
  padding: 0.4rem;
  .main {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .signParagraphWrap {
      display: flex;
      flex-direction: row;
      /* align-items: center; */
      .sign {
        display: flex;
        justify-self: center;
        align-self: center;
        margin-right: 10px;
      }
      .paragraph {
        font-size: 14px;
        display: flex;
        flex-direction: column;
        gap: 10px;

        justify-content: center;
      }
      .information {
        font-size: 40px;
        color: ${({ theme }) => theme.grey};
      }
    }
  }
`;
