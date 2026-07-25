import { FileSearch } from "lucide-react";

export default function EmptySubmissions() {
    return (
        <div className="flex flex-col items-center py-20">

            <div className="mb-6 rounded-full bg-zinc-800 p-5">

                <FileSearch
                    size={40}
                    className="text-yellow-400"
                />

            </div>

            <h3 className="text-2xl font-bold text-white">

                No submissions yet

            </h3>

            <p className="mt-3 max-w-md text-center text-zinc-400">

                Solve a problem and submit your first solution to
                start building your coding history.

            </p>

        </div>
    );
}