import { DIFFICULTIES } from "../../constants/problem";

function DifficultyFilter({
    difficulty,
    setDifficulty,
}) {
    return (
        <div
            className="
                flex
                flex-wrap
                gap-3
            "
        >
            {DIFFICULTIES.map((item) => (
                <button
                    key={item}
                    onClick={() => setDifficulty(item)}
                    className="
                        px-5
                        py-2.5

                        rounded-full

                        text-sm
                        font-medium

                        transition-all
                        duration-300

                        hover:-translate-y-0.5
                    "
                    style={{
                        background:
                            difficulty === item
                                ? "var(--accent)"
                                : "rgba(255,255,255,0.04)",

                        color:
                            difficulty === item
                                ? "var(--bg-primary)"
                                : "var(--text-primary)",

                        border:
                            difficulty === item
                                ? "none"
                                : "1px solid var(--border)",
                    }}
                >
                    {item}
                </button>
            ))}
        </div>
    );
}

export default DifficultyFilter;