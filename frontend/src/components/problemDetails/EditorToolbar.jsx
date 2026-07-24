import LanguageSelector from "./LanguageSelector";
import RunSubmitButtons from "./RunSubmitButtons";

const EditorToolbar = ({
  language,
  setLanguage,
  running,
  submitting,
  handleRunCode,
  handleSubmit,
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
        handleRunCode={handleRunCode}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditorToolbar;