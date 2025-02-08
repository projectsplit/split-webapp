import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

export const StyledMemberAmountPicker = styled.div`
  
  background-color: ${({ theme }) => theme.backgroundColor};
  color: ${({ theme }) => theme.textActiveColor};
  display: flex;
  flex-direction: column;  
  cursor: pointer;
  user-select: none;
  font-size: 16px;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  
  .main {
    border-color: ${({ theme }) => theme.lineColor};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    padding: 6px 14px;
    white-space: nowrap;
    text-overflow: clip;
    overflow: hidden;
    
    .icon {
      &:hover {
        color: #DDDDDD;
      }
    }
  }
  
  .dropdown {
    background-color: ${({ theme }) => theme.backgroundColor};
    color: ${({ theme }) => theme.textActiveColor};
    border-color: ${({ theme }) => theme.lineColor};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    z-index: 2;
    width: 100%;
    box-sizing: border-box;
    border-radius: 5px;
    border-width: 1px;
    border-style: solid;
    max-height: 450px;
    overflow: auto;
    top: 100%;
    margin-top: 4px;
    padding: 6px 0px;
    
    .selected {
      background-color: ${({ theme }) => theme.backgroundColor};
      color: ${({ theme }) => theme.textActiveColor};
    }
    
    .available {
      color: ${({ theme }) => theme.textActiveColor};
      &:hover {
        background-color: #121215;
      }
    }
    
    .option {
      animation: ${fadeIn} 0.3s linear;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 10px 14px;
      box-sizing: content-box;
      
      .right {
        display: flex;
        flex-direction: row;
        justify-items: end;
        align-items: center;
        gap: 10px;
        
        .currency {
          color: #777777;
        }
        
        .amount {
          background-color: ${({ theme }) => theme.backgroundColor};
          color: ${({ theme }) => theme.textActiveColor};
          border-color: ${({ theme }) => theme.lineColor};
          border-style: none;
          border-width: 1px;
          border-radius: 5px;
          /* border-color: transparent; */
          text-align: right;
          padding: 0px 10px;
          width: 100px;
          outline: solid;
          outline-width: 1px;
          outline-color: transparent;
          font-size: 16px;
          /* font-style: italic; */
          
          &:focus {
            outline-color: #222222;
          }
          &:focus:hover {
            outline-color: #333333;
          }
          &:hover {
            outline-color: #222222;
          }
        }
        
        .locked-icon{
          color: #DDDDDD;
        }
        
        .unlocked-icon{
          color: #333333;
        }
      }
    }
  }
  
`