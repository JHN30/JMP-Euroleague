import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { useTeam } from "../func/useTeam";
import ErrorBox from "../components/ErrorBox";
import LoadingSpinner from "../components/LoadingSpinner";

import { FaCirclePlus } from "react-icons/fa6";
import { GrUpdate } from "react-icons/gr";
import { MdDelete } from "react-icons/md";

import CreateTeamPage from "./CreateTeamPage";
import UpdateTeamPage from "./UpdateTeamPage";
import DeleteTeamPage from "./DeleteTeamPage";

const tabs = [
  { id: "create", label: "Create Team", icon: FaCirclePlus },
  { id: "update", label: "Update Team", icon: GrUpdate },
  { id: "delete", label: "Delete Team", icon: MdDelete },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("create");
  const { fetchTeams, teams, loadingTeams, errorTeams } = useTeam();

  // Fetch teams data when the component mounts
  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  if (loadingTeams) {
    return (
      <div className="flex items-center justify-center h-full w-full py-20">
        <LoadingSpinner />
      </div>
    );
  }

  // Check if there was an error fetching the teams
  if (errorTeams) {
    return (
      <div className="flex items-center justify-center h-full w-full py-20">
        <ErrorBox error={errorTeams} />
      </div>
    );
  }

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
      <div className="flex justify-center mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`flex items-center px-4 py-2 mx-2 rounded-md transition-colors duration-200 ${
              activeTab === tab.id ? "bg-orange-400 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            <tab.icon className="mr-2 h-5 w-5" />
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab === "create" && <CreateTeamPage />}
      {activeTab === "update" && <UpdateTeamPage />}
      {activeTab === "delete" && <DeleteTeamPage teams={teams} />}
    </div>
  );
};

export default AdminPage;
