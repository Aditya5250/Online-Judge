import {Link} from "react-router-dom";
import {ArrowRight, FileText, Sparkles} from "lucide-react";
import {useAuth} from "../../context/AuthContext";


function DashboardHero(){
    const {user} =useAuth();

    const getGreeting =()=>{
        const hour=new Date().getHours();
    

        if (hour<12) return "Good Morning";
        if(hour<18) return "Good Afternoon";
        return "Good Evening";

    }


    return (
        <section
            className="
                rounded-3xl
                border
                shadow-xl
                backdrop-blur-xl
                p-6
                md:p-8
            "
            style={{background:"var(--bg-card)", borderColor:"var(--border)"}}


        >

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 ">
                    {/* Left */}
                <div className="space-y-5">
                    <div className="flex items-center gap-2">
                        <Sparkles size={22} style={{color:"var(--accent)"}} />
                        <h1 className="text-3xl md:text-4xl font-bold">
                            {getGreeting()}, {user?.fullname} 👋 
                        </h1>

                    </div>

                    <div className="space-y-2">

                        <p className="text-lg" style={{color:"var(--text-secondary)"}}> 
                            Welcome
                        </p>

                        <p className="text-sm md:text-base" style={{color:"var(--text-secondary)"}}>
                            Ready to solve your next challenge and climb the leaderboard??
                        </p>

                    </div>


                    {/* Right */}

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            to="/problems"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                            style={{background:"var(--accent)",color:"var(--bg-primary)"}}
                        >

                            Solve Problems
                            <ArrowRight size={18}/>

                        </Link>

                        <Link 
                        to="/submissions"
                        className="
                            inline-flex
                            items-center
                            justify-center
                            gap-2
                            px-6
                            py-3
                            rounded-xl
                            border
                            transition-all
                            duration-300
                            hover:bg-[var(--bg-secondary)]
                            
                        "
                        style={{borderColor:"var(--border)", color:"var(--text-primary)"}}

                        >
                            <FileText size={18} />
                            View Submissions

                        </Link>
                    </div>


                </div>

            </div>

        </section>
    )


}


export default DashboardHero;