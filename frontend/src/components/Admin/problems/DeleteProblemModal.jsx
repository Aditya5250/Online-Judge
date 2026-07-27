export default function DeleteProblemModal({
    open,
    problem,
    onClose,
    onConfirm,
}) {

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

            <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6">

                <h2 className="text-xl font-bold text-white">
                    Delete Problem
                </h2>

                <p className="mt-4 text-zinc-300">
                    Are you sure you want to delete
                    <span className="font-semibold text-red-400">
                        {" "}{problem?.title}
                    </span>
                    ?
                </p>

                <p className="mt-2 text-sm text-zinc-500">
                    This action cannot be undone.
                </p>

                <div className="mt-8 flex justify-end gap-3">

                    <button
                        onClick={onClose}
                        className="rounded-xl border border-zinc-700 px-5 py-2 text-white hover:bg-zinc-800"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onConfirm}
                        className="rounded-xl bg-red-500 px-5 py-2 font-semibold text-white hover:bg-red-600"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>
    );
}