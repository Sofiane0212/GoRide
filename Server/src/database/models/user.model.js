import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        phonenumber: {
            type: String, // doit etre string pour eviter le leading 0, si le phoneNumber commence par 0, il sera supprime
            required: true,
            trim: true,
            // validate: {
            //     validator: function (v) {
            //         return /\d{10}/.test(v) && v.length === 10;
            //     },
            //     message: "numero invalide!",
            // },
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            match: [/^\S+@\S+\.\S+$/, "Utilisez un email valide."],
        },
        password: {
            type: String,
            required: true,
            trim: true,
        },
        type: {
            type: String,
            required: true,
            enum: ["driver", "passenger"],
        },
        active: { type: Boolean, default: false }, // Default to false until email is verified
        createdAt: {
            type: Date,
            default: Date.now(),
        },
    },
    { versionKey: false }
);

export default mongoose.model("User", userSchema);
