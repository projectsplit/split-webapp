import styled from "styled-components";

export const StyledWelcomeHeader = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  color: #f5f5f5;

  .logo {
    width: auto;
    height: auto;

    align-items: center;
  }

  .appName {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    padding: 2rem;
    font-size: 36px;

    .appDescription {
      font-size: 14px;
      padding-bottom: 3rem;
      white-space: initial;
      text-align: center;
      font-size: 18px;
    }
  }
`;

export const Logo = styled.img`
  max-width: 25px;
  max-height: 35px;
  width: auto;
  height: auto;
`;
