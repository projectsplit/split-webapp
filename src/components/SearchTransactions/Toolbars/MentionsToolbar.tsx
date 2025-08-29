import SearchMemberButton from "../SearchCategoryButtons/SearchMemberButton/SearchMemberButton";
import { MentionsToolbarProps } from "../../../interfaces";
import SearchDateButton from "../SearchCategoryButtons/SearchDateButton/SearchDateButton";
import SearchLabelButton from "../SearchCategoryButtons/SearchLabelButton/SearchLabelButton";
import CurrentSearchField from "../CurrentSearchField/CurrentSearchField";


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
  showFreeTextPill
}) => {


  return (
    <>
      {showOptions.value && (
        <div className="categoryButtons">
          
          {expenseFilterState.value.freeText !== "" &&
          category.value === "expenses"&&showFreeTextPill.value ? (
            <CurrentSearchField
              currentSearch={expenseFilterState.value.freeText}
              filterState={expenseFilterState}
              removedFilter={removedFilter}
              submitButtonIsActive={submitButtonIsActive}
              showFreeTextPill={showFreeTextPill}
            />
          ) : (
            <></>
          )}

          {transferFilterState.value.freeText !== "" &&
          category.value === "transfers" &&showFreeTextPill.value? (
            <CurrentSearchField
              currentSearch={transferFilterState.value.freeText}
              filterState={transferFilterState}
              removedFilter={removedFilter}
              submitButtonIsActive={submitButtonIsActive}
              showFreeTextPill={showFreeTextPill}
            />
          ) : (
            <></>
          )}
          {category.value === "expenses" ? (
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
          ) : category.value === "transfers" ? (
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
