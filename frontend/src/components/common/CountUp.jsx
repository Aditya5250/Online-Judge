import { useEffect, useState } from "react";

function CountUp({
    end,
    duration = 1200,
    delay = 0,
    prefix = "",
    suffix = "",
}) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (typeof end !== "number") return;

        setCount(0);

        let animationFrameId;

        const timeout = setTimeout(() => {

            const startTime = performance.now();

            const animate = (currentTime) => {

                const progress = Math.min(
                    (currentTime - startTime) / duration,
                    1
                );

                setCount(Math.round(progress * end));

                if (progress < 1) {
                    animationFrameId =
                        requestAnimationFrame(animate);
                }

            };

            animationFrameId =
                requestAnimationFrame(animate);

        }, delay);

        return () => {
            clearTimeout(timeout);
            cancelAnimationFrame(animationFrameId);
        };

    }, [end, duration, delay]);

    return (
        <>
            {prefix}
            {count}
            {suffix}
        </>
    );
}

export default CountUp;