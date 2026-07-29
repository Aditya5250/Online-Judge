import { Sparkles } from "lucide-react";

export default function AIHintButton({
    onClick,
}) {

    return (

        <button
            onClick={onClick}
            className="
                group
                flex
                items-center
                gap-2
                rounded-lg
                border
                border-yellow-400/30
                bg-yellow-400/10
                px-4
                py-2
                text-sm
                font-medium
                text-yellow-300
                transition-all
                duration-200
                hover:border-yellow-300
                hover:bg-yellow-400/20
            "
        >

            <Sparkles
                size={16}
                className="
                    transition-transform
                    duration-300
                    group-hover:rotate-12
                "
            />

            AI Mentor

        </button>

    );

}