import { Crown, Medal } from "lucide-react";

const styles = {
    1: {
        medal: "🥇",
        border: "border-yellow-400/30",
        avatar: "bg-yellow-500/20 text-yellow-300",
        shadow: "hover:shadow-yellow-500/20",
        margin: "mt-0",
        crown: true,
        scale: " lg:scale-105",
    },

    2: {
        medal: "🥈",
        border: "border-zinc-600",
        avatar: "bg-zinc-700 text-zinc-200",
        shadow: "hover:shadow-zinc-400/20",
        margin: "mt-12",
        crown: false,
        scale: "",
    },

    3: {
        medal: "🥉",
        border: "border-orange-500/20",
        avatar: "bg-orange-500/20 text-orange-300",
        shadow: "hover:shadow-orange-500/20",
        margin: "mt-16",
        crown: false,
        scale: "",
    },
};

export default function PodiumCard({ user, place }) {

    if (!user) return null;

    const style = styles[place];

    const initials = user.fullname
        .split(" ")
        .map(word => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (

        <div
            className={`
                relative
                ${style.margin}
                ${style.scale}
                flex
                flex-col
                items-center
                rounded-3xl
                border
                ${style.border}
                bg-zinc-900
                p-6
                transition-all
                duration-300
                hover:-translate-y-2
                ${style.shadow}

            `}
        >

            {style.crown && (

                <Crown
                    size={28}
                    className="absolute -top-5 text-yellow-400"
                />

            )}

            <div className="text-4xl">

                {style.medal}

            </div>

            <div
                className={`
                    mt-5
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    font-bold
                    text-xl
                    ${style.avatar}
                `}
            >

                {initials}

            </div>

            <h3 className="mt-5 text-lg font-semibold text-white">

                {user.fullname}

            </h3>


            <div className="mt-6 flex gap-3">

                <StatBadge
                    value={user.solved}
                    label="Solved"
                />

                <StatBadge
                    value={`${user.acceptanceRate}%`}
                    label="Accuracy"
                />

            </div>

        </div>

    );
}

function StatBadge({ value, label }) {

    return (

        <div className="rounded-xl bg-zinc-800 px-4 py-3 text-center">

            <div className="text-lg font-bold text-white">

                {value}

            </div>

            <div className="text-xs uppercase tracking-wide text-zinc-500">

                {label}

            </div>

        </div>

    );

}