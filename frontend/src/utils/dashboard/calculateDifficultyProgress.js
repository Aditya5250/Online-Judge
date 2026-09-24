export default function calculateDifficultyProgress(
    submissions = [],
    problems = []
) {

    const difficulties = ["EASY", "MEDIUM", "HARD"];

    return difficulties.map((difficulty) => {

        const total = problems.filter(
            problem => problem && problem.difficulty === difficulty
        ).length;

        const solved = new Set(
            submissions
                .filter(
                    submission =>
                        submission &&
                        submission.verdict === "ACCEPTED" &&
                        submission.problemId?.difficulty === difficulty
                )
                .map((submission) => {
                    if (!submission || !submission.problemId) return null;
                    return typeof submission.problemId === "object"
                        ? submission.problemId._id
                        : submission.problemId;
                })
                .filter(Boolean)
        ).size;

        return {
            difficulty:
                difficulty.charAt(0) +
                difficulty.slice(1).toLowerCase(),

            solved,

            total,

            percentage:
                total === 0
                    ? 0
                    : Math.round((solved / total) * 100),
        };

    });

}