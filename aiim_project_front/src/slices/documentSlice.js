import { createSlice } from "@reduxjs/toolkit";

// placeholder
export const documentSlice = createSlice({
    name: "document",
    initialState: {
        name: "",
        type: "",
        department: "",
    },
    reducers: {
        get: (state, action) => {
            state = action.payload;
        },
        getDocument: (state, action) => {
            state = action.payload;
        },
        udpate: (state, action) => {
            state = action.payload;
        },
        delete: (state, action) => {
            state = action.payload;
        }
    }
});

export default documentSlice.reducer;