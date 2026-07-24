import { useEffect, useState } from "react";

const TestcasePanel = ({
  testCases = [],
  activeTab,
  setActiveTab,
  output,
  running,
  customInput,
  setCustomInput,
  submissionResult,
  outputMode,
  selectedCase,
  setSelectedCase,
}) => {

  useEffect(() => {
    setSelectedCase(0);
  }, [testCases]);

  const currentCase = testCases[selectedCase];


  const verdictStyles = {
    ACCEPTED: {
      bg: "bg-green-500/15",
      text: "text-green-400",
    },

    WRONG_ANSWER: {
      bg: "bg-red-500/15",
      text: "text-red-400",
    },

    RUNTIME_ERROR: {
      bg: "bg-orange-500/15",
      text: "text-orange-400",
    },

    COMPILATION_ERROR: {
      bg: "bg-yellow-500/15",
      text: "text-yellow-400",
    },

    TIME_LIMIT_EXCEEDED: {
      bg: "bg-blue-500/15",
      text: "text-blue-400",
    },
  };



  return (
    <section className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]">
      {/* ===================== Header ===================== */}

      <div className="flex items-center border-b border-[var(--border)]">

        <button
          onClick={() => setActiveTab("testcases")}
          className={`flex-1 border-b-2 py-3 text-sm font-semibold transition ${activeTab === "testcases"
            ? "border-[var(--accent)] text-[var(--accent)]"
            : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
        >
          Test Cases
        </button>

        <button
          onClick={() => setActiveTab("custom")}
          className={`flex-1 border-b-2 py-3 text-sm font-semibold transition ${activeTab === "custom"
            ? "border-[var(--accent)] text-[var(--accent)]"
            : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
        >
          Custom Input
        </button>

        <button
          onClick={() => setActiveTab("output")}
          className={`flex-1 border-b-2 py-3 text-sm font-semibold transition ${activeTab === "output"
            ? "border-[var(--accent)] text-[var(--accent)]"
            : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
        >
          Output
        </button>

      </div>
      {/* ===================== BODY ===================== */}

      <div className="flex-1 overflow-y-auto p-5">
        {activeTab === "testcases" ? (
          <>
            {/* Case Tabs */}

            <div className="mb-5 flex flex-wrap gap-2">
              {testCases.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCase(index)}
                  className={`rounded-lg px-4 py-2 text-sm transition ${selectedCase === index
                    ? "bg-[var(--accent)] text-black"
                    : "bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:bg-[var(--border)]"
                    }`}
                >
                  Case {index + 1}
                </button>
              ))}
            </div>

            {/* No Public Testcases */}

            {testCases.length === 0 ? (
              <div className="rounded-xl bg-[var(--bg-primary)] p-6 text-center text-[var(--text-secondary)]">
                No sample test cases available.
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 font-semibold">Input</h3>

                  <pre className="overflow-auto rounded-xl bg-[var(--bg-primary)] p-4 font-mono text-sm">
                    {currentCase?.input}
                  </pre>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold">Output</h3>

                  <pre className="overflow-auto rounded-xl bg-[var(--bg-primary)] p-4 font-mono text-sm">
                    {currentCase?.expectedOutput}
                  </pre>
                </div>
              </div>
            )}
          </>
        ) : activeTab === "custom" ? (

          <div className="space-y-4">

            <h3 className="font-semibold">
              Custom Input
            </h3>

            <p className="text-sm text-[var(--text-secondary)]">
              Provide custom stdin for your program.
            </p>

            <textarea
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Example:10 20"
              className="
              h-48
              w-full
              resize-none
              rounded-xl
              border
              border-[var(--border)]
              bg-[var(--bg-primary)]
              p-4
              font-mono
              text-sm
              outline-none
              transition
              focus:border-[var(--accent)]
              "
            />

          </div>

        ) : (
          <>
            <h3 className="mb-3 font-semibold">
              {outputMode === "run" ? "Program Output" : "Submission Result"}
            </h3>

            {outputMode === "submit" ? (
              /* =======================
                 SUBMIT RESULT
              ======================= */

              !submissionResult ? (
                <div className="rounded-xl bg-[var(--bg-primary)] p-6 text-center text-[var(--text-secondary)]">
                  Submit your solution to see the verdict.
                </div>
              ) : (
                <div className="space-y-5">

                  <div>
                    <h4 className="mb-1 text-sm text-[var(--text-secondary)]">
                      Verdict
                    </h4>

                    <span
                      className={`
                      inline-flex
                      rounded-full
                      px-4
                      py-2
                      text-sm
                      font-semibold
                      ${verdictStyles[submissionResult.verdict]?.bg ??
                        "bg-gray-500/15"
                        }
                      ${verdictStyles[submissionResult.verdict]?.text ??
                        "text-gray-300"
                        }
                      `}
                    >
                      {submissionResult.verdict.replaceAll("_", " ")}
                    </span>
                  </div>

                  <div>
                    <h4 className="mb-1 text-sm text-[var(--text-secondary)]">
                      Status
                    </h4>

                    <p>{submissionResult.status}</p>
                  </div>

                  <div>
                    <h4 className="mb-1 text-sm text-[var(--text-secondary)]">
                      Execution Time
                    </h4>

                    <p>{submissionResult.executionTime} ms</p>
                  </div>

                </div>
              )

            ) : (

              /* =======================
                 RUN RESULT
              ======================= */

              !output ? (

                <div className="rounded-xl bg-[var(--bg-primary)] p-6 text-center text-[var(--text-secondary)]">
                  Run your code to see the output.
                </div>

              ) : (

                <div className="space-y-5">

                  <div>
                    <h4 className="mb-2 text-sm font-semibold">
                      Your Output
                    </h4>

                    <pre className="overflow-auto rounded-xl bg-[var(--bg-primary)] p-4 font-mono text-sm">
                      {output.stdout || "No Output"}
                    </pre>
                  </div>

                  {output.stderr && (
                    <div>
                      <h4 className="mb-2 text-sm font-semibold text-red-400">
                        Errors
                      </h4>

                      <pre className="overflow-auto rounded-xl bg-[var(--bg-primary)] p-4 font-mono text-sm text-red-300">
                        {output.stderr}
                      </pre>
                    </div>
                  )}

                  <div className="flex justify-between text-xs text-[var(--text-secondary)]">

                    <span>
                      Exit Code: {output.exitCode}
                    </span>

                    <span>
                      {output.executionTime} ms
                    </span>

                  </div>

                </div>

              )

            )}
          </>

        )}
      </div>
    </section>
  );


};

export default TestcasePanel;