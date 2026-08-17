import mongoose from "mongoose";
import dotenv from "dotenv";
import crypto from "crypto";

import connectDB from "../config/db.js";
import User from "../models/userModel.js";
import Property from "../models/propertyModel.js";
import Roommate from "../models/roommateModel.js";

import propertiesData from "./propertySeed.js";
import roommatesData from "./roommateSeed.js";

dotenv.config();

// =====================================================
// SEED USER DETAILS
// =====================================================

const SEED_USER = {
  username: "roomfinder_seed",
  email: "seed@roomfinder.com",
  password: "Seed@1234",
};

// =====================================================
// MAIN SEED FUNCTION
// =====================================================

const seedDatabase = async () => {
  try {
    console.log("🔄 Connecting to MongoDB...");
    await connectDB();
    console.log("✅ Connected to MongoDB");

    // ---------------------------------------------------
    // STEP 1: CREATE OR FIND SEED USER
    // ---------------------------------------------------

    console.log("\n🔄 Checking seed user...");

    let seedUser = await User.findOne({
      email: SEED_USER.email,
    });

    if (!seedUser) {
      const hashedPassword = crypto
        .createHash("sha256")
        .update(SEED_USER.password)
        .digest("hex");

      seedUser = await User.create({
        username: SEED_USER.username,
        email: SEED_USER.email,
        password: hashedPassword,
      });

      console.log("✅ Seed user created:", seedUser.email);
    } else {
      console.log("✅ Seed user already exists:", seedUser.email);
    }

    // ---------------------------------------------------
    // STEP 2: CLEAR EXISTING SEED DATA
    // ---------------------------------------------------

    console.log("\n🔄 Clearing existing seed data...");

    const deletedProperties = await Property.deleteMany({
      owner: seedUser._id,
    });

    const deletedRoommates = await Roommate.deleteMany({
      owner: seedUser._id,
    });

    console.log(
      `✅ Cleared ${deletedProperties.deletedCount} properties`
    );
    console.log(
      `✅ Cleared ${deletedRoommates.deletedCount} roommates`
    );

    // ---------------------------------------------------
    // STEP 3: INSERT SAMPLE PROPERTIES
    // ---------------------------------------------------

    console.log("\n🔄 Inserting sample properties...");

    const propertiesWithOwner = propertiesData.map((property) => ({
      ...property,
      owner: seedUser._id,
    }));

    const insertedProperties = await Property.insertMany(
      propertiesWithOwner
    );

    console.log(
      `✅ Inserted ${insertedProperties.length} sample properties`
    );

    // ---------------------------------------------------
    // STEP 4: INSERT SAMPLE ROOMMATES
    // ---------------------------------------------------

    console.log("\n🔄 Inserting sample roommates...");

    const roommatesWithOwner = roommatesData.map((roommate) => ({
      ...roommate,
      owner: seedUser._id,
    }));

    const insertedRoommates = await Roommate.insertMany(
      roommatesWithOwner
    );

    console.log(
      `✅ Inserted ${insertedRoommates.length} sample roommates`
    );

    // ---------------------------------------------------
    // DONE
    // ---------------------------------------------------

    console.log("\n🎉 Database seeded successfully!");
    console.log("─────────────────────────────────");
    console.log(`📦 Properties inserted : ${insertedProperties.length}`);
    console.log(`👥 Roommates inserted  : ${insertedRoommates.length}`);
    console.log("─────────────────────────────────");
    console.log("Seed user credentials:");
    console.log(`  Email    : ${SEED_USER.email}`);
    console.log(`  Password : ${SEED_USER.password}`);
    console.log("─────────────────────────────────\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedDatabase();