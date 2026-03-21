import styled from 'styled-components';

export const StyledBackAndForthAnimation = styled.div`
  .transition-group {
    display: grid;
    grid-template-columns: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .step-container {
    grid-column: 1;
    grid-row: 1;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /* Forward (Next): A exits left, B enters from right */
  .fade-enter {
    transform: translateX(100%);
  }
  .fade-enter-active {
    transform: translateX(0%);
    transition: transform 300ms ease-out;
  }
  .fade-exit {
    transform: translateX(0%);
  }
  .fade-exit-active {
    transform: translateX(-100%);
    transition: transform 300ms ease-out;
  }

  /* Backward (Back): B exits right, A enters from left */
  .fade-back-enter {
    transform: translateX(-100%);
  }
  .fade-back-enter-active {
    transform: translateX(0%);
    transition: transform 300ms ease-out;
  }
  .fade-back-exit {
    transform: translateX(0%);
  }
  .fade-back-exit-active {
    transform: translateX(100%);
    transition: transform 300ms ease-out;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-moz-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-o-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-ms-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
