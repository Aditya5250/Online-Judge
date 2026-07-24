
import {
    CheckCircle2,
    FileCode2,
    Target,
    Trophy,
} from "lucide-react";

import StatCard from "./StateCard";

function StatsCards({stats}) {

    const statsData = [
        {
            title: "Problems Solved",
            value: stats.solvedProblems,
            subtitle: "Across all difficulties",
            icon: CheckCircle2,
        },
        {
            title: "Submissions",
            value: stats.totalAttempts,
            subtitle: "Total attempts",
            icon: FileCode2,
        },
        {
            title: "Acceptance Rate",
            value: stats.acceptanceRate,
            suffix:"%",
            subtitle: "Excellent consistency",
            icon: Target,
        },
        {
            title: "Global Rank",
            value: 0,
            prefix:"#",
            subtitle: "Keep climbing",
            icon: Trophy,
        },
    ];


    return (
        <section className="mt-8">

            <div
                className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-4
                    gap-6
                "
            >
                {statsData.map((stat,index) => (
                    <StatCard
                        key={stat.title}
                        index={index}
                        {...stat}
                    />
                ))}
            </div>

        </section>
    );
}

export default StatsCards;