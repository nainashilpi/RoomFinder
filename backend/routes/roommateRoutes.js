import { Router } from "express";
import * as roommateController from "../controllers/roommateController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = Router();

router.get("/", roommateController.getAllRoommates);

router.get("/:id", roommateController.getRoommateById);

router.post(
  "/",
  authMiddleware,
  upload.single("profileImage"),
  roommateController.createRoommate
);

router.put(
  "/:id",
  authMiddleware,
  upload.single("profileImage"),
  roommateController.updateRoommate
);

router.delete(
  "/:id",
  authMiddleware,
  roommateController.deleteRoommate
);

export default router;