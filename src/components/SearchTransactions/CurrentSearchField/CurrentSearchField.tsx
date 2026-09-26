import { StyledSearchFilterRow } from '../SearchFilterRow.styled';
import Pill from '../../Pill/Pill';
import { CurrentSearchFieldProps } from '../../../interfaces';
import { tokens } from '../../../styles/tokens';

export default function CurrentSearchField({
  currentSearch,
  filterState,
  submitButtonIsActive,
  removedFilter,
  showFreeTextPill,
}: CurrentSearchFieldProps) {
  const removeFilter = () => {
    showFreeTextPill.value = false;
    filterState.value.freeText = '';
    submitButtonIsActive.value = true;
    removedFilter.value = true;
  };

  return (
    <StyledSearchFilterRow>
      <div className="category">search term:</div>
      &nbsp;
      <div className="pills">
        <Pill
          title={currentSearch}
          color={tokens.ink.primary}
          closeButton={true}
          onClose={() => removeFilter()}
          $border={false}
          fontSize="12px"
          $textColor={tokens.ink.primary}
          $closeButtonColor={tokens.ink.tertiary}
          $radius="9px"
        />
      </div>
    </StyledSearchFilterRow>
  );
}
