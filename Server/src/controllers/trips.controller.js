import * as queries from "../database/queries/trips.queries.js";

export const getTrips = async (req, res) => {
    try {
        const Trips = await queries.getPopulatedTrips();
        res.status(200).json(Trips);
    } catch (error) {
        res.status(500).json({ error: error.Trip });
    }
};