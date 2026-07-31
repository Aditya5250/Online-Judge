export const healthCheck = (req, res) => {
    return res.status(200).json({
        success: true,
        service: "Judge Worker",
        version: "1.0.0",
        status: "Healthy",
    });
};