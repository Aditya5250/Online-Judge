import { useEffect, useState } from "react";
import {useParams} from "react-router-dom"
import {
  PanelGroup,
  Panel,
  PanelResizeHandle,
} from "react-resizable-panels";

import ProblemDescription from "../../components/problemDetails/ProblemDescription";
import CodeEditor from "../../components/problemDetails/CodeEditor";
import TestcasePanel from "../../components/problemDetails/TestcasePanel";
import { getProblemBySlug } from "../../services/problem.service";
import {getPublicTestCases} from "../../services/testcase.service";

import { EDITOR_TEMPLATES } from "../../constants/editorTemplates";

const ProblemDetails = () => {
  // ============================
  // Backend State
  // ============================

  const {slug}= useParams();


  const [testCases, setTestCases] = useState([]);

  const [problem,setProblem] = useState(null);

  const fetchProblem=async()=>{
    try{
        const data=await getProblemBySlug(slug);
        setProblem(data);

        const PublicCases = await getPublicTestCases(data._id);

        setTestCases(PublicCases);

    }
    catch(err){
        console.error("Failed to fetch problem ", err);
    }
  }


  useEffect(()=>{
    if(slug){
      fetchProblem();
    }
  },[slug]);


  // ============================
  // Editor State
  // ============================

  const [language, setLanguage] = useState("CPP");
  const [code, setCode] = useState(EDITOR_TEMPLATES.CPP);

  useEffect(() => {
    setCode(EDITOR_TEMPLATES[language] || "");
  }, [language]);

  // ============================
  // Bottom Panel
  // ============================

  const [activeTab, setActiveTab] = useState("testcases");
  const [output, setOutput] = useState("");

  // ============================
  // Execution State
  // ============================

  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  return (
    <main className="h-[calc(100vh-88px)] overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="mx-auto h-full max-w-[1700px] px-4 py-5">

        <PanelGroup
          direction="horizontal"
          className="h-full w-full"
        >

          {/* ======================================
                    LEFT PANEL
          ====================================== */}

          <Panel
            defaultSize={45}
            minSize={30}
          >
            <ProblemDescription
              problem={problem}
            />
          </Panel>

          {/* Resize Handle */}

          <PanelResizeHandle className="group flex w-2 cursor-col-resize items-center justify-center">

            <div className="h-24 w-[3px] rounded-full bg-[var(--border)] transition-all duration-200 group-hover:bg-[var(--accent)]" />

          </PanelResizeHandle>

          {/* ======================================
                    RIGHT PANEL
          ====================================== */}

          <Panel
            defaultSize={55}
            minSize={30}
          >

            <PanelGroup
              direction="vertical"
              className="h-full"
            >

              {/* ============================
                    CODE EDITOR
              ============================ */}

              <Panel
                defaultSize={65}
                minSize={35}
              >

                <CodeEditor
                  language={language}
                  setLanguage={setLanguage}
                  code={code}
                  setCode={setCode}
                  running={running}
                  submitting={submitting}
                  setRunning={setRunning}
                  setSubmitting={setSubmitting}
                />

              </Panel>

              {/* Resize Handle */}

              <PanelResizeHandle className="group flex h-2 cursor-row-resize items-center justify-center">

                <div className="h-[3px] w-24 rounded-full bg-[var(--border)] transition-all duration-200 group-hover:bg-[var(--accent)]" />

              </PanelResizeHandle>

              {/* ============================
                    TESTCASES
              ============================ */}

              <Panel
                defaultSize={35}
                minSize={20}
              >

                <TestcasePanel
                  testCases={testCases}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  output={output}
                />

              </Panel>

            </PanelGroup>

          </Panel>

        </PanelGroup>

      </div>
    </main>
  );
};

export default ProblemDetails;