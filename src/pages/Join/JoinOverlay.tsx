import { useNavigate } from 'react-router-dom';
import Join from './Join';
import { StyledJoinBackdrop } from './Join.styled';
import routes from '../../routes';

export const JoinOverlay: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <StyledJoinBackdrop
        onClick={() => navigate(routes.ROOT, { replace: true })}
      />
      <Join />
    </>
  );
};
