import { getUser } from "../../utils/auth";

const Dashboard = () => {
  const user = getUser();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] p-8 text-white">
      <h1 className="text-4xl font-bold">
        Welcome back, {user?.fullname} 👋
      </h1>

      <p className="mt-2 text-gray-400">
        @{user?.username}
      </p>

      <p className="text-gray-400">
        {user?.email}
      </p>

      <div className="mt-10 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-6">
        <h2 className="text-xl font-semibold">
          Your Progress
        </h2>

        <p className="mt-4 text-gray-400">
          Problems Solved: 0
        </p>

        <p className="text-gray-400">
          Submissions: 0
        </p>
      </div>
    </div>
  );
};

export default Dashboard;