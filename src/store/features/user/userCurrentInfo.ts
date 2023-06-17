import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initalState: TUser = {
  UserGroupName: undefined,
  AvatarIMG: "",
  Email: "",
  FullName: "",
  IsCheckOTP: false,
  IsConfirmOTP: false,
  Phone: "",
  Roles: [],
  UserId: 0,
  UserGroupId: 0,
  UserName: "",
  LastName: "",
  FirstName: "",
  OneSignalPlayerID: undefined,
};

export const userCurrentInfo = createSlice({
  name: "userCurrentInfo",
  initialState: initalState,
  reducers: {
    updateUser: (state: any, action: PayloadAction<TUser>) => {
      console.log("newUser: ", { ...action.payload });
      return {
        ...state,
        ...action.payload,
      };
    },
    logOut: (state: any, action: PayloadAction<TUser>) => {
      return {
        ...initalState,
      };
    },
  },
});

export const { updateUser, logOut } = userCurrentInfo.actions;
