export default function calculateStats(submissions) {
    const totalAttempts = submissions.length;

    const acceptedSubmissions = submissions.filter(
        (submission) => submission.verdict === "ACCEPTED"
    );

    const solvedProblems = new Set(
        acceptedSubmissions.map(
            (submission) => submission.problemId._id
        )
    );

    const acceptanceRate =
        totalAttempts === 0
            ? 0
            : Math.round(
                  (acceptedSubmissions.length / totalAttempts) * 100
              );

    return {
        solvedProblems: solvedProblems.size,
        totalAttempts,
        acceptanceRate,
    };
}