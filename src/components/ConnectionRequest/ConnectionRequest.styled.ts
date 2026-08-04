import { styled } from 'styled-components';

export const StyledConnectionRequest = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  .mainMsg {
    flex: 1;
    font-size: 14px;
    display: flex;
    flex-direction: row;
  }
  .actions {
    font-size: 14px;
    display: flex;
    gap: 16px;
    margin-left: auto;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;

    .actions {
      margin-top: 1rem;
      width: 100%;
      justify-content: flex-start;
    }
  }
`;
