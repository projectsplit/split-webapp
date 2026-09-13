import { styled } from 'styled-components';

export const StyledTopBarWithBackButton = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.s10};
  flex-shrink: 0;
  padding: ${({ theme }) =>
    `${theme.space.s16} ${theme.space.s20} ${theme.space.s8}`};
  padding-top: calc(${({ theme }) => theme.space.s16} + env(safe-area-inset-top));

  .descr {
    flex: 1;
    min-width: 0;
    text-align: center;
    margin-right: 34px;
    font-size: ${({ theme }) => theme.size.s17};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: -0.01em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
