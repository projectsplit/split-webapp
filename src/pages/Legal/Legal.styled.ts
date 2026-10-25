import styled from 'styled-components';

export const StyledLegalPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100dvh;
  color: ${({ theme }) => theme.ink.primary};

  .legalHeader {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: ${({ theme }) => theme.space.s8};
    flex-shrink: 0;
    padding: ${({ theme }) =>
      `${theme.space.s20} ${theme.space.s20} ${theme.space.s12} ${theme.space.s12}`};
  }

  .legalTitle {
    flex: 1;
    min-width: 0;
    font-size: ${({ theme }) => theme.size.s17};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: -0.01em;
  }

  .legalBody {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding: ${({ theme }) => `0 ${theme.space.s20} ${theme.space.s24}`};
    font-size: ${({ theme }) => theme.size.s14};
    line-height: 1.6;
    color: ${({ theme }) => theme.ink.secondary};
    /* The rest of the app turns selection off so that taps feel native. This is a document, and
       people copy addresses and sentences out of documents. */
    user-select: text;

    h2 {
      margin: ${({ theme }) => `${theme.space.s24} 0 ${theme.space.s8}`};
      font-size: ${({ theme }) => theme.size.s15};
      font-weight: ${({ theme }) => theme.weight.semibold};
      color: ${({ theme }) => theme.ink.primary};
    }

    p {
      margin: ${({ theme }) => `0 0 ${theme.space.s10}`};
    }

    ul,
    ol {
      margin: ${({ theme }) => `0 0 ${theme.space.s10}`};
      padding-left: ${({ theme }) => theme.space.s20};
    }

    li {
      margin-bottom: ${({ theme }) => theme.space.s6};
    }

    strong {
      font-weight: ${({ theme }) => theme.weight.medium};
      color: ${({ theme }) => theme.ink.primary};
    }

    a {
      color: ${({ theme }) => theme.ink.primary};
      text-decoration: underline;
      text-underline-offset: 2px;
      overflow-wrap: anywhere;
    }

    .updated {
      font-size: ${({ theme }) => theme.size.s12};
      color: ${({ theme }) => theme.ink.tertiary};
    }
  }
`;
