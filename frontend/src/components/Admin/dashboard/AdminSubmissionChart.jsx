import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

import ChartTooltip from "../../dashboard/ChartTooltip";

import AdminDashboardCard from "./AdminDashboardCard";



function SubmissionChart({data}) {
    return (
        <AdminDashboardCard
            title="Platform Activity"
            subtitle="Submission volume over the last 7 days"
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
                        stroke:"#60A5FA",
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
                        stroke="#60A5FA"
                        strokeWidth={2.5}
                        dot={{
                            r: 4,
                            strokeWidth: 3,
                            fill: "#60A5FA",
                            stroke:"var(--bg-card)"
                        }}
                        activeDot={{
                            r: 7,
                            strokeWidth: 2,
                            fill: "#60A5FA",
                            stroke:"white"
                        }}

                        animationDuration={1200}
                        animationEasing="ease-out"
                    />
                </LineChart>
            </ResponsiveContainer>
        </AdminDashboardCard>
    );
}

export default SubmissionChart;