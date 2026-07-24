export default function calculateSubmissionTrend(submissions) {

    const trend = [];

    for (let i = 6; i >= 0; i--) {

        const date = new Date();
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() - i);

        const nextDate = new Date(date);
        nextDate.setDate(nextDate.getDate() + 1);

        const count = submissions.filter((submission) => {

            const submissionDate = new Date(submission.createdAt);

            return (
                submissionDate >= date &&
                submissionDate < nextDate
            );

        }).length;

        trend.push({
            day: date.toLocaleDateString("en-US", {
                weekday: "short",
            }),
            submissions: count,
        });

    }

    return trend;
}