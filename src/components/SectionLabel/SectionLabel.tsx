import { SectionLabelProps } from '../../interfaces';
import { StyledSectionLabel } from './SectionLabel.styled';

export default function SectionLabel({ title, aside }: SectionLabelProps) {
  return (
    <StyledSectionLabel>
      <span className="sectionTitle">{title}</span>
      {aside ? <span className="sectionAside">{aside}</span> : null}
    </StyledSectionLabel>
  );
}
