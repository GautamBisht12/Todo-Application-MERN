import { configureStore } from "@reduxjs/toolkit";
import formDataReducer from "../redux/slices/formData.slice";
import accessTokenReducer from "../redux/slices/accessToken.slice";
import getAllTodosReducer from "../redux/slices/getAllTodos/getTodos.slice";
import todoreducer from "../redux/slices/todo.slice";

const store = configureStore({
  reducer: {
    formData: formDataReducer,
    accessToken: accessTokenReducer,
    userTodo: todoreducer,
    getUserTodos: getAllTodosReducer,
  },
});

export default store;
