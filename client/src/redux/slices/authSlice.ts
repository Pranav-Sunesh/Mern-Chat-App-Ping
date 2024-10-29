import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface authState{        //State Types
    user: string,
    password: string,
    confirmPassword: string,
    email: string,
    firstName: string,
    lastName: string,
}

const initialState: authState = {           //States
    user: '',
    password: '',
    confirmPassword: '',
    email: '',
    firstName: '',
    lastName: '',

}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<string>) => {
            state.user = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload; 
        },
        setConfirmPassword: (state, action: PayloadAction<string>) => {
            state.confirmPassword = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setFirstName: (state, action: PayloadAction<string>) => {
            state.firstName = action.payload;
        },
        setLastName: (state, action: PayloadAction<string>) => {
            state.lastName = action.payload;
        }
    }
})

export const { setUser , setPassword , setConfirmPassword , setEmail , setFirstName, setLastName } = authSlice.actions;

export default authSlice.reducer;