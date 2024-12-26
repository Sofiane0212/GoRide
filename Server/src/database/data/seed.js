import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import fs from "fs";

// Load environment variables
dotenv.config();

// Load your models
import User from "../models/user.model.js";
import Vehicle from "../models/vehicle.model.js";
import Trip from "../models/trip.model.js";
import Reservation from "../models/reservation.model.js";

// Initialize the express application
const app = express();
// Middleware to parse incoming requests with JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection URL
const mongoDB = process.env.DATABASE_URL || "mongodb+srv://User:AGP7FuxhBibjzR3R@sofiane.shcclrd.mongodb.net/GoRide";

// Connect to MongoDB
mongoose
    .connect(mongoDB)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to MongoDB:", err));

// Load seed data from JSON
const seedData = JSON.parse(fs.readFileSync("./src/database/data/seed.json", "utf-8"));

// Seed the Database
async function seedDatabase(req, res, next) {
    try {
        // Clear existing data from all collections
        await User.deleteMany({});
        await Vehicle.deleteMany({});
        await Trip.deleteMany({});
        await Reservation.deleteMany({});
        console.log("delete Many !!");

        // Seed Users
        await User.insertMany(seedData.users);
        console.log("Users seeded");

        // Seed Vehicle
        await Vehicle.insertMany(seedData.vehicles);
        console.log("Vehicles seeded");

        // Seed Trips
        await Trip.insertMany(seedData.trips);
        console.log("Trips seeded");

        // Seed Reservations
        await Reservation.insertMany(seedData.reservations);
        console.log("Reservations seeded");

        // Send success response
        res.status(200).send("Database seeding completed successfully!");
    } catch (err) {
        console.error("Error while seeding database:", err);
        // Forward the error to the error-handling middleware
        next(err);
    } finally {
        // Only disconnect from MongoDB if there are no further requests
        mongoose.disconnect().then(() => console.log("Disconnected from MongoDB"));
    }
}

// Add seedDatabase route to the Express application
app.get("/seed", seedDatabase);

// Start the server
const SEED_PORT = process.env.SEED_PORT || 4000;
app.listen(SEED_PORT, () => {
    console.log(`Server is running on port ${SEED_PORT}`);
});