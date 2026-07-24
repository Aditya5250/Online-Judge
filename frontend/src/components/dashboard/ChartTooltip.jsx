function ChartTooltip({
    active,
    payload,
    label,
    labelKey = "Day",
    valueLabel = "Value",
}) {
    if (!active || !payload?.length) return null;

    return (
        <div
            className="
                rounded-xl
                border
                p-4
                shadow-xl
                backdrop-blur-xl
                min-w-[170px]
            "
            style={{
                background: "var(--bg-card)",
                borderColor: "var(--border)",
            }}
        >
            <p
                className="font-semibold"
                style={{
                    color: "var(--text-primary)",
                }}
            >
                {labelKey}: {label}
            </p>

            <div className="mt-3 flex items-center gap-2">

                <div
                    className="w-3 h-3 rounded-full"
                    style={{
                        background: "var(--accent)",
                    }}
                />

                <span
                    style={{
                        color: "var(--text-secondary)",
                    }}
                >
                    {valueLabel}
                </span>

                <span
                    className="font-semibold ml-auto"
                    style={{
                        color: "var(--text-primary)",
                    }}
                >
                    {payload[0].value}
                </span>

            </div>
        </div>
    );
}

export default ChartTooltip;