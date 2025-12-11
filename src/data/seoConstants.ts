// SEO Constants for Koshish Family Website

import { details, ExternalLinks } from "./constants";

export const SITE_CONFIG = {
  name: "Koshish Family",
  url: "https://koshishfamily.org",
  title: "Koshish Family - A Family for the Underprivileged",
  description:
    "Dedicated towards helping children gain education and their overall skills through art & craft, pathshala education programs, and community support.",
  image: "/images/logo.png",
  author: "Koshish Family",
  locale: "en_US",
  type: "website",
} as const;

export const ORGANIZATION = {
  name: "Koshish Family",
  type: "NonProfit",
  address: {
    streetAddress:
      "C33G+3W9, DIT Medical Parking Basement Rd, Salan Gaon, Bhagwant Pur, Makka Wala,", // Update with actual address
    addressLocality: "Dehradun",
    addressRegion: "Uttarakhand",
    postalCode: "248009",
    addressCountry: "IN",
  },
  telephone: details.phone,
  email: details.email,
  sameAs: [
    ExternalLinks.socials.facebook,
    ExternalLinks.socials.instagram,
    ExternalLinks.socials.youtube,
    ExternalLinks.socials.linkedin,
  ],
} as const;

export const KEYWORDS = {
  global: [
    "NGO",
    "nonprofit",
    "charity",
    "underprivileged children",
    "education",
    "community support",
    "social work",
    "volunteering",
    "donation",
    "child welfare",
  ],
  home: [
    "koshish family",
    "underprivileged children education",
    "nonprofit organization india",
    "child welfare NGO",
    "community development",
    "social impact",
  ],
  artAndCraft: [
    "art and craft for children",
    "creative education",
    "art therapy",
    "kids craft activities",
    "creative expression",
    "art education program",
  ],
  pathshala: [
    "pathshala education",
    "primary education",
    "literacy program",
    "basic education for children",
    "learning support",
    "educational empowerment",
  ],
  collectDkure: [
    "book distribution",
    "educational material distribution",
    "community outreach",
    "resource sharing",
    "educational support",
  ],
  contact: [
    "contact NGO",
    "volunteer opportunities",
    "donation inquiry",
    "partnership",
    "get involved",
  ],
} as const;

export const SEO_PAGES = {
  home: {
    title: "Koshish Family - A Family for the Underprivileged",
    description:
      "Dedicated towards helping children gain education and their overall skills through comprehensive programs including art & craft, pathshala education, and community support initiatives.",
    keywords: [...KEYWORDS.global, ...KEYWORDS.home].join(", "),
    image: "/images/logo.png",
    url: "/",
    type: "website",
  },
  artAndCraft: {
    title:
      "Art & Craft Programs - Creative Expression for Children | Koshish Family",
    description:
      "Discover our art and craft programs designed to foster creativity and self-expression in underprivileged children. Join us in nurturing young talents through various art forms.",
    keywords: [...KEYWORDS.global, ...KEYWORDS.artAndCraft].join(", "),
    image: "/images/arts/cover image.webp",
    url: "/art-and-craft",
    type: "webpage",
  },
  pathshala: {
    title:
      "Pathshala Education Program - Quality Learning for All | Koshish Family",
    description:
      "Our pathshala program provides quality primary education and literacy support to underprivileged children, empowering them with essential learning skills and knowledge.",
    keywords: [...KEYWORDS.global, ...KEYWORDS.pathshala].join(", "),
    image: "/images/kids/arjun.jpeg",
    url: "/pathshala",
    type: "webpage",
  },
  collectDkure: {
    title:
      "Collect Distribution Kure - Educational Resource Sharing | Koshish Family",
    description:
      "Join our collect distribution initiative to share educational materials and resources with underprivileged communities, making quality education accessible to all children.",
    keywords: [...KEYWORDS.global, ...KEYWORDS.collectDkure].join(", "),
    image: "/images/timeline/2024.jpeg",
    url: "/collectdkure",
    type: "webpage",
  },
  contact: {
    title: "Contact Us - Get Involved with Koshish Family",
    description:
      "Get in touch with Koshish Family to volunteer, donate, partner, or learn more about our programs for underprivileged children. We'd love to hear from you.",
    keywords: [...KEYWORDS.global, ...KEYWORDS.contact].join(", "),
    image: "/images/logo.png",
    url: "/contact",
    type: "webpage",
  },
} as const;

export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "NonProfitOrganization",
  name: ORGANIZATION.name,
  alternateName: "Koshish",
  url: SITE_CONFIG.url,
  logo: `${SITE_CONFIG.url}${SITE_CONFIG.image}`,
  description: SITE_CONFIG.description,
  address: {
    "@type": "PostalAddress",
    ...ORGANIZATION.address,
  },
  telephone: ORGANIZATION.telephone,
  email: ORGANIZATION.email,
  sameAs: ORGANIZATION.sameAs,
  foundingDate: "2012",
  knowsAbout: [
    "Child Education",
    "Art and Craft Education",
    "Community Development",
    "Social Work",
    "Volunteer Programs",
  ],
  memberOf: {
    "@type": "Organization",
    name: "NGO Community India",
  },
};
export function generateMetaTags(pageKey: keyof typeof SEO_PAGES) {
  const page = SEO_PAGES[pageKey];
  const fullUrl = `${SITE_CONFIG.url}${page.url}`;
  const fullImageUrl = `${SITE_CONFIG.url}${page.image}`;

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    canonical: fullUrl,
    openGraph: {
      title: page.title,
      description: page.description,
      url: fullUrl,
      image: fullImageUrl,
      type: page.type,
      siteName: SITE_CONFIG.name,
      locale: SITE_CONFIG.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      image: fullImageUrl,
      site: "@koshishfamily",
      creator: "@koshishfamily",
    },
  };
}

// Helper function to generate JSON-LD structured data
export function generatePageSchema(pageKey: keyof typeof SEO_PAGES) {
  const page = SEO_PAGES[pageKey];
  const fullUrl = `${SITE_CONFIG.url}${page.url}`;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.description,
    url: fullUrl,
    image: `${SITE_CONFIG.url}${page.image}`,
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    about: {
      "@type": "Organization",
      name: ORGANIZATION.name,
    },
    publisher: {
      "@type": "NonProfitOrganization",
      name: ORGANIZATION.name,
      url: SITE_CONFIG.url,
    },
  };
}
