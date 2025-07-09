import { Signal } from "@preact/signals-react";
import styled from "styled-components";

interface StyledCarouselProps{
  cyclehaschanged:Signal<boolean>;
}

export const StyledCarousel = styled.div<StyledCarouselProps>`
  position: relative;
  overflow: hidden;
  margin: 0;
  width: 100vw;

  .carousel {
    display: flex;
    transition: ${props => (props.cyclehaschanged.value ? 'none' : 'transform 0.3s ease-in-out')};
  }

  .carousel-item {
    cursor: pointer;
    flex: 0 0 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .arrow-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    
    cursor: pointer;
    z-index: 1;
  }

  .left {
    left: 0px;
  }

  .right {
    right: 0px;
  }
`;
