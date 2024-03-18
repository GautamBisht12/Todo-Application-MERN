import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const isLoggedIn = localStorage.getItem("checkIfUserLoggedIn") === "true";

  const navigate = useNavigate();

  const authenticateUser = async () => {
    try {
      console.log("isUserLoggedIn", isLoggedIn);
      if (!isLoggedIn) {
        console.log("Token or user is not available login first");
        toast.error("Login First");
        navigate("/login");
      } else {
        navigate("/addtodo");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while authenticating user ");
    }
  };

  return { authenticateUser };
};

export default useAuth;
