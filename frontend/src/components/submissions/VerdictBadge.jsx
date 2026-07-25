const verdictStyles = {
    ACCEPTED: {
        bg: "bg-green-500/10",
        text: "text-green-400",
        label: "Accepted",
    },
    WRONG_ANSWER: {
        bg: "bg-red-500/10",
        text: "text-red-400",
        label: "Wrong Answer",
    },
    TIME_LIMIT_EXCEEDED: {
        bg: "bg-yellow-500/10",
        text: "text-yellow-400",
        label: "Time Limit",
    },
    RUNTIME_ERROR: {
        bg: "bg-purple-500/10",
        text: "text-purple-400",
        label: "Runtime Error",
    },
    COMPILATION_ERROR: {
        bg: "bg-orange-500/10",
        text: "text-orange-400",
        label: "Compilation Error",
    },
    PENDING: {
        bg: "bg-zinc-700",
        text: "text-zinc-300",
        label: "Pending",
    },
};

export default function VerdictBadge({ verdict }) {
    const style =
        verdictStyles[verdict] ??
        verdictStyles.PENDING;

    return (
        <span
            className={`
                inline-flex
                items-center
                rounded-full
                px-3
                py-1
                text-sm
                font-semibold
                ${style.bg}
                ${style.text}
            `}
        >
            {style.label}
        </span>
    );
}