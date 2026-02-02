import React from "react";

import { ScrollableContainer } from "./ScrollableContainer.styled";
import { CombinedMenuProps } from "../../../interfaces";
import { StyledMenu } from "./Menu.styled";
import Sentinel from "../../Sentinel/Sentinel";

export const Menu = React.forwardRef<HTMLDivElement, CombinedMenuProps>(
  (
    {
      open,
      contentEditableHeight,
      loading,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      ...other
    },
    ref
  ) => {
    return (
      <ScrollableContainer $contentEditableHeight={contentEditableHeight}>
        <div className="items">
          <StyledMenu
            ref={ref}
            $contentEditableHeight={contentEditableHeight}
            {...other}
          />
          {fetchNextPage && hasNextPage !== undefined && (
            <Sentinel
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage || false}
            />
          )}
        </div>
      </ScrollableContainer>
    );
  }
);