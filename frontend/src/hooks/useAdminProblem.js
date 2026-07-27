import { useEffect, useState } from "react";
import { toast } from "react-hot-toast"
import { getAdminProblems, createProblem, createTestCase } from "../services/admin.service";

export default function useAdminProblems() {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCreateProblem = async (payload) => {
    try {

        
        const { testCases, ...problemPayload } = payload;

        
        const response = await createProblem(problemPayload);
        

        
        const problemId = response.data._id;

        

        // Creating all test cases
        for (const testCase of testCases) {

          console.log("creating testcase: ",testCase)

            await createTestCase({
                problemId,
                input: testCase.input,
                expectedOutput: testCase.expectedOutput,
                explanation: testCase.explanation,
                isHidden: testCase.isHidden,
            });

        }

        toast.success("Problem created successfully!");

        await fetchProblems();

        return true;

    } catch (error) {

        console.error(error);

        toast.error(
            error.response?.data?.message ||
            "Failed to create problem."
        );

        return false;
    }
};

  const fetchProblems = async () => {
    try {
      setLoading(true);

      const response = await getAdminProblems();

      setProblems(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  return {
    problems,
    loading,
    refreshProblems: fetchProblems,
    handleCreateProblem,
  };
}