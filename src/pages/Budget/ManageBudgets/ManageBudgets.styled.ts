import { styled } from 'styled-components';

export const StyledManageBudgets = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.lightColor};
  box-sizing: border-box;
  width: 100%;
  height: 100dvh;
  margin: 0;
  padding: 14px 0; /* Vertical padding only */
  gap: 15px;
  overflow: hidden;

  /* Header elements with horizontal padding */
  & > *:not(.scrollContainer) {
    padding-left: 14px;
    padding-right: 14px;
  }

  .messageContainer {
    flex-shrink: 0;
  }

  .scrollContainer {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding: 0 14px; /* Internal content padding */

    .activeInfo {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    
    .inactiveInfo {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 10px;
    }

    /* Scrollbar styles for the scrolling section */
    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
    }
  }

  .submitButton {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    margin-top: auto;
    padding: 10px 14px 14px 14px;
  }
`;
