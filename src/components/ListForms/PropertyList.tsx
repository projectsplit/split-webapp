import { Children, Fragment } from 'react';
import { PropertyListProps, PropertyRowProps } from '../../interfaces';
import { StyledPropertyList, StyledPropertyRow } from './PropertyList.styled';

export function PropertyRow({
  label,
  icon,
  children,
  onClick,
  className,
  action,
  note,
}: PropertyRowProps) {
  return (
    <StyledPropertyRow
      onClick={onClick}
      $clickable={!!onClick}
      $hasNote={!!note}
      $hasIcon={!!icon}
      className={className}
    >
      <div className="propertyMain">
        {icon ? <span className="propertyIcon">{icon}</span> : null}
        <span className={action ? 'propertyAction' : 'propertyLabel'}>
          {label}
        </span>
        <span className="propertyValue">{children}</span>
      </div>
      {note ? <div className="propertyNote">{note}</div> : null}
    </StyledPropertyRow>
  );
}

export default function PropertyList({ children }: PropertyListProps) {
  const rows = Children.toArray(children);

  return (
    <StyledPropertyList>
      {rows.map((row, index) => (
        <Fragment key={index}>
          {index > 0 ? <div className="divider" /> : null}
          {row}
        </Fragment>
      ))}
    </StyledPropertyList>
  );
}
