import SearchBar from "./SearchBar";
import DifficultyFilter from "./DifficultyFilter";

function ProblemsToolbar({
    search,
    setSearch,
    difficulty,
    setDifficulty,
}) {
    return (
        <section
            className="
                mb-10
                rounded-3xl
                border
                backdrop-blur-xl
                p-5
            "
            style={{
                background: "rgba(38,38,37,0.65)",
                borderColor: "var(--border)",
            }}
        >
            <div
                className="
                    flex
                    flex-col
                    lg:flex-row
                    gap-5
                    lg:items-center
                    lg:justify-between
                "
            >
                <SearchBar
                    search={search}
                    setSearch={setSearch}
                />

                <DifficultyFilter
                    difficulty={difficulty}
                    setDifficulty={setDifficulty}
                />
            </div>
        </section>
    );
}

export default ProblemsToolbar;