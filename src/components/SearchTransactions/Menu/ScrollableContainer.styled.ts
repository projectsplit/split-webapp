import styled from 'styled-components';

export const ScrollableContainer = styled.div<{
  $contentEditableHeight: number;
}>`
  position: fixed;
  margin-top: ${({ $contentEditableHeight }) =>
    `${Math.max(8, $contentEditableHeight - 31)}px`};
  left: ${({ theme }) => theme.space.s20};
  right: ${({ theme }) => theme.space.s20};
  width: auto;
  max-height: calc(100dvh - 22rem);
  display: flex;
  flex-direction: column;

  .items {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex: 0 1 auto;
    min-height: 0;
  }

  .menuHint {
    flex-shrink: 0;
    padding: ${({ theme }) => `${theme.space.s10} 2px 0`};
    font-size: ${({ theme }) => theme.size.s12};
    line-height: 1.5;
    color: ${({ theme }) => theme.ink.tertiary};
    text-wrap: pretty;
  }

  @media (min-width: 769px) {
    left: 50%;
    right: auto;
    width: calc(768px - 40px);
    transform: translateX(-50%);
  }
`;
