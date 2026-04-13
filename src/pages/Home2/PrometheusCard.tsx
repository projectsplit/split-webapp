import { MdBolt, MdAutoAwesome } from 'react-icons/md';
import {
  CardWrapper,
  SparkleIcon,
  CardContent,
  IconCircle,
  TextBlock,
} from './PrometheusCard.styled';

interface PrometheusCardProps {
  onClick?: () => void;
}

export const PrometheusCard = ({ onClick }: PrometheusCardProps) => {
  return (
    <CardWrapper onClick={onClick}>
      <SparkleIcon>
        <MdAutoAwesome />
      </SparkleIcon>
      <CardContent>
        <IconCircle>
          <MdBolt />
        </IconCircle>
        <TextBlock>
          <h5>Prometheus</h5>
          <p>Simulate survival against 1M+ market vectors.</p>
        </TextBlock>
      </CardContent>
    </CardWrapper>
  );
};
