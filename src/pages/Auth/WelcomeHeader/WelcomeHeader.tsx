import { memo } from 'react';
import { Logo, StyledWelcomeHeader } from './WelcomeHeader.styled';
import logo from '../../../styles/logo/logo2.png';

function WelcomeHeader() {
  return (
    <StyledWelcomeHeader>
      <div className="appName">
        <Logo src={logo} alt="B" />
        <strong className="uqs">uqs</strong>
      </div>
    </StyledWelcomeHeader>
  );
}

export default memo(WelcomeHeader);
