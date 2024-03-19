import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/slices/formData.slice";

const useUserTodo = () => {
  const accessToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();

  const userAllTodos = async () => {
    dispatch(setLoading(true));

    try {
      const response = await axios
        .get("http://localhost:3000/todo/usertodos", {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        })
        .catch((error) => {
          console.error("Error:", error);
          toast.error("You don't have any todos");
          dispatch(setLoading(false));
        });
      console.log(response);
      const todos = response?.data;
      console.log(todos);
      if (!todos) {
        dispatch(setLoading(false));
        localStorage.removeItem("userAllTodos");

        return console.log("User don't have any todos yet");
      } else {
        dispatch(setLoading(false));

        console.log(todos);

        localStorage.setItem("userAllTodos", JSON.stringify(todos));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return { userAllTodos };
};

export default useUserTodo;
