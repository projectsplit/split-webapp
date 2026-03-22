import styled from "styled-components";

export const StyledBudgetCarousel = styled.div``

export const CarouselItemWrapper = styled.div`
  background-color: ${({ theme }) => theme.layer2};
  border: 1px solid ${({ theme }) => theme.layer2};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  padding: 0.8rem;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
   .closeButton {
      position: absolute;
      top: 0rem;
      right: 0rem;
      font-size: 30px;
      color: #6f6f6f;
      display: inline-block;
      cursor: pointer;
      &:hover {
        color: ${({ theme }) => theme.whiteText};
      }
    }
`;

export const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 10px;
`;

export const Dot = styled.div<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme, $active }) =>
    $active ? theme.whiteText : theme.layer2};
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: 1px solid ${({ theme }) => theme.layer2};

  &:hover {
    background-color: ${({ theme, $active }) =>
      $active ? theme.whiteText : '#6f6f6f'};
  }
`;