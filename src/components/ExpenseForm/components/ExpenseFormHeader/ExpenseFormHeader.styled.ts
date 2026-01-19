import styled from "styled-components";

export const StyledExpenseFormHeader = styled.div`
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
    content: "";
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
`;
