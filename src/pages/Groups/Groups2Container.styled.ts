import styled from "styled-components";

export const StyledGroups2Container = styled.div`
  overflow: auto;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.backgroundcolor};
  position: relative;
  .optionButtonsAndGroups {
    display: flex;
    flex-direction: row;
    height: 100%;
    .optionButtons {
      margin-left: 1rem;
      .button {
        margin-top: 20px;
        width: 120%;
        background-color: ${({ theme }) => theme.layer2};
        cursor: pointer;
        border-radius: 10px;
        padding: 0.3rem;
        .groupIcon {
          display: flex;
          justify-self: center;
          color: ${({ theme }) => theme.deepPurple};
          font-size: 30px;
        }
        .descr {
          display: flex;
          justify-self: center;
          font-size: 10px;
          margin-top: 3px;
        }
      }
    }
  }
  .bottom-bar {
    margin-top: auto;
  }
`;
