import AdminStats from "../../../components/Admin/dashboard/AdminStats";
import useAdminDashboard from "../../../hooks/useAdminDashboard";

export default function AdminDashboard() {
  const { stats } = useAdminDashboard();

  return (
    <div className="space-y-8">

      <AdminStats stats={stats} />

    </div>
  );
}