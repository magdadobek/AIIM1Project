import { createSlice } from "@reduxjs/toolkit";

// placeholder
export const clubSlice = createSlice({
    name: "club",
    initialState: {
        name: "",
        department: "",
        mentor:"",
        chairman:""
    },
    reducers: {
        get: (state, action) => {
            state = action.payload;
        },
        getClub: (state, action) => {
            state = action.payload;
        },
        update: (state, action) => {
            state = action.payload;
        },
        delete: (state, action) => {
            state = action.payload;
        }
    }
});

export default clubSlice.reducer;