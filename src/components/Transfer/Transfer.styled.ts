import styled from "styled-components";

export const StyledTransfer = styled.div.withConfig({
  shouldForwardProp: (prop) => !"outlineColor".includes(prop),
})<{ outlineColor?: string }>`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 14px;
  background-color: ${({ theme }) => theme.layer2};
  ${({ outlineColor }) => outlineColor && `border: 1px solid ${outlineColor};`}

  .main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .mainMsg {
      display: flex;
      flex-direction: column;
      padding: 10px;
      gap: 10px;
      .msg1 {
        display: flex;
        flex-direction: row;
        align-items: center;
        font-weight: 600;
        gap: 10px;
        .emoji {
          font-size: 25px;
        }
      }
      .msg2 {
        font-size: 15px;
        font-weight: 600;
        color: ${({ theme }) => theme.layer6};
      }
    }
    .time {
      padding-top:10px;
      font-size: 14px;
      font-weight: 800;
      color: #777777;
    }
  }

  .descr {
    display: flex;
    justify-content: center;
    color: ${({ theme }) => theme.layer6};
    font-style: italic;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom:5px;
  }
`;
