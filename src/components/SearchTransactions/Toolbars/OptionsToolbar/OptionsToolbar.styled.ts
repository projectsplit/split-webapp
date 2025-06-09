import styled from "styled-components";

export const StyledOptionsToolbar = styled.div`
  border: none;
  background-color: transparent;
  cursor: pointer;

  font-size: 20px;
  display: flex;
  flex-direction: column; /* Change to column to stack category and types */
  margin-top: 15px;
  margin-bottom: 15px;

  .categoryAndTypesWrapper {
    display: flex;
    flex-direction: column; /* Stack category and types vertically */
    gap: 10px;

    .category {
      flex-shrink: 0; /* Ensure category does not resize */
    }

    .types {
      display: flex;
      flex-direction: row;
      gap: 10px;
      overflow-x: auto; /* Horizontal scrolling for overflowing content */
      scrollbar-width: thin; /* Applies a thinner scrollbar */
      padding-bottom: 5px; /* Add space for scrollbar */

      /* Optional styling for scrollbar (works on modern browsers) */
      &::-webkit-scrollbar {
        height: 8px;
      }
      &::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 4px;
      }
      &::-webkit-scrollbar-thumb:hover {
        background: #a7a7a7;
      }
    }
  }
`;

