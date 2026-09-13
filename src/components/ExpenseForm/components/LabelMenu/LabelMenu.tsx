import { StyledLabelMenu } from './LabelMenu.styled';
import BackButton from '../../../BackButton/BackButton';
import { LabelMenuProps } from '../../../../interfaces';
import LabelPicker from '../../../LabelPicker/LabelPicker';
import MyButton from '../../../MyButton/MyButton';
import { useSignal } from '@preact/signals-react';
import GeneralWarningMenuAnimation from '@/components/Animations/GeneralWarningMenuAnimation';
import MenuAnimationBackground from '@/components/Animations/MenuAnimationBackground';
import { useCloseOnBack } from '@/hooks/useCloseOnBack';

export const LabelMenu = ({
  labelMenuIsOpen,
  groupId,
  labels,
  setLabels,
  userId,
  isPersonal,
}: LabelMenuProps) => {
  const errorMessage = useSignal<string>('');
  const menu = useSignal<string | null>(null);

  useCloseOnBack(labelMenuIsOpen.value, () => (labelMenuIsOpen.value = false));

  return (
    <StyledLabelMenu>
      <div className="fixedHeader">
        <div className="header">
          <BackButton onClick={() => (labelMenuIsOpen.value = false)} />
          <div className="title">Tag expense</div>
          <div className="gap"></div>
        </div>
      </div>

      <div className="scrollable-content">
        <LabelPicker
          labels={labels}
          setLabels={setLabels}
          groupId={groupId}
          errorMessage={errorMessage}
          userId={userId}
          isPersonal={isPersonal}
          menu={menu}
        />
      </div>

      <div className="doneButton">
        <MyButton onClick={() => (labelMenuIsOpen.value = false)}>
          Done
        </MyButton>
      </div>

      <MenuAnimationBackground menu={menu} />
      <GeneralWarningMenuAnimation message={errorMessage.value} menu={menu} />
    </StyledLabelMenu>
  );
};

export default name;
