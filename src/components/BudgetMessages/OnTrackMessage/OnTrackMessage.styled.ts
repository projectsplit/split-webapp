import styled from "styled-components";
import { StyledOnTrackMessageProps } from "../../../interfaces";

export const StyledOnTrackMessage = styled.div<StyledOnTrackMessageProps>`
  .main {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .signParagraphWrap {
      display: flex;
      flex-direction: row;
      /* align-items: center; */
      .sign {
        margin-right: 10px;
      }
      .paragraphs {
        font-size: 15px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        font-size: 15px;
        .amount {
          color: ${({ theme }) => theme.green};
        }
      }
      .information {
        font-size: 40px;
        color: ${({ theme }) => theme.green};
      }
    }

    .closeButton {
      position: absolute;
      top: -0.65rem;
      right: -0.65rem;
      font-size: 30px;
      color: #6f6f6f;
      display: inline-block;
      &:hover {
        color: ${({ theme }) => theme.whiteText};
      }
    }

    .close {
      cursor: pointer;
      display: block;
    }

    ${(props) => `
    ${props.style}
  `}
  }
`;
