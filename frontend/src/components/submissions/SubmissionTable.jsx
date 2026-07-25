import SubmissionRow from "./SubmissionRow";
import EmptySubmissions from "./EmptySubmission";

export default function SubmissionTable({ submissions }) {

    return (

        <section className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-xl">

            <div className="mb-6">

                <h2 className="text-2xl font-bold text-white">

                    Recent Submissions

                </h2>

                <p className="mt-2 text-zinc-400">

                    Browse all your submissions and review their outcomes.

                </p>

            </div>

            {submissions.length === 0 ? (

                <div className="py-20 text-center text-zinc-400">

                    <EmptySubmissions />

                </div>

            ) : (

                <>

                    <div
                        className="
                            hidden
                            md:grid
                            grid-cols-[2fr_1.3fr_1fr_1.2fr_120px]
                            px-6
                            pb-4
                            text-xs
                            font-medium
                            uppercase
                            tracking-[0.15em]
                            text-zinc-500
                        "
                    >

                        <div>Problem</div>

                        <div className="text-center">
                            Verdict
                        </div>

                        <div className="text-center">
                            Language
                        </div>

                        <div className="text-center">
                            Submitted
                        </div>

                        <div className="text-center">
                            Runtime
                        </div>

                    </div>

                    <div className="space-y-3">

                        {submissions.map(submission => (

                            <SubmissionRow
                                key={submission._id}
                                submission={submission}
                            />

                        ))}

                    </div>

                </>

            )}

        </section>

    );

}