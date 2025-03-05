import { styled } from "styled-components";
import { useEffect, useState } from "react";
import Expenses from "./Expenses/Expenses";
import { useOutletContext, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { UserInfo } from "../types";
import { PiMagnifyingGlassBold, PiPlusBold } from "react-icons/pi";
import ExpenseForm from "./ExpenseForm";
import Transfers from "./Transfers/Transfers";
import { getGroup } from "../api/services/api";

const Group: React.FC = () => {
  // const timeZoneId = "America/New_York"
  // const timeZoneId = "Pacific/Marquesas"
  const timeZoneId = "Europe/Athens"
  
  const { groupId } = useParams<{ groupId: string }>();
  const { userInfo, } = useOutletContext<{
    userInfo: UserInfo;
    //setSelectedGroupName: React.Dispatch<React.SetStateAction<string | null>>;
  }>();

  const [isExpenseFormOpen, setIsExpenseFormOpen] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState(0);

  const { data: group, isSuccess } = useQuery({
    queryKey: [groupId],
    queryFn: () => (groupId ? getGroup(groupId) : Promise.reject("No group ID")),
    enabled: !!groupId, // Prevents the query from running if groupId is undefined
  });

  // useEffect(() => {
  //   if (isSuccess) {
  //     setSelectedGroupName(group.name);
  //   }
  //   return () => {
  //     setSelectedGroupName(null);
  //   };
  // }, [isSuccess, group, setSelectedGroupName]);

  if (!groupId || !isSuccess) {
    return <div>Error</div>;
  }

  const memberId = group?.members.find((x) => x.userId === userInfo?.userId)?.id!;

  const tabs = [
    // { name: "Expenses", content: <Expenses group={group} memberId={memberId} timeZoneId={timeZoneId} /> },
    // { name: "Transfers", content: <Transfers group={group} memberId={memberId} timeZoneId={timeZoneId} /> },
    {
      name: "Settle", content: <Page style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{}}>PLACEHOLDER</div>
        <div style={{}}>PLACEHOLDER</div>
        <div style={{}}>PLACEHOLDER</div>
      </Page>
    },
  ];

  return (
    <StyledGroup>
      <div className="tabs-row">
        <PiPlusBold
          onClick={() => setIsExpenseFormOpen(!isExpenseFormOpen)}
          className="add-button"
        />
        {tabs.map((t, index) => (
          <TabButton
            key={index}
            className={activeTab === index ? "active" : ""}
            onClick={() => setActiveTab(index)}
          >
            {t.name}
          </TabButton>
        ))}
        <PiMagnifyingGlassBold className="search-button" />
      </div>
      <hr className="line" />
      <div className="tabs-container">
        {/* {isExpenseFormOpen && <ExpenseForm group={group} expense={null} timeZoneId={timeZoneId} setIsOpen={setIsExpenseFormOpen} />} */}
        {!isExpenseFormOpen && tabs[activeTab].content}
      </div>
    </StyledGroup>
  );
};

export default Group;

const StyledGroup = styled.div`
  /* display: flex;
  flex-direction: column;
  height: 100%;

  .tabs-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 12px;
    flex: 0;
    font-size: 14px;

    .search-button {
      font-size: 20px;
      color: white;
    }

    .add-button {
      font-size: 20px;
      color: white;
    }
  }

  .line {
    border: none;
    border-top: 1px solid ${({ theme }) => theme.inactiveColor};
    margin: 0px;
  }

  .tabs-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  } */
`;

const Page = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center; */
`;

const TabButton = styled.a`
  /* font-weight: 600;
  padding: 8px 14px;
  margin: 2px 0rem;
  color: ${({ theme }) => theme.inactiveTabButtonTextColor};
  border-radius: 4px;
  transition: background-color 0.15s;

  &.active {
    color: ${({ theme }) => theme.activeTabButtonTextColor};
  }

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${({ theme }) => theme.tabButtonTextHoverColor};
    }
  } */
`;
