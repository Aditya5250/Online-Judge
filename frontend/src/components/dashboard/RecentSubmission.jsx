import DashboardCard from "./DashboardCard";
import formatRelativeTime from "../../utils/formatRelativeTime";

const difficultyColors = {
    EASY: "#22C55E",
    MEDIUM: "#FACC15",
    HARD: "#EF4444",
};

const verdictColors = {
    ACCEPTED: "#22C55E",
    WRONG_ANSWER: "#EF4444",
    TIME_LIMIT_EXCEEDED: "#F97316",
    RUNTIME_ERROR: "#8B5CF6",
};

function RecentSubmissions({ submissions }) {

    if (!submissions.length) {

        return (
            <DashboardCard
                title="Recent Submissions"
                subtitle="Your latest coding activity"
            >
                <div
                    className="flex h-full items-center justify-center"
                    style={{
                        color: "var(--text-secondary)",
                    }}
                >
                    No submissions yet.
                </div>
            </DashboardCard>
        );
    }

    return (

        <DashboardCard
            title="Recent Submissions"
            subtitle="Your latest coding activity"
        >

            <div className="space-y-4">

                {submissions.map((submission) => (

                    <div
                        key={submission._id}
                        className="
                            flex
                            justify-between
                            items-center
                            border-b
                            pb-4
                            last:border-none
                        "
                        style={{
                            borderColor:
                                "var(--border)",
                        }}
                    >

                        <div>

                            <h4
                                className="font-semibold"
                                style={{
                                    color:
                                        "var(--text-primary)",
                                }}
                            >
                                {submission.problemId.title}
                            </h4>

                            <div className="flex gap-2 mt-1">

                                <span
                                    className="
                                        text-xs
                                        px-2
                                        py-1
                                        rounded-full
                                    "
                                    style={{
                                        background:
                                            difficultyColors[
                                                submission.problemId
                                                    .difficulty
                                            ] +
                                            "20",

                                        color:
                                            difficultyColors[
                                                submission.problemId
                                                    .difficulty
                                            ],
                                    }}
                                >
                                    {submission.problemId.difficulty}
                                </span>

                                <span
                                    className="
                                        text-xs
                                        px-2
                                        py-1
                                        rounded-full
                                    "
                                    style={{
                                        background:
                                            verdictColors[
                                                submission.verdict
                                            ] +
                                            "20",

                                        color:
                                            verdictColors[
                                                submission.verdict
                                            ],
                                    }}
                                >
                                    {submission.verdict?submission.verdict.replaceAll(
                                        "_", " "
                                    ):"Pending"}
                                </span>

                            </div>

                        </div>

                        <span
                            className="text-sm"
                            style={{
                                color:
                                    "var(--text-secondary)",
                            }}
                        >
                            {formatRelativeTime(
                                submission.createdAt
                            )}
                        </span>

                    </div>

                ))}

            </div>

        </DashboardCard>

    );
}

export default RecentSubmissions;