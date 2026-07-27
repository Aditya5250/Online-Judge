import { Plus } from "lucide-react";

export default function ProblemHeader({
  onCreate,
}) {
  return (
    <div className="mb-8 flex items-center justify-between">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Problem Management
        </h1>

        <p className="mt-2 text-zinc-400">
          Manage coding problems on JudgeX.
        </p>
      </div>

      <button
        onClick={onCreate}
        className="
          flex
          items-center
          gap-2
          rounded-xl
          bg-yellow-400
          px-5
          py-3
          font-semibold
          text-black
          transition
          hover:scale-105
        "
      >
        <Plus size={18} />

        Create Problem
      </button>

    </div>
  );
}