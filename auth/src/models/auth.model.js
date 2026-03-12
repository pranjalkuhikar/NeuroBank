import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    fullName: {
      firstName: {
        type: String,
        require: true,
      },
      lastName: {
        type: String,
        require: true,
      },
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isVerifyEmail: {
      type: Boolean,
      default: false,
    },
  },
  {
    timeStamps: true,
  },
);

const userModel = User.model(User);

export default userModel;
