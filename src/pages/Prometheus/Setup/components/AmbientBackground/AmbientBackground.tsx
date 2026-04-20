import {
  Layer,
  PrimaryOrb,
  SecondaryOrb,
  VerticalLine,
} from './AmbientBackground.styled';

export const AmbientBackground = () => {
  return (
    <Layer aria-hidden="true">
      <PrimaryOrb />
      <SecondaryOrb />
      <VerticalLine />
    </Layer>
  );
};
