import axios from "axios";
import { toast } from "react-hot-toast";
import { setLoading } from "../redux/slices/formData.slice";
import { useDispatch } from "react-redux";

const useAddTodo = () => {
  const dispatch = useDispatch();
  const addUserTodo = async (todoData) => {
    //get access token from localstorage
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken, "todo");
    try {
      dispatch(setLoading(true));
      const { todo, title } = todoData;
      console.log(todo, title, "todo title");
      if (!title || !todo) {
        console.log("Fields are empty");
        dispatch(setLoading(false));
        return toast.error("Fields are required");
      }
      //addTodo api call
      const response = await axios
        .post("http://localhost:3000/todo/addtodo", todoData, {
          headers: { Authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        })
        .catch((error) => {
          console.error("Error:", error);
          dispatch(setLoading(false));
          return toast.error(
            error.response?.data?.message || "Failed to add todo"
          );
        });

      console.log(response);

      // Check if the request was successful
      if (response.status === 200) {
        console.log(response.data);
        toast.success("Todo Added ");
        dispatch(setLoading(false));
      } else {
        toast.error("Failed to add todo");
        console.log("Failed to add todo:", response.data);
      }
      console.log(response);
    } catch (error) {
      console.error("Error adding todo:", error);
      toast.error("Error adding todo");
    }
  };

  return { addUserTodo };
};

export default useAddTodo;
