import { Link } from "react-router-dom";

import LayoutShell from "../components/layout/LayoutShell";

const PageNotFound = () => {
  return (
    <LayoutShell>
      <div className="mx-auto max-w-3xl px-4 py-12 text-center text-white">
        <p className="text-xl uppercase tracking-wider text-orange-400/90 font-semibold">Error</p>
        <h1 className="mt-2 text-5xl font-bold text-slate-100">404</h1>
        <h2 className="mt-4 text-2xl font-bold text-slate-100">Page Not Found</h2>
        <p className="mt-2 text-gray-300">The page you are looking for does not exist.</p>

        <Link
          to="/"
          className="mt-6 inline-flex items-center rounded-lg bg-orange-500 px-4 py-2 text-sm font-bold uppercase tracking-wider text-white shadow-sm transition duration-200 hover:bg-orange-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
        >
          Go to Home
        </Link>
      </div>
    </LayoutShell>
  );
};

export default PageNotFound;
