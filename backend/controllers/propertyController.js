import property from "../models/propertyModel.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// =====================================================
// UPLOAD IMAGE TO CLOUDINARY
// =====================================================

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "roomfinder/properties",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          console.error("========== CLOUDINARY UPLOAD ERROR ==========");
          console.error("Message:", error?.message);
          console.error("HTTP Code:", error?.http_code);
          console.error("Name:", error?.name);
          console.error("Full Error:", error);
          console.error("==============================================");

          reject(error);
          return;
        }

        console.log(
          "CLOUDINARY UPLOAD SUCCESS:",
          result.secure_url
        );

        resolve(result);
      }
    );

    streamifier
      .createReadStream(buffer)
      .pipe(uploadStream);
  });
};

// =====================================================
// GET ALL PROPERTIES
// =====================================================

export const getAllProperties = async (req, res) => {
  try {
    const properties = await property
      .find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: properties,
    });
  } catch (error) {
    console.error("GET PROPERTIES ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =====================================================
// GET PROPERTY BY ID
// =====================================================

export const getPropertyById = async (req, res) => {
  try {
    const propertyData = await property.findById(
      req.params.id
    );

    if (!propertyData) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    res.status(200).json({
      success: true,
      data: propertyData,
    });
  } catch (error) {
    console.error("GET PROPERTY ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// =====================================================
// CREATE PROPERTY
// =====================================================

export const createProperty = async (req, res) => {
  try {
    console.log("========== CREATE PROPERTY ==========");
    console.log("BODY:", req.body);
    console.log("FILES:", req.files?.length || 0);

    // ---------------------------------------------
    // LOCATION
    // ---------------------------------------------

    let location = {};

    if (req.body.location) {
      location =
        typeof req.body.location === "string"
          ? JSON.parse(req.body.location)
          : req.body.location;
    }

    // ---------------------------------------------
    // AMENITIES
    // ---------------------------------------------

    let amenities = [];

    if (req.body.amenities) {
      amenities =
        typeof req.body.amenities === "string"
          ? JSON.parse(req.body.amenities)
          : req.body.amenities;
    }

    // ---------------------------------------------
    // CLOUDINARY IMAGES
    // ---------------------------------------------

    const imageUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        console.log(
          "Uploading:",
          file.originalname
        );

        const result = await uploadToCloudinary(
          file.buffer
        );

        imageUrls.push(result.secure_url);
      }
    }

    console.log(
      "CLOUDINARY IMAGES:",
      imageUrls
    );

    // ---------------------------------------------
    // PROPERTY DATA
    // ---------------------------------------------

    const propertyData = {
      title: req.body.title,
      description: req.body.description,

      propertyType: req.body.propertyType,
      roomType: req.body.roomType,

      rent: Number(req.body.rent),

      securityDeposit: req.body.securityDeposit
        ? Number(req.body.securityDeposit)
        : 0,

      availableFrom:
        req.body.availableFrom || undefined,

      genderPreference:
        req.body.genderPreference || "Anyone",

      furnishing: req.body.furnishing,

      amenities,

      images: imageUrls,

      location,

      contactNumber: req.body.contactNumber,

      owner: req.user.id,
    };

    // ---------------------------------------------
    // SAVE PROPERTY
    // ---------------------------------------------

    const newProperty =
      await property.create(propertyData);

    console.log(
      "PROPERTY CREATED:",
      newProperty._id
    );

    res.status(201).json({
      success: true,
      message: "Property created successfully",
      data: newProperty,
    });
  } catch (error) {
    console.error(
      "========== PROPERTY ERROR =========="
    );

    console.error(
      "Message:",
      error?.message
    );

    console.error(
      "Name:",
      error?.name
    );

    console.error(
      "HTTP Code:",
      error?.http_code
    );

    console.error(
      "Full Error:",
      error
    );

    console.error(
      "===================================="
    );

    res.status(500).json({
      success: false,
      message:
        error?.message ||
        "Property creation failed",
    });
  }
};

// =====================================================
// UPDATE PROPERTY
// =====================================================

export const updateProperty = async (req, res) => {
  try {
    const existingProperty =
      await property.findById(req.params.id);

    if (!existingProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Only owner can update
    if (
      existingProperty.owner.toString() !==
      req.user.id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not allowed to update this property",
      });
    }

    const updatedProperty =
      await property.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      success: true,
      message: "Property updated successfully",
      data: updatedProperty,
    });
  } catch (error) {
    console.error(
      "UPDATE PROPERTY ERROR:",
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
// DELETE PROPERTY
// =====================================================

export const deleteProperty = async (req, res) => {
  try {
    const existingProperty =
      await property.findById(req.params.id);

    if (!existingProperty) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // Only owner can delete
    if (
      existingProperty.owner.toString() !==
      req.user.id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message:
          "You are not allowed to delete this property",
      });
    }

    await property.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Property deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE PROPERTY ERROR:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};