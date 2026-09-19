import { ItemCardProps } from '../../interfaces';
import { StyledItemCard } from './ItemCard.styled';

export default function ItemCard({
  children,
  onClick,
  className,
}: ItemCardProps) {
  return (
    <StyledItemCard
      onClick={onClick}
      $clickable={!!onClick}
      className={className}
    >
      {children}
    </StyledItemCard>
  );
}
