import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import "../styles/button.css";

import Input from "../components/common/Input";

import { AiOutlineTeam } from "react-icons/ai";
import { RiFileUploadLine } from "react-icons/ri";
import { FaCheck } from "react-icons/fa";

import { useTeam } from "../hooks/useTeam";

const CreateTeamPage = () => {
  const [team, setTeam] = useState({
    name: "",
    logoImg: "",
    season: "",
  });

  const { createTeam, loadingTeams } = useTeam();

  const handleCreateTeam = async (e) => {
    e.preventDefault();
    try {
      await createTeam(team);
      setTeam({ name: "", logoImg: "" });
      toast.success("Team created successfully");
      fetchTeams();
    } catch (error) {
      console.log("Error creating team: ", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setTeam({ ...team, logoImg: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-neutral backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="p-8">
          <form onSubmit={handleCreateTeam}>
            <label>Team Name</label>
            <Input
              icon={AiOutlineTeam}
              type="text"
              placeholder="Fenerbahce Beko Istanbul"
              value={team.name}
              onChange={(e) => setTeam({ ...team, name: e.target.value })}
              required
            />

            <div className="flex flex-col justify-center">
              <label>Season</label>
              <label className="text-sm text-gray-500 mb-0.5">Example: For season 2025/2026, enter 2025</label>
              <Input
                icon={AiOutlineTeam}
                type="text"
                placeholder="2025"
                value={team.season}
                onChange={(e) => setTeam({ ...team, season: e.target.value })}
              />
            </div>

            <div className="flex flex-col justify-center mb-8">
              <label>Picture of a team</label>
              <input type="file" id="image" className="sr-only" accept="image/*" onChange={handleImageChange} />
              <label
                htmlFor="image"
                className="w-full pl-3 pr-3 py-2 rounded-lg border border-gray-700 text-gray-400 transition duration-200 cursor-pointer"
              >
                <RiFileUploadLine className="size-5 text-orange-400 inline-block mr-2" />
                Upload Image
              </label>
              {team.logoImg && (
                <span className="ml-3 mt-2 text-sm text-white">
                  <FaCheck className="size-4 text-green-500 inline-block mr-2" />
                  Image uploaded
                </span>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="button"
              type="submit"
              disabled={loadingTeams}
            >
              {loadingTeams ? "Loading..." : "Create Team"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default CreateTeamPage;
