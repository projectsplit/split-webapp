import styled from 'styled-components';
export const StyledConnectRequestConfirm = styled.div `
  position: fixed;
  inset: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);

  .card {
    background-color: ${({ theme }) => theme.layer2};
    border-radius: 12px;
    padding: 1.5rem;
    margin: 0 1.5rem;
    max-width: 22rem;

    .title {
      font-weight: 600;
      margin-bottom: 0.75rem;
    }

    .message {
      font-size: 0.875rem;
      color: ${({ theme }) => theme.secondaryTextColor};
      margin-bottom: 1.25rem;
    }

    .buttons {
      display: flex;
      gap: 1rem;
    }
  }
`;
