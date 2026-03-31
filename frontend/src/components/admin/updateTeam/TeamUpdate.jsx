import { useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineArrowUturnLeft } from "react-icons/hi2";

import { useTeam } from "../../../hooks/useTeam";
import TeamUpdateHeader from "./TeamUpdateHeader";
import TeamUpdateRoundNavigation from "./TeamUpdateRoundNavigation";
import TeamUpdateRoundForm from "./TeamUpdateRoundForm";

const fillArray = (sourceArray, length) => {
  const safeLength = Math.max(Number(length) || 0, 0);
  const source = Array.isArray(sourceArray) ? sourceArray : [];
  return Array.from({ length: safeLength }, (_, index) => source[index] ?? "");
};

const TeamUpdate = ({ team = {}, latestRound, setActiveView, allTeams = [], onUpdateSuccess }) => {
  const totalRounds = Math.max(Number(latestRound) || 0, 0);

  const [currentRound, setCurrentRound] = useState(totalRounds > 0 ? totalRounds - 1 : 0);
  const [result, setResult] = useState(() => fillArray(team.form, totalRounds));
  const [playedAgainst, setPlayedAgainst] = useState(() => fillArray(team.playedAgainst, totalRounds));
  const [homeGround, setHomeGround] = useState(() => fillArray(team.homeGround, totalRounds));
  const [pointsPlus, setPointsPlus] = useState(() => fillArray(team.pointsPlusArray, totalRounds));
  const [pointsMinus, setPointsMinus] = useState(() => fillArray(team.pointsMinusArray, totalRounds));

  const { updateTeam } = useTeam();

  const opponentTeams = useMemo(() => allTeams.filter((candidate) => candidate._id !== team._id), [allTeams, team._id]);

  const handleFieldChange = useCallback(
    (field, value) => {
      if (currentRound < 0) {
        return;
      }

      const updateByRound = (setter) => {
        setter((previous) => {
          const next = [...previous];
          if (currentRound >= next.length) {
            return next;
          }
          next[currentRound] = value;
          return next;
        });
      };

      switch (field) {
        case "result":
          updateByRound(setResult);
          break;
        case "playedAgainst":
          updateByRound(setPlayedAgainst);
          break;
        case "homeGround":
          updateByRound(setHomeGround);
          break;
        case "pointsPlus":
          updateByRound(setPointsPlus);
          break;
        case "pointsMinus":
          updateByRound(setPointsMinus);
          break;
        default:
          break;
      }
    },
    [currentRound]
  );

  const goToRound = useCallback(
    (roundIndex) => {
      if (roundIndex >= 0 && roundIndex < totalRounds) {
        setCurrentRound(roundIndex);
      }
    },
    [totalRounds]
  );

  const goToNextRound = useCallback(() => goToRound(currentRound + 1), [currentRound, goToRound]);
  const goToPreviousRound = useCallback(() => goToRound(currentRound - 1), [currentRound, goToRound]);

  const handleBackToGrid = useCallback(() => setActiveView("grid"), [setActiveView]);

  const currentRoundValues = useMemo(
    () => ({
      result: result[currentRound] ?? "",
      opponent: playedAgainst[currentRound] ?? "",
      venue: homeGround[currentRound] ?? "",
      pointsPlus: pointsPlus[currentRound] ?? "",
      pointsMinus: pointsMinus[currentRound] ?? "",
    }),
    [currentRound, result, playedAgainst, homeGround, pointsPlus, pointsMinus]
  );

  const hasRounds = totalRounds > 0;
  const activeRoundLabel = useMemo(
    () => (hasRounds ? `Round ${currentRound + 1} of ${totalRounds}` : "No rounds available"),
    [hasRounds, currentRound, totalRounds]
  );

  const handleUpdate = async (event) => {
    event.preventDefault();

    if (
      result.some((value) => !value) ||
      playedAgainst.some((value) => !value) ||
      homeGround.some((value) => !value) ||
      pointsPlus.some((value) => !value) ||
      pointsMinus.some((value) => !value)
    ) {
      toast.error("All fields must be filled across every round before saving.");
      return;
    }

    try {
      await updateTeam(team._id, {
        form: result,
        playedAgainst,
        homeGround,
        pointsPlusArray: pointsPlus,
        pointsMinusArray: pointsMinus,
      });
      onUpdateSuccess?.();
      toast.success(`${team.name} updated successfully.`);
    } catch (error) {
      console.error("Error updating team:", error);
      toast.error(`Couldn't update ${team.name}. Please try again later.`);
    }
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8">
      <div className="flex flex-col gap-8">
        <TeamUpdateHeader
          team={team}
          totalRounds={totalRounds}
          onBack={handleBackToGrid}
          BackIcon={HiOutlineArrowUturnLeft}
          backLabel="Back to Teams"
        />

        {hasRounds ? (
          <form onSubmit={handleUpdate} className="flex flex-col gap-6">
            <TeamUpdateRoundNavigation
              totalRounds={totalRounds}
              currentRound={currentRound}
              activeRoundLabel={activeRoundLabel}
              onPrev={goToPreviousRound}
              onNext={goToNextRound}
              onSelectRound={goToRound}
              PrevIcon={HiOutlineChevronLeft}
              NextIcon={HiOutlineChevronRight}
            />

            <TeamUpdateRoundForm
              currentRound={currentRound}
              values={currentRoundValues}
              onFieldChange={handleFieldChange}
              opponentTeams={opponentTeams}
              submitLabel="Save All Changes"
            />
          </form>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-8 text-sm text-gray-300">
            This team does not have any round data yet. Once rounds are available, you can edit matchup results here.
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamUpdate;
