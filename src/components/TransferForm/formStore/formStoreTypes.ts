export interface TransferState {

  amount: string;
  description: string;
  currencySymbol: string;
  transferTime: string;
  senderId: string;
  receiverId: string;
  showPicker: boolean;

  errors: {
    amountError: string;
    idErrorMessage: string;
    isSenderError: boolean;
    isReceiverError: boolean;
    recipientError: string;
    isSameUserError: string;
    showAmountError: boolean;
    showIdError: boolean;
    showSamePersonError: boolean;
  };

  // Actions
  setAmount: (amount: string) => void;
  setDescription: (description: string) => void;
  setCurrencySymbol: (symbol: string) => void;
  setTransferTime: (value: string | ((prev: string) => string)) => void;
  setSenderId: (id: string) => void;
  setReceiverId: (id: string) => void;
  toggleSenderId: (id: string) => void;
  toggleReceiverId: (id: string) => void;
  setShowPicker: (show: boolean) => void;

  setError: (key: keyof TransferState['errors'], value: string | boolean) => void;
  resetForm: () => void;

  initForm: (currency: string, userId: string | undefined, isNonGroup: boolean) => void;
}