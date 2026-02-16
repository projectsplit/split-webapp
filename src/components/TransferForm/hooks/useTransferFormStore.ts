import { useShallow } from "zustand/react/shallow"
import { useTransferStore } from "../formStore/formStore"

export const useTransferActions = () => {
    return useTransferStore(useShallow((state) => ({
        setAmount: state.setAmount,
        setDescription: state.setDescription,
        setCurrencySymbol: state.setCurrencySymbol,
        setTransferTime: state.setTransferTime,
        setSenderId: state.setSenderId,
        setReceiverId: state.setReceiverId,
        toggleSenderId: state.toggleSenderId,
        toggleReceiverId: state.toggleReceiverId,
        setShowPicker: state.setShowPicker,
        setError: state.setError,
        resetForm: state.resetForm,
        initForm: state.initForm,

    })));
};

export const useTransferData = () => {
    return useTransferStore(useShallow((state) => ({
        amount: state.amount,
        description: state.description,
        currencySymbol: state.currencySymbol,
        transferTime: state.transferTime,
        senderId: state.senderId,
        receiverId: state.receiverId,
        showPicker: state.showPicker,
        errors: state.errors,

    })));
};