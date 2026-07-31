import { getLeaderboardData } from "../services/leaderboard.service.js";

export const getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await getLeaderboardData();

        return res.status(200).json({
            success: true,
            leaderboard,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};