import { styled } from "styled-components";
import { useNavigate, useOutletContext } from "react-router-dom";
import { getGroups } from "../api/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { UserInfo } from "../types";

const GroupSelection = () => {
  
  const navigate = useNavigate();
  
  const pageSize = 2
  
  const { userInfo } = useOutletContext<{ userInfo: UserInfo }>();
  
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['groups', userInfo.userId, pageSize],
    queryFn: ({ pageParam: next }) => getGroups(userInfo.userId, pageSize, next),
    getNextPageParam: (lastPage) => lastPage?.next || undefined,
    initialPageParam: '',
  });
  
  const handleGroupSelect = (groupId: string) => {
    navigate(`/${groupId}`);
  };
  
  const groups = data?.pages.flatMap(x => x.groups)

  return (
    <StyledMain>
      <h1>Select a Group</h1>
      <ul>
        {!isFetchingNextPage && groups?.map((group) => (
          <li key={group.id}>
            <button onClick={() => handleGroupSelect(group.id)}>
              {group.name}
            </button>
          </li>
        ))}
      </ul>
    </StyledMain>
  );
};

export default GroupSelection;

const StyledMain = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  
  .top-bar {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.5rem 0; 
  
    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      display: flex;
      align-items: center;
    }
  }
`;
