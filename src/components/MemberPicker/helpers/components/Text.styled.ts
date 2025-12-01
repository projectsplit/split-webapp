import styled from "styled-components";

export const StyledText = styled.div<{ $error?: string }>`
  text-align: center;
  .button {
    font-weight: bold;
    display: inline-block;
    transition: border-color 0.5s ease-in-out;
    border: 1px solid
      ${(props) =>
        props.$error ? props.theme.redish : props.theme.highlightColor};
    border-radius: 5px;
    padding: 4px 6px;
  }
`;
