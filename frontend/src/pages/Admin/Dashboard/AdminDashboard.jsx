import AdminStats from "../../../components/Admin/dashboard/AdminStats";
import useAdminDashboard from "../../../hooks/useAdminDashboard";
import AdminSubmissionChart from "../../../components/Admin/dashboard/AdminSubmissionChart";
import RecentProblems from "../../../components/Admin/dashboard/RecentProblems";


export default function AdminDashboard() {

    const {
        dashboardData,
        loading,
        error,
    } = useAdminDashboard();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Something went wrong.</div>;
    }

    return (
        <div className="space-y-8">
            

            <AdminStats
                stats={dashboardData.stats}
            />

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 ">

                <AdminSubmissionChart
                    data={dashboardData.submissionTrend}
                />

                <RecentProblems 
                    problems={dashboardData.recentProblems}
                />

            </div>

        </div>
    );
}