import styled from "styled-components";
import { NotificationsBellProps } from "../../interfaces";

export const StyledNotificationsBell = styled.div<NotificationsBellProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap:14px;
    cursor: pointer;
    font-size: 2rem;
`;

