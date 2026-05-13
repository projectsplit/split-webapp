import React from 'react';
import { StyledLabelsDisplay } from './LabelsDisplay.styled';
import { IoClose } from 'react-icons/io5';
import labelColors from '../../../../labelColors';
import { LabelsDisplayProps } from '../../../../interfaces';
import { FaTags } from 'react-icons/fa';
import { MdGroup } from 'react-icons/md';

export default function LabelsDisplay({
  labels,
  setLabels,
  labelMenuIsOpen,
  isPersonal,
}: LabelsDisplayProps) {
  const handleSelectedLabelClick = (labelId: string) => {
    setLabels(labels.filter((x) => x.id !== labelId));
  };

  return (
    <StyledLabelsDisplay>
      {' '}
      <FaTags
        className="tagIcon"
        onClick={() => (labelMenuIsOpen.value = true)}
      />
      <div className="labels">
        {' '}
        {labels.map((x) => {
          return (
            <span
              key={x.id}
              style={{
                backgroundColor: labelColors[x.color],
                color: '#000000c8',
              }}
              onClick={() => handleSelectedLabelClick(x.id)}
              className="selected-label"
            >
              {isPersonal && !x.id.includes('_') && (
                <MdGroup style={{ marginRight: '4px' }} />
              )}
              {x.text}
              <IoClose />
            </span>
          );
        })}
      </div>
    </StyledLabelsDisplay>
  );
}
