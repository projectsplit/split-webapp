import React from 'react';
import { usePwaInstall } from '../../hooks/usePwaInstall';
import {
  Overlay,
  PromptContainer,
  Header,
  Title,
  Description,
  ButtonGroup,
  InstallButton,
  DismissButton,
  Icon
} from './PwaInstallPrompt.styled'
import logo from '../../styles/logo/logoRounded.png';

export const PwaInstallPrompt: React.FC = () => {
  const { isInstallable, isAppInstalled, promptInstall, clearPrompt } = usePwaInstall();

  if (!isInstallable || isAppInstalled) {
    return null;
  }

  return (
    <Overlay>
      <PromptContainer>
        <Header>
          <Icon src={logo} alt="Buqs Logo" />
          <div>
            <Title>Install Buqs App</Title>
            <Description>Add to your home screen for a better and faster experience.</Description>
          </div>
        </Header>
        <ButtonGroup>
          <DismissButton onClick={clearPrompt}>Not Now</DismissButton>
          <InstallButton onClick={promptInstall}>Install</InstallButton>
        </ButtonGroup>
      </PromptContainer>
    </Overlay>
  );
};
