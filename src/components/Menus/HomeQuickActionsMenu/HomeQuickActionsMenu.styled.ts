import styled from "styled-components";

export const StyledHomeQuickActionsMenu = styled.div`
  z-index: 4;
  position: fixed;
  bottom: 100px;
  right: 30px;
  .buttons {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 15px;
    .new {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;

      .wrapper {
        animation: emerge 0.2s ease-out forwards;
        transform-origin: center;
        opacity: 0;

        /* Delay for staggered effect */
        &:nth-child(1) {
          animation-delay: 0.05s;
        }
        &:nth-child(2) {
          animation-delay: 0.05s;
        }

        /* Reset transform for animation */
        transform: scale(0);

        display: flex;
        flex-direction: row;
        position: relative;

        .person {
          padding: 0.5rem;
          border-radius: 50%;
          display: flex;

          cursor: pointer;
          color: rgb(81, 131, 238);
          background-color: white;
          width: 45px; /* Fixed size for consistent positioning */
          height: 45px;
          position: relative;
        }
      }
      .receipt {
        font-size: 20px;
        position: absolute;
        color: rgb(81, 131, 238);
        border-radius: 50%;

        display: flex;
        align-items: center;
        justify-content: center;
        bottom: -10px;
        left: -12px;
      }
      .descr {
        flex: 1 1 auto;
        margin-right: 8px;
        text-align: right;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  @keyframes emerge {
    from {
      transform: scale(0);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;
