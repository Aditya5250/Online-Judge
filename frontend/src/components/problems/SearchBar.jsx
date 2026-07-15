import { Search } from "lucide-react";

function SearchBar({
    search,
    setSearch,
}) {
    return (
        <div className="relative w-full lg:max-w-md">

            {/* Search Icon */}
            <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2"
                style={{ color: "var(--text-secondary)" }}
            />

            {/* Input */}
            <input
                type="text"
                placeholder="Search problems..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                    w-full
                    rounded-2xl
                    border
                    py-3
                    pl-12
                    pr-4

                    outline-none

                    transition-all
                    duration-300

                    focus:ring-2
                "
                style={{
                    background: "rgba(255,255,255,0.03)",
                    borderColor: "var(--border)",
                    color: "var(--text-primary)",
                }}
            />
        </div>
    );
}

export default SearchBar;