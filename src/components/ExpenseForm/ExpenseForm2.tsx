// import React, { useCallback, useReducer } from "react";
// import { StyledExpenseForm } from "./ExpenseForm.styled";
// import { ExpenseRequest, GeoLocation } from "../../types";
// import MyButton from "../MyButton/MyButton";
// import { DateTime } from "../DateTime";
// import MenuAnimationBackground from "../Menus/MenuAnimations/MenuAnimationBackground";
// import CurrencyOptionsAnimation from "../Menus/MenuAnimations/CurrencyOptionsAnimation";
// import LocationPicker from "../LocationPicker/LocationPicker";
// import LabelPicker from "../LabelPicker/LabelPicker";
// import MemberPicker from "../MemberPicker/MemberPicker";
// import { handleInputChange } from "../../helpers/handleInputChange";
// import InputMonetary from "../InputMonetary/InputMonetary";
// import { IoClose } from "react-icons/io5";
// import { amountIsValid } from "../../helpers/amountIsValid";
// import { useSignal } from "@preact/signals-react";
// import FormInput from "../FormInput/FormInput";
// import { ExpenseFormProps } from "../../interfaces";
// import { useExpense } from "../../api/services/useExpense";
// import { useEditExpense } from "../../api/services/useEditExpense";
// import { useExpenseValidation } from "../../hooks/useExpenseValidation";
// import {
//   createInitialExpenseFormState,
//   expenseFormReducer,
//   useSubmitExpense,
// } from "./utils";

// export default function ExpenseForm2({
//   group,
//   expense,
//   timeZoneId,
//   menu,
//   timeZoneCoordinates,
//   header,
//   selectedExpense,
//   isCreateExpense,
// }: ExpenseFormProps) {
  
//   const { mutate: createExpenseMutation, isPending: isPendingCreateExpense } =
//     useExpense(menu, group.id);

//   const { mutate: editExpenseMutation, isPending: isPendingEditExpense } =
//     useEditExpense(menu, selectedExpense, group.id);

//   const currencyMenu = useSignal<string | null>(null);
//   const isMapOpen = useSignal<boolean>(false);

//   const location = useSignal<GeoLocation | undefined>(
//     expense?.location ?? undefined
//   );

//   const initialState = createInitialExpenseFormState(
//     isCreateExpense,
//     group,
//     expense
//   );

//   const [state, dispatch] = useReducer(expenseFormReducer, initialState);

//   const submitExpense = useSubmitExpense(
//     state,
//     dispatch,
//     location,
//     isCreateExpense,
//     group,
//     expense,
//     createExpenseMutation,
//     editExpenseMutation
//   );

//   useExpenseValidation({
//     amount: state.amount,
//     participants: state.participants,
//     payers: state.payers,
//     currencySymbol: state.currencySymbol,
//     description: state.description,
//     location: location,
//     dispatch,
//   });

//   // const amountNumber = !state.errors.amount ? Number(state.amount) : Number.NaN;

//   const handleInputBlur = useCallback(() => {
//     if (
//       state.participants.some((p) => p.selected) ||
//       state.payers.some((p) => p.selected)
//     ) {
//       dispatch({ type: "SET_SHOW_ERRORS", payload: true });
//       const amountError = amountIsValid(state.amount) ? "" : "Invalid amount";
//       dispatch({ type: "SET_ERROR", payload: { amount: amountError } });
//     }
//   }, [state.participants, state.payers, state.amount]);

//   const handleCurrencyOptionsClick = useCallback(
//     (curr: string) => {
//       dispatch({ type: "SET_CURRENCY", payload: curr });
//       currencyMenu.value = null;
//     },
//     [currencyMenu]
//   );

//   const handleInputChangeCallback = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       handleInputChange(e, state.currencySymbol, dispatch);
//       dispatch({ type: "SET_SHOW_ERRORS", payload: false });
//     },
//     [state.currencySymbol]
//   );

//   const handleDescriptionChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       dispatch({ type: "SET_DESCRIPTION", payload: e.target.value });
//       dispatch({ type: "SET_SHOW_ERRORS", payload: false });
//     },
//     []
//   );

//   return (
//     <StyledExpenseForm>
//       <div className="header">
//         <div className="gap"></div>
//         <div className="title">{header}</div>
//         <div
//           className="closeButtonContainer"
//           onClick={() => (menu.value = null)}
//         >
//           <IoClose className="closeButton" />
//         </div>
//       </div>
//       <div className="inputAndErrorsWrapper">
//         <InputMonetary
//           currencyMenu={currencyMenu}
//           value={state.displayedAmount}
//           onChange={handleInputChangeCallback}
//           onBlur={handleInputBlur}
//           currency={state.currencySymbol}
//           autoFocus={true}
//           $inputError={state.showErrors && !!state.errors.amount}
//         />
//         <span className="errorMsg">
//           {state.showErrors && state.errors.amount ? state.errors.amount : ""}
//         </span>
//       </div>
//       <MemberPicker
//         description={"Participants"}
//         totalAmount={Number(state.amount)}
//         memberAmounts={state.participants}
//         error={state.errors.participants}
//         dispatch={dispatch}
//         group={group}
//         selectedCurrency={state.currencySymbol}
//       />
//       <MemberPicker
//         description={"Payers"}
//         totalAmount={Number(state.amount)}
//         memberAmounts={state.payers}
//         error={state.errors.payers}
//         dispatch={dispatch}
//         group={group}
//         selectedCurrency={state.currencySymbol}
//       />
//       <FormInput
//         description="Description"
//         placeholder="e.g. Air tickets"
//         value={state.description}
//         error={state.errors.description}
//         onChange={handleDescriptionChange}
//       />
//       <LabelPicker
//         labels={state.labels}
//         dispatch={dispatch}
//         groupId={group.id}
//       />
//       <LocationPicker
//         location={location}
//         isMapOpen={isMapOpen}
//         timeZoneCoordinates={timeZoneCoordinates}
//       />
//       <DateTime
//         selectedDateTime={state.expenseTime}
//         dispatch={dispatch}
//         timeZoneId={timeZoneId}
//         isEdit={!isCreateExpense}
//       />
//       <div className="spacer"></div>
//       <MyButton
//         fontSize="16"
//         onClick={submitExpense}
//         isLoading={
//           isCreateExpense ? isPendingCreateExpense : isPendingEditExpense
//         }
//       >
//         Submit
//       </MyButton>
//       <MenuAnimationBackground menu={currencyMenu} />
//       <CurrencyOptionsAnimation
//         currencyMenu={currencyMenu}
//         clickHandler={handleCurrencyOptionsClick}
//         selectedCurrency={state.currencySymbol}
//       />
//     </StyledExpenseForm>
//   );
// }
