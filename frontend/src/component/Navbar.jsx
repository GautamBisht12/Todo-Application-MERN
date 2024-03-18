import toast from "react-hot-toast";
import useAuth from "../customHooks/useAuthUser";
import useLogout from "../customHooks/useLogout";
import { useNavigate } from "react-router-dom";
import useUserTodo from "../customHooks/useUserTodos";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("checkIfUserLoggedIn") === "true";
  const { userAllTodos } = useUserTodo();

  const { authenticateUser } = useAuth();
  const { logoutUser } = useLogout();
  const navigate = useNavigate();

  const handleNavAddBtn = async () => {
    try {
      authenticateUser();
    } catch (error) {
      console.log("User is Not logged in Navbar");
    }
  };

  const handleLogOut = () => {
    if (isLoggedIn) {
      logoutUser();

      console.log(isLoggedIn);
    }
    console.log(isLoggedIn);
  };

  const handleNavAllBtn = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      console.log(isLoggedIn);
      toast.error("Login First");
    } else {
      navigate("/alltodos");
      await userAllTodos();
    }
  };
  return (
    <>
      <div className="navbar  h-[10vh] bg-gray-700 text-white">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">ToDo App</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 flex items-center justify-center gap-5">
            <button
              onClick={handleNavAllBtn}
              className="btn-primary btn text-lg"
            >
              All Todos
            </button>
            <button
              onClick={handleNavAddBtn}
              className="btn-primary btn text-lg"
            >
              Add Todos
            </button>
            {isLoggedIn && (
              <button
                onClick={handleLogOut}
                className="btn-error text-white btn text-lg"
              >
                LogOut
              </button>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
