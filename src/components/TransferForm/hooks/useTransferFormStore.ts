import { StoreApi, useStore } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import { TransferState } from '../formStore/formStoreTypes';

export const useTransferActions = (store: StoreApi<TransferState>) => {
  return useStore(
    store,
    useShallow((state) => ({
      setAmount: state.setAmount,
      setDescription: state.setDescription,
      setCurrencySymbol: state.setCurrencySymbol,
      setTransferTime: state.setTransferTime,
      setIsTrackingNow: state.setIsTrackingNow,
      setSenderId: state.setSenderId,
      setReceiverId: state.setReceiverId,
      toggleSenderId: state.toggleSenderId,
      toggleReceiverId: state.toggleReceiverId,
      swapParties: state.swapParties,
      setShowPicker: state.setShowPicker,
      setError: state.setError,
      resetForm: state.resetForm,
      initForm: state.initForm,
    }))
  );
};

export const useTransferData = (store: StoreApi<TransferState>) => {
  return useStore(
    store,
    useShallow((state) => ({
      amount: state.amount,
      description: state.description,
      currencySymbol: state.currencySymbol,
      transferTime: state.transferTime,
      isTrackingNow: state.isTrackingNow,
      senderId: state.senderId,
      receiverId: state.receiverId,
      showPicker: state.showPicker,
      errors: state.errors,
    }))
  );
};
