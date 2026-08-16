import mongoose from "mongoose";

const roommateSchema = new mongoose.Schema(
  {
    
    name: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },

    occupation: {
      type: String,
      enum: ["Student", "Working Professional", "Freelancer", "Other"],
    },

    bio: {
      type: String,
      required: true,
    },

    profileImage: {
      type: String,
    },

    budget: {
      type: Number,
      required: true,
    },

    preferredLocation: {
      city: String,
      area: String,
    },

    preferredGender: {
      type: String,
      enum: ["Male", "Female", "Anyone"],
      default: "Anyone",
    },

    lifestyle: {
      smoking: {
        type: Boolean,
        default: false,
      },

      drinking: {
        type: Boolean,
        default: false,
      },

      pets: {
        type: Boolean,
        default: false,
      },

      vegetarian: {
        type: Boolean,
        default: false,
      },
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

export default mongoose.model("Roommate", roommateSchema);