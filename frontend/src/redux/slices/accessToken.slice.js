import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  isUserLoggedIn: false,
};

const accessToken = createSlice({
  name: "accessToken",
  initialState,
  reducers: {
    userAccessToken: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    isUserLoggedIn: (state, action) => {
      state.isUserLoggedIn = action.payload;
    },
  },
});

export const { userAccessToken, isUserLoggedIn } = accessToken.actions;

export default accessToken.reducer;
