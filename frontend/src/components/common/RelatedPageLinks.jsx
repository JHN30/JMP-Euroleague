import { Link } from "react-router-dom";

import { layoutCardClass } from "../layout/LayoutShell";

const RelatedPageLinks = ({
  links,
  ariaLabel,
  gridClassName = "md:grid-cols-3",
  linkClassName = "px-5 py-5",
  titleClassName = "text-base font-semibold text-slate-100",
  descriptionClassName = "mt-2 text-sm leading-6 text-slate-300",
}) => (
  <section className={`grid gap-4 ${gridClassName}`} aria-label={ariaLabel}>
    {links.map((link) => (
      <Link
        key={link.to}
        to={link.to}
        className={`${layoutCardClass} block ${linkClassName} transition hover:border-orange-300/30 hover:bg-slate-900`}
      >
        <h2 className={titleClassName}>{link.label}</h2>
        <p className={descriptionClassName}>{link.description}</p>
      </Link>
    ))}
  </section>
);

export default RelatedPageLinks;
