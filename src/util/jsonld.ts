/**
 * JSON-LD structured data builders.
 *
 * Pure helpers (no Astro imports) that return plain objects assembled into a
 * single schema.org `@graph` and rendered by `Layout.astro` on every page.
 * Nodes are cross-linked by stable `@id` values per the `@graph` pattern:
 * https://hawksley.dev/blog/json-ld-explained-for-personal-websites/
 */

export const SITE_URL = "https://f1report.net";
export const SITE_NAME = "F1 Report";
export const SITE_DESCRIPTION = "Data for every Formula 1 race ever";

export const WEBSITE_ID = `${SITE_URL}/#website`;
export const PERSON_ID = `${SITE_URL}/#person`;
export const BLOG_ID = `${SITE_URL}/blog#blog`;

type JsonLdNode = Record<string, unknown>;

/**
 * Normalise an `Astro.url` into the site's indexed canonical form: no
 * `index.html`/`.html`, no trailing slash (root stays `/`). Mirrors the logic
 * in `Layout.astro` so `#webpage` ids built in pages match the layout exactly.
 */
export function canonicalUrlFor(
  astroUrl: URL,
  site: URL | string | undefined,
): { canonicalPath: string; canonicalUrl: string } {
  let canonicalPath = astroUrl.pathname
    .replace(/index\.html$/, "")
    .replace(/\.html$/, "");
  if (canonicalPath.length > 1 && canonicalPath.endsWith("/")) {
    canonicalPath = canonicalPath.slice(0, -1);
  }
  if (canonicalPath === "") canonicalPath = "/";
  const canonicalUrl = new URL(canonicalPath, site ?? SITE_URL).href;
  return { canonicalPath, canonicalUrl };
}

/** The site author / publisher. Small enough to include on every page. */
export function personNode(): JsonLdNode {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Philipp Hartenfeller",
    url: "https://hartenfeller.dev",
    sameAs: [
      "https://hartenfeller.dev",
      "https://github.com/phartenfeller",
      "https://x.com/phartenfeller",
    ],
  };
}

/** The site itself. Publisher is the Person above. */
export function websiteNode(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
  };
}

export function webPageNode({
  canonicalUrl,
  title,
  description,
  type = "WebPage",
  mainEntityId,
}: {
  canonicalUrl: string;
  title: string;
  description?: string;
  type?: string;
  mainEntityId?: string;
}): JsonLdNode {
  const node: JsonLdNode = {
    "@type": type,
    "@id": `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: title.trim(),
    isPartOf: { "@id": WEBSITE_ID },
    inLanguage: "en",
    breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
  };
  if (description) node.description = description;
  if (mainEntityId) node.mainEntity = { "@id": mainEntityId };
  return node;
}

function titleCase(segment: string): string {
  return segment
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Build a BreadcrumbList from the canonical path. Home → titled intermediate
 * segments → the current page (which uses the real page `title`). The last
 * item omits `item` per Google's guidance.
 */
export function breadcrumbNode({
  canonicalUrl,
  canonicalPath,
  title,
}: {
  canonicalUrl: string;
  canonicalPath: string;
  title: string;
}): JsonLdNode {
  const segments = canonicalPath.split("/").filter(Boolean);

  const items: JsonLdNode[] = [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
  ];

  let cumulative = "";
  segments.forEach((segment, idx) => {
    cumulative += `/${segment}`;
    const isLast = idx === segments.length - 1;
    const item: JsonLdNode = {
      "@type": "ListItem",
      position: idx + 2,
      name: isLast ? title.trim() : titleCase(segment),
    };
    // Last crumb represents the current page; omit `item` per Google guidance.
    if (!isLast) item.item = new URL(cumulative, SITE_URL).href;
    items.push(item);
  });

  return {
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    itemListElement: items,
  };
}

export function blogPostingNode({
  canonicalUrl,
  title,
  description,
  datePublished,
  dateModified,
  imageUrl,
}: {
  canonicalUrl: string;
  title: string;
  description?: string;
  datePublished: string;
  dateModified?: string;
  imageUrl?: string;
}): JsonLdNode {
  const node: JsonLdNode = {
    "@type": "BlogPosting",
    "@id": `${canonicalUrl}#blogposting`,
    headline: title.trim(),
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    mainEntityOfPage: { "@id": `${canonicalUrl}#webpage` },
    isPartOf: { "@type": "Blog", "@id": BLOG_ID },
  };
  if (description) node.description = description;
  if (imageUrl) node.image = imageUrl;
  return node;
}

