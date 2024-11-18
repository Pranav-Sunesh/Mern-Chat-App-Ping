import { ContactType } from "@/@types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface chatState {
    userId: string
    addModal: boolean,
    requestModal: boolean,
    requests: string[] | []
    selectedChat: string
    chats: ContactType[] | [] | null
    messages: [] | string[] | null
    
}

const initialState: chatState = {
    userId: '',
    addModal: false,
    requestModal: false,
    requests: [],
    selectedChat: "",
    chats: null,
    messages: null,
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState, 
    reducers: {
        setUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
        },
        popAddModal: (state, action: PayloadAction<boolean>) => {
            state.addModal = action.payload;
        },
        popRequestModal: (state, action: PayloadAction<boolean>) => {
            state.requestModal = action.payload;
        },
        setRequests: (state, action: PayloadAction<string[] | []>) => {
            state.requests = action.payload;
        },
        setChats: (state, action: PayloadAction<any>) => {
            state.chats = action.payload;
        },
        setMessages: (state, action: PayloadAction<string[] | []>) => {
            state.messages = action.payload;
        },
        setSelectedChat: (state, action: PayloadAction<string>) => {
            state.selectedChat = action.payload;
        }
    }
})

export const { popAddModal, popRequestModal , setRequests, setChats, setMessages, setSelectedChat, setUserId} = chatSlice.actions;

export default chatSlice.reducer;