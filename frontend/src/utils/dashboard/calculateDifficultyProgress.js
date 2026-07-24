export default function calculateDifficultyProgress(
    submissions,
    problems
) {

    const difficulties = ["EASY", "MEDIUM", "HARD"];

    return difficulties.map((difficulty) => {

        const total = problems.filter(
            problem => problem.difficulty === difficulty
        ).length;

        const solved = new Set(
            submissions
                .filter(
                    submission =>
                        submission.verdict === "ACCEPTED" &&
                        submission.problemId?.difficulty === difficulty
                )
                .map(
                    submission => submission.problemId._id
                )
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