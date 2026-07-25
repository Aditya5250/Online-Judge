import Submission from "../models/submission.model.js";

export const getLeaderboardData = async () => {
    const leaderboard = await Submission.aggregate([
        {
            $group: {
                _id: "$userId",

                submissions: {
                    $sum: 1,
                },

                acceptedProblems: {
                    $addToSet: {
                        $cond: [
                            { $eq: ["$verdict", "ACCEPTED"] },
                            "$problemId",
                            "$$REMOVE",
                        ],
                    },
                },

                acceptedSubmissions: {
                    $sum: {
                        $cond: [
                            { $eq: ["$verdict", "ACCEPTED"] },
                            1,
                            0,
                        ],
                    },
                },
            },
        },

        {
            $lookup: {
                from: "users",
                localField: "_id",
                foreignField: "_id",
                as: "user",
            },
        },

        {
            $unwind: "$user",
        },

        {
            $project: {
                _id: 0,

                username: "$user.username",

                fullname: "$user.fullname",

                solved: {
                    $size: "$acceptedProblems",
                },

                submissions: 1,

                acceptanceRate: {
                    $round: [
                        {
                            $multiply: [
                                {
                                    $divide: [
                                        "$acceptedSubmissions",
                                        "$submissions",
                                    ],
                                },
                                100,
                            ],
                        },
                        0,
                    ],
                },
            },
        },

        {
            $sort: {
                solved: -1,
                acceptanceRate: -1,
                submissions: 1,
            },
        },
    ]);

    return leaderboard.map((user, index) => ({
        rank: index + 1,
        ...user,
    }));
};