function HeroContent() {
  return (
    <div className="space-y-8">
      {/* Heading */}
      <div className="space-y-2">

        <h1
          className="
            text-5xl
            sm:text-6xl
            lg:text-7xl
            font-black
            leading-[1.05]
            tracking-tight
          "
          style={{ color: "var(--text-primary)" }}
        >
          Code.
        </h1>

        <h1
          className="
            text-5xl
            sm:text-6xl
            lg:text-7xl
            font-black
            leading-[1.05]
            tracking-tight
          "
          style={{ color: "var(--text-primary)" }}
        >
          Compete.
        </h1>

        <h1
          className="
            text-5xl
            sm:text-6xl
            lg:text-7xl
            font-black
            leading-[1.05]
            tracking-tight
            font-serif
          "
          style={{ color: "var(--accent)" }}
        >
          Conquer.
        </h1>

      </div>

      {/* Description */}

      <p
        className="
          max-w-2xl
          text-base
          sm:text-lg
          font-extrabold
          leading-relaxed
        "
        style={{ color: "var(--text-secondary)" }}
      >
        Practice coding, solve real interview questions,
        participate in contests, and master data structures &
        algorithms on a premium online judge built for
        students, developers, and competitive programmers.
      </p>

    </div>
  );
}

export default HeroContent;