import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="w-full min-h-[90vh] py-2 bg-gray-600 flex justify-center items-center">
        <div className="bg-gray-200 w-[70vw]  min-h-[70vh] flex card lg:card-side  shadow-xl ">
          <div className="w-full flex flex-col gap-4  justify-center items-center px-4">
            <h1 className="text-3xl text-center text-blue-800">
              Welcome to Our Application!
            </h1>
            <p className="text-2xl text-center text-blue-600">
              To start using our todo features, please log in or create an
              account.
            </p>
            <span className="block text-2xl">New User?</span>
            <Link
              to={"/register"}
              className="btn-accent  text-white  btn  text-2xl cursor-pointer"
            >
              {" "}
              Register Now
            </Link>
            <p className="text-blue-600 text-xl">Already Have an Account?</p>
            <p className="text-xl text-center">
              Simply log in to your account to continue where you left off.
            </p>
            <Link
              to={"/login"}
              className="btn-primary  btn  text-2xl cursor-pointer"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
