import { IoClose } from 'react-icons/io5';
import { StyledFormHeader } from '@/components/FormHeader/FormHeader.styled';
import { Signal } from '@preact/signals-react';

export const Header = ({ menu }: { menu: Signal<string | null> }) => {
  return (
    <StyledFormHeader>
      <div className="gap"></div>
      <div className="title">New Transfer</div>
      <div className="closeButtonContainer" onClick={() => (menu.value = null)}>
        <IoClose className="closeButton" />
      </div>
    </StyledFormHeader>
  );
};
