import styled from "styled-components";

export const StyledCategorySelector = styled.div`
  .groupCategories {
    margin: 14px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    gap: 4px;
    margin-top: 0px;
    position: relative;
    .selectedIndicator {
      position: absolute;
      bottom: -15px;
      height: 3px;
      background-color: ${({ theme }) => theme.textActiveColor};

      border-radius: 5px;
    }
  }
`;
