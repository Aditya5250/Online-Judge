import {
  BookOpen,
  Users,
  FileText,
  Globe,
  CheckCircle2,
} from "lucide-react";

import AdminStatCard from "../common/AdminStatCard";

export default function AdminStats({
  stats,
}) {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      <AdminStatCard
        title="Problems"
        value={stats.problems}
        subtitle="Total coding problems"
        icon={BookOpen}
        iconColor="text-sky-400"
        footer="Problem Bank"
      />

      <AdminStatCard
        title="Published"
        value={stats.publishedProblems}
        subtitle="Live problems"
        icon={Globe}
        iconColor="text-emerald-400"
        footer="Public Access"
      />

      <AdminStatCard
        title="Active Users"
        value={stats.activeUsers}
        subtitle="Last 7 days"
        icon={Users}
        iconColor="text-violet-400"
        footer="Community"
      />
    </section>
  );
}