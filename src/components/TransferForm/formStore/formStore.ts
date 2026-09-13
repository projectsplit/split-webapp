import { TransferState } from './formStoreTypes';
import { createStore } from 'zustand';

const initialState = {
  amount: '',
  description: '',
  currencySymbol: '',
  transferTime: '',
  isTrackingNow: true,
  senderId: '',
  receiverId: '',
  showPicker: false,
  errors: {
    amountError: '',
    idErrorMessage: '',
    isSenderError: false,
    isReceiverError: false,
    isSameUserError: '',
    showAmountError: false,
    showIdError: false,
    showSamePersonError: false,
  },
};

export const createTransferStore = () =>
  createStore<TransferState>()((set) => ({
  ...initialState,

  setAmount: (amount: string) => set({ amount }),
  setDescription: (description: string) => set({ description }),
  setCurrencySymbol: (symbol: string) => set({ currencySymbol: symbol }),
  setTransferTime: (valueOrFn) =>
    set((state) => ({
      transferTime:
        typeof valueOrFn === 'function'
          ? valueOrFn(state.transferTime)
          : valueOrFn,
    })),

  setIsTrackingNow: (value: boolean) => set({ isTrackingNow: value }),
  setSenderId: (id) =>
    set((state) =>
      id !== '' && state.receiverId === id
        ? { senderId: id, receiverId: state.senderId }
        : { senderId: id }
    ),
  setReceiverId: (id) =>
    set((state) =>
      id !== '' && state.senderId === id
        ? { receiverId: id, senderId: state.receiverId }
        : { receiverId: id }
    ),
  toggleSenderId: (id) =>
    set((state) =>
      state.senderId === id
        ? { senderId: '' }
        : id !== '' && state.receiverId === id
          ? { senderId: id, receiverId: state.senderId }
          : { senderId: id }
    ),
  toggleReceiverId: (id) =>
    set((state) =>
      state.receiverId === id
        ? { receiverId: '' }
        : id !== '' && state.senderId === id
          ? { receiverId: id, senderId: state.receiverId }
          : { receiverId: id }
    ),
  swapParties: () =>
    set((state) => ({
      senderId: state.receiverId,
      receiverId: state.senderId,
    })),
  setShowPicker: (show: boolean) => set({ showPicker: show }),

  setError: (key: keyof TransferState['errors'], value: string | boolean) =>
    set((state) => ({
      errors: {
        ...state.errors,
        [key]: value,
      },
    })),
  resetForm: () =>
    set({
      amount: '',
      description: '',
      currencySymbol: '',
      transferTime: '',
      senderId: '',
      receiverId: '',
      showPicker: false,
      errors: {
        amountError: '',
        idErrorMessage: '',
        isSenderError: false,
        isReceiverError: false,
        isSameUserError: '',
        showAmountError: false,
        showIdError: false,
        showSamePersonError: false,
      },
    }),
  initForm: (currency, userId, isNonGroup) =>
    set(() => ({
      ...initialState,
      currencySymbol: currency,
      senderId: isNonGroup && userId ? userId : '',
      transferTime: new Date().toISOString(),
      isTrackingNow: true,
    })),
}));
