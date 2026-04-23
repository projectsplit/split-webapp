import styled from 'styled-components';

export const MatrixShell = styled.div`
  position: relative;
`;

export const Glow = styled.div`
  position: absolute;
  inset: -0.25rem;
  background: linear-gradient(
    to right,
    rgba(221, 183, 255, 0.1),
    rgba(74, 225, 118, 0.05),
    rgba(221, 183, 255, 0.1)
  );
  filter: blur(48px);
  opacity: 0.2;
  pointer-events: none;
`;

export const Canvas = styled.div`
  position: relative;
  overflow-x: auto;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  background: rgba(14, 14, 14, 0.5);
  border: 1px solid rgba(77, 67, 84, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;

  @media (min-width: 1024px) {
    padding: 2.5rem;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0.5rem;
`;

export const EmptyState = styled.div`
  padding: 4rem 2rem;
  text-align: center;
  color: #cfc2d6;
  font-size: 0.875rem;
`;

export const RowLabelCell = styled.td`
  padding: 1rem;
  text-align: left;
  vertical-align: middle;
  border-right: 1px solid rgba(77, 67, 84, 0.15);
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: #e2e2e2;
  white-space: nowrap;
`;

export const HeaderCell = styled.th`
  padding: 1rem;
  text-align: left;
  min-width: 7rem;
`;

export const HeaderMarker = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #cfc2d6;
  display: block;
  margin-bottom: 0.25rem;
`;

export const HeaderLabel = styled.span`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: #e2e2e2;
  white-space: nowrap;
`;

export const CornerCell = styled.th`
  min-width: 8rem;
`;

export const DiagonalCell = styled.td`
  padding: 1rem;
  text-align: center;
  border-radius: 0.5rem;
  background: #353535;
  color: rgba(226, 226, 226, 0.5);
  font-family: 'Roboto Mono', monospace;
  font-size: 0.875rem;
  font-weight: 500;
`;
