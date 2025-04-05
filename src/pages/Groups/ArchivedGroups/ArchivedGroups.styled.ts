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
    .noData {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
      margin-top:100px;
      .msg {
        opacity: 0.4;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .icon {
        display: flex;
        font-size: 100px;
        opacity: 0.4;
        margin-top: 20px;
      }
    }
  }
`;
