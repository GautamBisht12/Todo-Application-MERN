import { configureStore } from "@reduxjs/toolkit";
import formDataReducer from "../redux/slices/formData.slice";

const store = configureStore({
  reducer: {
    formData: formDataReducer,
  },
});

export default store;
