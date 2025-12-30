import User from "../models/UserSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRegistration = async (req, res, next) => {
  const { email, password, phone, location, name } = req.body;
  try {
    let user = await User.findOne({ email: email });
    console.log(user);

    if (user) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Password encryption
    const salt = await bcrypt.genSalt(10);
    const hashing = await bcrypt.hash(password, salt);

    user = new User({ email, password: hashing, phone, location, name });

    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "User registered successfully...!" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server error...!" });
  }
};

// Token creation function
const createToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role, name: user.name },
    process.env.JWT_token,
    { expiresIn: "1d" }
  );
};

export const login = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        sucess: false,
        message: "Email not found. Create an new account",
      });
    }

    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!comparePassword) {
      return res
        .status(400)
        .json({ success: false, message: "Wrong password" });
    }

    // Token
    const token = createToken(user);

    const { password, role, ...rest } = user._doc;

    return res.status(200).json({
      sucess: true,
      messgae: "Login sucess",
      data: { ...rest },
      role,
      token,
    });
  } catch (error) {
    return res.status(500).json({ sucess: false, message: "Server error" });
  }
};
