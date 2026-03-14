import styled from 'styled-components';

export const StyledScopeSelectionMenu = styled.div`
  position: fixed;
  font-size: 1.125rem;
  left: 0;
  right: 0;
  margin: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.layer2};
  z-index: 1;
  display: flex;
  flex-direction: column;
  .fixed-header-container {
    position: sticky;
    top: 0;
    z-index: 0;
    background-color: ${({ theme }) => theme.layer2};
  }
  .header {
    padding: 0.875rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-shrink: 0;

    .closeButtonContainer {
      position: relative;
      cursor: pointer;
      display: inline-block;
    }

    .closeButton {
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
  .scopeOptions {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    gap: 1.5rem;
    padding: 1.5rem;

    .wrapperAndPill {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .pill {
        border-color: ${({ theme }) => theme.greyOutline};
        background-color: ${({ theme }) => theme.greyOutline};
        border-width: 2px;
        border-style: solid;
        border-radius: 12px;
        padding: 0.3rem;
        font-size: 13px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        margin-top: 15px;
        cursor: pointer;
        &:hover {
          box-shadow: 0 0 3px rgba(212, 212, 212, 0.3);
        }
      }
      .pill.open {
        box-shadow: 0 0 3px rgba(212, 212, 212, 0.3);
      }
    }

    .buttonWrapper,
    .groupsButtonWrapper {
      position: relative;
      height: 100px;
      width: 100px;

      .checkIcon {
        position: absolute;
        top: -8px;
        right: -8px;
        font-size: 22px;
        color: ${({ theme }) => theme.checkmarkGreen};
        background-color: ${({ theme }) => theme.layer2};
        border-radius: 50%;
        z-index: 2;
      }

      .button {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: ${({ theme }) => theme.greyOutline};
        cursor: pointer;
        border-radius: 12px;
        padding: 0.5rem;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);

        &:hover {
          box-shadow: 0 0 3px rgba(212, 212, 212, 0.3);
        }

        .groupIcon {
          color: ${({ theme }) => theme.whiteText};
          font-size: 30px;
          margin-bottom: 6px; /* Spacing below the icon */
        }

        .text-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: auto;
          width: 100%;
        }

        .descr {
          font-size: 14px;
          line-height: 1.2;
          text-align: center;
          color: ${({ theme }) => theme.whiteText};
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }
      }
      .button.active {
        box-shadow: 0 0 6px ${({ theme }) => theme.checkmarkGreen};
      }
    }
  }
  .footer{
    display:flex ;
    flex:1;
  }
`;
