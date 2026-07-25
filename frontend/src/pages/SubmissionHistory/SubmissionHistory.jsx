import SubmissionHero from "../../components/submissions/SubmissionHero";
import SubmissionTable from "../../components/submissions/SubmissionTable";
import useSubmissionHistory from "../../hooks/useSubmissionHistory";

export default function SubmissionHistory() {

    const {
        submissions,
        loading,
        error,
    } = useSubmissionHistory();

    if (loading) {
        return (
            <div className="py-20 text-center">
                Loading submissions...
            </div>
        );
    }

    if (error) {
        return (
            <div className="py-20 text-center text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-10">

            <SubmissionHero />

            <SubmissionTable
                submissions={submissions}
            />

        </div>
    );
}