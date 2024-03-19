import axios from "axios";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";

import { setLoading } from "../redux/slices/formData.slice";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

const useLogin = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(["accessToken"]);

  //add cookie in req
  const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
  });

  axiosInstance.interceptors.request.use((config) => {
    const accessToken = cookies.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  const loginUser = async (formData) => {
    try {
      dispatch(setLoading(true));

      console.log(formData);
      const { email, password } = formData;
      console.log(email, password); //this is printing
      if (!email || !password) {
        toast.error("Please fill out all the fields");
        dispatch(setLoading(false));
        return;
      }

      const response = await axiosInstance.post("/login", formData);

      const { accessToken } = response.data;
      console.log(accessToken);

      // Store the access token in a cookie using react-cookie
      setCookie("accessToken", accessToken, { path: "/", maxAge: 604800 }); // Max age set to 7 days

      console.log("Response data:", response.data);

      dispatch(setLoading(false));

      console.log("Login successful:", response.data.user);
      console.log("Access token:", response.data.accessToken);

      const token = response.data.accessToken;
      const username = response.data.user.username;
      //store in localStorage
      localStorage.setItem("checkIfUserLoggedIn", "true");
      localStorage.setItem("accessToken", token);
      localStorage.setItem("username", username);

      toast.success("User Login successfully");
      navigate("/addtodo");

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
      } else {
        toast.error("Login failed");
      }

      dispatch(setLoading(false));
    }
  };

  return { loginUser };
};

export default useLogin;
