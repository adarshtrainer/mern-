import mongoose from "mongoose";
import User from "../models/UserSchema.js";

export const editUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "With is ID no user found" });
    }

    await User.findByIdAndUpdate(userId, { $set: req.body }, { new: true });

    return res
      .status(200)
      .json({ success: true, message: "User data updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

//////delete user///

export const deleteUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "With is ID no user found" });
    }

    await User.findByIdAndDelete(userId, { $set: req.body }, { new: true });

    return res
      .status(200)
      .json({ success: true, message: "User data deleed" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

////getsingleuser by id///

export const getSingleuserById = async (req, res, next) => {
  const userId = req.params.id;
  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "user Not Fund...!" });
    }

    const user = await User.findById(userId);

    if (!user) {
      res
        .status(404)
        .json({ success: false, message: "user not found with this ID" });
    }

    return res
      .status(200)
      .json({ success: true, message: "user found", data: user });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all users
export const getAllusers = async (req, res, next) => {
  try {
    const users = await User.find();

    res
      .status(200)
      .json({ success: true, messgae: "All users found", data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
