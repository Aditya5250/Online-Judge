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


    const controller = new AbortController();

    const timeout = setTimeout(() => {
        controller.abort();
    }, 30000);

    let response;

    try {

        response = await fetch(
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
                signal: controller.signal,
            }
        );

    } finally {

        clearTimeout(timeout);

    }

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Judge Worker execution failed."
        );
    }


    return data;
};