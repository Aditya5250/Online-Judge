import ai from "../config/gemini.js";

export const generateHints = async (problem) => {
    const prompt = `
You are a competitive programming mentor and learning coach on JudgeX.
Your mission is to guide students to discover the solution on their own through progressive hints, conceptual explanations, and Socratic nudges.

STRICT PEDAGOGICAL RULES:
- Never provide an unsolicited complete solution.
- Never provide full, runnable code implementations or complete functions.
- Avoid dumping replacement code.
- Guide the student's thinking so they learn how to arrive at the solution.

Generate EXACTLY 3 progressively revealing hints for the following coding problem:

Problem Title: ${problem.title}
Problem Statement: ${problem.problemStatement?.statement || ""}
Input Format: ${problem.problemStatement?.inputFormat || ""}
Output Format: ${problem.problemStatement?.outputFormat || ""}
Constraints: ${problem.problemStatement?.constraints || ""}

PROGRESSIVE HINT TIERS:
- Hint 1 (Subtle Nudge / Guiding Question): Focus on problem intuition, an invariant, or an edge observation. Ask a guiding question (e.g. "Think about what happens when..."). Do not name specific advanced data structures yet.
- Hint 2 (Directional Guidance): Suggest the relevant conceptual approach or data structure family (e.g., hash table, two-pointer, dynamic programming transition, binary search) and highlight what trade-off eliminates brute force.
- Hint 3 (Detailed Logic & Boundary Checks): Outline the step-by-step conceptual workflow in plain English and remind the student of boundary conditions, without giving copy-paste code.

OUTPUT FORMAT:
Return ONLY valid JSON matching this schema:
{
    "hints": [
        "First subtle conceptual nudge or question...",
        "Second hint giving directional guidance on data structure or pattern...",
        "Third hint detailing the step-by-step logic and boundary checks without code..."
    ]
}
`;

    const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";

    const response = await ai.models.generateContent({
        model: modelName,
        contents: prompt,
    });

    let text = response.text ? response.text.trim() : "";

    // Safely remove markdown code block delimiters if present
    if (text.startsWith("```")) {
        text = text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
    }

    return JSON.parse(text);
};