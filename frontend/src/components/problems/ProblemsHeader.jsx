function ProblemsHeader(){
    return(
        <section className="mb-12">
            {/* small badge */}
            <div style={{background:"radial-gradient(circle at top right, rgba(255,221,120,.06), transparent 45%)"}}/>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6"
            style={{background:"rgba(255,255,255,0.03",borderColor:"var(--border"}}
            >
                <span className="text-lg">
                    📚
                </span>
                <span className="text-sm font-medium tracking-wide"
                    style={{color:"var(--text-secondary)"}}
                >
                    Practice. Learn. Improve
                </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:txt-5xl lg:text-6xl font-extrabold tracking-tight mb-5"
                style={{color:"var(--text-primary)"}}
            >
                Problems
            </h1>
            {/* subtitle */}

            <p className=" max-w-3xl text-base sm:text-lg leading-relaxed"
                style={{color:"var(--text-secondary)"}}
            >
                Explore Coding Challenges covering arrays, graphs, dynamic programming, trees, mathematics, and more.
                Practice consistently and stengthen your problem-solving skills.
            </p>
            

        </section>
    )
}

export default ProblemsHeader;