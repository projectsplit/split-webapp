import styled from "styled-components";

export const StyledRevokeAccessItem = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 100%;
  padding: 10px;
  background-color: ${({ theme }) => theme.layer2};
  gap: 1rem;

  .codeAndCopy {
    display: flex;
    flex-direction: row;
    align-self: center;
    align-items: center;
    background: linear-gradient(180deg, #373669 0%, #3b3a7aff 100%);
    color: white;
    padding: 6px 12px;
    border-radius: 16px;
    gap: 10px;
    cursor: pointer;
  }

  .infoAndRevokeButton {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .infoContainer {
      font-size: 0.85rem;
      display: flex;
      flex-direction: column;
      gap: 8px;
      .infoAndData {
        display: flex;
        flex-direction: row;
        gap: 5px;
        .expires {
          .expiresInAndTimeLeft {
            display: flex;
            flex-direction: row;
            gap: 5px;
          }
          .text {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 10px;
            color: ${({ theme }) => theme.redish};
          }
        }
      }
      .info {
        /* color: ${({ theme }) => theme.greySelect}; */
        color: grey;
      }
    }
  }
`;
