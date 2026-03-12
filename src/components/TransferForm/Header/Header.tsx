import { IoClose } from 'react-icons/io5';
import { StyledHeader } from './Header.styled';
import { Signal } from '@preact/signals-react';

export const Header = ({ menu }: { menu: Signal<string | null> }) => {
  return (
    <StyledHeader>
      <div className="gap"></div>
      <div className="title">New Transfer</div>
      <div className="closeButtonContainer" onClick={() => (menu.value = null)}>
        <IoClose className="closeButton" />
      </div>
    </StyledHeader>
  );
};
