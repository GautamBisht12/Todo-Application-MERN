import { useState } from "react";
import useAddTodo from "../customHooks/useAddTodo";

import { useSelector } from "react-redux";

function AddTodo() {
  const [usertodo, setUserTodo] = useState({ title: "", todo: "" });
  const isLoading = useSelector((state) => state.formData.isLoading);

  const { addUserTodo } = useAddTodo();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserTodo((prevTodo) => ({ ...prevTodo, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addUserTodo(usertodo);

    setUserTodo({
      title: "",
      todo: "",
    });
  };

  // const handleDelete = () => {

  // };

  return (
    <>
      <div className="container mx-auto px-4 py-10 min-h-[90vh]">
        <h1 className="text-3xl text-slate-300 font-bold mb-6 text-center">
          Todo List
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            name="title"
            placeholder="Enter Todo Title"
            className="rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={usertodo.title}
            onChange={handleChange}
          />
          <textarea
            name="todo"
            placeholder="Write your todo here"
            className="rounded-md px-2 py-1 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={usertodo.todo}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            {isLoading ? (
              <span className="disabled loading loading-spinner loading-sm"></span>
            ) : (
              "Add Todo"
            )}
          </button>
        </form>
      </div>
    </>
  );
}

export default AddTodo;
