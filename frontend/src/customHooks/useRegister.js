import axios from "axios";
import { toast } from "react-hot-toast";

import { setLoading } from "../redux/slices/formData.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useRegistration = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const registerUser = async (formData) => {
    try {
      dispatch(setLoading(true));

      console.log(formData);

      localStorage.setItem("username", formData.username);
      const { username, email, password } = formData;
      console.log(username, "user Name", email, password); //this is printing
      if (!username || !email || !password) {
        toast.error("Please fill out all the fields");
        dispatch(setLoading(false));
        return;
      }
      const response = await axios.post(
        "http://localhost:3000/api/register",
        formData
      );
      console.log(response);
      console.log("Response data:", response.data);

      dispatch(setLoading(false));

      console.log("Registration successful:", response.data);
      toast.success("User registered successfully");
      navigate("/login");
      return response.data;
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const errorMessage = error.response.data.message;
        console.error("Error message:", errorMessage);
        toast.error(errorMessage);
      }

      dispatch(setLoading(false));
    }
  };

  return { registerUser };
};

export default useRegistration;
