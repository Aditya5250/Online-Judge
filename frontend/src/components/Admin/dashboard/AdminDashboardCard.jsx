export default function AdminDashboardCard({
    title,
    subtitle,
    children,
}) {
    return (
        <div
            className="
                rounded-3xl
                border
                border-zinc-800
                bg-zinc-900
                p-6
                h-96
            "
        >
            <h2 className="text-2xl font-bold text-white">
                {title}
            </h2>

            <p className="mt-1 text-zinc-400">
                {subtitle}
            </p>

            <div className="mt-6 h-[280px]">
                {children}
            </div>
        </div>
    );
}