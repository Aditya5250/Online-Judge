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
    <div>
      {/* Label */}
      <label
        htmlFor={name}
        className="block text-xs font-semibold text-gray-200 mb-1"
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
          rounded-xl
          border
          bg-[var(--bg-primary)]
          px-3.5
          py-2.5
          text-sm
          text-white
          placeholder:text-gray-500
          outline-none
          transition-all
          duration-200

          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
              : "border-[var(--border)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20"
          }

          ${
            disabled
              ? "cursor-not-allowed opacity-60"
              : "hover:border-[var(--accent)]/60"
          }
        `}
      />

      {/* Error */}
      {error && (
        <p className="text-xs text-red-400 mt-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default AuthInput;