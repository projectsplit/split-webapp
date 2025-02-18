import { StyledBottomMenu } from "./BottomMenu.styled";
import { BottomMenuProps } from "../../interfaces";


export default function BottomMenu({ children, height }: BottomMenuProps) {
  return <StyledBottomMenu height={height}>{children}</StyledBottomMenu>;
}
