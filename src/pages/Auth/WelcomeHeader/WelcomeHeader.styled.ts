import styled from "styled-components";

export const StyledWelcomeHeader = styled.div`
 
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  flex-wrap: nowrap;
  color: #f5f5f5;

  .logo {
    font-size: 66px;
    display: flex;
    align-items: center;
  }

  .appName {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    padding-top: 2rem;
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
