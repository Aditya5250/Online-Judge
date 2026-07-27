import ProblemRow from "./ProblemRow";

export default function ProblemTable({
  problems,
  loading,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="py-20 text-center text-zinc-400">
        Loading problems...
      </div>
    );
  }

  if (!problems.length) {
    return (
      <div className="py-20 text-center text-zinc-400">
        No problems found.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-800">
      <table className="w-full">
        <thead className="bg-zinc-900">
          <tr>
            <th className="px-6 py-4 text-left">
              Title
            </th>

            <th className="text-left">
              Difficulty
            </th>

            <th className="text-left">
              Published
            </th>

            <th className="text-left">
              Created By
            </th>

            <th className="text-left">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {problems.map((problem) => (
            <ProblemRow
              key={problem._id}
              problem={problem}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}