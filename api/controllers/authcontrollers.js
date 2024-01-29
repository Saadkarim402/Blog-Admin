import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

//sign up api

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All feilds are required"));
  }

  //hashing pass to make it secure
  const hashedPass = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    //es6 se agar maodel ka naame me aur jo data daalna hai usmei fark nhi hai
    //kuch daalne ka zarooart nhi
    username,
    email,
    password: hashedPass,
  });
  try {
    await newUser.save();
    res.json("User data saved in database");
  } catch (error) {
    //next function is used to pass control to the next middleware function in the middleware stack.
    next(error);
  }
};

//signin api
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All feilds are required"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(400, "User not found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, "Invalid password"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    
    //removing password data
    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
