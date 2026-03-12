import { StyledScopeSelectionMenu } from './ScopeSelectionMenu.styled';
import { Signal } from '@preact/signals-react';
import { BiArrowBack } from 'react-icons/bi';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdGroupOff } from 'react-icons/md';
import { TiGroup } from 'react-icons/ti';

export const ScopeSelectionMenu = ({ menu }: ScopeSelectionMenuProps) => {
  return (
    <StyledScopeSelectionMenu>
      <div className="fixed-header-container">
        <div className="header">
          <div
            className="closeButtonContainer"
            onClick={() => (menu.value = null)}
          >
            <BiArrowBack className="closeButton" />
          </div>
          <div className="title">Select scope</div>
          <div className="gap"></div>
        </div>
      </div>
      <div className="scopeOptions">
        <div className="buttonWrapper">
          <div className="button">
            <MdGroupOff className="groupIcon non" />
            <div className="text-container">
              <span className="descr">Non</span>
              <span className="descr">Groups</span>
            </div>
          </div>
        </div>

        <div className="buttonWrapper">
          <div className="button">
            <TiGroup className="groupIcon active" />
            <div className="text-container">
              <span className="descr">Groups</span>
            </div>
          </div>
        </div>

        <div className="buttonWrapper">
          <div className="button">
            <BsFillPersonFill className="groupIcon archived" />
            <div className="text-container">
              <span className="descr">Personal</span>
            </div>
          </div>
        </div>
      </div>
    </StyledScopeSelectionMenu>
  );
};

interface ScopeSelectionMenuProps {
  menu: Signal<string | null>;
}
