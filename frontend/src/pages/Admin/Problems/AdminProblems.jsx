import ProblemHeader from "../../../components/Admin/problems/ProblemHeader";
import ProblemTable from "../../../components/Admin/problems/ProblemTable";
import useAdminProblems from "../../../hooks/useAdminProblem";
import ProblemForm from "../../../components/Admin/problems/ProblemForm";
import { useState } from "react";

export default function AdminProblems() {

    const [openForm,setOpenForm]=useState(false);
    
    const [mode,setMode]= useState("create");

    const [selectedProblem,setSelectedProblem]=useState(null);

    const {
        problems,
        loading,
        handleCreateProblem,

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
                onEdit={(problem)=>{
                    console.log("Edit Clicked",problem);
                    setMode("edit");
                    setSelectedProblem(problem);
                    setOpenForm(true);
                }}

                onDelete={(problen)=>{
                    console.log("Delete Clicked",problen);
                }}
            />

            <ProblemForm 
                open={openForm}
                mode={mode}
                initialProblem={selectedProblem}
                onClose={()=>setOpenForm(false)}

                onSubmit={async (payload)=>{
                    if(mode==="create"){
                        const success=await handleCreateProblem(payload);
                        if(success){
                            setOpenForm(false);
                        }

                    }  
                    else{
                        //update
                    }
                }}
            >

                <div className="rounded-2xl border border-dashed border-zinx-700 p-12 text-center text-zinc-500">

                </div>

            </ProblemForm>

        </div>
    );
}