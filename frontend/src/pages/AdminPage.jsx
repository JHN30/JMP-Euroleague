import { useState } from "react";

import { FaCirclePlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { HiOutlinePencilSquare } from "react-icons/hi2";

import CreateTeamPage from "./CreateTeamPage";
import UpdateTeamPage from "./UpdateTeamPage";
import DeleteTeamPage from "./DeleteTeamPage";
import LayoutShell, { layoutCardClass } from "../components/layout/LayoutShell";

const tabs = [
  { id: "create", label: "Create Team", icon: FaCirclePlus },
  { id: "update", label: "Update Team", icon: HiOutlinePencilSquare },
  { id: "delete", label: "Delete Team", icon: MdDelete },
];

const tabContentMap = {
  create: <CreateTeamPage />,
  update: <UpdateTeamPage />,
  delete: <DeleteTeamPage />,
};

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");

  return (
    <LayoutShell>
      <div className="flex flex-col gap-6 pt-4 text-white">
        <header className="flex flex-col gap-2 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-400/90">JMP Admin</p>
          <h1 className="text-3xl font-bold leading-tight text-slate-100 sm:text-4xl">Command Center</h1>
        </header>

        <section className={`${layoutCardClass} overflow-hidden`}>
          <div className="border-b border-white/10 px-5 py-5 sm:px-6 sm:py-6">
            <div className="flex flex-col gap-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-orange-400/90">Tasks</p>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      aria-pressed={isActive}
                      className={`relative flex w-full items-center gap-4 rounded-xl border px-4 py-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                        isActive
                          ? "border-orange-400/70 bg-orange-500/15 text-white"
                          : "border-white/10 bg-white/5 text-gray-200 hover:border-orange-300/50 hover:text-white"
                      }`}
                    >
                      <span
                        className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 ${
                          isActive ? "text-orange-200" : "text-orange-200/70"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold uppercase tracking-[0.18em]">{tab.label}</span>
                        <span className="text-xs text-gray-400">{isActive ? "Active" : "Switch to manage"}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="px-5 py-5 sm:px-6 sm:py-6">
            <div>{tabContentMap[activeTab]}</div>
          </div>
        </section>
      </div>
    </LayoutShell>
  );
};

export default AdminPage;
