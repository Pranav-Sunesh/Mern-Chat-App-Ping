import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.ts";
import chatReducer from "../slices/chatSlice.ts";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
    }
})

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']; 

export default store;