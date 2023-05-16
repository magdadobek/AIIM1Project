import { createSlice } from "@reduxjs/toolkit";

// dokończyć logikę
export const userSlice = createSlice({
    name: "user",
    initialState: {
        nickname: "",
        index: "",
        email: "",
        password: "",
        account_type: ""
    },
    reducers: {
        login: (state, action) => {
            state = action.payload;
        },
        register: (state, action) => {
            state = action.payload;
        },
        getUser: (state, action) => {
            state = action.payload;
        },
        editUser: (state, action) => {
            state = action.payload;
        },
        deleteUser: (state, action) => {
            state = action.payload;
        },
    }
});

export default userSlice.reducer;