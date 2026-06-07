import { useEffect, useMemo, useRef, useState } from "react";

const orderRounds = (rounds) =>
  rounds.slice().sort((firstRound, secondRound) => firstRound.roundNumber - secondRound.roundNumber);

const getLatestRoundNumber = (rounds) => (rounds.length > 0 ? rounds[rounds.length - 1].roundNumber : null);

const getSelectedRoundNumber = ({ rounds, preferredRoundNumber, latestRoundNumber }) =>
  rounds.some((round) => round.roundNumber === preferredRoundNumber) ? preferredRoundNumber : latestRoundNumber;

const getSelectedRound = ({ rounds, selectedRoundNumber }) =>
  rounds.find((round) => round.roundNumber === selectedRoundNumber) ?? (rounds.length > 0 ? rounds[rounds.length - 1] : null);

const scrollSelectedRoundIntoView = ({ stripNode, selectedNode, hasScrolledStripRef }) => {
  const targetScrollLeft = selectedNode.offsetLeft - (stripNode.clientWidth - selectedNode.clientWidth) / 2;
  const maxScrollLeft = Math.max(0, stripNode.scrollWidth - stripNode.clientWidth);
  const nextScrollLeft = Math.min(Math.max(0, targetScrollLeft), maxScrollLeft);

  stripNode.scrollTo({
    left: nextScrollLeft,
    behavior: hasScrolledStripRef.current ? "smooth" : "auto",
  });
  hasScrolledStripRef.current = true;
};

const useSelectedRoundState = (rounds) => {
  const orderedRounds = useMemo(() => orderRounds(rounds), [rounds]);
  const latestRoundNumber = getLatestRoundNumber(orderedRounds);
  const [preferredRoundNumber, setPreferredRoundNumber] = useState(null);
  const selectedRoundNumber = getSelectedRoundNumber({ rounds: orderedRounds, preferredRoundNumber, latestRoundNumber });
  const selectedRound = getSelectedRound({ rounds: orderedRounds, selectedRoundNumber });

  return {
    orderedRounds,
    selectedRound,
    selectedRoundNumber,
    setPreferredRoundNumber,
  };
};

const useRoundStripScrolling = (selectedRoundNumber) => {
  const stripContainerRef = useRef(null);
  const stripItemRefs = useRef(new Map());
  const hasScrolledStripRef = useRef(false);

  useEffect(() => {
    if (!selectedRoundNumber) {
      return;
    }

    const selectedNode = stripItemRefs.current.get(selectedRoundNumber);
    const stripNode = stripContainerRef.current;

    if (selectedNode && stripNode) {
      scrollSelectedRoundIntoView({ stripNode, selectedNode, hasScrolledStripRef });
    }
  }, [selectedRoundNumber]);

  const setItemRef = (roundNumber, node) => {
    if (node) {
      stripItemRefs.current.set(roundNumber, node);
      return;
    }

    stripItemRefs.current.delete(roundNumber);
  };

  return {
    stripContainerRef,
    setItemRef,
  };
};

const updateDragScroll = ({ event, stripContainerRef, dragStateRef, suppressClickRef }) => {
  const stripNode = stripContainerRef.current;
  const dragState = dragStateRef.current;

  if (!stripNode || !dragState.pointerDown) {
    return;
  }

  const deltaX = event.clientX - dragState.startX;

  if (Math.abs(deltaX) > 4) {
    suppressClickRef.current = true;
  }

  stripNode.scrollLeft = dragState.startScrollLeft - deltaX;
};

const stopStripDrag = ({ dragStateRef, setIsDraggingStrip }) => {
  dragStateRef.current.pointerDown = false;
  setIsDraggingStrip(false);
};

const startStripDrag = ({ event, stripContainerRef, dragStateRef, setIsDraggingStrip }) => {
  if (event.button !== 0) {
    return;
  }

  const stripNode = stripContainerRef.current;

  if (!stripNode) {
    return;
  }

  dragStateRef.current = {
    startX: event.clientX,
    startScrollLeft: stripNode.scrollLeft,
    pointerDown: true,
  };
  setIsDraggingStrip(true);
};

const useRoundStripDragListeners = ({
  isDraggingStrip,
  stripContainerRef,
  dragStateRef,
  suppressClickRef,
  setIsDraggingStrip,
}) => {
  useEffect(() => {
    if (!isDraggingStrip) {
      return undefined;
    }

    const handleMouseMove = (event) =>
      updateDragScroll({ event, stripContainerRef, dragStateRef, suppressClickRef });
    const handleMouseUp = () => stopStripDrag({ dragStateRef, setIsDraggingStrip });

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragStateRef, isDraggingStrip, setIsDraggingStrip, stripContainerRef, suppressClickRef]);
};

const useRoundStripDrag = (stripContainerRef) => {
  const [isDraggingStrip, setIsDraggingStrip] = useState(false);
  const suppressClickRef = useRef(false);
  const dragStateRef = useRef({
    startX: 0,
    startScrollLeft: 0,
    pointerDown: false,
  });

  useRoundStripDragListeners({
    isDraggingStrip,
    stripContainerRef,
    dragStateRef,
    suppressClickRef,
    setIsDraggingStrip,
  });

  const handleStripMouseDown = (event) =>
    startStripDrag({ event, stripContainerRef, dragStateRef, setIsDraggingStrip });

  return {
    isDraggingStrip,
    suppressClickRef,
    handleStripMouseDown,
  };
};

const useRoundDetailFetch = ({ selectedRoundNumber, hasSelectedRoundDetails, fetchRoundDetail }) => {
  useEffect(() => {
    if (!selectedRoundNumber || hasSelectedRoundDetails || typeof fetchRoundDetail !== "function") {
      return;
    }

    fetchRoundDetail(selectedRoundNumber);
  }, [fetchRoundDetail, hasSelectedRoundDetails, selectedRoundNumber]);
};

export const useRoundPerformanceSelection = ({
  rounds,
  loadingRoundDetailsByRound,
  errorRoundDetailsByRound,
  fetchRoundDetail,
}) => {
  const { orderedRounds, selectedRound, selectedRoundNumber, setPreferredRoundNumber } = useSelectedRoundState(rounds);
  const selectedMatchups = selectedRound?.matchups ?? [];
  const hasSelectedRoundDetails = selectedMatchups.length > 0;
  const isSelectedRoundDetailLoading = Boolean(loadingRoundDetailsByRound[selectedRoundNumber]);
  const selectedRoundDetailError = selectedRoundNumber ? errorRoundDetailsByRound[selectedRoundNumber] : null;
  const { stripContainerRef, setItemRef } = useRoundStripScrolling(selectedRoundNumber);
  const { isDraggingStrip, suppressClickRef, handleStripMouseDown } = useRoundStripDrag(stripContainerRef);

  useRoundDetailFetch({ selectedRoundNumber, hasSelectedRoundDetails, fetchRoundDetail });

  return {
    orderedRounds,
    selectedRound,
    selectedRoundNumber,
    selectedMatchups,
    hasSelectedRoundDetails,
    isSelectedRoundDetailLoading,
    selectedRoundDetailError,
    stripContainerRef,
    isDraggingStrip,
    suppressClickRef,
    setItemRef,
    handleStripMouseDown,
    handleRoundSelect: setPreferredRoundNumber,
  };
};
