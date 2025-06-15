import SearchMemberButton from "../SearchCategoryButtons/SearchMemberButton/SearchMemberButton";
import { MentionsToolbarProps } from "../../../interfaces";
import SearchDateButton from "../SearchCategoryButtons/SearchDateButton/SearchDateButton";
import SearchLabelButton from "../SearchCategoryButtons/SearchLabelButton/SearchLabelButton";
import CurrentSearchField from "../CurrentSearchField/CurrentSearchField";
import { CategorySelector } from "../../CategorySelector/CategorySelector";


const MentionsToolbar: React.FC<MentionsToolbarProps> = ({
  showOptions,
  submitButtonIsActive,
  filterState,
  cancelled,
  removedFilter,
  filteredMembers,
  calendarIsOpen,
  datePeriodClicked,
  filteredLabels,
  category
}) => {

 return (
    <>
      {showOptions.value && (
        <div className="categoryButtons">
          {filterState.value.description !== "" ? (
            <CurrentSearchField
              currentSearch={filterState.value.description}
              filterState={filterState}
              removedFilter={removedFilter}
              submitButtonIsActive={submitButtonIsActive}
            />
          ) : (
            <></>
          )}

          <div className="catSelector">
            <CategorySelector
              activeCat={"Expenses"}
              categories={{
                cat1: "Expenses",
                cat2: "Transfers",
              }}
              navLinkUse={false}
              activeCatAsState={category}
            />
          </div>

          {category.value === "Expenses" ? (
            <>
              <SearchMemberButton
                showOptions={showOptions}
                category={"payer"}
                type={"member"}
                filteredMembers={filteredMembers}
                submitButtonIsActive={submitButtonIsActive}
                filterState={filterState}
                cancelled={cancelled}
                removedFilter={removedFilter}
              />
              <SearchMemberButton
                showOptions={showOptions}
                category={"participant"}
                type={"member"}
                filteredMembers={filteredMembers}
                submitButtonIsActive={submitButtonIsActive}
                filterState={filterState}
                cancelled={cancelled}
                removedFilter={removedFilter}
              />
              <SearchDateButton
                category={"before"}
                type={"date"}
                dates={""}
                submitButtonIsActive={submitButtonIsActive}
                showOptions={showOptions}
                calendarIsOpen={calendarIsOpen}
                datePeriodClicked={datePeriodClicked}
                filterState={filterState}
                cancelled={cancelled}
                removedFilter={removedFilter}
              />
              <SearchDateButton
                category={"during"}
                type={"date"}
                dates={""}
                submitButtonIsActive={submitButtonIsActive}
                showOptions={showOptions}
                calendarIsOpen={calendarIsOpen}
                datePeriodClicked={datePeriodClicked}
                filterState={filterState}
                cancelled={cancelled}
                removedFilter={removedFilter}
              />
              <SearchDateButton
                category={"after"}
                type={"date"}
                dates={""}
                submitButtonIsActive={submitButtonIsActive}
                showOptions={showOptions}
                calendarIsOpen={calendarIsOpen}
                datePeriodClicked={datePeriodClicked}
                filterState={filterState}
                cancelled={cancelled}
                removedFilter={removedFilter}
              />
              <SearchLabelButton
                category={"category"}
                type={"label"}
                filteredLabels={filteredLabels}
                showOptions={showOptions}
                submitButtonIsActive={submitButtonIsActive}
                filterState={filterState}
                cancelled={cancelled}
                removedFilter={removedFilter}
              />
            </>
          ) : category.value === "Transfers" ? (
            <>
              <SearchMemberButton
                showOptions={showOptions}
                category={"sender"}
                type={"member"}
                filteredMembers={filteredMembers}
                submitButtonIsActive={submitButtonIsActive}
                filterState={filterState}
                cancelled={cancelled}
                removedFilter={removedFilter}
              />
              <SearchMemberButton
                showOptions={showOptions}
                category={"receiver"}
                type={"member"}
                filteredMembers={filteredMembers}
                submitButtonIsActive={submitButtonIsActive}
                filterState={filterState}
                cancelled={cancelled}
                removedFilter={removedFilter}
              />
              <SearchDateButton
                category={"before"}
                type={"date"}
                dates={""}
                submitButtonIsActive={submitButtonIsActive}
                showOptions={showOptions}
                calendarIsOpen={calendarIsOpen}
                datePeriodClicked={datePeriodClicked}
                filterState={filterState}
                cancelled={cancelled}
                removedFilter={removedFilter}
              />
              <SearchDateButton
                category={"during"}
                type={"date"}
                dates={""}
                submitButtonIsActive={submitButtonIsActive}
                showOptions={showOptions}
                calendarIsOpen={calendarIsOpen}
                datePeriodClicked={datePeriodClicked}
                filterState={filterState}
                cancelled={cancelled}
                removedFilter={removedFilter}
              />
              <SearchDateButton
                category={"after"}
                type={"date"}
                dates={""}
                submitButtonIsActive={submitButtonIsActive}
                showOptions={showOptions}
                calendarIsOpen={calendarIsOpen}
                datePeriodClicked={datePeriodClicked}
                filterState={filterState}
                cancelled={cancelled}
                removedFilter={removedFilter}
              />
            </>
          ) : null}
        </div>
      )}
    </>
  );
};

export default MentionsToolbar;
