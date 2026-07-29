import Problem from "../models/problem.model.js";
import Submission from "../models/submission.model.js";
import { SUBMISSION_VERDICT } from "../constants/submissionVerdict.js";

export const getAdminDashboard = async (req, res) => {
    try {

        // Last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setHours(0, 0, 0, 0);
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

        // ==========================
        // Dashboard Stats
        // ==========================

        const [
            totalProblems,
            publishedProblems,
            acceptedSubmissions,
            activeUserIds,
            recentProblems,
        ] = await Promise.all([

            Problem.countDocuments(),

            Problem.countDocuments({
                isPublished: true,
            }),

            Submission.countDocuments({
                verdict: SUBMISSION_VERDICT.ACCEPTED,
            }),

            Submission.distinct("userId", {
                createdAt: {
                    $gte: sevenDaysAgo,
                },
            }),

            Problem.find()
                .select("title difficulty isPublished createdAt")
                .sort({ createdAt: -1 })
                .limit(3),

        ]);

        // ==========================
        // Submission Trend
        // ==========================

        const trend = await Submission.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: sevenDaysAgo,
                    },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: {
                            format: "%Y-%m-%d",
                            date: "$createdAt",
                        },
                    },
                    count: {
                        $sum: 1,
                    },
                },
            },
        ]);

        // Convert aggregation result to map
        const trendMap = {};

        trend.forEach((item) => {
            trendMap[item._id] = item.count;
        });

        // Always return 7 days
        const submissionTrend = [];

        for (let i = 0; i < 7; i++) {

            const date = new Date(sevenDaysAgo);

            date.setDate(sevenDaysAgo.getDate() + i);

            const key = date.toISOString().split("T")[0];

            submissionTrend.push({
                day: date.toLocaleDateString("en-US", {
                    weekday: "short",
                }),
                count: trendMap[key] || 0,
            });

        }

        return res.status(200).json({
            success: true,
            data: {
                stats: {
                    problems: totalProblems,
                    publishedProblems,
                    acceptedSubmissions,
                    activeUsers: activeUserIds.length,
                },
                submissionTrend,
                recentProblems,
            },
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });

    }
};