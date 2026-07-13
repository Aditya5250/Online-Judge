import { Link } from "react-router-dom";



function Footer() {
  return (
    <footer
      className="relative mt-15 border-t"
      style={{ borderColor: "var(--border)" }}
    >
      {/* Background Glow */}
      <div
        className="
          absolute
          inset-x-0
          top-0
          h-40
          blur-[100px]
          opacity-10
          pointer-events-none
        "
        style={{
          background: "var(--accent)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 py-16">

        {/* Top */}

        <div className="flex flex-col items-center text-center">

          {/* Logo */}

          <div className="flex items-center gap-3 mb-5">

            <div
              className="h-12 w-12 rounded-xl flex items-center justify-center font-bold text-lg"
              style={{
                background: "var(--accent)",
                color: "var(--bg-primary)",
              }}
            >
              JX
            </div>

            <h2
              className="text-2xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              JudgeX
            </h2>

          </div>

          <h3
            className="text-lg font-semibold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Code. Compete. Conquer.
          </h3>

          <p
            className="max-w-xl leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            A modern online judge for mastering data structures,
            algorithms, and coding interviews.
          </p>

        </div>

        {/* Navigation */}

        <div className="flex flex-wrap justify-center gap-8 mt-12">

          <Link to="/" className="hover:scale-105">Home</Link>

          <Link to="/problems" className="hover:scale-105">Problems</Link>

          <Link to="/login" className="hover:scale-105">Login</Link>

          <Link to="/register" className="hover:scale-105">Register</Link>

        </div>

        {/* Socials */}

        <div
          className="
            flex
            justify-center
            gap-6
            mt-10
          "
        >
          <a href="https://github.com/Aditya5250" className="hover:scale-110 transition">
              GitHub
          </a>

          <a href="https://www.linkedin.com/in/araaz5935/" className="hover:scale-110 transition">
            LinkedIn
          </a>

          <a href="adityaraj.dev22@gmail.com" className="hover:scale-110 transition">
            Email
          </a>

        </div>

        {/* Copyright */}

        <div
          className="
            mt-12
            pt-8
            border-t
            text-center
          "
          style={{
            borderColor: "var(--border)",
            color: "var(--text-secondary)",
          }}
        >
          © 2026 JudgeX • Built with React, Node.js, Express,
          MongoDB & Docker.
        </div>

      </div>
    </footer>
  );
}

export default Footer;