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
`;