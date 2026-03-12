import { StyledNoTransfersFound } from './NoTransfersFound.styled';
import { Signal } from '@preact/signals-react';
import { Group, TransferParsedFilters, TruncatedMember } from '@/types';
import { QueryClient } from '@tanstack/react-query';
import { renderTransferFilterPills } from '@/helpers/renderTransferFilterPills';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { BiTransfer } from 'react-icons/bi';

interface NoTransfersFoundInterface {
  transferParsedFilters: Signal<TransferParsedFilters>;
  allParticipants: TruncatedMember[];
  group: Group;
  queryClient: QueryClient;
}

export const NoTransfersFound = ({
  transferParsedFilters,
  allParticipants,
  group,
  queryClient,
}: NoTransfersFoundInterface) => {
  const hasAnySearchParams =
    !!transferParsedFilters.value.before ||
    !!transferParsedFilters.value.after ||
    (transferParsedFilters.value.freeText !== '' &&
      transferParsedFilters.value.freeText !== undefined) ||
    (transferParsedFilters.value.sendersIds !== undefined &&
      transferParsedFilters.value.sendersIds.length > 0) ||
    (transferParsedFilters.value.receiversIds !== undefined &&
      transferParsedFilters.value.receiversIds.length > 0);

  return (
    <StyledNoTransfersFound>
      {hasAnySearchParams ? (
        <div className="noFilteredData">
          <div className="pills">
            {renderTransferFilterPills(
              transferParsedFilters,
              allParticipants,
              group,
              queryClient
            )}
          </div>
          <div className="textAndIcon">
            <span className="text">
              No transfers found. Have a go and refine your search!
            </span>
            <span className="emoji">🧐</span>
            <FaMagnifyingGlass className="icon" />
          </div>
          <div />
        </div>
      ) : (
        <div className="noData">
          <div className="msg">There are currently no transfers</div>
          <BiTransfer className="icon" />
        </div>
      )}
    </StyledNoTransfersFound>
  );
};
