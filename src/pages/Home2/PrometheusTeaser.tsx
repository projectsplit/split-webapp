import { MdAnalytics, MdClose } from 'react-icons/md';
import {
  TeaserWrapper,
  GlowOrb,
  TeaserContent,
  TeaserLabel,
  TeaserTitle,
  TeaserDescription,
  TeaserButton,
  CloseButton,
} from './PrometheusTeaser.styled';

interface PrometheusTeaserProps {
  onClose: () => void;
  onClick: () => void;
}

export const PrometheusTeaser = ({ onClose, onClick }: PrometheusTeaserProps) => {
  return (
    <TeaserWrapper onClick={onClick}>
      <CloseButton
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        <MdClose />
      </CloseButton>

      <GlowOrb $position="top-right" />
      <GlowOrb $position="bottom-left" />

      <TeaserContent>
        <TeaserLabel>
          <MdAnalytics />
          <span>Institutional Modeling</span>
        </TeaserLabel>

        <TeaserTitle>
          Activate the <br />
          <span className="highlight">Prometheus Engine</span>
        </TeaserTitle>

        <TeaserDescription>
          A budget tells you what you spent. A Risk Engine tells you what you'll
          survive. Prometheus simulates million versions of your life.
        </TeaserDescription>

        <TeaserButton>Access Resiliency Flow</TeaserButton>
      </TeaserContent>
    </TeaserWrapper>
  );
};
