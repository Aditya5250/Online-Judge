import { TriangleAlert } from "lucide-react";

function ErrorState({
    title = "Something went wrong",
    description = "We couldn't load the problems. Please check your connection and try again.",
    onRetry,
}) {
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
                    background: "rgba(239,68,68,0.12)",
                }}
            >
                <TriangleAlert
                    size={38}
                    style={{
                        color: "#EF4444",
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
                {title}
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
                {description}
            </p>

            {/* Retry Button */}

            <button
                onClick={onRetry}
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
                Try Again
            </button>
        </div>
    );
}

export default ErrorState;