import styled from 'styled-components';

export const StyledMapsInfoBox = styled.div`
  position: relative;
  flex-shrink: 0;

  .locationRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s10};
  }

  .locationIcon {
    display: flex;
    flex-shrink: 0;
    font-size: ${({ theme }) => theme.icon.sm};
    color: ${({ theme }) => theme.ink.secondary};
  }

  .locationLink {
    flex: 1;
    min-width: 0;
    text-decoration: none;
    color: inherit;
  }

  .locationName {
    display: block;
    font-size: ${({ theme }) => theme.size.s13};
    font-weight: ${({ theme }) => theme.weight.medium};
    color: ${({ theme }) => theme.ink.primary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .mapToggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    margin-right: -2px;
    flex-shrink: 0;
    font-size: ${({ theme }) => theme.icon.sm};
    color: ${({ theme }) => theme.surface.mark};
    cursor: pointer;
  }

  .locationRow.empty {
    .locationIcon {
      color: ${({ theme }) => theme.surface.mark};
    }

    .noMapInfo {
      font-size: ${({ theme }) => theme.size.s13};
      color: ${({ theme }) => theme.ink.tertiary};
    }
  }

  .map {
    height: 200px;
    margin-top: ${({ theme }) => theme.space.s12};
    border-radius: ${({ theme }) => theme.radius.iconButton};
    overflow: hidden;
    position: relative;
    z-index: 1;
  }
`;
