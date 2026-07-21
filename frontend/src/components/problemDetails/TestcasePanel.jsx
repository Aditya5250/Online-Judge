import { useEffect, useState } from "react";

const TestcasePanel = ({
  testCases = [],
  activeTab,
  setActiveTab,
  output,
}) => {
  const [selectedCase, setSelectedCase] = useState(0);

  useEffect(() => {
    setSelectedCase(0);
  }, [testCases]);

  const currentCase = testCases[selectedCase];

  return (
    <section className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]">
      {/* ===================== Header ===================== */}

      <div className="flex items-center border-b border-[var(--border)]">
        <button
          onClick={() => setActiveTab("testcases")}
          className={`flex-1 border-b-2 py-3 text-sm font-semibold transition ${
            activeTab === "testcases"
              ? "border-[var(--accent)] text-[var(--accent)]"
              : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
        >
          Test Cases
        </button>

        <button
          onClick={() => setActiveTab("output")}
          className={`flex-1 border-b-2 py-3 text-sm font-semibold transition ${
            activeTab === "output"
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
                  className={`rounded-lg px-4 py-2 text-sm transition ${
                    selectedCase === index
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
        ) : (
          <>
            <h3 className="mb-3 font-semibold">
              Program Output
            </h3>

            <pre className="min-h-[180px] overflow-auto rounded-xl bg-[var(--bg-primary)] p-4 font-mono text-sm">
              {output || "Run your code to see the output."}
            </pre>
          </>
        )}
      </div>
    </section>
  );
};

export default TestcasePanel;