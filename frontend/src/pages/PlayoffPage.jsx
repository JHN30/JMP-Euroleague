import PlayoffBracket from "../components/playoff/PlayoffBracket";
import PageShell from "../components/layout/PageShell";

const PlayoffPage = () => {
  return (
    <PageShell>
      <div className="flex flex-col gap-8 text-white">
        <header className="flex flex-col items-center text-center gap-2">
          <p className="text-sm uppercase tracking-[0.4em] text-orange-300/80">JMP Playoffs</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-white">Bracket Simulator</h1>
        </header>

        <PlayoffBracket />
      </div>
    </PageShell>
  );
};

export default PlayoffPage;
