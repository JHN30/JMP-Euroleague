import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { FaCirclePlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { HiOutlinePencilSquare, HiOutlineChartBar, HiOutlineCalendarDays } from "react-icons/hi2";

import CreateTeamPage from "./CreateTeamPage";
import UpdateTeamPage from "./UpdateTeamPage";
import DeleteTeamPage from "./DeleteTeamPage";
import UpdateTeamRatingPage from "./UpdateTeamRatingPage";
import UpdateRoundsPage from "./UpdateRoundsPage";
import PageShell, { pageCardClass } from "../components/layout/PageShell";

const tabs = [
  { id: "create", label: "Create Team", icon: FaCirclePlus },
  { id: "update", label: "Update Team", icon: HiOutlinePencilSquare },
  { id: "delete", label: "Delete Team", icon: MdDelete },
  { id: "updateRatings", label: "Update Team Rating", icon: HiOutlineChartBar },
  { id: "updateRounds", label: "Update Rounds", icon: HiOutlineCalendarDays },
];

const tabContentMap = {
  create: <CreateTeamPage />,
  update: <UpdateTeamPage />,
  delete: <DeleteTeamPage />,
  updateRatings: <UpdateTeamRatingPage />,
  updateRounds: <UpdateRoundsPage />,
};

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <PageShell>
      <div className="flex flex-col gap-8 text-white">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-3 text-center"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-orange-300/80">JMP Admin</p>
          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">Operations Command Center</h1>
          <p className="text-base text-gray-300">
            Manage rosters, ratings, and round data with our up-to-date control surface. Choose a tab to jump into the
            workflow you need.
          </p>
        </motion.header>

        <div className={`${pageCardClass} flex flex-col gap-8 p-6 sm:p-8`}>
          <div className="flex flex-col gap-5">
            <p className="text-xs uppercase tracking-[0.4em] text-orange-200/80">Tasks</p>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    aria-pressed={isActive}
                    className={`relative flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                      isActive
                        ? "border-orange-400/70 bg-orange-500/15 text-white shadow-[0_8px_40px_rgba(249,115,22,0.25)]"
                        : "border-white/10 bg-white/5 text-gray-200 hover:border-orange-400/40 hover:text-white"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 ${
                        isActive ? "text-orange-200" : "text-orange-200/70"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold uppercase tracking-[0.2em]">{tab.label}</span>
                      <span className="text-xs text-gray-400">
                        {isActive ? "Active workflow" : "Switch to manage"}
                      </span>
                    </div>
                    {isActive ? (
                      <motion.span
                        layoutId="active-indicator"
                        className="pointer-events-none absolute inset-0 rounded-2xl border border-orange-400/40"
                        transition={{ type: "spring", stiffness: 260, damping: 28 }}
                      />
                    ) : null}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-inner shadow-black/30 backdrop-blur">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
              >
                {tabContentMap[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default AdminPage;
