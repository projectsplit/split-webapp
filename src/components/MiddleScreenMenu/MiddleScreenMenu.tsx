
import { MiddleScreenMenuProps } from "../../interfaces";
import { StyledMiddleScreenMenu } from "./MiddleScreenMenu.styled";


export default function MiddleScreenMenu({ children }: MiddleScreenMenuProps) {
  return <StyledMiddleScreenMenu>{children}</StyledMiddleScreenMenu>;
}
