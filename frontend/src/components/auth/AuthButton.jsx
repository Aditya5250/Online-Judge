const AuthButton = ({
  children,
  loading = false,
  disabled = false,
  type = "submit",
  loadingText = "Loading...",
}) => {
  return (
    <button
      type={type}
      disabled={loading || disabled}
      className={`
        group
        relative
        flex
        w-full
        items-center
        justify-center
        overflow-hidden
        rounded-2xl
        bg-[var(--accent)]
        px-6
        py-3.5
        font-semibold
        text-black
        transition-all
        duration-300

        hover:-translate-y-0.5
        hover:shadow-[0_0_25px_rgba(239,211,149,0.35)]

        active:translate-y-0
        active:scale-[0.98]

        disabled:cursor-not-allowed
        disabled:opacity-60
      `}
    >
      {/* Shine Effect */}
      <span
        className="
          absolute
          inset-0
          -translate-x-full
          bg-gradient-to-r
          from-transparent
          via-white/25
          to-transparent
          transition-transform
          duration-700
          group-hover:translate-x-full
        "
      />

      {/* Loading */}
      {loading ? (
        <div className="flex items-center gap-3 relative z-10">
          <span
            className="
              h-5
              w-5
              animate-spin
              rounded-full
              border-2
              border-black/30
              border-t-black
            "
          />

          {loadingText}
        </div>
      ) : (
        <span className="relative z-10">
          {children}
        </span>
      )}
    </button>
  );
};

export default AuthButton;