import styled from "styled-components";

export const StyledLabelsPillsDisplay = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;

  .category {
    cursor: pointer;
  }

  .pills {
    display: flex;
    flex-direction: row;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 4px;
  }

  .type{
    color: ${({ theme }) => theme.grey};
  }
`;