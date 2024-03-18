import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const getUserTodos = createSlice({
  name: "allTodos",
  initialState,
  reducers: {
    userTodosData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { userTodosData } = getUserTodos.actions;

export default getUserTodos.reducer;
