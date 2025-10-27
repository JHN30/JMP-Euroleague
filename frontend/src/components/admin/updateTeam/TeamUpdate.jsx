import { useEffect, useMemo, useState } from "react";
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

  useEffect(() => {
    setResult(fillArray(team.form, totalRounds));
    setPlayedAgainst(fillArray(team.playedAgainst, totalRounds));
    setHomeGround(fillArray(team.homeGround, totalRounds));
    setPointsPlus(fillArray(team.pointsPlusArray, totalRounds));
    setPointsMinus(fillArray(team.pointsMinusArray, totalRounds));
  }, [team, totalRounds]);

  useEffect(() => {
    if (totalRounds > 0) {
      setCurrentRound(totalRounds - 1);
    } else {
      setCurrentRound(0);
    }
  }, [team._id, totalRounds]);

  const handleFieldChange = (field, value) => {
    const fieldSetters = {
      result: setResult,
      playedAgainst: setPlayedAgainst,
      homeGround: setHomeGround,
      pointsPlus: setPointsPlus,
      pointsMinus: setPointsMinus,
    };

    const setter = fieldSetters[field];
    if (!setter || currentRound < 0) {
      return;
    }

    setter((previous) => {
      const next = [...previous];
      if (currentRound >= next.length) {
        return next;
      }
      next[currentRound] = value;
      return next;
    });
  };

  const goToRound = (roundIndex) => {
    if (roundIndex >= 0 && roundIndex < totalRounds) {
      setCurrentRound(roundIndex);
    }
  };

  const goToNextRound = () => goToRound(currentRound + 1);
  const goToPreviousRound = () => goToRound(currentRound - 1);

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
      // eslint-disable-next-line no-console
      console.error("Error updating team:", error);
      toast.error(`Couldn't update ${team.name}. Please try again later.`);
    }
  };

  const hasRounds = totalRounds > 0;
  const activeRoundLabel = hasRounds ? `Round ${currentRound + 1} of ${totalRounds}` : "No rounds available";

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 shadow-inner shadow-black/40 backdrop-blur">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-0 h-48 w-48 rounded-full bg-orange-500/15 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-56 w-56 rounded-full bg-amber-400/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[length:120px_120px]" />
      </div>

      <div className="relative z-10 flex flex-col gap-8">
        <TeamUpdateHeader
          team={team}
          totalRounds={totalRounds}
          onBack={() => setActiveView("grid")}
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
              values={{
                result: result[currentRound] ?? "",
                opponent: playedAgainst[currentRound] ?? "",
                venue: homeGround[currentRound] ?? "",
                pointsPlus: pointsPlus[currentRound] ?? "",
                pointsMinus: pointsMinus[currentRound] ?? "",
              }}
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
