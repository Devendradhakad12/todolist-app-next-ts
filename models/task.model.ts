import mongoose, { models } from "mongoose";

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  checked:{
    type:Boolean,
    default:false
  }
});

export const Task = models.Task ||  mongoose.model("Task", TaskSchema);
