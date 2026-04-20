import styled from 'styled-components';

export const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 60;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.5rem 1rem 1rem;
  background: rgba(19, 19, 19, 0.8);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-top: 1px solid rgba(53, 53, 53, 0.2);

  @media (min-width: 768px) {
    display: none;
  }
`;

export const Item = styled.button<{ $active?: boolean }>`
  background: transparent;
  border: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.125rem;
  cursor: pointer;
  transition:
    color 0.3s ease,
    transform 0.3s ease;
  color: ${({ $active }) =>
    $active ? '#ddb7ff' : 'rgba(226, 226, 226, 0.4)'};
  transform: ${({ $active }) => ($active ? 'scale(1.1)' : 'scale(1)')};

  &:hover {
    color: ${({ $active }) =>
      $active ? '#ddb7ff' : 'rgba(221, 183, 255, 0.8)'};
  }

  svg {
    font-size: 1.375rem;
  }
`;

export const ItemLabel = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.625rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.2em;
`;
