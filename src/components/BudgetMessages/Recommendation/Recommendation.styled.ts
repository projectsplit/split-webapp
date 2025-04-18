import styled from "styled-components";
import { StyledRecommendationProps } from "../../../interfaces";

export const StyledRecommendation = styled.div<StyledRecommendationProps>`


  .main {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .header {
      display: flex;
      justify-content: center;
      font-weight: bold;
    }
    .signParagraphWrap {
      display: flex;
      flex-direction: row;

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
          color: ${({ theme }) => theme.redish};
        }
      }
      .warning {
        font-size: 40px;
        color: ${({ theme }) => theme.redish};
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
