import { Card, Label, Row, Amount, DeltaChip } from './NetWorthCard.styled';

interface NetWorthCardProps {
  amount: string;
  delta: string;
}

export const NetWorthCard = ({ amount, delta }: NetWorthCardProps) => {
  return (
    <Card>
      <Label>Current Net Worth Aggregate</Label>
      <Row>
        <Amount>{amount}</Amount>
        <DeltaChip>{delta}</DeltaChip>
      </Row>
    </Card>
  );
};
