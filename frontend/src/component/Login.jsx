import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useLogin from "../customHooks/useLogin";

const Login = () => {
  const isLoading = useSelector((state) => state.formData.isLoading);

  const { loginUser } = useLogin();

  const [formData, setFormdata] = useState({
    email: " ",
    password: "",
  });

  const handleLoginInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormdata({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      await loginUser(formData);
      setFormdata({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex w-full justify-center items-center  min-h-[90vh] ">
        <div className="w-full max-w-md px-8 py-3 bg-white rounded-lg  shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)] ">
          <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                onChange={handleLoginInput}
                id="email"
                type="email"
                name="email"
                className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                onChange={handleLoginInput}
                id="password"
                type="password"
                name="password"
                className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-center items-center">
              {!isLoading ? (
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Login
                </button>
              ) : (
                <span className="loading loading-spinner loading-lg"></span>
              )}
            </div>
            <p>
              {"Dont't"} have an account ?
              <Link
                to="/register"
                className="text-blue-500 ml-1 hover:underline cursor-pointer"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
