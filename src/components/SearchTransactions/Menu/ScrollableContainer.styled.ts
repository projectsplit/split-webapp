import styled from "styled-components";

export const ScrollableContainer = styled.div<{ $contentEditableHeight: number}>`
  margin-top: 1rem;
  height: calc(100vh - 18rem);
  overflow-y: auto;
  overflow-x: hidden;
  position: fixed;
  scrollbar-width: thin;
  width: 100%;
  left: 0;

  .items {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 3rem 1rem;
    margin-left: 14px;
  }

  @media (min-width: 769px) {
    max-width: 768px;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-left: 1px solid #333;
    border-right: 1px solid #333;

    .items {
      margin-left: 0;
      padding: 3rem 1rem;
    }
  }
`;

