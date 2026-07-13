import Hero from "../../components/common/hero/Hero.jsx";
import FeaturedProblems from "../../components/common/featured/FeaturedProblems.jsx";
import Footer from "../../components/common/footer.jsx";

function Home() {
    return (
        <div>
            <Hero />
            <div className="w-24 h-px mx-auto mb-20 " style={{ background: "linear-gradient(to right, transparent, var(--accent),transparent)" }} />
            <FeaturedProblems />
            
            <Footer />

        </div>
    );
}

export default Home;