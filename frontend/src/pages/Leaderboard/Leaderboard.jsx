import useLeaderboard from "../../hooks/useLeaderboard";

import LeaderboardHero from "../../components/leaderboard/LeaderboardHero";
import TopThree from "../../components/leaderboard/TopThree";
import LeaderboardTable from "../../components/leaderboard/LeaderboardTable";

export default function Leaderboard() {

    const {
        leaderboard,
        loading,
        error,
    } = useLeaderboard();

    if (loading) {
        return (
            <div className="py-20 text-center">
                Loading leaderboard...
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-20 text-center text-red-500">
                {error}
            </div>
        );
    }

    const topThree = leaderboard.slice(0, 3);

    const remainingUsers = leaderboard.slice(3);

    return (
        <div className="space-y-8">

            <LeaderboardHero />

            <TopThree
                users={topThree}
            />

            <LeaderboardTable
                users={remainingUsers}
                
            />

        </div>
    );
}