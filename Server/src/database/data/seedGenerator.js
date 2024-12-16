import mongoose from "mongoose";
import fs from "fs";
import { faker } from "@faker-js/faker";

import User from "../models/user.model.js";
import Vehicle from "../models/vehicle.model.js";
import Trip from "../models/trip.model.js";
import Review from "../models/review.model.js";

// Generate 30 users
const generateUsers = () => {
    const users = [];
    for (let i = 0; i < 30; i++) {
        const isDriver = i < 10; // Only 10 drivers
        users.push(
            new User({
                _id: new mongoose.Types.ObjectId(),
                name: faker.person.fullName(),
                phonenumber: faker.phone.number("##########"),
                email: faker.internet.email(),
                password: faker.internet.password(),
                type: isDriver ? "driver" : "passenger", // Driver or Passenger
                active: true,
                createdAt: faker.date.past(),
            })
        );
    }
    return users;
};

// Generate 10 vehicles, each for a driver
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

// Generate trips for drivers (1 to 10 trips)
const generateTrips = (drivers, vehicles, passengers) => {
    const trips = [];
    drivers.forEach((driver, index) => {
        const vehicle = vehicles[index];
        const tripCount = faker.number.int({ min: 1, max: 10 }); // 1 to 10 trips for each driver

        // Generate departureTime and arrivalTime
        const departureTime = faker.date.future(); // Random future date
        const hoursToAdd = faker.number.int({ min: 2, max: 10 }); // 2 to 10 hours later
        const arrivalTime = new Date(departureTime.getTime() + hoursToAdd * 60 * 60 * 1000);

        for (let i = 0; i < tripCount; i++) {
            const numberOfPassengers = faker.number.int({ min: 1, max: vehicle.seats - 1 });
            const tripPassengers = faker.helpers.arrayElements(passengers, numberOfPassengers);
            const trip = new Trip({
                _id: new mongoose.Types.ObjectId(),
                driverId: driver._id,
                vehicleId: vehicle._id,
                passengerIds: tripPassengers.map((p) => p._id),
                date: faker.date.future(),
                origin: faker.location.city(),
                destination: faker.location.city(),
                departureTime: departureTime,
                arrivalTime: arrivalTime,
                status: "completed",
                createdAt: faker.date.past(),
            });
            trips.push(trip);
        }
    });
    return trips;
};

// Generate reviews for trips (at least one passenger leaves a review)
const generateReviews = (trips) => {
    const reviews = [];
    trips.forEach((trip) => {
        
            trip.passengerIds.forEach((passenger) => {
                if (faker.datatype.boolean()) {
                    const review = new Review({
                        _id: new mongoose.Types.ObjectId(),
                        tripId: trip._id,
                        userId: passenger,
                        rating: faker.number.int({ min: 1, max: 5 }),
                        comment: faker.lorem.sentences(),
                        createdAt: faker.date.past(),
                    });
                    reviews.push(review);
                }
            });
            
    });
    return reviews;
};

// Generate data
const users = generateUsers();
const drivers = users.filter((user) => user.type === "driver");
const passengers = users.filter((user) => user.type === "passenger");
const vehicles = generateVehicles(drivers);
const trips = generateTrips(drivers, vehicles, passengers);
const reviews = generateReviews(trips);

// Prepare data for seeding
const data = {
    users,
    //drivers,
    //passengers,
    vehicles,
    trips,
    reviews,
};

// Write to file
fs.writeFileSync("./seed.json", JSON.stringify(data, null, 2), "utf-8");

console.log("Seed data generated successfully.");
