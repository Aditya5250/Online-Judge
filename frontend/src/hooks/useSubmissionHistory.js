import { useEffect, useState } from "react";
import { getMySubmissions } from "../services/submission.service";

export default function useSubmissionHistory() {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const data = await getMySubmissions();
                setSubmissions(data.data);
            } catch (err) {
                setError(err.message || "Failed to load submissions");
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, []);

    return {
        submissions,
        loading,
        error,
    };
}