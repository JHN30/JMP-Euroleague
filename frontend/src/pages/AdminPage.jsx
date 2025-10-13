import { useState } from "react";
import { motion } from "framer-motion";

import { FaCirclePlus } from "react-icons/fa6";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { GiProcessor } from "react-icons/gi";
import { IoMdStats } from "react-icons/io";

import CreateTeamPage from "./CreateTeamPage";
import UpdateTeamPage from "./UpdateTeamPage";
import DeleteTeamPage from "./DeleteTeamPage";
import UpdateTeamRatingPage from "./UpdateTeamRatingPage";
import UpdateRoundsPage from "./UpdateRoundsPage";

const tabs = [
  { id: "create", label: "Create Team", icon: FaCirclePlus },
  { id: "update", label: "Update Team", icon: GrUpdate },
  { id: "delete", label: "Delete Team", icon: MdDelete },
  { id: "updateRatings", label: "Update Team Rating", icon: IoMdStats },
  { id: "updateRounds", label: "Update Rounds", icon: GiProcessor },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div>
      <motion.h1
        className="flex items-center justify-center mb-2 mt-2 mr-4 ml-4 text-3xl font-bold text-orange-400"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Admin Dashboard
      </motion.h1>
      <div className="flex justify-center mb-4 ">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            aria-label={tab.label}
            className={`flex items-center px-2 py-2 mx-1 rounded-md transition-colors duration-200 ${
              activeTab === tab.id ? "bg-orange-400 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            <tab.icon className="h-5 w-5 md:mr-0.5" />
            <span className="hidden md:inline">{tab.label}</span>
          </button>
        ))}
      </div>
      {activeTab === "create" && <CreateTeamPage />}
      {activeTab === "update" && <UpdateTeamPage />}
      {activeTab === "delete" && <DeleteTeamPage />}
      {activeTab === "updateRatings" && <UpdateTeamRatingPage />}
      {activeTab === "updateRounds" && <UpdateRoundsPage />}
    </div>
  );
};

export default AdminPage;
