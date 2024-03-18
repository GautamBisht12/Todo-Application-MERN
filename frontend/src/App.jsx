import { Toaster } from "react-hot-toast";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Login from "./component/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./component/Register";
// import Todos from "./pages/Todos";
import AllTodos from "./pages/AllTodos";
import AddTodo from "./pages/AddTodos";

const App = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="w-fullp mt-10vh bg-slate-600 flex justify-center items-center">
          <Routes>
            {!isLoggedIn ? (
              <Route exact path="/" element={<Home />} />
            ) : (
              <Route path="/" element={<AddTodo />} />
            )}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/addtodo" element={<AddTodo />} />
            <Route path="/alltodos" element={<AllTodos />} />
          </Routes>
        </div>
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
