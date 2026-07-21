const LANGUAGES = [
  { value: "CPP", label: "C++" },
  { value: "JAVA", label: "Java" },
  { value: "PYTHON", label: "Python" },
];

const LanguageSelector = ({ language, setLanguage }) => {
  return (
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="
        appearance-none
        rounded-lg
        border
        border-[var(--border)]
        bg-[var(--bg-primary)]
        px-4
        py-2
        pr-10
        text-sm
        outline-none
        transition
        focus:border-[var(--accent)]
        focus:outline-none
        focus:ring-0
      "
    >
      {LANGUAGES.map((lang) => (
        <option key={lang.value} value={lang.value}>
          {lang.label}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;