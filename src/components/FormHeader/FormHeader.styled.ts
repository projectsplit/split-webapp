import styled from 'styled-components';

export const StyledFormHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.space.s10};
  flex-shrink: 0;
  padding: ${({ theme }) =>
    `${theme.space.s20} ${theme.space.s20} ${theme.space.s16}`};

  .gap {
    width: 34px;
    flex-shrink: 0;
  }

  .title {
    flex: 1;
    min-width: 0;
    text-align: center;
    font-size: ${({ theme }) => theme.size.s17};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: -0.01em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .closeButtonContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    flex-shrink: 0;
    color: ${({ theme }) => theme.ink.secondary};
    cursor: pointer;
  }

  .closeButton {
    display: block;
    font-size: ${({ theme }) => theme.icon.lg};
  }
`;
