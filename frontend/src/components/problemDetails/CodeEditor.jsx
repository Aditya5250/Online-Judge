import Editor from "@monaco-editor/react";

import EditorToolbar from "./EditorToolbar";

const languageMap = {
  CPP: "cpp",
  JAVA: "java",
  PYTHON: "python",
};

const CodeEditor = ({
  language,
  setLanguage,
  code,
  setCode,
  running,
  submitting,
}) => {
  return (
    <section className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)]">

      {/* ===========================
            Toolbar
      ============================ */}

      <div className="border-b border-[var(--border)]">
        <EditorToolbar
          language={language}
          setLanguage={setLanguage}
          running={running}
          submitting={submitting}
        />
      </div>

      {/* ===========================
            Monaco
      ============================ */}

      <div className="flex-1 overflow-hidden">

        <Editor
          height="100%"
          width="100%"
          language={languageMap[language]}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          loading="Loading editor..."
          options={{
            minimap: {
              enabled: false,
            },

            automaticLayout: true,

            fontSize: 15,

            fontFamily:
              "'JetBrains Mono', 'Fira Code', monospace",

            fontLigatures: true,

            smoothScrolling: true,

            cursorBlinking: "smooth",

            cursorSmoothCaretAnimation: "on",

            scrollBeyondLastLine: false,

            wordWrap: "off",

            padding: {
              top: 18,
            },

            tabSize: 4,

            renderLineHighlight: "gutter",

            scrollbar: {
              verticalScrollbarSize: 8,
              horizontalScrollbarSize: 8,
            },
          }}
        />

      </div>

    </section>
  );
};

export default CodeEditor;