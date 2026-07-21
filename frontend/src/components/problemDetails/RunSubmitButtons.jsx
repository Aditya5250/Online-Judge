const RunSubmitButtons = ({
  running,
  submitting,
}) => {
  return (
    <div className="flex items-center gap-3">
      <button
        disabled={running}
        className="
          rounded-lg
          border
          border-[var(--border)]
          px-4
          py-2
          text-sm
          font-medium
          transition
          hover:border-[var(--accent)]
        "
      >
        {running ? "Running..." : "Run"}
      </button>

      <button
        disabled={submitting}
        className="
          rounded-lg
          bg-[var(--accent)]
          px-6
          py-2
          text-sm
          font-semibold
          text-black
          transition
          hover:opacity-90
        "
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};

export default RunSubmitButtons;