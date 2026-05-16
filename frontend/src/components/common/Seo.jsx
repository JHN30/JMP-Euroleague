import { useEffect } from "react";

const SITE_URL = "https://www.jmpeuroleague.com";
const SITE_NAME = "JMP Euroleague";

const DEFAULT_SEO = {
  title: "JMP Euroleague | Standings, Predictions & Playoff Scenarios",
  description:
    "Explore Euroleague standings, JMP Rating predictions, model performance, team stats, and playoff scenarios.",
  path: "/",
  robots: "index, follow",
  image: "/android-chrome-512x512.png",
};

const getAbsoluteUrl = (value = "/") => {
  try {
    return new URL(value, SITE_URL).toString();
  } catch {
    return SITE_URL;
  }
};

const setMetaTag = ({ attribute, key, content }) => {
  if (!content) return;

  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const setCanonicalLink = (href) => {
  let element = document.head.querySelector('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
};

const Seo = ({
  title = DEFAULT_SEO.title,
  description = DEFAULT_SEO.description,
  path = DEFAULT_SEO.path,
  robots = DEFAULT_SEO.robots,
  image = DEFAULT_SEO.image,
}) => {
  useEffect(() => {
    const canonicalUrl = getAbsoluteUrl(path);
    const imageUrl = getAbsoluteUrl(image);

    document.title = title;
    setCanonicalLink(canonicalUrl);

    setMetaTag({ attribute: "name", key: "description", content: description });
    setMetaTag({ attribute: "name", key: "robots", content: robots });
    setMetaTag({ attribute: "property", key: "og:site_name", content: SITE_NAME });
    setMetaTag({ attribute: "property", key: "og:type", content: "website" });
    setMetaTag({ attribute: "property", key: "og:title", content: title });
    setMetaTag({ attribute: "property", key: "og:description", content: description });
    setMetaTag({ attribute: "property", key: "og:url", content: canonicalUrl });
    setMetaTag({ attribute: "property", key: "og:image", content: imageUrl });
    setMetaTag({ attribute: "name", key: "twitter:card", content: "summary" });
    setMetaTag({ attribute: "name", key: "twitter:title", content: title });
    setMetaTag({ attribute: "name", key: "twitter:description", content: description });
    setMetaTag({ attribute: "name", key: "twitter:image", content: imageUrl });
  }, [description, image, path, robots, title]);

  return null;
};

export default Seo;
