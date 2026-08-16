import roommate from "../models/roommateModel.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// =====================================================
// UPLOAD IMAGE TO CLOUDINARY
// Same Cloudinary setup used by Property
// =====================================================

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "roomfinder/roommates",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          console.error(
            "CLOUDINARY ROOMMATE UPLOAD ERROR:",
            error
          );
          reject(error);
        } else {
          console.log(
            "CLOUDINARY ROOMMATE IMAGE:",
            result.secure_url
          );
          resolve(result);
        }
      }
    );

    streamifier
      .createReadStream(buffer)
      .pipe(uploadStream);
  });
};


// =====================================================
// GET ALL ROOMMATES
// =====================================================

export async function getAllRoommates(req, res) {
  try {
    const roommates = await roommate
      .find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: roommates,
    });
  } catch (error) {
    console.error("GET ROOMMATES ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}


// =====================================================
// GET ROOMMATE BY ID
// =====================================================

export async function getRoommateById(req, res) {
  try {
    const roommateId = req.params.id;

    const roommateData =
      await roommate.findById(roommateId);

    if (!roommateData) {
      return res.status(404).json({
        success: false,
        message: "Roommate profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: roommateData,
    });
  } catch (error) {
    console.error("GET ROOMMATE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}


// =====================================================
// CREATE ROOMMATE
// =====================================================

export const createRoommate = async (req, res) => {
  try {
    console.log("========== CREATE ROOMMATE ==========");
    console.log("BODY:", req.body);
    console.log(
      "FILE:",
      req.file ? req.file.originalname : "No image"
    );

    // ---------------------------------------------
    // PROFILE IMAGE
    // ---------------------------------------------

    let profileImage = "";

    if (req.file) {
      const result = await uploadToCloudinary(
        req.file.buffer
      );

      profileImage = result.secure_url;
    }

    // ---------------------------------------------
    // PREFERRED LOCATION
    // ---------------------------------------------

    let preferredLocation = {};

    if (req.body.preferredLocation) {
      preferredLocation =
        typeof req.body.preferredLocation === "string"
          ? JSON.parse(req.body.preferredLocation)
          : req.body.preferredLocation;
    }

    // ---------------------------------------------
    // LIFESTYLE
    // ---------------------------------------------

    let lifestyle = {};

    if (req.body.lifestyle) {
      lifestyle =
        typeof req.body.lifestyle === "string"
          ? JSON.parse(req.body.lifestyle)
          : req.body.lifestyle;
    }

    // ---------------------------------------------
    // CREATE ROOMMATE
    // ---------------------------------------------

    const newRoommate = await roommate.create({
      name: req.body.name,
      age: Number(req.body.age),
      gender: req.body.gender,
      occupation: req.body.occupation,
      bio: req.body.bio,
      profileImage,
      budget: Number(req.body.budget),

      preferredLocation,

      preferredGender:
        req.body.preferredGender || "Anyone",

      lifestyle,

      contactNumber: req.body.contactNumber,

      owner: req.user.id,
    });

    console.log(
      "ROOMMATE CREATED:",
      newRoommate._id
    );

    res.status(201).json({
      success: true,
      message:
        "Roommate profile created successfully",
      roommate: newRoommate,
    });

  } catch (error) {
    console.error(
      "========== ROOMMATE ERROR =========="
    );
    console.error("Message:", error?.message);
    console.error("Full Error:", error);
    console.error(
      "===================================="
    );

    res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Roommate creation failed",
    });
  }
};


// =====================================================
// UPDATE ROOMMATE
// =====================================================

export const updateRoommate = async (req, res) => {
  try {
    const existingRoommate =
      await roommate.findById(req.params.id);

    if (!existingRoommate) {
      return res.status(404).json({
        success: false,
        message: "Roommate profile not found",
      });
    }

    // Only owner can update
    if (
      existingRoommate.owner &&
      existingRoommate.owner.toString() !==
        req.user.id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not allowed to update this profile",
      });
    }

    const updateData = {
      ...req.body,
    };

    // ---------------------------------------------
    // IMAGE UPDATE
    // ---------------------------------------------

    if (req.file) {
      const result = await uploadToCloudinary(
        req.file.buffer
      );

      updateData.profileImage =
        result.secure_url;
    }

    // ---------------------------------------------
    // PARSE JSON FIELDS
    // ---------------------------------------------

    if (
      typeof updateData.preferredLocation ===
      "string"
    ) {
      updateData.preferredLocation =
        JSON.parse(
          updateData.preferredLocation
        );
    }

    if (
      typeof updateData.lifestyle ===
      "string"
    ) {
      updateData.lifestyle =
        JSON.parse(updateData.lifestyle);
    }

    if (updateData.age) {
      updateData.age = Number(updateData.age);
    }

    if (updateData.budget) {
      updateData.budget =
        Number(updateData.budget);
    }

    const updatedRoommate =
      await roommate.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      success: true,
      message:
        "Roommate profile updated successfully",
      roommate: updatedRoommate,
    });

  } catch (error) {
    console.error(
      "UPDATE ROOMMATE ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        error?.message || "Server Error",
    });
  }
};


// =====================================================
// DELETE ROOMMATE
// =====================================================

export const deleteRoommate = async (req, res) => {
  try {
    const roommateId = req.params.id;

    const existingRoommate =
      await roommate.findById(roommateId);

    if (!existingRoommate) {
      return res.status(404).json({
        success: false,
        message: "Roommate not found",
      });
    }

    // Only owner can delete
    if (
      existingRoommate.owner &&
      existingRoommate.owner.toString() !==
        req.user.id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not allowed to delete this profile",
      });
    }

    await roommate.findByIdAndDelete(roommateId);

    res.status(200).json({
      success: true,
      message:
        "Roommate profile deleted successfully",
    });

  } catch (error) {
    console.error(
      "DELETE ROOMMATE ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};