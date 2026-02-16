import { TransferState } from "./formStoreTypes";
import { create } from "zustand";

const initialState = {
  amount: "",
  description: "",
  currencySymbol: "",
  transferTime: "",
  senderId: "",
  receiverId: "",
  showPicker: false,
  errors: {
    amountError: "",
    idErrorMessage: "",
    isSenderError: false,
    isReceiverError: false,
    recipientError: "",
    isSameUserError: "",
    showAmountError: false,
    showIdError: false,
    showSamePersonError: false,
  },
};

export const useTransferStore = create<TransferState>()((set, get) => ({
  ...initialState,

  setAmount: (amount: string) => set({ amount }),
  setDescription: (description: string) => set({ description }),
  setCurrencySymbol: (symbol: string) => set({ currencySymbol: symbol }),
  setTransferTime: (valueOrFn) =>
    set((state) => ({
      transferTime:
        typeof valueOrFn === "function"
          ? valueOrFn(state.transferTime)
          : valueOrFn,
    })),
  setSenderId: (id) => set({ senderId: id }),
  setReceiverId: (id) => set({ receiverId: id }),
  toggleSenderId: (id) => set((state) => ({
    senderId: state.senderId === id ? "" : id
  })),
  toggleReceiverId: (id) => set((state) => ({
    receiverId: state.receiverId === id ? "" : id
  })),
  setShowPicker: (show: boolean) => set({ showPicker: show }),

  setError: (key: keyof TransferState['errors'], value: string | boolean) => set((state) => ({
    errors: {
      ...state.errors,
      [key]: value,
    },
  })),
  resetForm: () => set({
    amount: "",
    description: "",
    currencySymbol: "",
    transferTime: "",
    senderId: "",
    receiverId: "",
    showPicker: false,
    errors: {
      amountError: "",
      idErrorMessage: "",
      isSenderError: false,
      isReceiverError: false,
      recipientError: "",
      isSameUserError: "",
      showAmountError: false,
      showIdError: false,
      showSamePersonError: false,
    },
  }),
  initForm: (currency, userId, isNonGroup) => set((state) => ({
    ...initialState,
    currencySymbol: currency,
    senderId: (isNonGroup && userId) ? userId : "",
    transferTime: new Date().toISOString(),
  }))
}))