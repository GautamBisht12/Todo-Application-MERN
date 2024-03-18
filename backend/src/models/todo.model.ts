import mongoose, { model, Schema } from "mongoose";

interface ITodo extends Document {
  title: string;
  todo: string;
  createdBy: mongoose.Schema.Types.ObjectId;
}

const todoSchema: Schema<ITodo> = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    todo: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Todo = model<ITodo>("Todo", todoSchema);
