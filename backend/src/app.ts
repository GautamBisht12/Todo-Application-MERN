import "dotenv/config";
import express from "express";
import { Todo } from "./models/todo.model";
import { User } from "./models/user.model";
import userRouter from "./routes/auth.route";
import todoRouter from "./routes/todo.route";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Mounting the user routes

app.use("/api", userRouter);
app.use("/todo", todoRouter);

app.get("/", async (req, res) => {
  const data = await Todo.find().exec();
  res.status(200).json({ data });
});
app.get("/users", async (req, res) => {
  const data = await User.find().exec();
  res.status(200).json({ data });
});

export default app;
