import {
  BookOpen,
  Users,
  FileText,
} from "lucide-react";

import StatCard from "../../common/StatCard";

export default function AdminStats({
  stats,
}) {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      <StatCard
        title="Problems"
        value={stats.problems}
        subtitle="Available coding challenges"
        icon={BookOpen}
      />

      <StatCard
        title="Users"
        value={stats.users}
        subtitle="Registered developers"
        icon={Users}
      />

      <StatCard
        title="Submissions"
        value={stats.submissions}
        subtitle="Total code submissions"
        icon={FileText}
      />

    </section>
  );
}