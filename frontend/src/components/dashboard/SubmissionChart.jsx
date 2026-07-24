import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

import ChartTooltip from "./ChartTooltip";

import DashboardCard from "./DashboardCard";



function SubmissionChart({data}) {
    return (
        <DashboardCard
            title="Submission Trend"
            subtitle="Last 7 days"
        >
            <ResponsiveContainer
                width="100%"
                height="100%"
            >
                <LineChart data={data}>
                    <CartesianGrid
                        stroke="var(--border)"
                        strokeDasharray="5 5"
                        opacity={0.3}
                    />

                    <XAxis
                        dataKey="day"
                        tick={{
                            fill: "var(--text-secondary)",
                        }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <YAxis
                        tick={{
                            fill: "var(--text-secondary)",
                        }}
                        axisLine={false}
                        tickLine={false}
                    />

                    <Tooltip cursor={{
                        stroke:"var(--accent)",
                        strokeDasharray:"4 4",
                    }}

                    content={
                    <ChartTooltip 

                        labelKey="Day"
                        valueLabel="Submissions"
                    
                    />
                    }
                    
                    />

                    <Line
                        type="monotone"
                        dataKey="submissions"
                        stroke="var(--accent)"
                        strokeWidth={3}
                        dot={{
                            r: 4,
                            strokeWidth: 3,
                            fill: "var(--accent)",
                            stroke:"var(--bg-card)"
                        }}
                        activeDot={{
                            r: 7,
                            strokeWidth: 2,
                            fill: "var(--accent)",
                            stroke:"white"
                        }}

                        animationDuration={1200}
                        animationEasing="ease-out"
                    />
                </LineChart>
            </ResponsiveContainer>
        </DashboardCard>
    );
}

export default SubmissionChart;