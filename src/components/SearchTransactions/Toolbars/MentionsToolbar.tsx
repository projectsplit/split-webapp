import SearchMemberButton from "../SearchCategoryButtons/SearchMemberButton/SearchMemberButton";
import { MentionsToolbarProps } from "../../../interfaces";
import SearchDateButton from "../SearchCategoryButtons/SearchDateButton/SearchDateButton";
import SearchLabelButton from "../SearchCategoryButtons/SearchLabelButton/SearchLabelButton";
import CurrentSearchField from "../CurrentSearchField/CurrentSearchField";
import { CategorySelector } from "../../CategorySelector/CategorySelector";

const MentionsToolbar: React.FC<MentionsToolbarProps> = ({
  showOptions,
  submitButtonIsActive,
  expenseFilterState,
  transferFilterState,
  cancelled,
  removedFilter,
  filteredMembers,
  calendarIsOpen,
  datePeriodClicked,
  filteredLabels,
  category,
}) => {
  return (
    <>
      {showOptions.value && (
        <div className="categoryButtons">
          
          {expenseFilterState.value.description !== "" &&
          category.value === "Expenses" ? (
            <CurrentSearchField
              currentSearch={expenseFilterState.value.description}
              filterState={expenseFilterState}
              removedFilter={removedFilter}
              submitButtonIsActive={submitButtonIsActive}
            />
          ) : (
            <></>
          )}

          {transferFilterState.value.description !== "" &&
          category.value === "Transfers" ? (
            <CurrentSearchField
              currentSearch={transferFilterState.value.description}
              filterState={transferFilterState}
              removedFilter={removedFilter}
              submitButtonIsActive={submitButtonIsActive}
            />
          ) : (
            <></>
          )}

       

          {category.value === "Expenses" ? (
            <>
              <SearchMemberButton
                showOptions={showOptions}
                category={"payer"}
                type={"member"}
                filteredMembers={filteredMembers}
                submitButtonIsActive={submitButtonIsActive}
                expenseFilterState={expenseFilterState}
                transferFilterState={transferFilterState}
                cancelled={cancelled}
                removedFilter={removedFilter}
              />
              <SearchMemberButton
                showOptions={showOptions}
                category={"participant"}
                type={"member"}
                filteredMembers={filteredMembers}
                submitButtonIsActive={submitButtonIsActive}
                expenseFilterState={expenseFilterState}
                transferFilterState={transferFilterState}
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
                filterState={expenseFilterState}
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
                filterState={expenseFilterState}
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
                filterState={expenseFilterState}
                cancelled={cancelled}
                removedFilter={removedFilter}
              />
              <SearchLabelButton
                category={"category"}
                type={"label"}
                filteredLabels={filteredLabels}
                showOptions={showOptions}
                submitButtonIsActive={submitButtonIsActive}
                filterState={expenseFilterState}
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
                expenseFilterState={expenseFilterState}
                transferFilterState={transferFilterState}
                cancelled={cancelled}
                removedFilter={removedFilter}
              />
              <SearchMemberButton
                showOptions={showOptions}
                category={"receiver"}
                type={"member"}
                filteredMembers={filteredMembers}
                submitButtonIsActive={submitButtonIsActive}
                expenseFilterState={expenseFilterState}
                transferFilterState={transferFilterState}
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
                filterState={transferFilterState}
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
                filterState={transferFilterState}
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
                filterState={transferFilterState}
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
