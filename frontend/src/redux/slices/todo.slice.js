import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  todo: "",
};

const todoData = createSlice({
  name: "userTodo",
  initialState,
  reducers: {
    updateTodoData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateTodoData } = todoData.actions;

export default todoData.reducer;
