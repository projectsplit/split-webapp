import styled from 'styled-components';

export const AmbientLayer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
`;

export const PrimaryOrb = styled.div`
  position: absolute;
  top: -10%;
  right: -10%;
  width: 50%;
  height: 50%;
  background: rgba(221, 183, 255, 0.05);
  filter: blur(120px);
  border-radius: 50%;
`;

export const SecondaryOrb = styled.div`
  position: absolute;
  bottom: -10%;
  left: -10%;
  width: 50%;
  height: 50%;
  background: rgba(74, 225, 118, 0.05);
  filter: blur(120px);
  border-radius: 50%;
`;
