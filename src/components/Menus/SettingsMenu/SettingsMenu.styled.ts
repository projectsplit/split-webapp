import styled from 'styled-components';
import { optionsListStyles } from '@/styles/optionsList';

export const StyledSettingsMenu = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100dvh;
  overflow: hidden;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.surface.page};
  z-index: 4;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s12};
    padding: ${({ theme }) =>
      `${theme.space.s20} ${theme.space.s20} ${theme.space.s16}`};
    flex-shrink: 0;

    .name {
      flex: 1;
      min-width: 0;
      font-size: ${({ theme }) => theme.size.s17};
      font-weight: ${({ theme }) => theme.weight.semibold};
      letter-spacing: -0.01em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .closeButtonContainer {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 34px;
      height: 34px;
      flex-shrink: 0;
      cursor: pointer;
      color: ${({ theme }) => theme.ink.secondary};
    }

    .closeButton {
      cursor: pointer;
      display: block;
      font-size: ${({ theme }) => theme.icon.lg};
    }
  }

  ${optionsListStyles}
  .rowValue {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    min-width: 0;
  }

  .rowText {
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .rowText.mono {
    font-family: ${({ theme }) => theme.font.mono};
  }

  .rowCount {
    flex-shrink: 0;
    font-size: ${({ theme }) => theme.size.s12};
    font-weight: ${({ theme }) => theme.weight.regular};
    color: ${({ theme }) => theme.ink.secondary};
  }

  .rowChevron {
    display: flex;
    flex-shrink: 0;
    font-size: ${({ theme }) => theme.size.s15};
    color: ${({ theme }) => theme.surface.mark};
  }

  .toggleRow {
    padding: ${({ theme }) => `${theme.space.s10} ${theme.space.s16}`};

    .propertyValue {
      display: flex;
      align-items: center;
    }
  }

  .status {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: ${({ theme }) => theme.size.s12};
  }

  .status.ok {
    color: ${({ theme }) => theme.direction.owed};
  }

  .status.pending {
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .optionNote {
    font-size: ${({ theme }) => theme.size.s12};
    line-height: 1.45;
    color: ${({ theme }) => theme.direction.owe};
  }

  .logOut {
    display: flex;
    flex-direction: column;

    button {
      font-weight: ${({ theme }) => theme.weight.medium};
    }
  }

  .info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: ${({ theme }) => theme.space.s8};
    color: ${({ theme }) => theme.ink.tertiary};
    font-size: ${({ theme }) => theme.size.s12};
    margin-top: auto;
    padding-top: ${({ theme }) => theme.space.s4};

    .version {
      font-family: ${({ theme }) => theme.font.mono};
    }
  }
`;
