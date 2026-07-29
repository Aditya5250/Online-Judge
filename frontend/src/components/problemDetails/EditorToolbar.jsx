import LanguageSelector from "./LanguageSelector";
import RunSubmitButtons from "./RunSubmitButtons";
import AIHintButton from "./AskHintButton";

const EditorToolbar = ({
  language,
  setLanguage,
  running,
  submitting,
  handleRunCode,
  handleSubmit,
  onOpenAI,
}) => {
  return (
    <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
      <LanguageSelector
        language={language}
        setLanguage={setLanguage}
      />

      <div className="flex items-center gap-3">

        <AIHintButton
          onClick={onOpenAI}
        />

        <RunSubmitButtons
          running={running}
          submitting={submitting}
          handleRunCode={handleRunCode}
          handleSubmit={handleSubmit}
        />

      </div>
    </div>
  );
};

export default EditorToolbar;