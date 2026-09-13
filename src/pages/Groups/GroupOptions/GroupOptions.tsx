import IonIcon from '@reacticons/ionicons';
import { IoQrCode } from 'react-icons/io5';
import { getSymbolFromCurrency } from '../../../helpers/currency-symbol-map';
import {
  IoClose,
} from 'react-icons/io5';
import { StyledGroupOptions } from './GroupOptions.styled';
import PropertyList, { PropertyRow } from '../../../components/ListForms/PropertyList';
import SectionLabel from '../../../components/SectionLabel/SectionLabel';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Signal, useSignal } from '@preact/signals-react';
import MenuAnimationBackground from '../../../components/Animations/MenuAnimationBackground';
import CurrencyOptionsAnimation from '../../../components/Animations/CurrencyOptionsAnimation';
import { UserInfo } from '../../../types';
import { GroupOptionsProps } from '../../../interfaces';
import ConfirmArchiveGroupAnimation from '../../../components/Animations/ConfirmArchiveGroupAnimation';
import ConfirmLeaveGroupAnimation from '../../../components/Animations/ConfirmLeaveGroupAnimation';
import RenameGroupAnimationAnimation from '../../../components/Animations/RenameGroupAnimation';
import { useChangeGroupCurrency } from '../../../api/auth/CommandHooks/useChangeGroupCurrency';
import { useQueryClient } from '@tanstack/react-query';
import RemoveUserFromGroupMenu from '../../../components/Menus/RemoveUserFromGroupMenu/RemoveUserFromGroupMenu';
import AddNewUserAnimation from '../../../components/Animations/AddNewUserAnimation';
import CurrencyFlag from '../../../components/CurrencyFlag/CurrencyFlag';
import { useCloseOnBack } from '@/hooks/useCloseOnBack';

