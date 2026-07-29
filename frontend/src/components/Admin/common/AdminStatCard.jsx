import CountUp from "../../common/CountUp";

export default function AdminStatCard({
    title,
    value,
    subtitle,
    icon: Icon,
    iconColor="text-zinc-300",
    footer="Problem Bank",
}) {

    return (

        <div
            className="
                group
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-900
                p-6
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-zinc-700
            "
        >

            <div className="flex justify-between items-start">

                <div>

                    <p className="text-sm text-zinc-400">
                        {title}
                    </p>

                    <h2 className="mt-3 text-4xl font-bold text-white">

                        <CountUp end={value} />

                    </h2>

                    <p className="mt-2 text-sm text-zinc-500">
                        {subtitle}
                    </p>

                </div>

                <div
                    className="
                        h-12
                        w-12
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        bg-zinc-800
                        text-zinc-300
                        transition
                        duration-300
                        group-hover:bg-zinc-700
                    "
                >

                    <Icon 
                        size={22}
                        className={iconColor}
                    />

                </div>

            </div>

            <div
                className="
                    mt-5
                    border-t
                    border-zinc-800
                    pt-4
                "
            >

                <span className="text-xs text-zinc-500">
                    {footer}
                </span>

            </div>

        </div>

    );

}