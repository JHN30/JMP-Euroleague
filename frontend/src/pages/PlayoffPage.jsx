import PlayoffBracket from "../components/playoff/PlayoffBracket";
import LayoutShell from "../components/layout/LayoutShell";

const PlayoffPage = () => {
  return (
    <LayoutShell>
      <div className="flex flex-col gap-6 text-white pt-4">
        <header className="flex flex-col gap-2 justify-center items-center text-center">
          <p className="text-sm uppercase tracking-wider text-orange-400/90 font-semibold">JMP Playoffs</p>
          <h1 className="text-3xl font-bold leading-tight text-slate-100">Bracket Simulator</h1>
        </header>

        <PlayoffBracket />
      </div>
    </LayoutShell>
  );
};

export default PlayoffPage;
