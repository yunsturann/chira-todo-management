import { ITodo } from "@/types/model.types";
import mongoose, { Model, Schema } from "mongoose";

interface ITodoModel extends Model<ITodo> {}

const TodoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    tags: {
      type: [
        {
          tag: { type: String },
          color: { type: String },
        },
      ],
    },
    status: {
      type: String,
      enum: ["todo", "in_progress", "done"],
      default: "todo",
      required: true,
    },
    index: {
      type: Number,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

TodoSchema.pre("save", async function (next) {
  if (this.isNew) {
    const lastTodo = await (this.constructor as ITodoModel)
      .findOne({ user: this.user, status: this.status })
      .sort("-index");
    if (lastTodo) {
      this.index = lastTodo.index + 1;
    } else {
      this.index = 0;
    }
  }
  next();
});

const Todo = mongoose.models.Todo || mongoose.model<ITodo>("Todo", TodoSchema);

export default Todo;
