import { useEffect, useState } from "react";
import { getLeaderboard } from "../services/leaderboard.services";

export default function useLeaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const data = await getLeaderboard();
                setLeaderboard(data);
            } catch (err) {
                setError(err.message || "Failed to load leaderboard");
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    return {
        leaderboard,
        loading,
        error,
    };
}