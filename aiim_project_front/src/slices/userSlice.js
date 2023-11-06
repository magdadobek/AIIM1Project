import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    nickname: "",
    id: "",
    index: "",
    email: "",
    password: "",
    account_type: "",
    isLoggedIn: false,
    token: "",
    tokenExpiration: ""
}


export const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.nickname = action.payload.nickname;
            state.id = action.payload.id;
            state.index = action.payload.index;
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.account_type = action.payload.account_type;
            state.token = action.payload.token;
        },
        register: (state, action) => {
            state = action.payload;
        },
        logout: (state) => {
            state = initialState;
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

export const userActions = userSlice.actions;

export default userSlice.reducer;