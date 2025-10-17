import styled from "styled-components";

export const StyledItem = styled.div`
  margin-top: 0.625rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  cursor: pointer;
  .top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .action-button {
      border: none;
      border-radius: 4px;
      user-select: none;
      color: ${({ theme, color }) => (color ? color : theme.text)};
      display: flex;
    }
  }

  .bottom-row {
    display: flex;
    color: ${({ theme }) => theme.secondaryTextColor};
    font-size: 14px;
  }
`;
