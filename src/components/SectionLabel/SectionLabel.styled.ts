import styled from 'styled-components';

export const StyledSectionLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space.s12};

  .sectionTitle {
    font-size: ${({ theme }) => theme.size.s11};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .sectionAside {
    font-size: ${({ theme }) => theme.size.s11};
    color: ${({ theme }) => theme.ink.tertiary};
    flex-shrink: 0;
  }
`;
