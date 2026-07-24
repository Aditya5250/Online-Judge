import { useEffect, useState } from "react";

import { getMySubmissions } from "../services/submission.service";
import { getAllProblems } from "../services/problem.service";
import calculateStats from "../utils/dashboard/calculateStats";
import calculateSubmissionTrend from "../utils/dashboard/calculateSubmissionTrend";
import calculateVerdictDistribution from "../utils/dashboard/calculateVerdictDistribution";
import calculateDifficultyProgress from "../utils/dashboard/calculateDifficultyProgress";
import calculateRecentSubmissions from "../utils/dashboard/calculateRecentSubmissions";


export default function useDashboardData() {
    const [dashboardData, setDashboardData] = useState({
        submissions: [],
        problems: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);



    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            const [submissionRes, problems] =
                await Promise.all([
                    getMySubmissions(),
                    getAllProblems(),
                ]);

            const submissions = submissionRes.data;
            const stats=calculateStats(submissions);
            const submissionTrend=calculateSubmissionTrend(submissions);
            const verdictDistribution=calculateVerdictDistribution(submissions);
            const difficultyProgress=calculateDifficultyProgress(submissions,problems);
            const recentSubmissions=calculateRecentSubmissions(submissions);


            setDashboardData({
                submissions,
                problems,
                stats,
                submissionTrend,
                verdictDistribution,
                difficultyProgress,
                recentSubmissions

            });
            


        } catch (err) {
            console.error(err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };


    

    return {
        dashboardData,
        loading,
        error,
        refreshDashboard: fetchDashboardData,
    };
}