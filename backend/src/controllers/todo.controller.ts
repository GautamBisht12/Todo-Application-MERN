import { Request, Response } from "express";
import { Todo } from "../models/todo.model";
import { User } from "../models/user.model";

interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
  };
}
export const addTodo = async (req: Request, res: Response) => {
  try {
    const { title, todo } = req.body;
    const createdBy = (req as AuthenticatedRequest).user?._id;

    if (!title || !todo) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (!createdBy) {
      return res.status(400).json({ message: "User is  not looged in" });
    }

    const newTodo = await Todo.create({
      title,
      todo,
      createdBy,
    });

    const userAfterCreatingTodo = await User.findByIdAndUpdate(createdBy, {
      $push: { todos: newTodo._id },
    });
    console.log(todo);
    console.log(userAfterCreatingTodo);

    return res.status(200).json({
      message: "Todo added successfully",
      todo: newTodo,
    });
  } catch (error) {
    console.log("Error in creating todo controller ", error);
    res.status(500).json({ message: "Error while creating todo", error });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { todoId } = req.params;
    const userId = (req as AuthenticatedRequest).user?._id;
    console.log(todoId, "todoId ", userId);

    if (!todoId || !userId) {
      return res
        .status(400)
        .json({ message: "Todo ID or user ID are required" });
    }

    const todo = await Todo.findById(todoId);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    console.log("Created By", todo.createdBy);
    console.log("User id", userId);

    if (todo.createdBy.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Unauthorized - Todo does not belong to the user" });
    }

    //delete todo
    await Todo.findByIdAndDelete(todoId);

    // Remove the todoId from the user's todos
    await User.findByIdAndUpdate(userId, {
      $pull: { todos: todoId },
    });

    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error in deleting todo:", error);
    return res
      .status(500)
      .json({ message: "Error while deleting todo", error });
  }
};

export const userTodo = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).user?._id;
    console.log(userId, "user id from req");

    if (!userId) {
      return res.status(400).json({ message: "User is not logged in" });
    }
    const user = await User.findById(userId).select("-password -refreshToken");
    console.log(user, " user data using userId");

    if (!user) {
      return res.status(400).json({ message: "User not exist in db" });
    }
    const todoIds = user?.todos;
    console.log(todoIds, "all todos ids of user");

    if (!todoIds || todoIds.length === 0) {
      return res
        .status(400)
        .json({ message: "User does not have any todos  " });
    }
    //find all todos ids in todosids
    const todos = await Todo.find({ _id: { $in: todoIds } }!);
    console.log(todos, "all todos of user");

    if (!todos || todos.length === 0) {
      return res.status(400).json({ message: "Todos  not  available  " });
    }
    return res.status(200).json({ todos: todos, message: "users todos" });
  } catch (error) {
    console.error("Error while getting todos:", error);
    return res
      .status(500)
      .json({ message: "Error while getting todos", error });
  }
};
