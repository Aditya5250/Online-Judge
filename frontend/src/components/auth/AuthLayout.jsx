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
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center p-5">

        {/* Main Card */}
        <div className="grid w-full overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-secondary)] shadow-2xl lg:grid-cols-2">

          {/* Left Side */}
          <section className="hidden flex-col justify-between bg-gradient-to-br from-[#1b1b1b] via-[#222] to-[#131313] p-12 lg:flex">

            <div>
              <div className="mb-8 flex items-center gap-4">

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[var(--accent)]
                    text-xl
                    font-bold
                    text-black
                  "
                >
                  JX
                </div>

                <div>
                  <h1 className="text-4xl font-black text-white">
                    JudgeX
                  </h1>

                  <p className="mt-1 text-sm text-gray-400">
                    Practice. Improve. Get Hired.
                  </p>
                </div>
              </div>

              <h2 className="max-w-md text-5xl font-black leading-tight text-white">
                Master Coding Interviews.
              </h2>

              <p className="mt-6 max-w-md text-lg leading-relaxed text-gray-400">
                Build consistency by solving problems, analyzing submissions,
                and improving every single day.
              </p>
            </div>

            <div className="space-y-5">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="
                    flex
                    gap-4
                    rounded-2xl
                    border
                    border-[var(--border)]
                    bg-white/5
                    p-5
                  "
                >
                  <div className="text-[var(--accent)]">
                    {feature.icon}
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">
                      {feature.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </section>

          {/* Right Side */}
          <section className="flex items-center justify-center p-8 lg:p-14">

            <div className="w-full max-w-md">

              {/* Mobile Logo */}
              <div className="mb-10 flex justify-center lg:hidden">

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      bg-[var(--accent)]
                      font-bold
                      text-black
                    "
                  >
                    JX
                  </div>

                  <h2 className="text-3xl font-black text-white">
                    JudgeX
                  </h2>

                </div>

              </div>

              <h2 className="text-4xl font-black text-white">
                {title}
              </h2>

              <p className="mt-3 text-gray-400">
                {subtitle}
              </p>

              <div className="mt-10">
                {children}
              </div>

            </div>

          </section>

        </div>

      </div>
    </main>
  );
};

export default AuthLayout;