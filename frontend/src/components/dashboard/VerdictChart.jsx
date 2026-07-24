import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts";

import DashboardCard from "./DashboardCard";
import ChartTooltip from "./ChartTooltip";
import { useState } from "react";



const COLORS = [
    "#FACC15",
    "#F97316",
    "#EF4444",
    "#8B5CF6",
];


function VerdictChart({ data, }) {


    const [activeSlice, setActiveSlice] = useState(null);

    const accepted = data.find(
        (item) => item.name === "Accepted"
    );

    const total = data.reduce(
        (sum, item) => sum + item.value,
        0
    );

    const acceptedPercentage =
        total === 0
            ? 0
            : Math.round((accepted?.value / total) * 100);



    return (

        <DashboardCard
            title="Verdict Distribution"
            subtitle="Overall submission outcomes"
        >
            <div className="flex flex-col h-full">
                <div className="relative flex-1">

                    <ResponsiveContainer width="100%" height="100%">


                        <PieChart>

                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={70}
                                outerRadius={95}
                                paddingAngle={4}
                                animationDuration={1200}

                                onMouseEnter={(_, index) =>
                                    setActiveSlice(index)
                                }
                                onMouseLeave={() =>
                                    setActiveSlice(null)
                                }

                            >

                                {data.map((item, index) => (

                                    <Cell
                                        key={item.name}
                                        fill={COLORS[index]}
                                    />

                                ))}

                            </Pie>


                            <Tooltip
                                content={
                                    <ChartTooltip
                                        labelKey="Verdict"
                                        valueLabel="Submissions"
                                    />
                                }
                            />


                        </PieChart>





                    </ResponsiveContainer>

                    {activeSlice === null && (

                        <div
                            className="
                            absolute
                            inset-0
                            flex
                            flex-col
                            items-center
                            justify-center
                            pointer-events-none
                            Z-0
                    
                        "
                        >
                            <h2
                                className="
                                text-3xl
                                font-bold
                            "
                                style={{ color: "var(--text-primary)" }}
                            >
                                {acceptedPercentage}%
                            </h2>
                            <p
                                className="
                                text-sm
                            "
                                style={{ color: "var(--text-secondary)" }}
                            >
                                Accepted
                            </p>

                        </div>

                    )}



                </div>

                <div className="mt-2 space-y-2">

                    {data.map((item, index) => (

                        <div
                            key={item.name}
                            className="flex justify-between items-center"
                        >

                            <div className="flex items-center gap-2">

                                <span
                                    className="w-3 h-3 rounded-full"
                                    style={{
                                        background: COLORS[index],
                                    }}
                                />

                                <span
                                    style={{
                                        color: "var(--text-secondary)",
                                    }}
                                >
                                    {item.name}
                                </span>

                            </div>

                            <span
                                className="font-semibold"
                                style={{
                                    color: "var(--text-primary)",
                                }}
                            >
                                {item.value}
                            </span>

                        </div>

                    ))}

                </div>
            </div>





        </DashboardCard>

    );
}

export default VerdictChart;