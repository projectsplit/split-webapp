import MenuAnimationBackground from '../Animations/MenuAnimationBackground';
import GeneralWarningMenuAnimation from '../Animations/GeneralWarningMenuAnimation';
import { globalWarningMenu, globalWarningMessage } from './globalWarningState';

export default function GlobalWarning() {
  return (
    <>
      <MenuAnimationBackground menu={globalWarningMenu} />
      <GeneralWarningMenuAnimation
        menu={globalWarningMenu}
        message={globalWarningMessage.value}
      />
    </>
  );
}
