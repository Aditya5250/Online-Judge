import { Code2, Trophy, BrainCircuit } from "lucide-react";

const FEATURES = [
  {
    icon: <Code2 size={22} />,
    title: "Solve Coding Problems",
    description: "Practice curated DSA questions with a modern coding experience.",
  },
  {
    icon: <BrainCircuit size={22} />,
    title: "AI Powered Reviews",
    description: "Receive intelligent feedback on your solutions after submission.",
  },
  {
    icon: <Trophy size={22} />,
    title: "Track Your Progress",
    description: "Monitor submissions, rankings, and improve every day.",
  },
];

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-3 sm:p-5 lg:p-6">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl sm:rounded-3xl border border-[var(--border)] bg-[var(--bg-secondary)] shadow-2xl grid lg:grid-cols-2 my-auto">

        {/* Left Side (Branding & Features) */}
        <section className="hidden flex-col justify-between bg-gradient-to-br from-[#1b1b1b] via-[#222] to-[#131313] p-7 xl:p-8 lg:flex border-r border-[var(--border)]">

          <div>
            <div className="flex items-center gap-3">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-[var(--accent)]
                  text-lg
                  font-bold
                  text-black
                  shadow-md
                "
              >
                JX
              </div>

              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">
                  JudgeX
                </h1>

                <p className="text-xs text-gray-400">
                  Practice. Improve. Get Hired.
                </p>
              </div>
            </div>

            <h2 className="mt-6 text-2xl xl:text-3xl font-bold leading-snug text-white">
              Master Coding Interviews.
            </h2>

            <p className="mt-2 text-xs xl:text-sm leading-relaxed text-gray-400">
              Build consistency by solving problems, analyzing submissions,
              and improving every single day.
            </p>
          </div>

          <div className="space-y-2.5 mt-6">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-xl
                  border
                  border-[var(--border)]
                  bg-white/5
                  p-3
                  transition-all
                  duration-200
                  hover:bg-white/[0.08]
                "
              >
                <div className="text-[var(--accent)] shrink-0">
                  {feature.icon}
                </div>

                <div className="min-w-0">
                  <h3 className="text-xs font-semibold text-white truncate">
                    {feature.title}
                  </h3>

                  <p className="text-[11px] text-gray-400 line-clamp-1">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* Right Side (Authentication Form) */}
        <section className="flex items-center justify-center p-5 sm:p-7 lg:p-8 xl:p-9">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="mb-5 flex justify-center lg:hidden">
              <div className="flex items-center gap-2.5">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-lg
                    bg-[var(--accent)]
                    font-bold
                    text-black
                    text-sm
                  "
                >
                  JX
                </div>

                <h2 className="text-2xl font-black text-white">
                  JudgeX
                </h2>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {title}
            </h2>

            <p className="mt-1 text-xs sm:text-sm text-gray-400">
              {subtitle}
            </p>

            <div className="mt-5">
              {children}
            </div>

          </div>

        </section>

      </div>
    </main>
  );
};

export default AuthLayout;