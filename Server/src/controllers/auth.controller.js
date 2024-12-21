import jwt from "jsonwebtoken";
import User from "../database/models/user.model.js";
//import { sendConfirmationEmail } from "../middlewares/authMiddleware.js";
import dotenv from "dotenv";
dotenv.config();

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET;
const TIMEOUT = process.env.TIMEOUT;

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Compare the password directly (no hashing)
        if (password !== user.password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        let jwt_token = "";
        let confirm = "";
        // Check if the account is active (optional, if you have email verification)
        if (user.active) {
            // Generate a JWT token
            jwt_token = jwt.sign({ _id: user._id, client: user.name, email: user.email }, JWT_SECRET, { expiresIn: TIMEOUT });

            // Send token as a response
            res.json({ token: jwt_token, user: { _id: user._id, client: user.name, email: user.email }, active: true, confirmation: "" });
        } else {
            // Generate confirmation code
            const code = Math.floor(100000 + Math.random() * 900000).toString();
            // Generate confirmToken
            const CONFIRM_TIME = process.env.CONFIRM_TIME;
            const JWT_CONFIRM = process.env.JWT_CONFIRM;
            confirm = jwt.sign({ _id: user._id, client: user.name, email: user.email, confirmation: code }, JWT_CONFIRM, { expiresIn: CONFIRM_TIME });
            // Send email
            sendConfirmationEmail(user.email, code);
            res.json({ token: "", user: {}, active: false, confirmation: confirm });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};