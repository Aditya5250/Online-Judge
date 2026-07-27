import {
  Pencil,
  Trash2,
} from "lucide-react";

export default function ProblemRow({
  problem,
  onEdit,
  onDelete
}) {
  return (
    <tr className="border-t border-zinc-800">

      <td className="px-6 py-5 font-medium text-white">
        {problem.title}
      </td>

      <td>{problem.difficulty}</td>

      <td>
        {problem.isPublished ? "✅" : "❌"}
      </td>

      <td>
        {problem.createdBy?.fullname}
      </td>

      <td>

        <div className="flex gap-3">

          <button
            onClick={()=>onEdit(problem)}
            className="text-yellow-400 hover:text-yellow-300">
            <Pencil size={18} />
          </button>

          <button 
            onClick={()=>onDelete(problem)}
            className="text-red-400 hover:text-red-300">
            <Trash2 size={18} />
          </button>

        </div>

      </td>

    </tr>
  );
}