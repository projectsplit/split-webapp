import styled from 'styled-components';

export const StyledStackedBar = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;

  .track {
    height: 5px;
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => theme.surface.raised};
    overflow: hidden;
  }

  .fill {
    height: 100%;
    border-radius: ${({ theme }) => theme.radius.pill};
    transition: width 0.5s ease;
  }

  .whole {
    height: 5px;
    border-radius: ${({ theme }) => theme.radius.pill};
  }
`;

export const StyledSplitBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 11px;

  .lead,
  .trail {
    height: 5px;
    transition: width 0.5s ease;
  }

  .lead {
    border-radius: ${({ theme }) =>
      `${theme.radius.pill} 0 0 ${theme.radius.pill}`};
  }

  .trail {
    border-radius: ${({ theme }) =>
      `0 ${theme.radius.pill} ${theme.radius.pill} 0`};
  }
`;

export const StyledOverlayBar = styled.div`
  position: relative;
  height: ${({ theme }) => theme.space.s8};
  border-radius: ${({ theme }) => theme.radius.pill};
  overflow: hidden;

  .lead {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    border-radius: ${({ theme }) => theme.radius.pill};
    transition: width 0.5s ease;
  }
`;

export const StyledRailBar = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex-shrink: 0;
  width: ${({ theme }) => theme.space.s3};
  height: 34px;
  border-radius: ${({ theme }) => theme.radius.pill};
  overflow: hidden;

  .railFill {
    width: 100%;
    margin-top: auto;
    border-radius: ${({ theme }) => theme.radius.pill};
    transition: height 0.5s ease;
  }
`;
