import axios from "axios";
import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();

  const checkIfUserLoggedIn = localStorage.getItem("checkIfUserLoggedIn");
  const accessToken = localStorage.getItem("accessToken");
  const logoutUser = async () => {
    try {
      console.log(checkIfUserLoggedIn, "useLog oUt hook");
      if (checkIfUserLoggedIn) {
        console.log("ha bhai", checkIfUserLoggedIn);
        console.log("at", accessToken);
        const response = await axios.post(
          "http://localhost:3000/api/logout",
          {},
          {
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true,
          }
        );
        console.log(response);
      } else {
        console.log("user is not logged in  use logout hook");
      }

      toast.success("Logged Out");

      navigate("/");
      localStorage.setItem("checkIfUserLoggedIn", "false");
    } catch (error) {
      console.log(error);
      toast.error("Error while authenticating user ");
    }
  };

  return { logoutUser };
};

export default useLogout;
