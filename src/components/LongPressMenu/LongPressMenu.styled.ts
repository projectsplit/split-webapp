import styled from 'styled-components';

export const StyledLongPressMenu = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(2px);
    animation: fadeIn 0.2s ease;
  }

  .sheet {
    position: relative;
    background: ${({ theme }) => theme.layer2};
    border-radius: 20px 20px 0 0;
    padding: 12px 16px 32px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    animation: slideUp 0.22s cubic-bezier(0.34, 1.56, 0.64, 1);
    box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.25);

    .handle {
      width: 40px;
      height: 4px;
      border-radius: 2px;
      background: ${({ theme }) => theme.lightBorder};
      align-self: center;
      margin-bottom: 12px;
    }

    .option {
      display: flex;
      align-items: center;
      gap: 14px;
      width: 100%;
      padding: 16px 18px;
      border: none;
      border-radius: 12px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      transition: opacity 0.15s ease, transform 0.1s ease;

      &:active {
        opacity: 0.75;
        transform: scale(0.98);
      }

      .icon {
        font-size: 1.3rem;
        flex-shrink: 0;
      }
    }

    .option.edit {
      background: ${({ theme }) => theme.layer3 ?? 'rgba(81,131,238,0.12)'};
      color: ${({ theme }) => theme.primaryTextColor};
    }

    .option.delete {
      background: rgba(220, 53, 69, 0.12);
      color: #dc3545;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }
`;
