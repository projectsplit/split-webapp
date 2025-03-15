import styled from "styled-components";

export const StyledComment = styled.div`
  font-size: 15px;
  background-color: ${({ theme }) => theme.inputGrey};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-top-right-radius: 10px;
  padding: 0.5rem;
  margin-bottom: 10px;
  word-break: break-all;
  color: white;
  display: inline-block;
  max-width: fit-content;
  .nameAndClose {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: top;
    .name {
      margin-bottom: 5px;
      font-size: 12px;
    }
    .close {
      cursor: pointer;
    }
  }
  .commentAndTime {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .time {
      font-size: 12px;
      align-self: flex-end;
      white-space: nowrap;
      margin-left: 10px;
    }
  }
`;
