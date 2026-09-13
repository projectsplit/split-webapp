import styled from 'styled-components';
import { NotificationsBellProps } from '../../interfaces';

export const StyledNotificationsBell = styled.div<NotificationsBellProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.space.s14};
  cursor: pointer;
  font-size: ${({ theme }) => theme.icon.lg};
`;
