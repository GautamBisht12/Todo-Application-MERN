import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/slices/formData.slice";
import useUserTodo from "../customHooks/useUserTodos";

const useDeleteTodo = () => {
  const dispatch = useDispatch();

  //get acces token  from localstorage
  const accessToken = localStorage.getItem("accessToken");

  console.log(accessToken, "delete token");

  const { userAllTodos } = useUserTodo();

  const deleteTodo = async (todoId) => {
    try {
      dispatch(setLoading(true));

      const response = await axios.delete(
        `http://localhost:3000/todo/deletetodo/${todoId}`,

        {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      );

      //If tod deleted successfully
      if (response.status === 200) {
        console.log(response.data);
        toast.success("Todo Deleted ");
        // Update localStorage
        const todos = JSON.parse(localStorage.getItem("todos") || "[]");
        const updatedTodos = todos.filter((todo) => todo._id !== todoId);
        localStorage.setItem("userAllTodos", JSON.stringify(updatedTodos));

        await userAllTodos();

        dispatch(setLoading(false));
      } else {
        toast.error("Failed to Delete todo");
        console.log("Failed to Delete todo:", response.data);
      }
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return { deleteTodo };
};

export default useDeleteTodo;
