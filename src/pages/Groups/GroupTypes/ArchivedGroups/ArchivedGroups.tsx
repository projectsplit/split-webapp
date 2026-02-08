import { GoArchive } from "react-icons/go";
import { StyledGroups } from "../Groups.styled";
import Spinner from "../../../../components/Spinner/Spinner";
import TreeAdjustedContainer from "../../../../components/TreeAdjustedContainer/TreeAdjustedContainer";
import { TreeItemBuilderForHomeAndGroups } from "../../../../components/TreeItemBuilderForHomeAndGroups";
import Sentinel from "../../../../components/Sentinel";
import ConfirmUnArchiveGroupAnimation from "../../../../components/Menus/MenuAnimations/ConfirmUnArchiveGroupAnimation";
import { useSignal } from "@preact/signals-react";
import { useGetTotalsArchiveGroups } from "@/api/auth/QueryHooks/useGetTotalsArchivedGroups";

export default function ArchivedGroups() {
  const pageSize = 10;
  const menu = useSignal<string|null>(null)
  const groupId = useSignal<string|undefined>("")
  const openGroupOptionsMenu = useSignal<boolean>(true)

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useGetTotalsArchiveGroups(pageSize);

  const groups = data?.pages.flatMap((p) => p.groups);

  const onGroupClickHandler = (id: string) => {
    menu.value="unarchiveGroup"
    groupId.value=id;
  };

  return (
    <StyledGroups>
      {isFetching && !isFetchingNextPage ? (
        <Spinner />
      ) : (
        <div className="groups">
          {groups?.length === 0 ? (
            <div className="noData">
              <div className="msg">There are currently no archived groups</div>
              <GoArchive className="icon" />
            </div>
          ) : (
            ""
          )}
          {groups?.map((g: any) => (
            <div key={g.id}>
              <TreeAdjustedContainer
                onClick={() => onGroupClickHandler(g.id)}
                hasOption={true}
                optionname={"file-tray-full-outline"}
                iconfontsize={30}
                right={0.8}
                items={TreeItemBuilderForHomeAndGroups(g?.details)}
                $optionColor="#D79244"
               
              >
                <div className="groupName">{g.name}</div>
              </TreeAdjustedContainer>
            </div>
          ))}

          <Sentinel
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        </div>
      )}
      {/* <ConfirmUnArchiveGroupAnimation menu={menu} groupId={groupId.value} openGroupOptionsMenu={openGroupOptionsMenu} /> */}
    </StyledGroups>
  );
}
