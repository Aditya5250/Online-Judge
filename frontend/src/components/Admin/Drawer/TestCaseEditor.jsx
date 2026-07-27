import { Plus, Trash2 } from "lucide-react";

export default function TestCaseEditor({
    testCases,
    setTestCases,
}) {
    const addTestCase = () => {
        setTestCases([
            ...testCases,
            {
                input: "",
                expectedOutput: "",
                explanation: "",
                isHidden: false,

            },
        ]);
    };

    const removeTestCase = (index) => {
        setTestCases(
            testCases.filter((_, i) => i !== index)
        );
    };

    const handleChange = (index, field, value) => {
        const updated = [...testCases];

        updated[index][field] = value;

        setTestCases(updated);
    };

    return (
        <section className="space-y-6">

            <div className="flex items-center justify-between">

                <h3 className="text-xl font-semibold text-white">
                    🧪 Test Cases
                </h3>

                <button
                    type="button"
                    onClick={addTestCase}
                    className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-yellow-400
            px-4
            py-2
            font-medium
            text-black
            transition
            hover:scale-105
          "
                >
                    <Plus size={18} />

                    Add Test Case
                </button>

            </div>

            {testCases.map((testCase, index) => (
                <div
                    key={index}
                    className="
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-900
            p-5
            space-y-4
          "
                >
                    <div className="flex items-center justify-between">

                        <h4 className="font-semibold text-white">
                            Test Case {index + 1}
                        </h4>

                        {testCases.length > 1 && (
                            <button
                                type="button"
                                onClick={() => removeTestCase(index)}
                                className="text-red-400 hover:text-red-300"
                            >
                                <Trash2 size={18} />
                            </button>
                        )}

                    </div>

                    <textarea
                        rows={3}
                        placeholder="Input"
                        value={testCase.input}
                        onChange={(e) =>
                            handleChange(
                                index,
                                "input",
                                e.target.value
                            )
                        }
                        className="
              w-full
              rounded-xl
              border
              border-zinc-700
              bg-zinc-950
              p-3
              text-white
              outline-none
              focus:border-yellow-400
            "
                    />

                    <textarea
                        rows={3}
                        placeholder="Expected Output"
                        value={testCase.expectedOutput}
                        onChange={(e) =>
                            handleChange(
                                index,
                                "expectedOutput",
                                e.target.value
                            )
                        }
                        className="
                            w-full
                            rounded-xl
                            border
                            border-zinc-700
                            bg-zinc-950
                            p-3
                            text-white
                            outline-none
                            focus:border-yellow-400
                          "
                    />

                    <div>

                        <label className="mb-2 block font-medium text-white">
                            Explanation
                        </label>

                        <textarea
                            rows={3}
                            value={testCase.explanation}
                            onChange={(e) =>
                                handleChange(
                                    index,
                                    "explanation",
                                    e.target.value
                                )
                            }
                            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white outline-none focus:border-yellow-400"
                        />

                    </div>


                    <label className="flex items-center gap-3 text-white">

                        <input
                            type="checkbox"
                            checked={testCase.isHidden}
                            onChange={(e) =>
                                handleChange(
                                    index,
                                    "isHidden",
                                    e.target.checked
                                )
                            }
                        />

                        Hidden Test Case

                    </label>

                </div>
            ))}

        </section>
    );
}