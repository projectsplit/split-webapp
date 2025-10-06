import styled from "styled-components";

export const StyledLabelsDisplay = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
    .tagIcon {
    /* color: ${({ theme }) => theme.redish}; */
    margin-right: 10px;
    font-size: 30px;
  }
  .labels {
    display: flex;
    flex-direction: row;
    align-items: center;
    border: 1px solid #2f3139;
    border-radius: 10px;
    padding: 8px;
    flex-wrap: wrap;
    gap: 4px;
    .selected-label {
      color: #000000a2;
      display: flex;
      gap: 8px;
      align-items: center;
      border-radius: 2px;
      padding: 2px 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 700;
    }
  }
`;
