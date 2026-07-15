import { SearchX } from "lucide-react";

function EmptyState({onResetFilters}) {
    return (
        <div
            className="
                rounded-3xl
                border

                px-8
                py-20

                flex
                flex-col
                items-center
                justify-center

                text-center
            "
            style={{
                background: "rgba(38,38,37,0.65)",
                borderColor: "var(--border)",
            }}
        >
            {/* Icon */}

            <div
                className="
                    h-20
                    w-20

                    rounded-full

                    flex
                    items-center
                    justify-center

                    mb-6
                "
                style={{
                    background: "rgba(255,255,255,0.04)",
                }}
            >
                <SearchX
                    size={38}
                    style={{
                        color: "var(--accent)",
                    }}
                />
            </div>

            {/* Heading */}

            <h2
                className="
                    text-2xl
                    font-bold
                    mb-3
                "
                style={{
                    color: "var(--text-primary)",
                }}
            >
                No Problems Found
            </h2>

            {/* Description */}

            <p
                className="
                    max-w-md
                    leading-relaxed
                    mb-8
                "
                style={{
                    color: "var(--text-secondary)",
                }}
            >
                We couldn't find any problems matching your
                search or selected difficulty. Try changing
                your filters and explore more challenges.
            </p>

            {/* Button */}

            <button
                onClick={onResetFilters}
                className="
                    px-6
                    py-3

                    rounded-xl

                    font-semibold

                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:scale-105
                "
                style={{
                    background: "var(--accent)",
                    color: "var(--bg-primary)",
                }}
            >
                Reset Filters
            </button>

        </div>
    );
}

export default EmptyState;