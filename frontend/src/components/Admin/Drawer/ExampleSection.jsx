import { Plus, Trash2 } from "lucide-react";

export default function ExamplesSection({
  examples,
  setExamples,
}) {
  const handleChange = (index, field, value) => {
    const updated = [...examples];

    updated[index][field] = value;

    setExamples(updated);
  };

  const addExample = () => {
    setExamples([
      ...examples,
      {
        input: "",
        output: "",
        explanation: "",
      },
    ]);
  };

  const removeExample = (index) => {
    setExamples(
      examples.filter((_, i) => i !== index)
    );
  };

  return (
    <section className="space-y-6">

      <div className="flex items-center justify-between">

        <h3 className="text-xl font-semibold text-white">
          💡 Examples
        </h3>

        <button
          type="button"
          onClick={addExample}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-yellow-400
            px-4
            py-2
            font-medium
            text-black
            transition
            hover:scale-105
          "
        >
          <Plus size={18} />

          Add Example
        </button>

      </div>

      {examples.map((example, index) => (
        <div
          key={index}
          className="
            space-y-4
            rounded-2xl
            border
            border-zinc-800
            bg-zinc-900
            p-5
          "
        >
          <div className="flex items-center justify-between">

            <h4 className="font-semibold text-white">
              Example {index + 1}
            </h4>

            {examples.length > 1 && (
              <button
                type="button"
                onClick={() => removeExample(index)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 size={18} />
              </button>
            )}

          </div>

          <textarea
            rows={2}
            placeholder="Input"
            value={example.input}
            onChange={(e) =>
              handleChange(
                index,
                "input",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white outline-none focus:border-yellow-400"
          />

          <textarea
            rows={2}
            placeholder="Output"
            value={example.output}
            onChange={(e) =>
              handleChange(
                index,
                "output",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white outline-none focus:border-yellow-400"
          />

          <textarea
            rows={3}
            placeholder="Explanation"
            value={example.explanation}
            onChange={(e) =>
              handleChange(
                index,
                "explanation",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white outline-none focus:border-yellow-400"
          />

        </div>
      ))}

    </section>
  );
}