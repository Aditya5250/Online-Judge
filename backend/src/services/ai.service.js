import ai from "../config/gemini.js";


export const generateHints = async (problem)=>{

    const prompt=`
    
    You are an expert competitive programming mentor.

    Generate Exactly 3 progressively revealing hints for the following coding problem.

    Rules:

    -Return ONLY valid JSON.
    -NO markdown.
    -No code block.
    -No explanation outside JSON.
    -Never provide code.
    -Never provide the complete algorithm.
    -Hint 1 should be subtle.
    -Hint 2 should be more specific.
    -Hint 3 should strongly guid the approach without revealing the final implementation.

    Problem Title: ${problem.title}

    Problem Statement: ${problem.problemStatement.statement}

    Input Format: ${problem.problemStatement.inputFormat}

    Output Format: ${problem.problemStatement.outputFormat}

    Constraints: ${problem.problemStatement.constraints}

    Return this exact format:

    {
        "hints":[
        "...",
        "...",
        "..."
        ]
    }
    `;


    const response =await ai.models.generateContent({
        model:"gemini-3.6-flash",
        contents:prompt,
    });

    const text = response.text.trim();

    return JSON.parse(text);

}