export function sportsEventNode({
  canonicalUrl,
  name,
  startDate,
  endDate,
  description,
  image,
  location,
  performers,
}: {
  canonicalUrl: string;
  name: string;
  startDate?: string;
  endDate?: string;
  description?: string;
  image?: string;
  location?: { name?: string; country?: string; locality?: string };
  performers?: string[];
}): JsonLdNode {
  const node: JsonLdNode = {
    "@type": "SportsEvent",
    "@id": `${canonicalUrl}#event`,
    name,
    sport: "Formula 1",
    url: canonicalUrl,
    // Races run as scheduled; F1 events are in-person at the circuit.
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    organizer: {
      "@type": "Organization",
      name: "Formula 1",
      url: "https://www.formula1.com/",
    },
  };
  if (startDate) node.startDate = startDate;
  if (endDate) node.endDate = endDate;
  if (description) node.description = description;
  if (image) node.image = [image];
  if (performers && performers.length) {
    node.performer = performers.map((p) => ({ "@type": "Person", name: p }));
  }
  if (location?.name || location?.country || location?.locality) {
    const address: JsonLdNode = { "@type": "PostalAddress" };
    if (location.country) address.addressCountry = location.country;
    if (location.locality) address.addressLocality = location.locality;
    node.location = {
      "@type": "Place",
      ...(location.name ? { name: location.name } : {}),
      address,
    };
  }
  return node;
}

export function placeNode({
  canonicalUrl,
  name,
  country,
  location,
  url,
}: {
  canonicalUrl: string;
  name: string;
  country?: string;
  location?: string;
  url?: string;
}): JsonLdNode {
  const node: JsonLdNode = {
    "@type": ["Place", "SportsActivityLocation"],
    "@id": `${canonicalUrl}#place`,
    name,
  };
  if (country || location) {
    const address: JsonLdNode = { "@type": "PostalAddress" };
    if (country) address.addressCountry = country;
    if (location) address.addressLocality = location;
    node.address = address;
  }
  if (url) node.sameAs = [url];
  return node;
}

export function athleteNode({
  canonicalUrl,
  name,
  nationality,
  url,
}: {
  canonicalUrl: string;
  name: string;
  nationality?: string;
  url?: string;
}): JsonLdNode {
  const node: JsonLdNode = {
    "@type": ["Person", "Athlete"],
    "@id": `${canonicalUrl}#athlete`,
    name,
  };
  if (nationality) node.nationality = nationality;
  if (url) node.sameAs = [url];
  return node;
}

/**
 * Assemble the full `@graph`: site-wide WebSite + Person, the current WebPage
 * and its BreadcrumbList, then any page-specific nodes.
 */
export function buildGraph({
  canonicalUrl,
  canonicalPath,
  title,
  description,
  webPageType,
  webPageMainEntityId,
  pageNodes = [],
}: {
  canonicalUrl: string;
  canonicalPath: string;
  title: string;
  description?: string;
  webPageType?: string;
  webPageMainEntityId?: string;
  pageNodes?: JsonLdNode[];
}): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@graph": [
      websiteNode(),
      personNode(),
      webPageNode({
        canonicalUrl,
        title,
        description,
        type: webPageType,
        mainEntityId: webPageMainEntityId,
      }),
      breadcrumbNode({ canonicalUrl, canonicalPath, title }),
      ...pageNodes,
    ],
  };
}
