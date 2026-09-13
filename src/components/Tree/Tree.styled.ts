import styled from 'styled-components';

export const StyledTree = styled.div`
  border-radius: ${({ theme }) => theme.radius.control};
  li {
    font-size: ${({ theme }) => theme.size.s15};
  }
  ul,
  li {
    position: relative;
  }

  ul {
    list-style: none;
    padding-left: 20px;
    margin-top: 0px;
  }
  li {
    display: flex;
    justify-content: space-between;
  }
  li::before,
  li::after {
    content: '';
    position: absolute;
    left: -12px;
  }

  li::before {
    border-top: 2.5px solid ${({ theme }) => theme.surface.outline};
    top: 9px;
    width: 8px;
    height: 0;
    border-bottom-left-radius: 15px;
  }

  li::after {
    border-left: 2.5px solid ${({ theme }) => theme.surface.outline};
    height: 130%;
    width: 0px;
    top: -5px;
  }

  ul > li:last-child::after {
    height: 15px;
  }

  li:not(:last-child) {
    margin-bottom: 5px;
  }
`;
