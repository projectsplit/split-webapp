import { StyledFiltersAndBars } from './FiltersAndBars.styled';
import { FiltersAndBarsSkeleton } from '@/components/FiltersAndBarsSkeleton/FiltersAndBarsSkeleton';
import { renderTransferFilterPills } from '@/helpers/renderTransferFilterPills';
import BarsWithLegends from '@/components/BarsWithLegends/BarsWithLegends';
import { Signal } from '@preact/signals-react';
import { TransferParsedFilters, Group, Mode, TruncatedMember } from '@/types';
import { QueryClient } from '@tanstack/react-query';

interface FiltersAndBarsInterface {
  transferParsedFilters: Signal<TransferParsedFilters>;
  allParticipants: TruncatedMember[];
  group: Group;
  queryClient: QueryClient;
  menu: Signal<string | null>;
  currency: string;
  totalsAreFetching: boolean;
  userConvertedTotalReceived: number | undefined;
  userConvertedTotalSent: number | undefined;
}

export const FiltersAndBars = ({
  transferParsedFilters,
  allParticipants,
  group,
  queryClient,
  menu,
  currency,
  totalsAreFetching,
  userConvertedTotalReceived,
  userConvertedTotalSent,
}: FiltersAndBarsInterface) => {
  return (
    <StyledFiltersAndBars>
      {totalsAreFetching ? (
        <FiltersAndBarsSkeleton mode={Mode.Group} />
      ) : (
        <div className="filtersAndBars">
          <div className="pills" onTouchStart={(e) => e.stopPropagation()}>
            {' '}
            {renderTransferFilterPills(
              transferParsedFilters,
              allParticipants,
              group,
              queryClient
            )}
          </div>
          <BarsWithLegends
            bar1Legend="Total Sent"
            bar2Legend="Total Received"
            bar1Total={userConvertedTotalSent || 0}
            bar2Total={userConvertedTotalReceived || 0}
            currency={currency}
            bar1Color="#0CA0A0"
            bar2Color="#D79244"
            onClick={() => {
              menu.value = 'epensesByCurrency';
            }}
          />
        </div>
      )}
    </StyledFiltersAndBars>
  );
};
