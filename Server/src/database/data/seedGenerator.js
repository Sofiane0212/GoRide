import mongoose from "mongoose";
import fs from "fs";
import { faker } from "@faker-js/faker";

import User from "../models/user.model.js";
import Vehicle from "../models/vehicle.model.js";
import Trip from "../models/trip.model.js";
import Review from "../models/review.model.js";

// 1. Generate Users (30 total: 10 drivers, 20 passengers)
const generateUsers = () => {
  const users = [];
  for (let i = 0; i < 30; i++) {
    const isDriver = i < 10; // first 10 users are drivers
    users.push(
      new User({
        _id: new mongoose.Types.ObjectId(),
        name: faker.person.fullName(),
        phonenumber: faker.phone.number("##########"),
        email: faker.internet.email(),
        password: faker.internet.password(),
        type: isDriver ? "driver" : "passenger",
        active: true,
        createdAt: faker.date.past(),
      })
    );
  }
  return users;
};

// 2. Generate Vehicles (10 vehicles for the 10 drivers)
const generateVehicles = (drivers) => {
  const vehicles = [];
  drivers.forEach((driver) => {
    const seats = faker.number.int({ min: 3, max: 7 });
    vehicles.push(
      new Vehicle({
        _id: new mongoose.Types.ObjectId(),
        userId: driver._id,
        make: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        seats: seats,
        year: faker.number.int({ min: 2000, max: 2024 }),
        licensePlate: faker.vehicle.vrm(),
        createdAt: faker.date.past(),
      })
    );
  });
  return vehicles;
};

// 3. Generate Trips (1 to 10 trips per driver/vehicle)
const generateTrips = (drivers, vehicles) => {
  const trips = [];
  drivers.forEach((driver, index) => {
    const vehicle = vehicles[index];
    const tripCount = faker.number.int({ min: 1, max: 10 });

    for (let i = 0; i < tripCount; i++) {
      // departureTime & arrivalTime
      const departureTime = faker.date.future();
      const hoursToAdd = faker.number.int({ min: 2, max: 10 });
      const arrivalTime = new Date(departureTime.getTime() + hoursToAdd * 60 * 60 * 1000);

      const trip = new Trip({
        _id: new mongoose.Types.ObjectId(),
        vehicleId: vehicle._id,
        reviewIds: [], // Will be filled later
        origin: faker.location.city(),
        destination: faker.location.city(),
        departureTime: departureTime,
        arrivalTime: arrivalTime,
        price: faker.number.int({ min: 400, max: 900 }),
        status: "completed",
        createdAt: faker.date.past(),
      });

      trips.push(trip);
    }
  });
  return trips;
};

// 4. Generate Reviews for each Trip
//   At least one passenger leaves a review. We'll choose random passengers.
const generateReviews = (trips, passengers) => {
  const reviews = [];
  trips.forEach((trip) => {
    // Ensure at least one passenger leaves a review
    const reviewersCount = faker.number.int({ min: 1, max: Math.min(passengers.length, 5) }); 
    const selectedReviewers = faker.helpers.arrayElements(passengers, reviewersCount);

    const tripReviews = selectedReviewers.map((reviewer) => {
      return new Review({
        _id: new mongoose.Types.ObjectId(),
        tripId: trip._id,
        userId: reviewer._id,
        rating: faker.number.int({ min: 1, max: 5 }),
        comment: faker.lorem.sentences(),
        createdAt: faker.date.past(),
      });
    });

    reviews.push(...tripReviews);
    // Add their IDs to the trip's reviewIds
    trip.reviewIds = tripReviews.map((r) => r._id);
  });
  return reviews;
};

// Generate data
const users = generateUsers();
const drivers = users.filter((u) => u.type === "driver");
const passengers = users.filter((u) => u.type === "passenger");
const vehicles = generateVehicles(drivers);
const trips = generateTrips(drivers, vehicles);
const reviews = generateReviews(trips, passengers);

// 5. Add 10 new scheduled trips (one per driver)
drivers.forEach((driver, index) => {
  const vehicle = vehicles[index];
  const departureTime = faker.date.future();
  const hoursToAdd = faker.number.int({ min: 2, max: 10 });
  const arrivalTime = new Date(departureTime.getTime() + hoursToAdd * 60 * 60 * 1000);

  const scheduledTrip = new Trip({
    _id: new mongoose.Types.ObjectId(),
    vehicleId: vehicle._id,
    reviewIds: [],
    origin: faker.location.city(),
    destination: faker.location.city(),
    departureTime: departureTime,
    arrivalTime: arrivalTime,
    price: faker.number.int({ min: 400, max: 900 }),
    status: "scheduled",
    createdAt: faker.date.past(),
  });

  trips.push(scheduledTrip);
});

// Prepare data for seeding
const data = {
  users,
  vehicles,
  trips,
  reviews,
};

// Write to file
fs.writeFileSync("./seed.json", JSON.stringify(data, null, 2), "utf-8");

console.log("Seed data generated successfully.");
