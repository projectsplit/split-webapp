import styled from "styled-components";
interface StyledMemberDetailedDescriptionProps {
  isOwed: boolean;
}
export const StyledMemberDetailedDescription = styled.div.withConfig({
  shouldForwardProp: (prop) => !"isOwed".includes(prop),
})<StyledMemberDetailedDescriptionProps>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  flex-direction: row;
  font-size: 15px;
  flex-grow: 1;
  line-height:1.4;
  margin-top: 5px;
  margin-bottom: 5px;
  .owingText {
    white-space: nowrap;
    color: ${({ theme }) => theme.layer6};
  }
  .and {
    white-space: nowrap;
  }
  .amount {
    color: ${(props) =>
      props.isOwed ? ({ theme }) => theme.green : ({ theme }) => theme.redish};
  }

`;
