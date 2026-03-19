import { styled } from 'styled-components';

export const StyledManageBudgets = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.lightColor};
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  margin: 0;
  padding: 14px;
  gap: 20px;
  position: relative;
  overflow-x: hidden;
  .submitButton {
    display: flex;
    flex-direction: column;
    margin-top: auto;
    margin-bottom: 0.875rem;
    padding: 0 0.875rem;
  }
`;
