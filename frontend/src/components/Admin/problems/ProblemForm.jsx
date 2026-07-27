import { X } from "lucide-react";
import { useState, useEffect } from "react";
import BasicInfoSection from "../Drawer/BasicInfoSection";
import DescriptionSection from "../Drawer/DescriptionSection";
import ExamplesSection from "../Drawer/ExampleSection";
import TestCaseEditor from "../Drawer/TestCaseEditor";



export default function ProblemForm({
  open,
  onClose,
  children,
  onSubmit,
  title = "Create Problem",
}) {

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    difficulty: "EASY",
    tags: "",
    isPublished: true,
    statement: "",
    inputFormat: "",
    outputFormat: "",
    notes: "",
  });

  const [examples, setExamples] = useState([
    {
      input: "",
      output: "",
      explanation: "",
    }
  ]);

  const [testCases, setTestCases] = useState([
    {
      input: "",
      output: "",
      isHidden: false,
    }
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      slug: prev.title.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "")
    }));
  }, [formData.title]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    title: formData.title,

    slug: formData.slug,
    
    difficulty: formData.difficulty,

    tags: formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),

    isPublished: formData.isPublished,

    problemStatement:{
      statement:formData.statement,

      inputFormat:formData.inputFormat,

      outputFormat: formData.outputFormat,

      constraints: formData.constraints,

      notes: formData.notes,

    },
    testCases,
  };

  await onSubmit(payload);
};


  return (
    <>
      {/* Overlay */}

      <div
        onClick={onClose}
        className={`
          fixed
          inset-0
          z-40
          bg-black/60
          backdrop-blur-sm
          transition-opacity
          duration-300

          ${open
            ? "opacity-100 visible"
            : "opacity-0 invisible"
          }
        `}
      />

      {/* Drawer */}

      <div
        className={`
          fixed
          right-0
          top-0
          z-50
          flex
          h-screen
          w-full
          max-w-3xl
          flex-col
          border-l
          border-zinc-800
          bg-zinc-950
          shadow-2xl
          transition-transform
          duration-300

          ${open
            ? "translate-x-0"
            : "translate-x-full"
          }
        `}
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b border-zinc-800 p-6">

          <div>

            <h2 className="text-2xl font-bold text-white">
              {title}
            </h2>

            <p className="mt-1 text-zinc-400">
              Create and manage coding problems.
            </p>

          </div>

          <button
            onClick={onClose}
            className="
              rounded-xl
              p-2
              text-zinc-400
              transition
              hover:bg-zinc-800
              hover:text-white
            "
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="flex-1 overflow-y-auto p-6">

          <form 
          onSubmit={handleSubmit}          
          className="space-y-6">

            <BasicInfoSection
              formData={formData}
              handleChange={handleChange}
            />

            <DescriptionSection
              formData={formData}
              handleChange={handleChange}
            />

            <ExamplesSection
              examples={examples}
              setExamples={setExamples}
            />

            <TestCaseEditor
              testCases={testCases}
              setTestCases={setTestCases}
            />

            <div className="border-t border-zinc-800 bg-zinc-950 p-5">
              <div className="flex justify-end gap-3">

                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-zinc-700 px-5 py-2 text-white hover:bg-zinc-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-yellow-400 px-5 py-2 font-semibold text-black hover:bg-yellow-300"
                >
                  Create Problem
                </button>

              </div>
            </div>


          </form>

        </div>





      </div>
    </>
  );
}