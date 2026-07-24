import useInView from "../../hooks/useInView";

function AnimateOnView({
    children,
    placeholderHeight = "20rem",
}) {
    const { ref, shouldAnimate } = useInView({
        threshold: 0.35,
    });

    return (
        <div
            ref={ref}
            style={{
                minHeight: placeholderHeight,
            }}
        >
            {shouldAnimate ?( children) : (
                <div
                    className="h-full
                        rounded-2xl
                        border
                        animate-pulse
                    "
                    style={{background:"var(--bg-card)",borderColor:"var(--border"}}
                />
                
            )}
        </div>
    );
}

export default AnimateOnView;