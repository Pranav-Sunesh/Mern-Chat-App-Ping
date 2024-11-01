import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface chatState {
    addModal: boolean,
    requestModal: boolean,
}

const initialState: chatState = {
    addModal: false,
    requestModal: false,
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState, 
    reducers: {
        popAddModal: (state, action: PayloadAction<boolean>) => {
            state.addModal = action.payload;
        },
        popRequestModal: (state, action: PayloadAction<boolean>) => {
            state.requestModal = action.payload;
        }
    }
})

export const { popAddModal, popRequestModal } = chatSlice.actions;

export default chatSlice.reducer;