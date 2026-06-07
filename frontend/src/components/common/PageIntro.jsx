const PageIntro = ({
  eyebrow,
  title,
  description,
  titleId,
  children,
  className = "",
  gapClassName = "gap-2",
  titleClassName = "max-w-4xl text-3xl font-bold leading-tight text-slate-100 sm:text-4xl",
}) => (
  <header className={`flex flex-col items-center justify-center ${gapClassName} text-center ${className}`}>
    <p className="text-sm font-semibold uppercase tracking-wider text-orange-400/90">{eyebrow}</p>
    <h1 id={titleId} className={titleClassName}>
      {title}
    </h1>
    <p className="max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">{description}</p>
    {children}
  </header>
);

export default PageIntro;
