import DashboardCard from "./DashboardCard";

const difficultyColors = {
    Easy: "#22C55E",
    Medium: "#FACC15",
    Hard: "#EF4444",
};

function DifficultyProgress({ data }) {
    if (!data?.length) {
        return (
            <DashboardCard
                title="Difficulty Progress"
                subtitle="Solved problems by difficulty"
            >
                <div className="flex h-full items-center justify-center text-sm"
                    style={{ color: "var(--text-secondary)" }}
                >
                    No progress available.
                </div>
            </DashboardCard>
        );
    }

    return (
        <DashboardCard
            title="Difficulty Progress"
            subtitle="Solved problems by difficulty"
        >
            <div className="space-y-6">

                {data.map((item) => (

                    <div key={item.difficulty}>

                        {/* Header */}

                        <div className="flex justify-between items-center mb-2">

                            <div className="flex items-center gap-3">

                                <span
                                    className="font-medium"
                                    style={{
                                        color:
                                            difficultyColors[item.difficulty],
                                    }}
                                >
                                    {item.difficulty}
                                </span>

                                <span
                                    className="text-sm"
                                    style={{
                                        color:
                                            "var(--text-secondary)",
                                    }}
                                >
                                    {item.solved} / {item.total}
                                </span>

                            </div>

                            <span
                                className="font-semibold"
                                style={{
                                    color: "var(--text-primary)",
                                }}
                            >
                                {item.percentage}%
                            </span>

                        </div>

                        {/* Progress */}

                        <div
                            className="w-full h-3 rounded-full overflow-hidden"
                            style={{
                                background:
                                    "var(--border)",
                            }}
                        >
                            <div
                                className="
                                    h-full
                                    rounded-full
                                    transition-all
                                    duration-1000
                                "
                                style={{
                                    width: `${item.percentage}%`,
                                    background:
                                        difficultyColors[item.difficulty],
                                }}
                            />
                        </div>

                    </div>

                ))}

            </div>
        </DashboardCard>
    );
}

export default DifficultyProgress;