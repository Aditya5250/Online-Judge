import DescriptionTabs from "./DescriptionTabs";

const fallbackProblem = {
  title: "Two Sum",
  difficulty: "EASY",
  tags: ["Array", "Hash Table"],
  problemStatement: {
    statement:
      "Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to the target. You may assume that each input has exactly one solution.",
    inputFormat:
      "The first line contains an integer n.\nThe second line contains n integers.\nThe third line contains the target value.",
    outputFormat:
      "Return the indices of the two numbers that add up to the target.",
    constraints:
      "2 ≤ n ≤ 10⁴\n-10⁹ ≤ nums[i] ≤ 10⁹\n-10⁹ ≤ target ≤ 10⁹",
    notes:
      "Each input has exactly one valid answer. You may not use the same element twice.",
  },
};

const difficultyClasses = {
  EASY: "bg-green-500/15 text-green-400",
  MEDIUM: "bg-yellow-500/15 text-yellow-400",
  HARD: "bg-red-500/15 text-red-400",
};

const ProblemDescription = ({ problem }) => {
  const data = problem || fallbackProblem;

  return (
    <section className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]">

      {/* ================= Header ================= */}

      <div className="border-b border-[var(--border)] p-6">

        <div className="flex items-center justify-between">

          <h1 className="text-3xl font-bold">
            {data.title}
          </h1>

          <span
            className={`rounded-full px-4 py-1.5 text-sm font-semibold ${
              difficultyClasses[data.difficulty]
            }`}
          >
            {data.difficulty}
          </span>

        </div>

        <div className="mt-5 flex flex-wrap gap-2">

          {data.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[var(--bg-primary)] px-3 py-1 text-xs text-[var(--text-secondary)]"
            >
              {tag}
            </span>
          ))}

        </div>

      </div>

      {/* ================= Tabs ================= */}

      <DescriptionTabs />

      {/* ================= Scrollable Content ================= */}

      <div
        className="
          flex-1
          overflow-y-auto
          px-6
          py-6
          space-y-10
          scrollbar-thin
          scrollbar-track-transparent
          scrollbar-thumb-[var(--border)]
          hover:scrollbar-thumb-[var(--accent)]
        "
      >
        <Section
          title="Problem"
          content={data.problemStatement.statement}
        />

        <Section
          title="Input Format"
          content={data.problemStatement.inputFormat}
        />

        <Section
          title="Output Format"
          content={data.problemStatement.outputFormat}
        />

        <Section
          title="Constraints"
          content={data.problemStatement.constraints}
        />

        {data.problemStatement.notes && (
          <Section
            title="Notes"
            content={data.problemStatement.notes}
          />
        )}
      </div>
    </section>
  );
};

const Section = ({ title, content }) => (
  <section>

    <h2 className="mb-4 text-xl font-semibold">
      {title}
    </h2>

    <p className="whitespace-pre-wrap leading-8 text-[var(--text-secondary)]">
      {content}
    </p>

  </section>
);

export default ProblemDescription;