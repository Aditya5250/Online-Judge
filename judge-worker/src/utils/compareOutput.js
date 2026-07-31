// Normalize output (remove extra spaces, normalize line endings)

const normalizeOutput = (output) => {
    return output
        .replace(/\r\n/g, "\n")
        .split("\n")
        .map((line) => line.trimEnd())
        .join("\n")
        .trim();
};

export const compareOutput = (actualOutput, expectedOutput) => {
    const normalizedActual = normalizeOutput(actualOutput);

    const normalizedExpected = normalizeOutput(expectedOutput);

    return normalizedActual === normalizedExpected;
};