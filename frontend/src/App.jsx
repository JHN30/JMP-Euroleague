import { Route, Routes, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";

import Navbar from "./components/navbar/Navbar";
import ScrollToTop from "./components/common/ScrollToTop";
import FallbackComponent from "./components/common/FallBackComponent";
import Seo from "./components/common/Seo";

const StandingsPage = lazy(() => import("./pages/StandingsPage"));
const PredictorPage = lazy(() => import("./pages/PredictorPage"));
const AboutJmpRatingPage = lazy(() => import("./pages/AboutJmpRatingPage"));
const ModelPerformancePage = lazy(() => import("./pages/ModelPerformancePage"));
const PlayoffPage = lazy(() => import("./pages/PlayoffPage"));
const TeamsPage = lazy(() => import("./pages/TeamsPage"));
const TeamStatsPage = lazy(() => import("./pages/TeamStatsPage"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

const SITE_URL = "https://www.jmpeuroleague.com";
const SITE_NAME = "JMP Euroleague";

const getSiteUrl = (path = "/") => new URL(path, SITE_URL).toString();

const getWebsiteStructuredData = (description) => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: getSiteUrl("/"),
  description,
  inLanguage: "en",
});

const getWebPageStructuredData = ({ title, description, path }) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${getSiteUrl(path)}#webpage`,
  url: getSiteUrl(path),
  name: title,
  description,
  inLanguage: "en",
  isPartOf: {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: getSiteUrl("/"),
  },
});

const getArticleStructuredData = ({ title, description, path }) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${getSiteUrl(path)}#article`,
  headline: "About JMP Rating",
  name: title,
  description,
  url: getSiteUrl(path),
  mainEntityOfPage: getSiteUrl(path),
  inLanguage: "en",
  author: {
    "@type": "Organization",
    name: SITE_NAME,
  },
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
  },
});

const getStructuredDataForRoute = ({ title, description, path }) => {
  if (path === "/") {
    return [getWebsiteStructuredData(description), getWebPageStructuredData({ title, description, path })];
  }

  if (path === "/about-jmp-rating") {
    return getArticleStructuredData({ title, description, path });
  }

  return getWebPageStructuredData({ title, description, path });
};

const INDEXABLE_ROUTE_SEO = {
  "/": {
    title: "JMP Euroleague | EuroLeague Standings, Predictions & Team Ratings",
    description:
      "Track EuroLeague standings, team ratings, playoff scenarios, and JMP model predictions for the current season.",
  },
  "/predictor": {
    title: "EuroLeague Predictions | JMP Rating Match Predictor",
    description:
      "Predict EuroLeague game outcomes using JMP Rating, team strength, scoring margin, and home-court context.",
  },
  "/about-jmp-rating": {
    title: "About JMP Rating | EuroLeague Prediction Model Explained",
    description:
      "Learn how JMP Rating summarizes EuroLeague team strength, supports matchup predictions, and tracks model performance.",
  },
  "/model-performance": {
    title: "EuroLeague Prediction Model Performance | JMP Accuracy Tracker",
    description:
      "Track how the JMP Euroleague prediction model performs round by round across the current season.",
  },
  "/playoff": {
    title: "EuroLeague Playoff Scenarios | Bracket & Qualification Simulator",
    description:
      "Explore EuroLeague playoff scenarios, bracket paths, qualification chances, and standings movement with JMP Euroleague.",
  },
  "/teams": {
    title: "EuroLeague Team Ratings | Compare Clubs, Records & Strength",
    description:
      "Compare EuroLeague teams by record, rating, scoring, defense, form, and overall strength.",
  },
};

const normalizePathname = (pathname) => pathname.replace(/\/+$/, "") || "/";

const getSeoForPathname = (pathname) => {
  const path = normalizePathname(pathname);

  if (INDEXABLE_ROUTE_SEO[path]) {
    const routeSeo = INDEXABLE_ROUTE_SEO[path];

    return {
      ...routeSeo,
      path,
      robots: "index, follow",
      structuredData: getStructuredDataForRoute({ ...routeSeo, path }),
    };
  }

  if (path.startsWith("/team-stats/")) {
    return {
      title: "Team Stats | JMP Euroleague",
      description: "View Euroleague team stats, rating history, recent form, and round-by-round results.",
      path,
      robots: "noindex, follow",
    };
  }

  return {
    title: "Page Not Found | JMP Euroleague",
    description: "The requested JMP Euroleague page could not be found.",
    path,
    robots: "noindex, nofollow",
  };
};

function App() {
  const { pathname } = useLocation();
  const routeSeo = getSeoForPathname(pathname);

  return (
    <div className="flex flex-col mx-auto min-h-screen bg-linear-to-b from-base-100 via-base-300 to-base-200">
      <Seo {...routeSeo} />
      <Navbar />
      <ScrollToTop />
      <Suspense fallback={<FallbackComponent />}>
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<StandingsPage />} />
          <Route path="/predictor" element={<PredictorPage />} />
          <Route path="/about-jmp-rating" element={<AboutJmpRatingPage />} />
          <Route path="/model-performance" element={<ModelPerformancePage />} />
          <Route path="/playoff" element={<PlayoffPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/team-stats/:teamSlug" element={<TeamStatsPage />} />

          {/* Catch-all route - 404 Page Not Found */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
