import styled from 'styled-components';

interface StyledBarProps {
  $percentage: number;
  $color: string;
}

export const StyledBar = styled.div<StyledBarProps>`
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
    box-shadow: 0 0 10px 2px ${(props) => props.$color};
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
      content: '';
      width: 100%;
      height: 100%;
      background-color: ${(props) => props.$color};
      transform: translateX(
        calc(-100% + ${(props) => Math.min(props.$percentage, 100)} * 1%)
      );
      transition: transform 300ms cubic-bezier(0.4, 0, 0.2, 1);
    }
  }
`;
