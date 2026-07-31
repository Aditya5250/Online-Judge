const JUDGE_WORKER_URL =
    process.env.JUDGE_WORKER_URL;

if (!JUDGE_WORKER_URL) {
    throw new Error("JUDGE_WORKER_URL is not configured.");
}

/**
 * Executing a submission using the Judge Worker.
 */


export const executeSubmission = async ({
    language,
    sourceCode,
    input = "",
}) => {

    
    const response = await fetch(
        `${JUDGE_WORKER_URL}/api/execute`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                language,
                sourceCode,
                input,
            }),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Judge Worker execution failed."
        );
    }


    return data;
};