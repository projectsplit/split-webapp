import styled from "styled-components";

export const ToggleLabel = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

export const Checkbox = styled.input.attrs({ type: "checkbox" })`
  opacity: 0;
  width: 0;
  height: 0;
  margin: 0;

  &:checked + span {
    background-color: ${({ theme }) => theme.green};
  }

  &:checked + span:before {
    transform: translateX(26px);
  }
`;

export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  transition: 0.4s;
  border-radius: 34px;
  background-color: ${({ theme }) => theme.redish};

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: #fff;
    transition: 0.4s;
    border-radius: 50%;
  }
`;
