const languageStyles = {
    CPP: "bg-blue-500/10 text-blue-400",
    JAVA: "bg-orange-500/10 text-orange-400",
    PYTHON: "bg-green-500/10 text-green-400",
};

export default function LanguageBadge({ language }) {
    return (
        <span
            className={`
                rounded-full
                px-3
                py-1
                text-sm
                font-semibold
                ${languageStyles[language] ?? "bg-zinc-700 text-zinc-300"}
            `}
        >
            {language}
        </span>
    );
}