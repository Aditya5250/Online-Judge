import { useEffect, useState } from "react";

import ProblemsHeader from "../../components/problems/ProblemsHeader";
import ProblemsToolbar from "../../components/problems/ProblemsToolbar";
import ProblemsTable from "../../components/problems/ProblemsTable";
import LoadingState from "../../components/problems/LoadingState";
import EmptyState from "../../components/problems/EmptyState";
import ErrorState from "../../components/problems/ErrorState";

import { getAllProblems } from "../../services/problem.service";

function Problems() {

    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [search, setSearch] = useState("");
    const [difficulty, setDifficulty] = useState("All");
   

    const fetchProblems = async () => {
        try {
            setLoading(true);

            const data = await getAllProblems();

            setProblems(data);
            setError(false);

        } catch (err) {
            console.error(err);
            setError(true);

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProblems();
    }, []);

    const filteredProblems = problems.filter((problem) => {

        const matchesSearch =
            problem.title
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesDifficulty =
            difficulty === "All" ||
            problem.difficulty === difficulty.toUpperCase();

        return matchesSearch && matchesDifficulty;
    });

     const resetFilters=()=>{
        setSearch("");
        setDifficulty("All");
    };

    return (
        <main
            className="min-h-screen pt-18 pb-20"
            style={{ background: "var(--bg-primary)" }}
        >
            <div className="w-[92%] max-w-7xl mx-auto">

                <ProblemsHeader />

                <ProblemsToolbar
                    search={search}
                    setSearch={setSearch}
                    difficulty={difficulty}
                    setDifficulty={setDifficulty}
                />

                {loading ? (
                    <LoadingState />
                ) : error ? (
                    <ErrorState onRetry={fetchProblems} />
                ) : filteredProblems.length === 0 ? (
                    <EmptyState onResetFilters={resetFilters}/>
                ) : (
                    <ProblemsTable
                        problems={filteredProblems}
                    />
                )}

            </div>
        </main>
    );
}

export default Problems;