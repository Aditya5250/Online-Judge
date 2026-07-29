import { useEffect, useState } from "react";
import { getAdminDashboard } from "../services/admin.service";

export default function useAdminDashboard() {

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const response = await getAdminDashboard();

                setDashboardData(response.data);

            } catch (err) {

                console.error(err);
                setError(err);

            } finally {

                setLoading(false);

            }

        };

        fetchDashboard();

    }, []);

    return {
        dashboardData,
        loading,
        error,
    };

}