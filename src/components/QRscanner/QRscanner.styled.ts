import styled from "styled-components";
import { QRscannerProps } from "../../interfaces";

export const StyledQRscanner = styled.div<QRscannerProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap:14px;
    cursor: pointer;
`;

