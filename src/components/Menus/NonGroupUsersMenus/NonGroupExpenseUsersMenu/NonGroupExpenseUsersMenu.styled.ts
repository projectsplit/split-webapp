import styled from 'styled-components';

// Styled Component (replace relevant parts)

export const StyledNonGroupExpenseUsersMenu = styled.div`
  position: fixed;
  color: ${({ theme }) => theme.textActiveColor};
  background-color: ${({ theme }) => theme.layer2};
  width: 100%;
  height: 100dvh;
  left: 0;
  right: 0;
  margin: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  top: 0;

  .fixedHeader {
    position: sticky;
    top: 0;
    z-index: 5;
    background-color: ${({ theme }) => theme.layer2};

    .header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
      padding: 12px 16px;

      .closeButtonContainer {
        position: relative;
        cursor: pointer;
        display: inline-block;
      }

      .backButton {
        cursor: pointer;
        display: block;
        font-size: 1.875rem;
      }

      .closeButtonContainer:hover::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        background-color: rgba(128, 128, 128, 0.3);
        pointer-events: none;
      }

      .title {
        font-weight: 600;
      }

      .gap {
        margin-right: 0.9375rem;
      }
    }

    .categories {
      margin-top: 7px;
    }
  }

  .scrollable-content {
    overflow-y: auto;
    flex: 1;
    padding-top: 1rem;
    padding-bottom: 180px;

    .inputField {
      .main {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        min-height: 35px;
        padding-left: 5px;
        padding-right: 5px;
        padding-top: 8px;
        padding-bottom: 8px;
        gap: 5px;
        background-color: ${({ theme }) => theme.inputGrey};
        border-radius: 10px;
        margin-left: 10px;
        margin-right: 10px;
        cursor: text;
        position: relative;
        .input {
    
          flex: 1;
          min-width: 60px;
          text-indent: 5px;
        }

        .search-annotation {
          position: absolute;
          margin-left: 5px;
          left: 5px; /* aligns with input start */
          top: 50%;
          transform: translateY(-50%);
          pointer-events: none;
          white-space: nowrap;
          color: ${({ theme }) => theme.textInactiveColor};
        }
      }
    }
  }

  .noData {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    margin-top: 100px;
    .msg {
      opacity: 0.5;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .icon {
      display: flex;
      font-size: 100px;
      opacity: 0.5;
      margin-top: 20px;
    }
  }

  .doneButton {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 16px;
    display: flex;
    justify-content: stretch;
    z-index: 5;

    & > * {
      flex: 1;
    }
  }
`;
