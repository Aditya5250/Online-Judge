import { useEffect, useState } from "react";

export default function useAdminDashboard() {
  const [stats, setStats] = useState({
    problems: 0,
    users: 0,
    submissions: 0,
  });

  useEffect(() => {
    setStats({
      problems: 18,
      users: 142,
      submissions: 4219,
    });
  }, []);

  return {
    stats,
  };
}