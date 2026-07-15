function DifficultyBadge({ difficulty }) {

    const normalized =
        difficulty.charAt(0) +
        difficulty.slice(1).toLowerCase();

    const colors = {
        Easy: {
            bg: "rgba(34,197,94,.15)",
            text: "#22C55E",
        },

        Medium: {
            bg: "rgba(245,158,11,.15)",
            text: "#F59E0B",
        },

        Hard: {
            bg: "rgba(239,68,68,.15)",
            text: "#EF4444",
        },
    };

    const color = colors[normalized] || colors.Easy;

    return (
        <span
            className="
                inline-flex
                items-center
                px-3
                py-1
                rounded-full
                text-xs
                font-semibold
            "
            style={{
                background: color.bg,
                color: color.text,
            }}
        >
            {normalized}
        </span>
    );
}

export default DifficultyBadge;