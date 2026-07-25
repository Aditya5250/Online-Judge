import { Link } from "react-router-dom";
import formatRelativeTime from "../../utils/formatRelativeTime";
import VerdictBadge from "./VerdictBadge";
import LanguageBadge from "./LanguageBadge"; 
const verdictColors = {
    ACCEPTED: "bg-green-500/10 text-green-400",
    WRONG_ANSWER: "bg-red-500/10 text-red-400",
    TIME_LIMIT_EXCEEDED: "bg-yellow-500/10 text-yellow-400",
    RUNTIME_ERROR: "bg-purple-500/10 text-purple-400",
    COMPILATION_ERROR: "bg-blue-500/10 text-blue-400",
    PENDING: "bg-zinc-700 text-zinc-300",
};

const languageColors = {
    CPP: "bg-blue-500/10 text-blue-400",
    JAVA: "bg-orange-500/10 text-orange-400",
    PYTHON: "bg-green-500/10 text-green-400",
};



export default function SubmissionRow({ submission }) {

    const verdict = submission.verdict ?? "PENDING";

    return (

        <div
            className="
                grid
                grid-cols-1
                md:grid-cols-[2fr_1.3fr_1fr_1.2fr_120px]
                items-center
                gap-4
                rounded-2xl
                border
                border-zinc-800
                bg-zinc-900
                px-6
                py-5
                transition-all
                duration-300
                hover:border-yellow-500/20
                hover:bg-zinc-800/70
            "
        >

            {/* Problem */}

            <div>

                <Link
                    to={`/problems/${submission.problemId.slug}`}
                    className="font-semibold text-white hover:text-yellow-400 transition-colors"
                >

                    {submission.problemId.title}

                </Link>

                <p className="mt-1 text-sm text-zinc-500">

                    {submission.problemId.difficulty}

                </p>

            </div>

            {/* Verdict */}

            <div className="text-center">

                <VerdictBadge verdict={submission.verdict} />


            </div>

            {/* Language */}

            <div className="text-center">

                <LanguageBadge language={submission.language} />

            </div>

            {/* Submitted */}

            <div className="text-center text-zinc-400">

                {formatRelativeTime(submission.createdAt)}

            </div>

            {/* Runtime */}

            <div className="text-center font-medium text-white">

                {submission.executionTime} ms

            </div>

        </div>

    );

}