import styled from 'styled-components';

const StyledScrollPicker = styled.div`
  touch-action: none;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  user-select: none;
  border: 1px solid ${({ theme }) => theme.surface.hairline};
  border-radius: ${({ theme }) => theme.radius.control};
  width: 100%;
  cursor: grab;

  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s14};
    color: ${({ theme }) => theme.ink.tertiary};

    &.selected {
      color: ${({ theme }) => theme.ink.primary};
      background-color: ${({ theme }) => theme.surface.raised};
    }
  }
`;

export default StyledScrollPicker;
