import styled from 'styled-components';

export const StyledWelcomeHeader = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  color: ${({ theme }) => theme.ink.primary};

  .appName {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: ${({ theme }) => `44px ${theme.space.s20} 36px`};
    font-size: 36px;
  }

  .uqs {
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: -0.02em;
  }
`;

export const Logo = styled.img`
  display: block;
  max-width: 25px;
  max-height: 35px;
  width: auto;
  height: auto;
`;
