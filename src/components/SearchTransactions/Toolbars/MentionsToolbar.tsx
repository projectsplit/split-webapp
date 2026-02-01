import { MentionsToolbarProps } from "../../../interfaces";
import SearchDateButton from "../SearchCategoryButtons/SearchDateButton/SearchDateButton";
import SearchLabelButton from "../SearchCategoryButtons/SearchLabelButton/SearchLabelButton";
import CurrentSearchField from "../CurrentSearchField/CurrentSearchField";
import SearchPersonButton from "../SearchCategoryButtons/SearchMemberButton/SearchPersonButton";


const MentionsToolbar: React.FC<MentionsToolbarProps> = ({
  showOptions,
  submitButtonIsActive,
  expenseFilterState,
  transferFilterState,
  cancelled,
  removedFilter,
  filteredPeople,
  calendarIsOpen,
  datePeriodClicked,
  filteredLabels,
  category,
  showFreeTextPill
}) => {

const expensesType = expenseFilterState.value.groupId === "" ? "user" : "member";
const transfersType = transferFilterState.value.groupId === "" ? "user" : "member";
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
              <SearchPersonButton
                showOptions={showOptions}
                category={"payer"}
                type={expensesType}
                filteredPeople={filteredPeople}
                submitButtonIsActive={submitButtonIsActive}
                expenseFilterState={expenseFilterState}
                transferFilterState={transferFilterState}
                cancelled={cancelled}
                removedFilter={removedFilter}
              />
              <SearchPersonButton
                showOptions={showOptions}
                category={"participant"}
                type={expensesType}
                filteredPeople={filteredPeople}
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
              <SearchPersonButton
                showOptions={showOptions}
                category={"sender"}
                type={transfersType}
                filteredPeople={filteredPeople}
                submitButtonIsActive={submitButtonIsActive}
                expenseFilterState={expenseFilterState}
                transferFilterState={transferFilterState}
                cancelled={cancelled}
                removedFilter={removedFilter}
              />
              <SearchPersonButton
                showOptions={showOptions}
                category={"receiver"}
                type={transfersType}
                filteredPeople={filteredPeople}
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
