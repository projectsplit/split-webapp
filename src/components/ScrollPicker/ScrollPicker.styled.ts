import styled from 'styled-components'

const StyledScrollPicker = styled.div`

  touch-action: none;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: content-box;
  user-select: none;
  border: 1px solid #222227;
  border-radius: 5px;
  width: 100%;
  cursor: grab;

  .item {
    box-sizing: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #77777b;

    &.selected {
      color: ${({theme})=>theme.whiteText};
      background-color: ${({ theme }) => theme.highlightColor};
    }
  }
`

export default StyledScrollPicker