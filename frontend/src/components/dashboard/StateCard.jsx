import { ArrowUpRight } from "lucide-react";
import CountUp from "../common/CountUp";
import { useState, useEffect } from "react";

function StatCard({
    index,
    title,
    value,
    subtitle,
    icon: Icon,
    accent = "var(--accent)",
    prefix="",
    suffix="",
}) {

    const isNumeric=Number.isFinite(value);

    //aniimation

    const [visible,setVisible]=useState(false);

    useEffect(()=>{
        const timer=setTimeout(()=>{
            setVisible(true);
        },index*120);

        return ()=>clearTimeout(timer);
    },[index]);






    return (
        <div
            className={`
                group
                rounded-2xl
                border
                p-6
                backdrop-blur-xl
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-2xl

                ${visible?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}
            `
            }
            style={{
                background: "var(--bg-card)",
                borderColor: "var(--border)",
            }}


        >
            <div className="flex justify-between items-start">
                
                
                <div className="absolute inset-0 rounded-xl blur-lg opacity-3 group-hover:opacity-6 transition"
                    style={{
                        background: accent,}}
                />

                <div>

                    <p
                        className="text-sm"
                        style={{
                            color: "var(--text-secondary)",
                        }}
                    >
                        {title}
                    </p>

                    <h2
                        className="text-4xl font-bold mt-2"
                        style={{
                            color: "var(--text-primary)",
                        }}
                    >
                        {isNumeric?(
                            <CountUp
                                end={value}
                                suffix={suffix}
                                prefix={prefix}
                                delay={index*120}
                            />
                            ) : (
                                value
                            )
                        }
                    </h2>

                    <p
                        className="text-sm mt-2"
                        style={{
                            color: "var(--text-secondary)",
                        }}
                    >
                        {subtitle}
                    </p>

                </div>

                <div
                    className="
                        h-12
                        w-12
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        transition-transform
                        duration-300
                        group-hover:scale-110
                    "
                    style={{
                        background: accent,
                        color: "var(--bg-primary)",
                    }}
                >
                    <Icon size={22} />
                </div>

            </div>

            <div className="mt-5 flex items-center gap-2">
                <ArrowUpRight
                    size={16}
                    style={{
                        color: accent,
                    }}
                />

                <span
                    className="text-sm"
                    style={{
                        color: accent,
                    }}
                >
                    Keep Going
                </span>
            </div>
        </div>
    );
}

export default StatCard;