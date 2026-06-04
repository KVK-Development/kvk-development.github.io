import { useEffect } from "react";

const SITE_URL = "https://redmesa.dev";
const SITE_NAME = "Red Mesa Development";
const DEFAULT_IMAGE = `${SITE_URL}/manifest-icon-512.maskable.png`;

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  type?: "website" | "article";
  structuredData?: Record<string, unknown> | Record<string, unknown>[];
};

function setMetaAttribute(
  selector: string,
  attribute: "name" | "property",
  key: string,
  content: string
) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

export default function Seo({
  title,
  description,
  path = "/",
  keywords = [],
  type = "website",
  structuredData,
}: SeoProps) {
  useEffect(() => {
    const canonicalUrl = new URL(path, SITE_URL).toString();
    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

    document.title = fullTitle;

    setMetaAttribute('meta[name="description"]', "name", "description", description);
    setMetaAttribute('meta[name="robots"]', "name", "robots", "index, follow");
    setMetaAttribute('meta[property="og:title"]', "property", "og:title", fullTitle);
    setMetaAttribute('meta[property="og:description"]', "property", "og:description", description);
    setMetaAttribute('meta[property="og:type"]', "property", "og:type", type);
    setMetaAttribute('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMetaAttribute('meta[property="og:site_name"]', "property", "og:site_name", SITE_NAME);
    setMetaAttribute('meta[property="og:image"]', "property", "og:image", DEFAULT_IMAGE);
    setMetaAttribute('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    setMetaAttribute('meta[name="twitter:title"]', "name", "twitter:title", fullTitle);
    setMetaAttribute('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMetaAttribute('meta[name="twitter:image"]', "name", "twitter:image", DEFAULT_IMAGE);

    if (keywords.length > 0) {
      setMetaAttribute('meta[name="keywords"]', "name", "keywords", keywords.join(", "));
    }

    setLink("canonical", canonicalUrl);

    const existingStructuredData = document.head.querySelector<HTMLScriptElement>(
      'script[data-seo="structured-data"]'
    );
    existingStructuredData?.remove();

    if (structuredData) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seo = "structured-data";
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }
  }, [description, keywords, path, structuredData, title, type]);

  return null;
}

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: DEFAULT_IMAGE,
  email: "contact@redmesa.dev",
  description:
    "Red Mesa Development builds AI-enabled software products, private infrastructure, and on-premises AI deployments for startups.",
  areaServed: "US",
  sameAs: [],
  serviceType: [
    "AI software development",
    "On-premises AI infrastructure",
    "Full stack software development",
    "Private cloud deployment",
  ],
};

export function serviceStructuredData(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${path}#service`,
    name,
    description,
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    areaServed: "US",
    url: `${SITE_URL}${path}`,
  };
}
