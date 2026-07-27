import { useEffect, useState } from "react";
import { toast } from "react-hot-toast"
import { getAdminProblems, createProblem, createTestCase, getProblemBySlug, getProblemTestCases, updateProblem, updateTestCase, deleteTestCase, deleteProblem } from "../services/admin.service";

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

        console.log("creating testcase: ", testCase)

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

  const handleEditProblem = async (slug) => {

    try {

      const problemResponse = await getProblemBySlug(slug);

      const problem = problemResponse.data;

      const testcaseResponse = await getProblemTestCases(problem._id);

      return {
        problem,
        testCases: testcaseResponse.data,
      };

    } catch (error) {

      console.error(error);

      toast.error("Unable to load problem.");

      return null;

    }

  };

  const handleUpdateProblem = async (slug, payload) => {

    try {

      const { testCases, ...problemPayload } = payload;

      await updateProblem(slug, problemPayload);

      for (const testCase of testCases) {

        await updateTestCase(testCase._id, {
          input: testCase.input,
          expectedOutput: testCase.expectedOutput,
          explanation: testCase.explanation,
          isHidden: testCase.isHidden,
        });

      }

      toast.success("Problem updated successfully!");

      await fetchProblems();

      return true;

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to update problem."
      );

      return false;
    }

  };


  const handleDeleteProblem = async (slug) => {

    try {

      await deleteProblem(slug);

      toast.success("Problem deleted successfully!");

      await fetchProblems();

      return true;

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Unable to delete problem."
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
    handleEditProblem,
    handleUpdateProblem,
    handleDeleteProblem
  };
}