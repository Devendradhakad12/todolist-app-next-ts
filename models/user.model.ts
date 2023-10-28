import mongoose, { models } from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
   
  },
});

export const User = models.User || mongoose.model("User", UserSchema);
