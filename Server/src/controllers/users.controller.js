import * as queries from "../database/queries/users.queries.js";

export const getProfile = async (req, res) => {
    try {
        const profile = await queries.getProfileQuery(req.params.id);
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}