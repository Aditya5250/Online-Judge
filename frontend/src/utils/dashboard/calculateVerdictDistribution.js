export default function calculateVerdictDistribution(submissions = []) {

    const verdictCounts = {
        ACCEPTED: 0,
        WRONG_ANSWER: 0,
        COMPILATION_ERROR: 0,
        RUNTIME_ERROR: 0,
        TIME_LIMIT_EXCEEDED: 0,
        MEMORY_LIMIT_EXCEEDED: 0,
    };

    submissions.forEach((submission) => {

        if (
            submission &&
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
            name: "Compilation Error",
            value: verdictCounts.COMPILATION_ERROR,
        },
        {
            name: "Runtime Error",
            value: verdictCounts.RUNTIME_ERROR,
        },
        {
            name: "Time Limit Exceeded",
            value: verdictCounts.TIME_LIMIT_EXCEEDED,
        },
        {
            name: "Memory Limit Exceeded",
            value: verdictCounts.MEMORY_LIMIT_EXCEEDED,
        },
    ];
}