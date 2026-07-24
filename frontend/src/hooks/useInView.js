import { useEffect, useRef, useState } from "react";

function useInView({
    threshold = 0.5,
    triggerOnce = true,
} = {}) {

    const ref = useRef(null);

    const [shouldAnimate, setShouldAnimate] = useState(false);

    useEffect(() => {

        const observer = new IntersectionObserver(

            ([entry]) => {

                if (entry.isIntersecting) {

                    setShouldAnimate(true);

                    if (triggerOnce) {
                        observer.unobserve(entry.target);
                    }

                }

            },

            {
                threshold,
            }

        );

        const current = ref.current;

        if (current) {
            observer.observe(current);
        }

        return () => {

            if (current) {

                observer.unobserve(current);

            }

        };

    }, [threshold, triggerOnce]);

    return {

        ref,

        shouldAnimate,

    };

}

export default useInView;