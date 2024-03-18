import { User } from "../models/user.model";
import { Request, Response } from "express";
import { generateAccessAndRefreshtoken } from "../utils/generateTokens";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if ([username, email, password].some((field) => field?.trim() === "")) {
      res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ $or: [{ username }, { email }] });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      username: username.toLowerCase(),
      email,
      password,
    });

    const newUser = await User.findById(user._id).select("-password");

    if (!newUser) {
      res.status(500).json({ message: "Error while registering user" });
    }

    return res.status(200).json({
      _id: newUser?._id,
      email: newUser?.email,
      username: newUser?.username,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log("Error in register controller ", error);
    res.status(500).json({ message: "Error while registering user", error });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (email === "" || password === "") {
      res.status(400).json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "User does not exist" });
    }

    const passwordCorrect = await user!.isPasswordCorrect(password);

    if (!passwordCorrect) {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect" });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshtoken(
      user?._id
    );

    const loggedInUser = await User.findById(user?._id).select("-password ");

    console.log(loggedInUser, "log in user");
    console.log(accessToken, "accessToken in user");
    console.log(refreshToken, "refreshToken in user");

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json({
        user: loggedInUser,
        accessToken,
        refreshToken,
        message: "User logged in successfully",
      });
  } catch (error) {
    console.log("Error in login controller", error);
    res.status(500).json({ message: "Error while logging in" });
  }
};

interface AuthenticatedRequest extends Request {
  user?: {
    _id: string;
  };
}

export const logoutUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthenticatedRequest).user?._id;

    console.log(userId, "logout user id");

    const loogedOutUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          refreshToken: null,
        },
      },
      {
        new: true,
      }
    );
    const options = {
      httpOnly: true,
      secure: true,
    };

    console.log(loogedOutUser);

    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json({ message: "User Logged Out" });
  } catch (error) {
    console.error("Error logging out user:", error);
    return res.status(500).json({ message: "Internal server error logout" });
  }
};
