export default function DescriptionSection({
    formData,
    handleChange,
}) {
    return (
        <section className="space-y-6">

            <h3 className="text-xl font-semibold text-white">
                📖 Problem Statement
            </h3>

            {/* Statement */}

            <div>

                <label className="mb-2 block font-medium text-white">
                    Statement
                </label>

                <textarea
                    rows={8}
                    name="statement"
                    value={formData.statement}
                    onChange={handleChange}
                    placeholder="Describe the problem..."
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white outline-none focus:border-yellow-400"
                />

            </div>

            {/* Input Format */}

            <div>

                <label className="mb-2 block font-medium text-white">
                    Input Format
                </label>

                <textarea
                    rows={3}
                    name="inputFormat"
                    value={formData.inputFormat}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white outline-none focus:border-yellow-400"
                />

            </div>

            {/* Output Format */}

            <div>

                <label className="mb-2 block font-medium text-white">
                    Output Format
                </label>

                <textarea
                    rows={3}
                    name="outputFormat"
                    value={formData.outputFormat}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white outline-none focus:border-yellow-400"
                />

            </div>

            {/* Constraints */}

            <div>

                <label className="mb-2 block font-medium text-white">
                    Constraints
                </label>

                <textarea
                    rows={4}
                    name="constraints"
                    value={formData.constraints}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white outline-none focus:border-yellow-400"
                />

            </div>

            {/* Notes */}

            <div>

                <label className="mb-2 block font-medium text-white">
                    Additional Notes (Optional)
                </label>

                <textarea
                    rows={3}
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 p-4 text-white outline-none focus:border-yellow-400"
                />

            </div>

        </section>
    );
}