import { useState } from 'react';
import { MdClose, MdAccountBalance, MdPublic, MdScience, MdRadar, MdExpandMore, MdWorkOff } from 'react-icons/md';
import { Signal } from '@preact/signals-react';
import { Condition } from '../../interfaces';
import {
  MAIN_FACTORS,
  ADVANCED_FACTORS,
  formatFactorName,
  isFactorVisible,
  getFactorLabel,
  RiskVisibility,
  CAREER_INTERNAL_FACTORS,
  CAREER_RISK_KEY,
  CAREER_GROSS_KEY,
  monthsToCareerGross,
} from '../../utils';
import { FactorsResponse } from '@/pages/Prometheus/WhatIf/interfaces';
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
} from './AddConditionDrawer.styled';

interface AddConditionDrawerProps {
  open: boolean;
  onClose: () => void;
  conditions: Signal<Condition[]>;
  factors: FactorsResponse | undefined;
  isLoading: boolean;
  bondTenor: number;
  riskToggles: RiskVisibility;
  netSalary: number;
  careerLossEnabled: boolean;
}

const getDefaultValue = (
  factorName: string,
  factors: FactorsResponse | undefined,
): number => {
  if (!factors) return 0;
  const stats = factors.risks[factorName] ?? factors.factors[factorName];
  if (!stats) return 0;
  return stats.p50;
};

const SKELETON_COUNTS = [4, 5, 5];

export const AddConditionDrawer = ({
  open,
  onClose,
  conditions,
  factors,
  isLoading,
  bondTenor,
  riskToggles,
  netSalary,
  careerLossEnabled,
}: AddConditionDrawerProps) => {
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const existingFactors = new Set(conditions.value.map((c) => c.factor));

  const handleSelect = (factorName: string) => {
    if (existingFactors.has(factorName)) return;
    const defaultVal = getDefaultValue(factorName, factors);
    conditions.value = [
      ...conditions.value,
      { factor: factorName, op: 'lt', value: defaultVal },
    ];
    onClose();
  };

  const handleSelectCareerLoss = () => {
    if (existingFactors.has(CAREER_GROSS_KEY)) return;
    conditions.value = [
      ...conditions.value,
      {
        factor: CAREER_GROSS_KEY,
        op: 'gt',
        value: monthsToCareerGross(6, netSalary),
      },
    ];
    onClose();
  };

  const allData = factors
    ? { ...factors.risks, ...factors.factors }
    : {};

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

  const showCareerLoss =
    careerLossEnabled &&
    !!factors &&
    CAREER_RISK_KEY in factors.risks &&
    netSalary > 0;

  return (
    <>
      <Overlay $open={open} onClick={onClose} />
      <Drawer $open={open}>
        <Handle onClick={onClose} />
        <DrawerHeader>
          <DrawerTitleBlock>
            <DrawerTitle>Select Risk Factor</DrawerTitle>
            <DrawerSubtitle>Add new conditional constraint</DrawerSubtitle>
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
            <>
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
                        $disabled={existingFactors.has(name)}
                        disabled={existingFactors.has(name)}
                        onClick={() => handleSelect(name)}
                      >
                        <FactorName>{formatFactorName(name, bondTenor)}</FactorName>
                      </FactorButton>
                    ))}
                    {showCareerLoss && (
                      <FactorButton
                        $disabled={existingFactors.has(CAREER_GROSS_KEY)}
                        disabled={existingFactors.has(CAREER_GROSS_KEY)}
                        onClick={handleSelectCareerLoss}
                      >
                        <MdWorkOff />
                        <FactorName>Career Loss</FactorName>
                        <FactorDesc>
                          Months of unemployment, with severance offset.
                        </FactorDesc>
                      </FactorButton>
                    )}
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
                        $disabled={existingFactors.has(meta.key)}
                        disabled={existingFactors.has(meta.key)}
                        onClick={() => handleSelect(meta.key)}
                      >
                        <FactorName>{getFactorLabel(meta, bondTenor)}</FactorName>
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
                            $disabled={existingFactors.has(meta.key)}
                            disabled={existingFactors.has(meta.key)}
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
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
