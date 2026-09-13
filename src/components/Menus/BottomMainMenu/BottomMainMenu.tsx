import { memo } from 'react';
import { GoHomeFill } from 'react-icons/go';
import { FaPlus } from 'react-icons/fa';
import { IoMdSearch } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { StyledBottomMainMenu } from './BottomMainMenu.styled';
import { BottomMainMenuProps } from '../../../interfaces';
import { RiProhibited2Line } from 'react-icons/ri';
import routes from '@/routes';

function BottomMainMenu({
  onClick,
  group,
  menu,
  onGroupSearchClick,
  bottomBarRef,
}: BottomMainMenuProps) {
  const navigate = useNavigate();
  return (
    <StyledBottomMainMenu
      className="bottom-bar"
      $groupIsArchived={group && group.isArchived}
    >
      <div className="bottomMainBar">
        <div className="home" onClick={() => navigate(routes.ROOT)}>
          <GoHomeFill />
        </div>
        {group && group.isArchived ? (
          <div className="add" onClick={onClick}>
            <RiProhibited2Line className="prohibited" />
          </div>
        ) : (
          <div className="add" onClick={onClick}>
            <FaPlus />
          </div>
        )}
        <div className="search" onClick={onGroupSearchClick} ref={bottomBarRef}>
          <IoMdSearch
            onClick={() => {
              if (menu) {
                menu.value = 'search';
              }
            }}
          />
        </div>
      </div>
    </StyledBottomMainMenu>
  );
}

export default memo(BottomMainMenu);
