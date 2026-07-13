function HeroCodePreview() {
  return (
    <div
      className="
        relative

        w-full
        max-w-xl

        mx-auto

        rounded-[28px]

        border

        overflow-hidden

        backdrop-blur-2xl

       

        animate-[float_6s_ease-in-out_infinite]
      "
      style={{
        background: "rgba(38,38,37,0.78)",
        borderColor: "rgba(255,255,255,0.08)",
        boxShadow:"0 30px 80px rgba(0,0,0,0.45)",
      }}
    >
        

      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between

          px-5
          py-4

          border-b
        "
        style={{
          borderColor: "var(--border)",
        }}
      >

        <div className="flex gap-2">

          <div className="w-3 h-3 rounded-full bg-red-400"/>

          <div className="w-3 h-3 rounded-full bg-yellow-400"/>

          <div className="w-3 h-3 rounded-full bg-green-400"/>

        </div>

        <span
          className="text-sm"
          style={{
            color:"var(--text-secondary)"
          }}
        >
          main.cpp
        </span>

        <span
          style={{
            color:"var(--accent)"
          }}
        >
          ●
        </span>

      </div>

      {/* Code */}

      <div
        className="
          px-6
          py-6

          font-mono

          text-sm

          space-y-2
        "
      >

        <div>
          <span style={{color:"#6B7280"}}>1</span>{" "}
          <span style={{color:"#7DD3FC"}}>#include</span>{" "}
          <span style={{color:"#F8F8F2"}}>{"<bits/stdc++.h>"}</span>
        </div>

        <div>
          <span style={{color:"#6B7280"}}>2</span>{" "}
          <span style={{color:"#C084FC"}}>using</span>{" "}
          <span style={{color:"#F8F8F2"}}>namespace</span>{" "}
          <span style={{color:"#FBBF24"}}>std</span>;
        </div>

        <div>
          <span style={{color:"#6B7280"}}>3</span>
        </div>

        <div>
          <span style={{color:"#6B7280"}}>4</span>{" "}
          <span style={{color:"#C084FC"}}>int</span>{" "}
          <span style={{color:"#60A5FA"}}>main</span>()
          {" {"}
        </div>

        <div >
          <span style={{color:"#6B7280"}}>5</span>{" "}
          <span className="pl-6" style={{color:"#60A5FA"}}>cout</span>
          {" << "}
          <span style={{color:"#86EFAC"}}>"Accepted"</span>;
        </div>

        <div>
          <span style={{color:"#6B7280"}}>6</span>{" "}
          {"}"}
        </div>

      </div>

      {/* Footer */}

      <div
        className="
          border-t

          px-5
          py-4

          flex
          items-center
          justify-between
        "
        style={{
          borderColor:"var(--border)"
        }}
      >

        <span
          className="text-sm"
          style={{
            color:"#22C55E"
          }}
        >
          ✓ All test cases passed
        </span>

        <span
          className="text-sm"
          style={{
            color:"var(--text-secondary)"
          }}
        >
          Runtime: 0 ms
        </span>

      </div>

    </div>
  );
}

export default HeroCodePreview;