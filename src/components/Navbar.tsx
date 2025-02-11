import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import { useQuery } from '@tanstack/react-query';
import { getMe } from '../api/services/api';


const Navbar: React.FC = () => {

  const { data, error, isLoading } = useQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
  });

  return (
    <NavbarContainer>
      <TopBar>
        <Logo>🔥🔥</Logo>
        <Button disabled={false}>{!isLoading ? `_${data?.username}` : error ? error : "..."}</Button>
      </TopBar>

      <NavLinks>
        <NavLink href="#">For you</NavLink>
        <NavLink href="#">Discussions</NavLink>
        <NavLink href="#">Tags</NavLink>
        <NavLink href="#">Sources</NavLink>
      </NavLinks>
    </NavbarContainer>
  );
};

export default Navbar;

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  background-color: #1a1a1a;
  color: #fff;
  width: 100%;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem 0; 
  box-sizing: border-box; 
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled.a`
  text-decoration: none;
  color: #fff;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #333;
  }
`;