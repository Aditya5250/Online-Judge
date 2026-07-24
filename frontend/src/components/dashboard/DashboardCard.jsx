import { MoveUpRight } from "lucide-react";


function ChartCard({
    title,
    subtitle,
    children,
    action,
}) {

    
    return (
        <section
            className="
                rounded-2xl
                border
                p-6
                shadow-lg
                backdrop-blur-xl
                transition-all
                duration-300
                hover:shadow-xl

                
            "
            style={{
                background: "var(--bg-card)",
                borderColor: "var(--border)",
            }}
        >
            <div className="flex items-start justify-between mb-6">

                <div>

                    <h2
                        className="text-xl font-semibold"
                        style={{
                            color: "var(--text-primary)",
                        }}
                    >
                        {title}
                    </h2>

                    {subtitle && (
                        <p
                            className="text-sm mt-1"
                            style={{
                                color: "var(--text-secondary)",
                            }}
                        >
                            {subtitle}
                        </p>
                    )}

                </div>

                {action && (
                    <button
                        className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            transition-colors
                        "
                        style={{
                            color: "var(--accent)",
                        }}
                    >
                        {action}
                        <MoveUpRight size={16}/>
                    </button>
                )}

            </div>

            <div className="h-80">

                {children}

            </div>

        </section>
    );
}

export default ChartCard;