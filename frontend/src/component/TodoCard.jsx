import { MdDelete } from "react-icons/md";
import useDeleteTodo from "../customHooks/useDeleteTodo";
import { useEffect, useState } from "react";

const TodoCard = () => {
  const { deleteTodo } = useDeleteTodo();

  const [todos, setTodos] = useState([]);

  // Fetch todos from localStorage on component mount
  useEffect(() => {
    const storedTodos =
      JSON.parse(localStorage.getItem("userAllTodos"))?.todos || [];
    setTodos(storedTodos);
  }, []);

  const handleDelete = async (todoId) => {
    console.log(todoId);
    await deleteTodo(todoId);
  };

  return (
    <div className="w-full flex flex-wrap">
      {todos?.map((todo) => (
        <div
          key={todo._id}
          className="w-[34vw] mx-auto mt-4 bg-white shadow-md rounded-md p-4 px-6"
        >
          <h3 className="text-lg font-semibold text-center text-gray-800">
            {todo.title}
          </h3>
          <p className="text-gray-600 mt-2 text-center">{todo.todo}</p>
          <span
            className="float-end text-2xl hover:text-red-500 cursor-pointer"
            onClick={() => handleDelete(todo._id)}
          >
            <MdDelete />
          </span>
        </div>
      ))}
    </div>
  );
};

export default TodoCard;
