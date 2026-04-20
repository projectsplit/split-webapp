import {
  AmbientLayer,
  PrimaryOrb,
  SecondaryOrb,
} from './AmbientEffects.styled';

export const AmbientEffects = () => {
  return (
    <AmbientLayer aria-hidden="true">
      <PrimaryOrb />
      <SecondaryOrb />
    </AmbientLayer>
  );
};
