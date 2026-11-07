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
import { welcomeTourOpen } from '../../helpers/welcomeTour';

export const PwaInstallPrompt: React.FC = () => {
  const { isInstallable, isAppInstalled, promptInstall, clearPrompt } = usePwaInstall();

  // After the welcome tour rather than over it, on someone's first sign-in.
  if (!isInstallable || isAppInstalled || welcomeTourOpen.value) {
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
