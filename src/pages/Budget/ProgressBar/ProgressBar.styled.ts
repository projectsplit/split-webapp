import styled from "styled-components";

interface StyledProgressBarProps {
  percentage: number;
  color: string;
}

export const StyledProgressBar = styled.div<StyledProgressBarProps>`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.layer2};
  border-color: ${({ theme }) => theme.layer2};
  border-style: solid;
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
  border: none;
  border-radius: 6px;
  padding: 0.8rem;
  font-size: 15px;

  .closeButton {
    display: flex;
    justify-content: end;
    font-size: 30px;
    color: #6f6f6f;
    height: 17px;
    margin-top: -5px;
    margin-right: -8px;
    &:hover {
      color: ${({ theme }) => theme.whiteText};
    }
    .close {
      cursor: pointer;
      display: block;
    }
  }

  .budgetTitle {
    display: flex;
    justify-content: center;
    .sup {
      margin-top: -3px;
    }
  }
  .miscInfo {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: 25px;
  }
  .monetaryProgress {
    display: flex;
    justify-content: center;
    margin-top: 5px;
    font-size: 14px;
  }
  .progressBar {
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    margin-bottom: 5px;

    .wrapper {
      display: flex;
      flex-direction: column;
      flex: 1;
      align-items: center;
      justify-content: end;
    }
    
    .targetIcon {
      color: #bebebe;
      box-shadow: 0 0 10px 2px ${(props) => props.color};;
      font-size: 25px;
      align-self: center;
      margin-top: -20px;
      border-radius: 50px;
    }
    .amount {
      font-weight: bold;
      height: 33px;
      font-size: 14px;
      margin-top: -5px;
      margin-right: -3px;
    }
    .barWrapper {
      position: relative;
      width: 97%;
      background-color: black;
      border-radius: 20px;
      display: grid;
      height: 0.3rem;
      border-color: grey;

      .wrapper > * {
        grid-column: 1 / -1;
        grid-row: 1 / -1;
      }
      .bar {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        overflow: hidden;
        border-radius: inherit;
      }
      .bar:after {
        content: "";
        width: 100%;
        height: 100%;
        background-color: ${(props) => props.color};
        transform: translateX(
          calc(-100% + ${(props) => Math.min(props.percentage, 100)} * 1%)
        );
        transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
      }
    }
  }
`;
