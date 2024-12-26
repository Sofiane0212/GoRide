import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
    vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    reservationIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }],
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date },
    price: { type: Number, required: true},
    status: { type: String, enum: ['scheduled', 'completed', 'canceled'], default: 'scheduled' },
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export default mongoose.model("Trip", tripSchema);