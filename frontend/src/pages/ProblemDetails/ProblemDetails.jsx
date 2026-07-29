import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import {
  PanelGroup,
  Panel,
  PanelResizeHandle,
} from "react-resizable-panels";

import { runCode, submitCode } from "../../services/submission.service";
import ProblemDescription from "../../components/problemDetails/ProblemDescription";
import CodeEditor from "../../components/problemDetails/CodeEditor";
import TestcasePanel from "../../components/problemDetails/TestcasePanel";
import { getProblemBySlug } from "../../services/problem.service";
import { getPublicTestCases } from "../../services/testcase.service";
import toast from "react-hot-toast";
import { EDITOR_TEMPLATES } from "../../constants/editorTemplates";
import AIHintDrawer from "../../components/problemDetails/AIHintDrawer";

const ProblemDetails = () => {
  // ============================
  // Backend State
  // ============================

  const { slug } = useParams();


  const [testCases, setTestCases] = useState([]);

  const [problem, setProblem] = useState(null);



  const fetchProblem = async () => {
    try {
      const data = await getProblemBySlug(slug);
      setProblem(data);

      const PublicCases = await getPublicTestCases(data._id);

      setTestCases(PublicCases);

    }
    catch (err) {
      console.error("Failed to fetch problem ", err);
    }
  }


  useEffect(() => {
    if (slug) {
      fetchProblem();
    }
  }, [slug]);


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
  const [output, setOutput] = useState(null);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [outputMode, setOutputMode] = useState("run");

  // ============================
  // Execution State
  // ============================


  const [running, setRunning] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [selectedCase, setSelectedCase] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  //============================
  // AI Hint
  //============================

  const [showAI, setShowAI]=useState(false);


  // ============================
  // Handlers
  // ============================

  {/* Run Code Handler */ }

  const handleRunCode = async () => {

    if (running || submitting) {
      return;
    }


    if (!code.trim()) {
      toast.error("Please write some code first.");
      return;
    }

    setActiveTab("output");
    setOutputMode("run");
    setSubmissionResult(null);


    //we will use custom input if custom tab is active, otherwise we will use the first test case
    const input =
      activeTab === "custom"
        ? customInput
        : testCases[selectedCase]?.input || "";

    try {

      setRunning(true);

      const payload = {
        language,
        sourceCode: code,
        input,
      };

      console.log("Payload: ", payload);

      const response = await runCode(payload);

      setOutput(response.data);


    } catch (error) {

      console.error("========== RUN ERROR ==========");
      console.error(error);

      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
      } else {
        console.error("No response received.");
      }

      toast.error(
        error.response?.data?.message ||
        "Failed to run code."
      );
    } finally {
      setRunning(false);
    }
  };


  {/* Submit Code Handler */ }

  const handleSubmit = async () => {

    if (running || submitting) {
      return;
    }

    if (!code.trim()) {
      toast.error("Please write some code first.");
      return;
    }



    try {

      setSubmitting(true);

      setActiveTab("output");
      setOutputMode("submit");
      setOutput(null);


      setSubmissionResult(null);

      const payload = {
        problemId: problem._id,
        language,
        sourceCode: code,
      };

      console.log(payload);

      const response = await submitCode(payload);

      setSubmissionResult(response.data);

      toast.success("Submission judged successfully!");

    } catch (error) {

      console.error("======= SUBMIT ERROR =======");
      console.error(error);

      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
      } else {
        console.error("No response received.");
      }

      toast.error(
        error.response?.data?.message ||
        "Submission failed."
      );
    } finally {

      setSubmitting(false);

    }

  };




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
                  handleRunCode={handleRunCode}
                  handleSubmit={handleSubmit}
                  onOpenAI={()=>setShowAI(true)}
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
                  submissionResult={submissionResult}
                  running={running}
                  customInput={customInput}
                  setCustomInput={setCustomInput}
                  outputMode={outputMode}
                  selectedCase={selectedCase}
                  setSelectedCase={setSelectedCase}
                />

              </Panel>

            </PanelGroup>

          </Panel>

        </PanelGroup>

      </div>


      <AIHintDrawer
        isOpen={showAI}
        onClose={()=>setShowAI(false)}
        problemId={problem?._id}
      />

    </main>
  );
};

export default ProblemDetails;