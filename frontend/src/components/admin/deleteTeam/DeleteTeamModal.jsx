import { useEffect } from "react";
import { createPortal } from "react-dom";

const DeleteTeamModal = ({ team, isOpen, onCancel, onConfirm }) => {
  const isActive = Boolean(isOpen && team);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isActive]);

  if (!isActive) {
    return null;
  }

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-team-heading"
      onClick={onCancel}
    >
      <div className="absolute inset-0 bg-slate-950/80" />

      <div
        className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 px-6 py-6 shadow-2xl shadow-black/60"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-col gap-6">
          <header className="flex flex-col gap-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-rose-300/80">Remove Team</p>
            <h2 id="delete-team-heading" className="text-2xl font-semibold text-white">
              Delete {team.name}
            </h2>
            <p className="text-sm text-gray-300">
              This action is permanent. All stats, schedules, and references for{" "}
              <span className="font-semibold text-white">{team.name}</span> will be removed from the active season.
            </p>
          </header>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-semibold text-gray-200 transition hover:border-white/20 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="inline-flex items-center justify-center rounded-xl border border-rose-300/50 bg-rose-500/20 px-5 py-3 text-sm font-semibold text-rose-100 transition-colors hover:border-rose-300/70 hover:bg-rose-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Delete Team
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default DeleteTeamModal;
