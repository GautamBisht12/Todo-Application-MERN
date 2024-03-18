import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  password: "",
  isLoading: false,
};

const formDataSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { updateFormData, setLoading } = formDataSlice.actions;

export default formDataSlice.reducer;
