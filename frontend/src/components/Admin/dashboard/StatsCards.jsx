import CountUp from "../../common/CountUp";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
}) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900
        p-6
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-yellow-500/40
      "
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-400">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">
            {value}
          </h2>

          <p className="mt-2 text-sm text-zinc-500">
            {subtitle}
          </p>
        </div>

        <div
          className="
            rounded-2xl
            bg-yellow-500/10
            p-3
          "
        >
          <Icon
            size={26}
            className="text-yellow-400"
          />
        </div>
      </div>
    </div>
  );
}