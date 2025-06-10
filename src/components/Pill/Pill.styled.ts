import styled from "styled-components";
interface StyledPillOptions {
  color: string;
  $textColor: string;
  fontSize?: string;
  $border: boolean;
}
export const StyledPill = styled.div<StyledPillOptions>`
  font-weight: 400;
  font-size: ${({ fontSize }) => fontSize || "18px"};
  background-color: ${(props) => props.color};

  ${({ $border }) =>
    $border !== false
      ? `
          border-style: solid;
          border-width: 1px;
          border-color: white;

        `
      : ""}

  -webkit-tap-highlight-color: transparent;

  display: flex;
  flex-direction: row;
  align-items: center;

  border-style: solid;
  border-width: 1px;
  border-radius: 6px;
  padding: 1px 8px;
  gap: 3px;

  cursor: pointer;
  /* box-shadow: rgba(0, 0, 0, 0.5) 0px 4px 4px; */
  color: ${(props) => props.color};

  .title {
    color: ${(props) => props.$textColor};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100px;
  }

  .titleAndCloseButton {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
  }

  .closeSign {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }
`;
