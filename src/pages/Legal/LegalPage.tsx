import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton/BackButton';
import routes from '../../routes';
import { StyledLegalPage } from './Legal.styled';

interface LegalPageProps {
  title: string;
  children: ReactNode;
}

export default function LegalPage({ title, children }: LegalPageProps) {
  const navigate = useNavigate();
  const location = useLocation();

  // These pages are reached two ways: from inside the app, and cold, from a link on the store
  // listing. The router marks a first entry with the key 'default', and only then is there
  // nothing to go back to.
  const goBack = () =>
    location.key === 'default' ? navigate(routes.ROOT) : navigate(-1);

  return (
    <StyledLegalPage>
      <div className="legalHeader">
        <BackButton onClick={goBack} />
        <div className="legalTitle">{title}</div>
      </div>
      <div className="legalBody">{children}</div>
    </StyledLegalPage>
  );
}
