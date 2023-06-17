import { createSlice } from "@reduxjs/toolkit";

export const dataGlobalSlice = createSlice({
  name: "dataGlobal",
  initialState: {},
  reducers: {
    update: (state: any, action: any) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { update } = dataGlobalSlice.actions;
