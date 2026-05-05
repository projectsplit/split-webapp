import styled from 'styled-components';

export const RiskCard = styled.div`
  background: #0e0e0e;
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 0.25rem;
  padding: 0.75rem;
  margin-bottom: 1.25rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const RiskName = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  color: #e5e2e1;
  display: block;
  margin-bottom: 0.5rem;
  text-transform: capitalize;
`;

export const ModeRow = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

export const ModeOption = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.625rem;
  border-radius: 0.25rem;
  border: 1px solid
    ${({ $active }) => ($active ? '#f9bb4d' : 'rgba(255, 255, 255, 0.08)')};
  background: ${({ $active }) =>
    $active ? 'rgba(249, 187, 77, 0.08)' : 'transparent'};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: ${({ $active }) =>
      $active ? '#f9bb4d' : 'rgba(255, 255, 255, 0.2)'};
  }
`;

export const ModeRadio = styled.span<{ $active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid ${({ $active }) => ($active ? '#f9bb4d' : '#968e99')};
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: ${({ $active }) => ($active ? '#f9bb4d' : 'transparent')};
    transition: background 0.15s ease;
  }
`;

export const ModeLabel = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.5625rem;
  letter-spacing: 0.03em;
  color: #e5e2e1;
  text-transform: uppercase;
`;

export const FieldRow = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const FieldGroup = styled.div`
  flex: 1;
  min-width: 0;
`;

export const RiskInputLabel = styled.label`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.5625rem;
  color: #968e99;
  display: block;
  margin-bottom: 0.25rem;
`;

export const RiskInputField = styled.input`
  width: 100%;
  background: #131313;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.25rem;
  height: 2rem;
  padding: 0 0.5rem;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  color: #e5e2e1;

  &:focus {
    outline: none;
    border-color: #f9bb4d;
  }
`;

export const FairPremiumHint = styled.p`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.5rem;
  color: #968e99;
  margin: 0.5rem 0 0;
`;

export const CapOption = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.375rem 0.5rem;
  margin-top: 0.375rem;
  border-radius: 0.25rem;
  border: 1px solid
    ${({ $active }) => ($active ? '#f9bb4d' : 'rgba(255, 255, 255, 0.05)')};
  background: ${({ $active }) =>
    $active ? 'rgba(249, 187, 77, 0.06)' : 'transparent'};
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: rgba(249, 187, 77, 0.4);
  }
`;

export const CapOptionRadio = styled.span<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1.5px solid ${({ $active }) => ($active ? '#f9bb4d' : '#968e99')};
  flex-shrink: 0;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: ${({ $active }) => ($active ? '#f9bb4d' : 'transparent')};
  }
`;

export const CapOptionLabel = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.5rem;
  color: #cdc3d0;
  flex: 1;
  text-align: left;
`;

export const CapOptionValue = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.5rem;
  color: #f9bb4d;
  flex-shrink: 0;
`;

export const ToggleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  margin-top: 1rem;
`;

export const ToggleLabel = styled.span`
  font-family: 'Roboto Mono', monospace;
  font-size: 0.625rem;
  letter-spacing: 0.05em;
  color: #cdc3d0;
`;

export const ToggleSwitch = styled.button<{ $checked: boolean }>`
  width: 40px;
  height: 20px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  background: ${({ $checked }) =>
    $checked ? '#ddb7ff' : 'rgba(255, 255, 255, 0.1)'};
  transition: background 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${({ $checked }) => ($checked ? '22px' : '2px')};
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${({ $checked }) => ($checked ? '#131313' : '#968e99')};
    transition: left 0.2s ease;
  }
`;
