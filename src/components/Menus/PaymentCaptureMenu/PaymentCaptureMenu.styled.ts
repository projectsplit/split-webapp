import styled from 'styled-components';
import { StyledSettingsMenu } from '../SettingsMenu/SettingsMenu.styled';

/** Opened from settings and drawn like it, so the rows, sections and header read as one place. */
export const StyledPaymentCaptureMenu = styled(StyledSettingsMenu)`
  .explainer {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s8};
    font-size: ${({ theme }) => theme.size.s13};
    line-height: 1.6;
    color: ${({ theme }) => theme.ink.secondary};

    p {
      margin: 0;
    }
  }

  .state {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s10};
    font-size: ${({ theme }) => theme.size.s13};
    line-height: 1.6;
    color: ${({ theme }) => theme.ink.secondary};

    p {
      margin: 0;
    }

    .attention {
      color: ${({ theme }) => theme.state.locked};
    }
  }

  .emptyApps {
    margin: 0;
    font-size: ${({ theme }) => theme.size.s12};
    line-height: 1.6;
    color: ${({ theme }) => theme.ink.tertiary};
  }
`;
