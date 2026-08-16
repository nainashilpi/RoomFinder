import { Router } from "express";
import * as propertyController from "../controllers/propertyController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = Router();

// Public routes
router.get("/", propertyController.getAllProperties);
router.get("/:id", propertyController.getPropertyById);

// Protected routes
router.post(
  "/",
  authMiddleware,
  upload.array("images", 5),
  propertyController.createProperty
);

router.put(
  "/:id",
  authMiddleware,
  propertyController.updateProperty
);

router.delete(
  "/:id",
  authMiddleware,
  propertyController.deleteProperty
);

export default router;