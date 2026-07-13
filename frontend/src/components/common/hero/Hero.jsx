import HeroBadge from "./HeroBadge";
import HeroContent from "./HeroContent";
import HeroButtons from "./HeroButtons";
import HeroCodePreview from "./HeroCodePreview";
function Hero(){
    return (
        <section className="relative overflow-hidden min-h-screen flex items-center">
            {/* Background Effects */}
            
            <div className="absolute -top-44 -left-44 h-[500px] w-[500px] blur-[150px] rounded-full blur-[120px] opacity-15" style={{ background: "var(--accent)"}}/>
            <div className="absolute -bottom-0 right-0 h-[420px] w-[420px] blur-[140px] rounded-full blur-[120px] opacity-10" style={{ background: "var(--accent)"}} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[250px] w-[250px] rounded-full blur-[120px] opacity-5" style={{background:"white"}}/>
            <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage:"linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px))",backgroundSize:"60px 60px"}}/>
            <div className="absolute inset-0 pointer-events-none" style={{background:"radial-gradient(circle at center, transparent 35%, rgba(19,19,19,0.55) 100%"}} />
            {/* Main Content */}
            <div className="relative z-10 mx-auto w-[92%] max-w-[1440px] pt-25 lg:pt-35 pb-16">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 xl:gap-28 items-center lg:items-center">
                    {/* Left */}
                    <div className="lg:col-span-3" >
                        <HeroBadge />
                        <HeroContent />
                        <HeroButtons />


                    </div>

                    <div className="lg:col-span-2">
                        {/*Right */}
                        <HeroCodePreview />

                    </div>
                    
                    
                    
                </div>

            </div>

            

        </section>

    );
}

export default Hero;