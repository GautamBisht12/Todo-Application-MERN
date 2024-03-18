import { useSelector } from "react-redux";
import TodoCard from "../component/TodoCard";

const AllTodos = () => {
  const isLoading = useSelector((state) => state.formData.isLoading);

  //get todos from localstorage
  const userAllTodosString = localStorage.getItem("userAllTodos");
  const userTodosData = JSON.parse(userAllTodosString)?.todos || [];

  const userTodos = userTodosData.length === 0;
  console.log(isLoading, "inallTodos");
  return (
    <div className="w-full flex min-h-[90vh] justify-center items-center py-10 flex-col gap-2 flex-wrap   px-2  ">
      {isLoading ? (
        <span className="loading loading-spinner  loading-lg text-white "></span>
      ) : (
        <div className="w-full flex flex-col justify-center items-center">
          <span className="w-full text-center mb-8  text-white text-3xl">
            {userTodos
              ? "You don't have any todo make one."
              : "Here are your all todos."}
          </span>
          <div className="flex gap-2 flex-wrap">
            <TodoCard />
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTodos;
