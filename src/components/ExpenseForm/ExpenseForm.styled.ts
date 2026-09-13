import styled from 'styled-components';
import {
  formScrollStyles,
  fullScreenSurfaceStyles,
} from '@/styles/fullScreenSurface';

export const StyledExpenseForm = styled.div`
  ${fullScreenSurfaceStyles}
  ${formScrollStyles}

  .inputAndErrorsWrapper {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s6};

    .errorMsg {
      font-size: ${({ theme }) => theme.size.s12};
      color: ${({ theme }) => theme.direction.owe};
      display: flex;
      justify-content: end;
    }
  }

  .metaChips {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: ${({ theme }) => theme.space.s8};
  }

  .metaChips:empty {
    display: none;
  }
`;
