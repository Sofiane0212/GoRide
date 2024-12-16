import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    passengerIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date },
    status: { type: String, enum: ['scheduled', 'completed', 'canceled'], default: 'scheduled' },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default mongoose.model("Trip", tripSchema);