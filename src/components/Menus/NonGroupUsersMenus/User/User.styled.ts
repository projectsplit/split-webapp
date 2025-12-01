import styled from "styled-components";

interface StyledUserProps {
  $isSelected:boolean
}
export const StyledUser = styled.div<StyledUserProps>`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  
  cursor: pointer;

  .nameAndTick {
    background-color:${props => 
      props.$isSelected ? props.theme.inputGrey : 'transparent'
    };
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0.5rem;
    .tick {
      font-size: 20px;
    }

  }
`;
