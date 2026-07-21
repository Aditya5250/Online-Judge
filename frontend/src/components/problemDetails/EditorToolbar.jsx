import LanguageSelector from "./LanguageSelector";
import RunSubmitButtons from "./RunSubmitButtons";

const EditorToolbar = ({
  language,
  setLanguage,
  running,
  submitting,
}) => {
  return (
    <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
      <LanguageSelector
        language={language}
        setLanguage={setLanguage}
      />

      <RunSubmitButtons
        running={running}
        submitting={submitting}
      />
    </div>
  );
};

export default EditorToolbar;