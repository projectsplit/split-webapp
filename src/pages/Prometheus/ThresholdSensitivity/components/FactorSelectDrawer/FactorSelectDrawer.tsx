import { useState } from 'react';
import {
  MdClose,
  MdAccountBalance,
  MdPublic,
  MdScience,
  MdRadar,
  MdExpandMore,
} from 'react-icons/md';
import { Signal } from '@preact/signals-react';
import {
  MAIN_FACTORS,
  ADVANCED_FACTORS,
  isFactorVisible,
  getFactorLabel,
  RiskVisibility,
  CAREER_INTERNAL_FACTORS,
  formatFactorName,
} from '@/pages/Prometheus/Conditional/utils';
import { FactorsResponse, FactorStats } from '@/pages/Prometheus/WhatIf/interfaces';
import { generateDefaultThresholds } from '../../utils';
import {
  Overlay,
  Drawer,
  Handle,
  DrawerHeader,
  DrawerTitleBlock,
  DrawerTitle,
  DrawerSubtitle,
  CloseButton,
  DrawerContent,
  CategoryGrid,
  CategorySection,
  CategoryHeader,
  CategoryLabel,
  FactorGrid,
  FactorButton,
  FactorName,
  FactorDesc,
  AdvancedToggle,
  AdvancedToggleLabel,
  AdvancedToggleIcon,
  AdvancedContent,
  AdvancedInner,
  LoadingContainer,
  LoadingOrb,
  LoadingLabel,
  SkeletonGrid,
  SkeletonSection,
  SkeletonBar,
  SkeletonCard,
} from '@/pages/Prometheus/Conditional/components/AddConditionDrawer/AddConditionDrawer.styled';

interface FactorSelectDrawerProps {
  open: boolean;
  onClose: () => void;
  factor: Signal<string>;
  thresholds: Signal<number[]>;
  factors: FactorsResponse | undefined;
  isLoading: boolean;
  bondTenor: number;
  riskToggles: RiskVisibility;
}

const SKELETON_COUNTS = [4, 5, 5];

export const FactorSelectDrawer = ({
  open,
  onClose,
  factor,
  thresholds,
  factors,
  isLoading,
  bondTenor,
  riskToggles,
}: FactorSelectDrawerProps) => {
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const getStats = (key: string): FactorStats | undefined =>
    factors?.risks[key] ?? factors?.factors[key];

  const handleSelect = (factorName: string) => {
    factor.value = factorName;
    const stats = getStats(factorName);
    if (stats) {
      thresholds.value = generateDefaultThresholds(stats, factorName);
    } else {
      thresholds.value = [];
    }
    onClose();
  };

  const allData = factors ? { ...factors.risks, ...factors.factors } : {};

  const riskKeys = factors
    ? Object.keys(factors.risks).filter((k) => !CAREER_INTERNAL_FACTORS.has(k))
    : [];

  const availableMain = MAIN_FACTORS.filter(
    (f) =>
      f.key in allData &&
      isFactorVisible(f.key, riskToggles) &&
      !CAREER_INTERNAL_FACTORS.has(f.key),
  );

  const availableAdvanced = ADVANCED_FACTORS.filter(
    (f) =>
      f.key in allData &&
      isFactorVisible(f.key, riskToggles) &&
      !CAREER_INTERNAL_FACTORS.has(f.key),
  );

  return (
    <>
      <Overlay $open={open} onClick={onClose} />
      <Drawer $open={open}>
        <Handle onClick={onClose} />
        <DrawerHeader>
          <DrawerTitleBlock>
            <DrawerTitle>Select Risk Factor</DrawerTitle>
            <DrawerSubtitle>Choose a factor to sweep thresholds</DrawerSubtitle>
          </DrawerTitleBlock>
          <CloseButton onClick={onClose}>
            <MdClose />
          </CloseButton>
        </DrawerHeader>

        <DrawerContent>
          {isLoading ? (
            <LoadingContainer>
              <LoadingOrb>
                <MdRadar />
              </LoadingOrb>
              <LoadingLabel>Loading risk factors...</LoadingLabel>
              <SkeletonGrid>
                {SKELETON_COUNTS.map((count, col) => (
                  <SkeletonSection key={col}>
                    <SkeletonBar $width="40%" />
                    {Array.from({ length: count }, (_, i) => (
                      <SkeletonCard key={i} />
                    ))}
                  </SkeletonSection>
                ))}
              </SkeletonGrid>
            </LoadingContainer>
          ) : (
            <CategoryGrid>
              <CategorySection>
                <CategoryHeader>
                  <MdAccountBalance />
                  <CategoryLabel>Risks</CategoryLabel>
                </CategoryHeader>
                <FactorGrid>
                  {riskKeys.map((name) => (
                    <FactorButton
                      key={name}
                      $disabled={factor.value === name}
                      disabled={factor.value === name}
                      onClick={() => handleSelect(name)}
                    >
                      <FactorName>
                        {formatFactorName(name, bondTenor)}
                      </FactorName>
                    </FactorButton>
                  ))}
                </FactorGrid>
              </CategorySection>

              <CategorySection>
                <CategoryHeader>
                  <MdPublic />
                  <CategoryLabel>Market Factors</CategoryLabel>
                </CategoryHeader>
                <FactorGrid>
                  {availableMain.map((meta) => (
                    <FactorButton
                      key={meta.key}
                      $disabled={factor.value === meta.key}
                      disabled={factor.value === meta.key}
                      onClick={() => handleSelect(meta.key)}
                    >
                      <FactorName>
                        {getFactorLabel(meta, bondTenor)}
                      </FactorName>
                      <FactorDesc>{meta.description}</FactorDesc>
                    </FactorButton>
                  ))}
                </FactorGrid>
              </CategorySection>

              <CategorySection>
                <AdvancedToggle
                  $open={advancedOpen}
                  onClick={() => setAdvancedOpen((o) => !o)}
                >
                  <AdvancedToggleLabel>Advanced Factors</AdvancedToggleLabel>
                  <AdvancedToggleIcon $open={advancedOpen}>
                    <MdExpandMore />
                  </AdvancedToggleIcon>
                </AdvancedToggle>
                <AdvancedContent $open={advancedOpen}>
                  <AdvancedInner>
                    <CategoryHeader>
                      <MdScience />
                      <CategoryLabel>Advanced / Raw</CategoryLabel>
                    </CategoryHeader>
                    <FactorGrid>
                      {availableAdvanced.map((meta) => (
                        <FactorButton
                          key={meta.key}
                          $disabled={factor.value === meta.key}
                          disabled={factor.value === meta.key}
                          onClick={() => handleSelect(meta.key)}
                        >
                          <FactorName>{meta.label}</FactorName>
                          <FactorDesc>{meta.description}</FactorDesc>
                        </FactorButton>
                      ))}
                    </FactorGrid>
                  </AdvancedInner>
                </AdvancedContent>
              </CategorySection>
            </CategoryGrid>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
