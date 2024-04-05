import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controller";
import { verifyJwt } from "../utils/auth.middleware";

const router = express.Router();

// router.get("/");
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJwt, logoutUser);

export default router;
