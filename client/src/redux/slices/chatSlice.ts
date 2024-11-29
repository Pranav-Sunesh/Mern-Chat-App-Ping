import { ContactType, RequestSectionType, UserDetailsType } from "@/@types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LastMessageType } from "@/@types";


interface chatState {
    userId: string
    addModal: boolean,
    requestModal: boolean,
    requests: RequestSectionType[] | []
    selectedChat: ContactType | null
    chats: ContactType[] | [] | null
    messages: any,
    isTyping: boolean
    selectedChatName: string
    messageInput: string
    userDetails: UserDetailsType | null
    selectedChatId: string
}

const initialState: chatState = {
    userId: '',
    userDetails: null,
    messageInput: '',
    addModal: false,
    requestModal: false,
    requests: [],
    selectedChat: null,
    chats: null,
    messages: null,
    isTyping: false,
    selectedChatName: '',
    selectedChatId: '',
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState, 
    reducers: {
        setUserId: (state, action: PayloadAction<string>) => {
            state.userId = action.payload;
        },
        setUserDetails: (state, action: PayloadAction<any>) => {
            state.userDetails = action.payload;
        },
        popAddModal: (state, action: PayloadAction<boolean>) => {
            state.addModal = action.payload;
        },
        popRequestModal: (state, action: PayloadAction<boolean>) => {
            state.requestModal = action.payload;
        },
        setRequests: (state, action: PayloadAction<RequestSectionType[] | []>) => {
            state.requests = action.payload;
        },
        setChats: (state, action: PayloadAction<any>) => {
            state.chats = action.payload;
        },
        setMessages: (state, action: PayloadAction<string[] | []>) => {
            state.messages = action.payload;
        },
        setSelectedChat: (state, action: PayloadAction<ContactType>) => {
            state.selectedChat = action.payload;
        },
        setNewMessage: (state, action: PayloadAction<any>) => {
            state.messages = [...state.messages? state.messages: [], action.payload];
        },
        updateTimestamp: (state, action: PayloadAction<{chatId: string, timestamp: string}>) => {
            const { chatId, timestamp } = action.payload;
            state.chats = state.chats?.map((chat) => {
                if(chat._id === chatId){
                    return {
                        ...chat,
                        updatedTimestamp: timestamp,
                    }
                }
                return chat;
            }) || [];
        },
        updateLastMessage: (state, action: PayloadAction<{chatId: string, lastMessage: LastMessageType}>) => {
            const { chatId , lastMessage } = action.payload;

            state.chats = state.chats?.map((chat) => {
                if(chat._id === chatId){
                    return {
                        ...chat, 
                        lastMessage: lastMessage
                    }
                }
                return chat
            }) || [];
        },
        sortChats: (state) => {
            if(state.chats){
                state.chats.sort((a,b) => new Date(b.updatedTimestamp).getTime() - new Date(a.updatedTimestamp).getTime());
            }
        },
        setIsTyping: (state, action: PayloadAction<boolean>) => {
            state.isTyping = action.payload;
        },
        setSelectedChatName: (state, action: PayloadAction<string>) => {
            state.selectedChatName = action.payload;
        },
        setMessageInput: (state, action: PayloadAction<string>) => {
            state.messageInput = action.payload;
        }, 
        setSelectedChatId: (state, action: PayloadAction<string>) => {
            state.selectedChatId = action.payload;
        }
    }
})

export const { popAddModal, 
                popRequestModal , 
                setRequests, 
                setChats, 
                setMessages, 
                setSelectedChat, 
                setUserId, 
                setNewMessage, 
                updateTimestamp, 
                sortChats,
                updateLastMessage, 
                setIsTyping,
                setSelectedChatName,
                setMessageInput, 
                setSelectedChatId,
                setUserDetails} = chatSlice.actions;

export default chatSlice.reducer;