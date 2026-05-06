import { MdClose, MdAccountBalance, MdWork, MdPublic, MdRadar } from 'react-icons/md';
import { Signal } from '@preact/signals-react';
import { Condition } from '../../interfaces';
import { isVisibleFactor, formatFactorName } from '../../utils';
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
}: AddConditionDrawerProps) => {
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

  const riskNames = factors
    ? Object.keys(factors.risks).filter(isVisibleFactor)
    : [];
  const factorNames = factors
    ? Object.keys(factors.factors).filter(isVisibleFactor)
    : [];

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
            <CategoryGrid>
              <CategorySection>
                <CategoryHeader>
                  <MdAccountBalance />
                  <CategoryLabel>Risks</CategoryLabel>
                </CategoryHeader>
                <FactorGrid>
                  {riskNames.map((name) => (
                    <FactorButton
                      key={name}
                      $disabled={existingFactors.has(name)}
                      disabled={existingFactors.has(name)}
                      onClick={() => handleSelect(name)}
                    >
                      <FactorName>{formatFactorName(name, bondTenor)}</FactorName>
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
                  {factorNames.slice(0, Math.ceil(factorNames.length / 2)).map((name) => (
                    <FactorButton
                      key={name}
                      $disabled={existingFactors.has(name)}
                      disabled={existingFactors.has(name)}
                      onClick={() => handleSelect(name)}
                    >
                      <FactorName>{formatFactorName(name, bondTenor)}</FactorName>
                    </FactorButton>
                  ))}
                </FactorGrid>
              </CategorySection>

              <CategorySection>
                <CategoryHeader>
                  <MdWork />
                  <CategoryLabel>Market Factors (cont.)</CategoryLabel>
                </CategoryHeader>
                <FactorGrid>
                  {factorNames.slice(Math.ceil(factorNames.length / 2)).map((name) => (
                    <FactorButton
                      key={name}
                      $disabled={existingFactors.has(name)}
                      disabled={existingFactors.has(name)}
                      onClick={() => handleSelect(name)}
                    >
                      <FactorName>{formatFactorName(name, bondTenor)}</FactorName>
                    </FactorButton>
                  ))}
                </FactorGrid>
              </CategorySection>
            </CategoryGrid>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
