import {createSlice} from "@reduxjs/toolkit";

type TInitialState = {};

const initialState: TInitialState = {};

export const adminSlice = createSlice({
	name: "admin",
	initialState,
	reducers: {},
});

// export const {} = adminSlice.actions;

export const adminReducer = adminSlice.reducer;
