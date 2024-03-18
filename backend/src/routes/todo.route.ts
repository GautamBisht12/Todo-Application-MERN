import express from "express";

import { verifyJwt } from "../utils/auth.middleware";
import { addTodo, deleteTodo, userTodo } from "../controllers/todo.controller";

const router = express.Router();

router.post("/addtodo", verifyJwt, addTodo);
router.delete("/deletetodo/:todoId", verifyJwt, deleteTodo);
router.get("/usertodos", verifyJwt, userTodo);

export default router;
