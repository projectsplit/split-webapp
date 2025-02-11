import styled from "styled-components";
import { OptionsContainerProps } from "../../interfaces";

export const StyledOptionsContainer = styled.div<OptionsContainerProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 1rem 0.8rem;
  border-radius: 10px;
  gap: 14px;
  background-color: ${({ theme }) => theme.colors.layer2};
  border-color: ${({ theme }) => theme.colors.layer2};
  border-style: solid;
  cursor: ${({ hasarrow }) => (hasarrow === "true" ? "pointer" : "default")};
  transition: background-color 0.2s ease-in-out; /* Add transition for background-color */
  border: none;
  &:hover {
    background-color: ${({ theme, hasarrow }) =>
      hasarrow === "true"
        ? theme.colors.layer1
        : theme.colors.layer2}; /* Change background-color on hover */
  }
  .arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0rem;
    font-size: 30px;
  }
`;
