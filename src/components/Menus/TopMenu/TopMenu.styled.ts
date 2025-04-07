import styled from "styled-components";

export const StyledTopMenu = styled.div<{ title: string }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 14px;
  padding-right: 14px;
  padding-bottom: 25px;
  padding-top: 20px;
  .useOptionsContainer{
    display: flex;
    flex-direction: row;
    align-items: center;
    gap:20px;
  }
  .bellAndCog {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;

    .cog {
      font-size: 1.5rem;
      position: relative;
      cursor: pointer;
    }
  }

  .bellIconAndNumberOfNotifications {
    position: relative;
    .notification {
      font-size: 12px;
      font-weight: 800;
      position: absolute;
      background-color: red;
      border-radius: 50%;
      width: 0.5rem;
      height: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      bottom: 5px;
      left: 5px;
    }
  }

  .titleStripe {
    display: flex;
    flex-direction: row;

    .title {
      font-size: ${({ title }) => (title === "Groups" ? 24 : 18)}px;
      font-weight: 600;
    }
  }
`;
