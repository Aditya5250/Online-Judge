import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import useAIHints from "../../hooks/useAIHints"

const AIHintDrawer = ({ isOpen, onClose, problemId, }) => {

    const {
        loading,
        hints,
        visibleHints,
        fetchHints,
        revealNextHint,
        resetHints
    } = useAIHints();

    const handleClose = () => {
        resetHints();
        onClose();
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}

                    <motion.div
                        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                    />

                    {/* Drawer */}

                    <motion.aside
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{
                            type: "spring",
                            stiffness: 280,
                            damping: 30,
                        }}
                        className="fixed right-0 top-0 z-50 flex h-screen w-[400px] flex-col border-l border-[var(--border)] bg-[var(--bg-secondary)] shadow-2xl"
                    >
                        {/* Header */}

                        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
                            <div className="flex items-center gap-2">
                                <Sparkles
                                    size={18}
                                    className="text-yellow-400"
                                />

                                <h2 className="text-lg font-semibold">
                                    JudgeX AI Mentor
                                </h2>
                            </div>

                            <button
                                onClick={handleClose}
                                className="rounded-lg p-2 transition hover:bg-[var(--bg-primary)]"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Body */}

                        <div className="flex-1 overflow-y-auto p-6">

                            {hints.length === 0 ? (

                                <div className="flex h-full flex-col items-center justify-center text-center">

                                    <Sparkles
                                        size={48}
                                        className="mb-5 text-yellow-400"
                                    />

                                    <h3 className="mb-2 text-lg font-semibold">
                                        Need a little help?
                                    </h3>

                                    <p className="mb-6 text-sm text-[var(--text-secondary)]">
                                        I'll guide you without giving away the full solution.
                                    </p>

                                    <button
                                        disabled={loading}
                                        onClick={() => fetchHints(problemId)}
                                        className="rounded-lg bg-yellow-400 px-5 py-2 font-medium text-black transition hover:bg-yellow-300 disabled:opacity-60"
                                    >
                                        {loading ? "✨JudgeX AI is thinking..." : "Ask JudgeX AI"}
                                    </button>

                                </div>

                            ) : (

                                <div className="space-y-4">

                                    {hints.slice(0, visibleHints).map((hint, index) => (

                                        <motion.div
                                            key={index}
                                            initial={{
                                                opacity: 0,
                                                y: 24,
                                                scale: 0.98,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                scale: 1,
                                            }}
                                            transition={{
                                                duration: 0.35,
                                                ease: "easeOut",
                                                delay: index * 0.08,
                                            }}
                                            className="rounded-xl border border-[var(--border)] bg-[var(--bg-primary)] p-4"
                                        >

                                            <div className="mb-2 flex items-center gap-2">

                                                <Sparkles
                                                    size={16}
                                                    className="text-yellow-400"
                                                />

                                                <span className="font-semibold">
                                                    Hint {index + 1}
                                                </span>

                                            </div>

                                            <p className="text-sm leading-7">
                                                {hint}
                                            </p>

                                        </motion.div>

                                    ))}

                                    {visibleHints < hints.length ? (

                                        <AnimatePresence mode="wait">

                                            <motion.button
                                                key={visibleHints}
                                                initial={{
                                                    opacity: 0,
                                                    y: 12,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    y: 0,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    y: -12,
                                                }}
                                                transition={{
                                                    duration: 0.25,
                                                }}
                                                onClick={revealNextHint}
                                                className="w-full rounded-lg border border-yellow-400/30 py-3 text-yellow-300 transition hover:bg-yellow-400/10"
                                            >
                                                Reveal Hint {visibleHints + 1}
                                            </motion.button>

                                        </AnimatePresence>

                                    ) : (
                                        <div className="rounded-xl border border-yellow-400/20 bg-yellow-400/5 p-4 text-center">

                                            <p className="font-medium">
                                                🎉 You've unlocked all available hints.
                                            </p>

                                            <p className="mt-2 text-sm text-[var(--text-secondary)]">
                                                Try solving the problem before requesting another hint.
                                            </p>

                                        </div>

                                    )}

                                </div>

                            )}

                        </div>

                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
};

export default AIHintDrawer;