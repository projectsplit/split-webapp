import {
  MdWarningAmber,
  MdHub,
  MdRadar,
  MdShield,
  MdBolt,
  MdScatterPlot,
} from 'react-icons/md';
import { ARCHETYPE_LABELS, TailArchetype } from '../../interfaces';
import { formatPct } from '../../utils';
import {
  Banner,
  HeadRow,
  ArchetypeChip,
  HeadlineText,
  Accent,
  SubMeta,
  MetaItem,
} from './HeadlineBanner.styled';

interface HeadlineBannerProps {
  tailLabel: string;
  archetype: TailArchetype;
  baselinePBust: number;
  headline?: string;
}

const ARCHETYPE_TONE: Record<
  TailArchetype,
  { tone: 'critical' | 'warning' | 'safe' | 'neutral'; icon: React.ReactNode }
> = {
  single_driver: { tone: 'critical', icon: <MdBolt /> },
  combination: { tone: 'critical', icon: <MdHub /> },
  additive_multi: { tone: 'warning', icon: <MdScatterPlot /> },
  diffuse: { tone: 'warning', icon: <MdRadar /> },
  mixed: { tone: 'warning', icon: <MdWarningAmber /> },
  no_tail: { tone: 'safe', icon: <MdShield /> },
};

export const HeadlineBanner = ({
  tailLabel,
  archetype,
  baselinePBust,
  headline,
}: HeadlineBannerProps) => {
  const { tone, icon } = ARCHETYPE_TONE[archetype];

  return (
    <Banner>
      <HeadRow>
        <ArchetypeChip $tone={tone}>
          {icon}
          {ARCHETYPE_LABELS[archetype]}
        </ArchetypeChip>
      </HeadRow>
      <HeadlineText>{headline ?? tailLabel}</HeadlineText>
      <Accent />
      <SubMeta>
        <MetaItem>
          BASELINE P(BUST): <strong>{formatPct(baselinePBust * 100, 4)}</strong>
        </MetaItem>
        <MetaItem>
          TAIL: <strong>{tailLabel}</strong>
        </MetaItem>
      </SubMeta>
    </Banner>
  );
};
