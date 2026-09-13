import { useBeautifulMentions } from 'lexical-beautiful-mentions';
import { LabelsPillsDisplayProps } from '../../../../../interfaces';
import { StyledSearchFilterRow } from '../../../SearchFilterRow.styled';
import Pill from '../../../../Pill/Pill';
import { useEffect, useState } from 'react';
import { FetchedLabel } from '../../../../../types';
import {
  labelChipInk,
  resolveLabelColor,
} from '../../../../../helpers/labelChip';
import { MdGroup } from 'react-icons/md';

export default function LabelsPillsDisplay({
  category,
  filteredLabels,
  showOptions,
  submitButtonIsActive,
  filterState,
  cancelled,
  removedFilter,
  isPersonal,
}: LabelsPillsDisplayProps) {
  const { insertMention } = useBeautifulMentions();

  const [showFilteredLabels, setShowFilteredLabels] = useState<FetchedLabel[]>(
    []
  );

  useEffect(() => {
    setShowFilteredLabels(filteredLabels.value);
    if (cancelled.value) {
      cancelled.value = false;
    }
  }, [filteredLabels.value, cancelled.value, cancelled]);

  const removeFilter = (filterId: string) => {
    removedFilter.value = true;
    setShowFilteredLabels((prev) =>
      prev.filter((filter) => filter.id !== filterId)
    );
    filterState.value.labels = filterState.value.labels.filter(
      (id) => id !== filterId
    );
    filteredLabels.value = filteredLabels.value.filter(
      (label) => label.id !== filterId
    );
    submitButtonIsActive.value = true;
  };

  return (
    <StyledSearchFilterRow>
      <div
        className="category"
        onClick={() => {
          insertMention({ trigger: category + ':', value: '' });
          showOptions.value = false;
          submitButtonIsActive.value = true;
        }}
      >
        {category}:
      </div>
      &nbsp;
      <div className="pills">
        {showFilteredLabels.length > 0 ? (
          showFilteredLabels.map((label) => (
            <div key={label.id}>
              <Pill
                key={label?.id}
                title={label?.value}
                color={resolveLabelColor(label?.color)}
                closeButton={true}
                onClose={() => removeFilter(label?.id)}
                $border={false}
                $textColor={labelChipInk(resolveLabelColor(label?.color))}
                fontSize="12px"
                $closeButtonColor={labelChipInk(resolveLabelColor(label?.color))}
              >
                {isPersonal && !label.id.includes('_') && (
                  <MdGroup style={{ marginRight: '4px' }} />
                )}
              </Pill>
            </div>
          ))
        ) : (
          <div className="type">label</div>
        )}
      </div>
    </StyledSearchFilterRow>
  );
}
