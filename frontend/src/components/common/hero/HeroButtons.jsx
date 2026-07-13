import {Link} from "react-router-dom";
import {ArrowRight} from "lucide-react";
function HeroButtons(){

    return (
        <div className="mt-10 flex flex-col sm:flex-row gap-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--accent)]">
            {/* Primary Button */}
            <Link 
                to="/problems"
                className="
                    group
                    inline-flex
                    items-center
                    justify-center
                    gap-2

                    px-8
                    py-4
                    rounded-2xl

                    font-semibold
                    text-base

                    transition-all
                    duration-300

                    
                    hover:scale-105
                    box-shadow: 0 12px 40px rgba(239,211,149,.25);
                    hover:shadow-xl
                "
                style={{background:"var(--accent)",color:"var(--text-primary)"}}
            >
                Start Solving 
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-2"/>

            </Link>
            {/* Secondary Button */}
            <Link to="/problems"
                className="
                    inline-flex
                    items-center
                    justify-center
                    px-8
                    py-4
                    rounded-2xl
                    font-medium

                    backdrop-blur-lg

                    transition-all
                    duration-300

                    hover:scale-105
                    hover:bg-[var(--bg-card)]
                "
                style={{borderColor:"var(--border)",color:"var(--text-primary)"}}
            >
                Explore Problems
            
            </Link>


        </div>
    )
}
export default HeroButtons;
