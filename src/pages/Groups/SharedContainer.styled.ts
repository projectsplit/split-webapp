import styled from "styled-components";

export const StyledSharedContainer = styled.div<{ $groupState: string }>`
  overflow: hidden;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.backgroundcolor};
  position: relative;
  .optionButtonsAndGroups {
    display: flex;
    flex-direction: row;
    flex: 1;
    min-height: 0;

    .groups {
		display: flex;
		flex-direction: column;
		width: 100%;
		overflow-y: auto;      
		overflow-x: hidden;
		.noData{
			.msg{
				text-wrap: wrap;
				text-align: center;
			}
		}
      .searchWrapper {
        overflow: hidden;
        margin-top: 8px;
      }
    }
  }

  .bottom-bar {
    margin-top: auto;
  }
    
`;
