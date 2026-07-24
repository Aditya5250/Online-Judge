export default function calculateVerdictDistribution(submissions) {

    const verdictCounts = {
        ACCEPTED: 0,
        WRONG_ANSWER: 0,
        TIME_LIMIT_EXCEEDED: 0,
        RUNTIME_ERROR: 0,
    };

    submissions.forEach((submission) => {

        if (
            verdictCounts.hasOwnProperty(submission.verdict)
        ) {
            verdictCounts[submission.verdict]++;
        }

    });

    return [
        {
            name: "Accepted",
            value: verdictCounts.ACCEPTED,
        },
        {
            name: "Wrong Answer",
            value: verdictCounts.WRONG_ANSWER,
        },
        {
            name: "Time Limit Exceeded",
            value: verdictCounts.TIME_LIMIT_EXCEEDED,
        },
        {
            name: "Runtime Error",
            value: verdictCounts.RUNTIME_ERROR,
        },
    ];
}