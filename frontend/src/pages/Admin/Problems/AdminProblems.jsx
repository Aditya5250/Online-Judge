import ProblemHeader from "../../../components/Admin/problems/ProblemHeader";
import ProblemTable from "../../../components/Admin/problems/ProblemTable";
import useAdminProblems from "../../../hooks/useAdminProblem";
import ProblemForm from "../../../components/Admin/problems/ProblemForm";
import { use, useState } from "react";
import DeleteProblemModal from "../../../components/Admin/problems/DeleteProblemModal";

export default function AdminProblems() {

    const [openForm, setOpenForm] = useState(false);

    const [mode, setMode] = useState("create");

    const [selectedProblem, setSelectedProblem] = useState(null);

    const [selectedTestCase, setSelectedTestCase] = useState([]);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [problemToDelete, setProblemToDelete] = useState(null)

    const {
        problems,
        loading,
        handleCreateProblem,
        handleEditProblem,
        handleUpdateProblem,
        handleDeleteProblem

    } = useAdminProblems();

    return (
        <div>

            <ProblemHeader
                onCreate={() => {
                    setMode("create");
                    setSelectedProblem(null);
                    setOpenForm(true);
                }
                }
            />

            <ProblemTable
                problems={problems}
                loading={loading}
                onEdit={async (problem) => {
                    const data = await handleEditProblem(problem.slug);

                    if (!data) return;

                    setMode("edit");
                    setSelectedProblem(data.problem);
                    setSelectedTestCase(data.testCases);
                    setOpenForm(true);


                }}

                onDelete={(problen) => {
                    setProblemToDelete(problen);
                    setDeleteOpen(true);
                }}
            />

            <ProblemForm
                open={openForm}
                mode={mode}
                initialProblem={selectedProblem}
                initialTestCases={selectedTestCase}
                onClose={() => setOpenForm(false)}
                onSubmit={async (payload) => {

                    if (mode === "create") {

                        const success = await handleCreateProblem(payload);

                        if (success) {
                            setOpenForm(false);
                        }

                    }

                    const success = await handleUpdateProblem(
                        selectedProblem.slug,
                        payload
                    );

                    if (success) {
                        setOpenForm(false);
                        setSelectedProblem(null);
                        setSelectedTestCases([]);
                    }
                }}
            >
                <div className="rounded-2xl border border-dashed border-zinx-700 p-12 text-center text-zinc-500">

                </div>

            </ProblemForm>

            <DeleteProblemModal
                open={deleteOpen}
                problem={problemToDelete}
                onClose={() => {

                    setDeleteOpen(false);

                    setProblemToDelete(null);

                }}
                onConfirm={async () => {

                    const success = await handleDeleteProblem(
                        problemToDelete.slug
                    );

                    if (success) {

                        setDeleteOpen(false);

                        setProblemToDelete(null);

                    }

                }}
            />

        </div>
    );
}