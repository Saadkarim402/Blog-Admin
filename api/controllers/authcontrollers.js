import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return res.status(400).json({message:'enter all the data properly'});
  }

  //hashing pass to make it secure
  const hashedPass=bcryptjs.hashSync(password,10);

  const newUser = new User({
    //es6 se agar maodel ka naame me aur jo data daalna hai usmei fark nhi hai 
    //kuch daalne ka zarooart nhi
    username,
    email,
    password:hashedPass,
  });
  try {
    await newUser.save();
    res.json("User data saved in database");
  } catch (error) {
    res.json(500).json({ message: error.message });
  }
};
