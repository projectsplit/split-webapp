import { styled } from 'styled-components';

export const StyledInviteUsersToNewGroup = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.surface.page};
  color: ${({ theme }) => theme.ink.primary};
  z-index: 3;
  display: flex;
  flex-direction: column;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space.s16};
  padding: 56px 24px 28px;
  flex-shrink: 0;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 88px;
  height: 88px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radius.pill};
  background-color: ${({ theme }) => theme.surface.card};
  border: 1px solid ${({ theme }) => theme.surface.hairline};
  color: ${({ theme }) => theme.surface.mark};
  font-size: 44px;
`;

export const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.s8};
  text-align: center;

  .title {
    font-size: ${({ theme }) => theme.figure.summary};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: -0.02em;
    line-height: 1.2;
  }

  .lead {
    font-size: ${({ theme }) => theme.size.s13};
    line-height: 1.6;
    color: ${({ theme }) => theme.ink.secondary};
    text-wrap: pretty;
  }
`;

export const ScrollableContent = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.s10};
  padding: ${({ theme }) => `0 ${theme.space.s20} ${theme.space.s20}`};

  .sectionLabel {
    font-size: ${({ theme }) => theme.size.s11};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .membersCard {
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    background-color: ${({ theme }) => theme.surface.card};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.surface};
    overflow: hidden;
  }

  .memberRow {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s12};
    padding: ${({ theme }) => `13px ${theme.space.s16}`};
  }

  .memberRow + .memberRow::before {
    content: '';
    position: absolute;
    top: 0;
    left: 56px;
    right: 0;
    height: 1px;
    background-color: ${({ theme }) => theme.surface.raisedHigh};
  }

  .memberAvatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    flex-shrink: 0;
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => theme.surface.raised};
    color: ${({ theme }) => theme.ink.secondary};
    font-size: ${({ theme }) => theme.size.s11};
    font-weight: ${({ theme }) => theme.weight.semibold};
  }

  .memberAvatar.you {
    background-color: ${({ theme }) => theme.accent.you.tint};
    border: 1px solid ${({ theme }) => theme.accent.you.tintBorder};
    color: ${({ theme }) => theme.accent.you.ink};
  }

  .memberName {
    flex: 1;
    min-width: 0;
    font-size: ${({ theme }) => theme.size.s14};
    font-weight: ${({ theme }) => theme.weight.medium};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .memberStatus {
    flex-shrink: 0;
    padding: ${({ theme }) => `${theme.space.s3} ${theme.space.s8}`};
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => theme.surface.raised};
    color: ${({ theme }) => theme.ink.secondary};
    font-size: ${({ theme }) => theme.size.s10};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .membersNote {
    font-size: ${({ theme }) => theme.size.s12};
    line-height: 1.55;
    color: ${({ theme }) => theme.ink.tertiary};
    text-wrap: pretty;
  }
`;

export const BottomContainer = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  gap: ${({ theme }) => theme.space.s8};
  padding: ${({ theme }) =>
    `${theme.space.s12} ${theme.space.s20} ${theme.space.s20}`};
  background: ${({ theme }) =>
    `linear-gradient(to top, ${theme.surface.page} 60%, transparent)`};

  button {
    flex: 1;
    padding: ${({ theme }) => `${theme.space.s12} 0`};
  }
`;
