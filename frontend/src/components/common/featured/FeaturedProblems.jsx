import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ProblemCard from "./ProblemCard";
import { getAllProblems } from "../../../services/problem.service";

function FeaturedProblems() {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const data = await getAllProblems();
                setProblems(data.slice(0, 4));
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProblems();
    }, []);

    return (
        <section className="w-[92%] max-w-7xl mx-auto py-24">

            <div className="text-center mb-14">
                <h2
                    className="text-4xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                >
                    Featured Problems
                </h2>

                <p
                    className="mt-4 text-lg"
                    style={{ color: "var(--text-secondary)" }}
                >
                    Hand-picked coding challenges to kickstart your journey.
                </p>
            </div>

            {loading ? (
                <p
                    className="text-center"
                    style={{ color: "var(--text-secondary)" }}
                >
                    Loading problems...
                </p>
            ) : (
                <>
                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

                        {problems.map((problem) => (
                            <ProblemCard
                                key={problem._id}
                                problem={problem}
                            />
                        ))}

                    </div>

                    <div className="flex justify-center mt-14">
                        <Link
                            to="/problems"
                            className="px-8 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105"
                            style={{
                                background: "var(--accent)",
                                color: "var(--bg-primary)",
                            }}
                        >
                            Explore All Problems →
                        </Link>
                    </div>
                </>
            )}
        </section>
    );
}

export default FeaturedProblems;