import styled from "styled-components";

export const StyledGroups = styled.div`
  display: flex;
  flex-direction: column;
  scrollbar-width: thin;
  overflow: auto;
  padding: 14px;
  flex: 1;
  min-width: 0;
  overflow: auto;

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
      margin-top: 100px;
      .msg {
        opacity: 0.5;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .icon {
        display: flex;
        font-size: 100px;
        opacity: 0.5;
        margin-top: 20px;
      }
    }
  }

  .groupsInfo {
    font-size: 15px;
    color: ${({ theme }) => theme.layer6};

    .owe {
      color: ${({ theme }) => theme.redish};
    }
    .owed {
      color: ${({ theme }) => theme.green};
    }
    .settled {
      font-size: 15px;
      color: ${({ theme }) => theme.layer6};
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
`;
