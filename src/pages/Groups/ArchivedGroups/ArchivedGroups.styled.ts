import styled from "styled-components";

export const StyledArchivedGroups = styled.div`
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  overflow: auto;
  padding: 14px;

  .groups {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 5rem;
    .noGroupMsg {
      display: flex;
 
      color: ${({ theme }) => theme.layer6};
      justify-content: center;
      margin-top: 20px;
    }
  }
`;
