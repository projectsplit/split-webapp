import styled from 'styled-components';

export const SliderViewport = styled.div`
  overflow: hidden;
  border-radius: 1rem;
  position: relative;
`;

export const SliderTrack = styled.div<{ $offset: number; $animate: boolean }>`
  display: flex;
  gap: 0.75rem;
  transform: translateX(${({ $offset }) => $offset}px);
  transition: ${({ $animate }) =>
    $animate ? 'transform 0.3s ease-out' : 'none'};
  will-change: transform;
`;

export const Slide = styled.div<{ $width: number }>`
  flex-shrink: 0;
  width: ${({ $width }) => $width}px;
`;

export const DotsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 10px;
`;

export const Dot = styled.div<{ $active: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${({ $active }) => ($active ? '#e2e2e2' : '#353535')};
  transition: background-color 0.2s ease;
`;

/* Side-by-side mode for wider screens */
export const SideBySideGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  align-items: stretch;

  /* Make children fill the height */
  > * {
    min-height: 0;

    /* Target the budget info message wrapper to fill height */
    > div {
      height: 100%;
    }
  }
`;
