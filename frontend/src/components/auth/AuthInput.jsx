const AuthInput = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
}) => {
  return (
    <div className="space-y-2">

      {/* Label */}
      <label
        htmlFor={name}
        className="block text-sm font-semibold text-white"
      >
        {label}

        {required && (
          <span className="ml-1 text-[var(--accent)]">*</span>
        )}
      </label>

      {/* Input */}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoComplete="off"
        className={`
          w-full
          rounded-2xl
          border
          bg-[var(--bg-secondary)]
          px-5
          py-3
          text-white
          placeholder:text-gray-500
          outline-none
          transition-all
          duration-300

          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-4 focus:ring-red-500/20"
              : "border-[var(--border)] focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/20"
          }

          ${
            disabled
              ? "cursor-not-allowed opacity-60"
              : "hover:border-[var(--accent)]/60"
          }
        `}
      />

      {/* Error */}
      <div className="min-h-[20px]">
        {error && (
          <p className="text-sm text-red-400">
            {error}
          </p>
        )}
      </div>

    </div>
  );
};

export default AuthInput;