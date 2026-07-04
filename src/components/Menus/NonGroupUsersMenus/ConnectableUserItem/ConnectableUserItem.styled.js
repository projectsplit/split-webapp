import styled from 'styled-components';
export const StyledConnectableUserItem = styled.div `
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  cursor: pointer;

  .top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;

    .name {
      flex: 1;
    }

    .chip {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 0.25rem 0.625rem;
      border-radius: 999px;
      white-space: nowrap;
    }

    .chip.request {
      border: 1px solid ${({ theme }) => theme.highlightColor};
      color: ${({ theme }) => theme.highlightColor};
    }

    .chip.pending {
      border: 1px solid grey;
      color: grey;
      cursor: default;
    }

    .chip.accept {
      background-color: ${({ theme }) => theme.highlightColor};
      color: ${({ theme }) => theme.backgroundcolor};
    }
  }
`;
