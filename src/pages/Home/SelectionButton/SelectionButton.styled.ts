import styled from "styled-components";

export const StyledSelectionButton = styled.div`
  .main {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;

    .confing {
      display: flex;
      flex-direction: column;
      gap: 5px;

      .name {
        font-size: 20px;
        font-weight: bold;
      }
      .descr {
        font-size: 13px;
        color: ${({ theme }) => theme.colors.layer6};
      }
    }
  }
`;
