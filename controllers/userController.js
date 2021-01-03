import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

//@desc AUTH USER AND GET TOKEN
//@route POST /api/user/login
//@access Public Access no Token Needed

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("Email : " + email + " , Password : " + password);
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Un-Authorized Access. Invalid Credentials");
  }
});

//@desc CREATE USERS
//@route POST /api/user/
//@access Public Access no Token Needed

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  console.log(
    "Email : " + email + " , Password : " + password + " , name :" + name
  );
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  } else {
    const newUser = await User.create({
      name,
      email,
      password,
      isAdmin,
    });
    if (newUser) {
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: generateToken(newUser._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  }
});

//@desc FETCH USER PROFILE
//@route GET /api/user/profile
//@access private Access  Token Needed for Profile
const userProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

export { authUser, userProfile, registerUser };
