import { TiGroup } from 'react-icons/ti';
import { Details, GroupsAllBalancesResponse } from '@/types';
import { TreeItemBuilderForHomeAndGroups } from '@/components/TreeItemBuilderForHomeAndGroups';
import {
  SharedWrapper,
  SharedHeader,
  SharedLabel,
  SharedBalanceInfo,
} from './SharedCard.styled';

interface SharedCardProps {
  totalBalances: Details;
  groupsData: GroupsAllBalancesResponse | undefined;
  isLoading: boolean;
  isFetching: boolean;
  onClick: () => void;
}

export const SharedCard = ({
  totalBalances,
  groupsData,
  isLoading,
  isFetching,
  onClick,
}: SharedCardProps) => {
  const noGroups = !isLoading && !isFetching && groupsData?.groupCount === 0;

  const balanceItems = TreeItemBuilderForHomeAndGroups(totalBalances);

  return (
    <SharedWrapper onClick={onClick}>
      <SharedHeader>
        <TiGroup />
        <SharedLabel>Shared</SharedLabel>
      </SharedHeader>
      {noGroups ? (
        <SharedBalanceInfo>
          Keep track of your shared finances
        </SharedBalanceInfo>
      ) : (
        balanceItems.map((item, index) => (
          <SharedBalanceInfo key={index}>{item}</SharedBalanceInfo>
        ))
      )}
    </SharedWrapper>
  );
};
