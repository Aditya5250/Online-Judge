import { useState } from "react";
import toast from "react-hot-toast";
import { getAIHints } from "../services/ai.service";

export default function useAIHints() {

    const [loading, setLoading] = useState(false);

    const [hints, setHints] = useState([]);

    const [visibleHints, setVisibleHints] = useState(0);

    const resetHints =()=>{
        setHints([]);
        setVisibleHints(0);
    }

    const fetchHints = async (problemId) => {

        try {

            setLoading(true);

            const response = await getAIHints(problemId);

            setHints(response.data);

            setVisibleHints(1);

        } catch (error) {

            console.error(error);

            if(error.response?.status === 401 || error.response?.status === 403){
                toast.error("Please log in to use AI Mentor")
            }
            else{

                toast.error("Failed to generate AI hints.");

            }

            

        } finally {

            setLoading(false);

        }

    };

    const revealNextHint = () => {

        setVisibleHints((prev) => Math.min(prev + 1, 3));

    };

    return {

        loading,

        hints,

        visibleHints,

        fetchHints,

        revealNextHint,

        resetHints,

    };

}