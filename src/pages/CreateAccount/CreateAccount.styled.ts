import styled from "styled-components";

export const StyledCreateAccount = styled.div`
  margin: 0rem 2rem 0rem 2rem;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.lightColor};
  
  .loginBox {
    padding: 1rem 0.8rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    background-color: ${({ theme }) => theme.layer1};
    border-color: ${({ theme }) => theme.layer1};
    border-style: "solid";

    .promptMsg {
      display:flex;
      justify-content:center;
      color: ${({ theme }) => theme.lightColor};
      padding-bottom: 1rem;
      white-space: initial;
      font-size: 18px;
    }
    .controlsContainer {
      display: flex;
      flex-direction: column;

      .errormsg {
        white-space: initial;
        color: ${({ theme }) => theme.pink};
        font-size: 12px;
      }

      .inputBox {
        display: flex;
        flex-direction: column;
        margin-bottom: 15px;
      }
    }
  }

  `