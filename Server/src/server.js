import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Router from "./router/router.js";
dotenv.config();

const app = express();
const URL = process.env.APP_URL + ":5173";
app.use(
    cors({
        origin: ["http://localhost:5173", URL], // Allow requests only from this origins
        credentials: true,
    })
);
// permet au serveur de comprendre les requêtes en JSON
app.use(express.json());
// permet au serveur de comprendre les requêtes en x-form-urlencoded
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
const MongoDB = process.env.DATABASE_URL;

mongoose
    .connect(`${MongoDB}`) // mongodb+srv://User:AGP7FuxhBibjzR3R@sofiane.shcclrd.mongodb.net/
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB:", err));

// ajoute le router à l'application
app.use("/", Router);

// Test de Route
app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
});