import styled from 'styled-components';

export const StyledUserListRow = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;

  .top-row {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s12};
    padding: ${({ theme }) => `${theme.space.s10} ${theme.space.s16}`};
    min-height: 56px;
    box-sizing: border-box;

    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      flex-shrink: 0;
      border-radius: ${({ theme }) => theme.radius.pill};
      background-color: ${({ theme }) => theme.surface.raised};
      color: ${({ theme }) => theme.ink.secondary};
      font-size: ${({ theme }) => theme.size.s11};
      font-weight: ${({ theme }) => theme.weight.semibold};
    }

    .name {
      flex: 1;
      min-width: 0;
      font-size: ${({ theme }) => theme.size.s14};
      font-weight: ${({ theme }) => theme.weight.medium};
      color: ${({ theme }) => theme.ink.primary};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;
