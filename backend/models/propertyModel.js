import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    propertyType: {
      type: String,
      enum: ["Room", "PG", "Hostel", "Flat", "Apartment"],
      required: true,
    },

    roomType: {
      type: String,
      enum: ["Single", "Double Sharing", "Triple Sharing"],
      required: true,
    },

    rent: {
      type: Number,
      required: true,
    },

    securityDeposit: {
      type: Number,
      default: 0,
    },

    availableFrom: {
      type: Date,
    },

    genderPreference: {
      type: String,
      enum: ["Male", "Female", "Anyone"],
      default: "Anyone",
    },

    furnishing: {
      type: String,
      enum: ["Furnished", "Semi-Furnished", "Unfurnished"],
    },

    amenities: [
      {
        type: String,
      },
    ],

    images: [
      {
        type: String,
      },
    ],

    location: {
      city: String,
      state: String,
      area: String,
      address: String,
    },

    contactNumber: {
      type: String,
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    views: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Available", "Occupied"],
      default: "Available",
   }
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Property", propertySchema);