export default function GroupOptions({ group }: GroupOptionsProps) {
  const navigate = useNavigate();
  const { userInfo, openGroupOptionsMenu } = useOutletContext<{
    openGroupOptionsMenu: Signal<boolean>;
    userInfo: UserInfo;
  }>();
  const queryClient = useQueryClient();
  const refetchQueries = useSignal<boolean>(false);
  const groupCurrency = group?.currency || '';
  const groupName = group?.name;
  const currencyMenu = useSignal<string | null>(null);
  const archiveGroupMenu = useSignal<string | null>(null);
  const leaveGroupMenu = useSignal<string | null>(null);
  const newUserMenu = useSignal<string | null>(null);
  const renameMenu = useSignal<string | null>(null);
  const noGroupFoundError = useSignal<string>('');
  const openRemoveUserMenu = useSignal<boolean>(false);
  const updateGroupCurrency = useChangeGroupCurrency(
    group?.id,
    noGroupFoundError,
    refetchQueries
  );

  const handldeCurrencyOptionsClick = (curr: string) => {
    currencyMenu.value = null;
    updateGroupCurrency.mutate(curr);
  };

  const memberCount =
    (group?.members?.length ?? 0) + (group?.guests?.length ?? 0);

  const handleClose = async () => {
    openGroupOptionsMenu.value = false;
    if (refetchQueries.value) {
      try {
        await queryClient.invalidateQueries({
          queryKey: [group?.id],
          exact: false,
        });
        await queryClient.invalidateQueries({
          queryKey: ['shared'],
          exact: false,
        });
        await queryClient.invalidateQueries({
          queryKey: ['mostRecentGroup'],
          exact: false,
        });
      } catch (error) {
        console.error('Error refetching queries:', error);
      }
    }
  };

  useCloseOnBack(openGroupOptionsMenu.value, handleClose);

  return (
    <StyledGroupOptions>
      {' '}
      <div className="header">
        <div className="slot" />
        <div className="title">{groupName}</div>
        <div className="slot closeButtonContainer" onClick={handleClose}>
          <IoClose className="closeButton" />
        </div>
      </div>

      <div className="optionsContainer">
        <div className="section">
          <SectionLabel title="Group" />
          <PropertyList>
            <PropertyRow
              label="Base currency"
              onClick={() => (currencyMenu.value = 'currencyOptions')}
            >
              <span className="rowValue">
                <CurrencyFlag code={groupCurrency} />
                <span className="monoValue">
                  {groupCurrency} {getSymbolFromCurrency(groupCurrency) ?? ''}
                </span>
                <IonIcon name="chevron-forward-outline" className="rowIcon" />
              </span>
            </PropertyRow>
            <PropertyRow
              label="Name"
              onClick={() => (renameMenu.value = 'renameGroup')}
            >
              <span className="rowValue">
                {groupName}
                <IonIcon name="chevron-forward-outline" className="rowIcon" />
              </span>
            </PropertyRow>
          </PropertyList>
        </div>

        <div className="section">
          <SectionLabel title="Members" />
          <PropertyList>
            <PropertyRow
              action
              label="New user"
              onClick={() => (newUserMenu.value = 'newUser')}
            >
              <IonIcon name="chevron-forward-outline" className="rowIcon" />
            </PropertyRow>
            <PropertyRow
              action
              label="Remove member"
              onClick={() => (openRemoveUserMenu.value = true)}
            >
              <span className="rowValue">
                <span className="rowCount">{memberCount}</span>
                <IonIcon name="chevron-forward-outline" className="rowIcon" />
              </span>
            </PropertyRow>
            <PropertyRow
              action
              label="Share group"
              onClick={() => {
                const searchParams = new URLSearchParams(location.search);
                searchParams.set('in', 'true');
                navigate(
                  `/shared/generatecode/${group?.id}?${searchParams.toString()}`,
                  { replace: true, state: { from: location.pathname } }
                );
              }}
            >
              <span className="rowValue">
                <IoQrCode className="rowIcon" />
                <IonIcon name="chevron-forward-outline" className="rowIcon" />
              </span>
            </PropertyRow>
          </PropertyList>
        </div>

        <div className="section">
          <SectionLabel title="This group" />
          <PropertyList>
            <PropertyRow
              action
              label="Archive group"
              note="Keeps the history, stops new entries. Reversible."
              onClick={() => (archiveGroupMenu.value = 'archiveGroup')}
            />
            <PropertyRow
              action
              label="Leave group"
              note="Only possible once your balance is settled."
              onClick={() => (leaveGroupMenu.value = 'leaveGroup')}
            />
          </PropertyList>
        </div>
      </div>
      <MenuAnimationBackground menu={currencyMenu} />
      <MenuAnimationBackground menu={archiveGroupMenu} />
      <MenuAnimationBackground menu={leaveGroupMenu} />
      <MenuAnimationBackground menu={renameMenu} />
      <MenuAnimationBackground menu={newUserMenu} />
      <CurrencyOptionsAnimation
        currencyMenu={currencyMenu}
        clickHandler={handldeCurrencyOptionsClick}
        selectedCurrency={groupCurrency}
      />
      <ConfirmArchiveGroupAnimation
        menu={archiveGroupMenu}
        groupId={group?.id}
        openGroupOptionsMenu={openGroupOptionsMenu}
        navigateToGroups={true}
      />
      <ConfirmLeaveGroupAnimation
        menu={leaveGroupMenu}
        groupId={group?.id}
        openGroupOptionsMenu={openGroupOptionsMenu}
      />
      <RenameGroupAnimationAnimation
        menu={renameMenu}
        groupId={group?.id}
        groupName={group?.name}
      />
      {openRemoveUserMenu.value && (
        <RemoveUserFromGroupMenu
          groupId={group?.id}
          openRemoveUserMenu={openRemoveUserMenu}
          userInfo={userInfo}
        />
      )}
      {group && <AddNewUserAnimation menu={newUserMenu} />}
    </StyledGroupOptions>
  );
}
