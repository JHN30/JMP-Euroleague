import { layoutCardClass } from "../layout/LayoutShell";

const InfoCardGrid = ({ cards, className = "" }) => (
  <section className={`grid gap-4 lg:grid-cols-2 ${className}`}>
    {cards.map((card) => (
      <div key={card.title} className={`${layoutCardClass} px-5 py-5 sm:px-6 sm:py-6`}>
        <p className="text-xs font-semibold uppercase tracking-wider text-orange-300/90">{card.eyebrow}</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-100">{card.title}</h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">{card.description}</p>
      </div>
    ))}
  </section>
);

export default InfoCardGrid;
