import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateFormData } from "../redux/slices/formData.slice";
import useRegistration from "../customHooks/useRegister";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Register = () => {
  const isLoading = useSelector((state) => state.formData.isLoading);

  const [formData, setFormdata] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { registerUser } = useRegistration();

  const dispatch = useDispatch();

  const handleRegisterInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormdata({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      await registerUser(formData);

      setFormdata({
        username: "",
        email: "",
        password: "",
      });
      dispatch(updateFormData(formData));
    } catch (error) {
      console.log("Registeraion failed", error.message);
      toast.error("Registeraion failed");
    }
  };

  return (
    <>
      <div className="w-full flex justify-center items-center  min-h-[90vh] ">
        <div className="w-full max-w-md px-8 py-3 bg-white rounded-lg shadow-[0_10px_20px_rgba(240,_46,_170,_0.7)]">
          <h1 className="text-2xl font-bold text-center mb-4">Register</h1>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                value={formData.username}
                onChange={handleRegisterInput}
                id="username"
                type="text"
                name="username"
                className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                value={formData.email}
                onChange={handleRegisterInput}
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
                value={formData.password}
                onChange={handleRegisterInput}
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
                  Register
                </button>
              ) : (
                <span className="loading loading-spinner loading-lg"></span>
              )}
            </div>
            <p>
              Already have an account ?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:underline cursor-pointer"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default Register;
