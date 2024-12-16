import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    seats: {type: Number, required: true, default: 3},
    year: { type: Number, required: true },
    licensePlate: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default mongoose.model("Vehicle", vehicleSchema);