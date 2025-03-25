import styled from "styled-components";

export const StyledMapsInfoBox = styled.div`
  .topStripe {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .locationAndPin {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 10px;
      .locationName{
        text-decoration: underline;
        cursor: pointer;
      }
    }
    .info {
      font-weight: 600;
      font-style: italic;
    }
    .hideDetalailsButton {
      color: ${({ theme }) => theme.grey};
      font-style: italic;
      text-decoration: underline;
      cursor: pointer;
    }
    
  }

  .locationIcon {
    font-size: 18px;
    color: ${({ theme }) => theme.yellow};
  }
  .map {
    height: 450px;
    margin-top: 1rem;
  }
  .noLocation {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    background-color: #000;
    padding: 16px;
    color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);

    .noMapInfo {
      color: ${({ theme }) => theme.layer6};
    }
  }
`;
