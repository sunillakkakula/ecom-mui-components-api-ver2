import express from "express";
import {
  authUser,
  userProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, userProfile)
  .put(protect, updateUserProfile);
router.post("/", registerUser);
router.route("/profile").get(protect, userProfile);

export default router;
