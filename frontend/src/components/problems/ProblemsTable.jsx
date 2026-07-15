import ProblemRow from "./ProblemRow";

function ProblemsTable({ problems }) {
    return (
        <section
            className="
                overflow-hidden
                rounded-3xl
                border
                backdrop-blur-xl
            "
            style={{
                background: "rgba(38,38,37,0.65)",
                borderColor: "var(--border)",
            }}
        >
            {/* Table Header */}
            <div
                className="
                    hidden
                    md:grid
                    grid-cols-12

                    px-6
                    py-4

                    text-sm
                    font-semibold

                    border-b
                "
                style={{
                    borderColor: "var(--border)",
                    color: "var(--text-secondary)",
                }}
            >
                <div className="col-span-1">#</div>

                <div className="col-span-5">
                    Problem
                </div>

                <div className="col-span-3">
                    Tags
                </div>

                <div className="col-span-2">
                    Difficulty
                </div>

                <div className="col-span-1 text-right">
                    Action
                </div>
            </div>

            {/* Table Rows */}
            {problems.map((problem,index) => (
                <ProblemRow
                    key={problem._id}
                    index={index}
                    problem={problem}
                />
            ))}
        </section>
    );
}

export default ProblemsTable;