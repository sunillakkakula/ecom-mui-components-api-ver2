import express from "express";
import {
  authUser,
  userProfile,
  registerUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/login", authUser);
router.post("/", registerUser);
router.route("/profile").get(protect, userProfile);

export default router;
