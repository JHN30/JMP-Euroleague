import { AnimatePresence, motion } from "framer-motion";

const DeleteTeamModal = ({ team, isOpen, onCancel, onConfirm }) => {
  const isActive = Boolean(isOpen && team);

  return (
    <AnimatePresence>
      {isActive ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-team-heading"
          onClick={onCancel}
        >
          <motion.div
            className="absolute inset-0 bg-slate-950/80 backdrop-blur rounded-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white/8 p-6 shadow-2xl shadow-black/60 backdrop-blur-2xl"
            initial={{ scale: 0.92, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-24 right-0 h-56 w-56 rounded-full bg-rose-500/20 blur-3xl" />
              <div className="absolute -bottom-24 left-0 h-48 w-48 rounded-full bg-orange-400/15 blur-3xl" />
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.04)1px,transparent_1px)] bg-size-[120px_120px]" />
            </div>

            <div className="relative z-10 flex flex-col gap-6">
              <header className="flex flex-col gap-3 text-center">
                <p className="text-xs uppercase tracking-[0.4em] text-rose-300/80">Remove Team</p>
                <h2 id="delete-team-heading" className="text-2xl font-semibold text-white">
                  Delete {team.name}
                </h2>
                <p className="text-sm text-gray-300">
                  This action is permanent. All stats, schedules, and references for{" "}
                  <span className="text-white font-semibold">{team.name}</span> will be removed from the active season.
                </p>
              </header>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                <button
                  type="button"
                  onClick={onCancel}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:border-white/20 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-rose-500 to-red-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/30 transition hover:from-rose-500/90 hover:to-red-500/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  Delete Team
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default DeleteTeamModal;
