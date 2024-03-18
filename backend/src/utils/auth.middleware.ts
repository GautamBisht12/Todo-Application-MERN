import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.model";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: any;
}

export const verifyJwt = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const secret = process.env.ACCESS_TOKEN_SECRET;

  const token = req.cookies.accessToken;

  console.log(token, "in verify jwt "); // getting undefined

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Access token missing" });
  }

  try {
    const decodedToken = jwt.verify(token, secret!) as JwtPayload;

    if (!decodedToken) {
      return res.status(401).json({ message: "invalid token" });
    }
    const userId = decodedToken?._id;
    if (!userId) {
      return res.status(401).json({ message: "Invalid token payload" });
    }
    const user = await User.findById(userId).select("-password -refreshToken");
    // console.log(user, "user in jwt");

    if (!user) {
      res.status(401).json({ message: "Invalid accesss token" });
    }

    // console.log(req.user, "jwt req.user");
    req.user = user;

    next();
  } catch (error) {
    console.error("Error in verifyJwt middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
