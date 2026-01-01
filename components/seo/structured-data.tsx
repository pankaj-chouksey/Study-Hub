import { siteConfig } from "@/lib/metadata";

interface StructuredDataProps {
  type: "WebSite" | "Organization" | "BreadcrumbList" | "Course" | "Article";
  data?: any;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData: any = {
    "@context": "https://schema.org",
  };

  switch (type) {
    case "WebSite":
      structuredData = {
        ...structuredData,
        "@type": "WebSite",
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      };
      break;

    case "Organization":
      structuredData = {
        ...structuredData,
        "@type": "Organization",
        name: siteConfig.name,
        description: siteConfig.description,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.png`,
        sameAs: [
          "https://twitter.com/Adhyayan",
          "https://facebook.com/Adhyayan",
          "https://linkedin.com/company/Adhyayan",
        ],
      };
      break;

    case "BreadcrumbList":
      structuredData = {
        ...structuredData,
        "@type": "BreadcrumbList",
        itemListElement: data?.items || [],
      };
      break;

    case "Course":
      structuredData = {
        ...structuredData,
        "@type": "Course",
        name: data?.name,
        description: data?.description,
        provider: {
          "@type": "Organization",
          name: siteConfig.name,
        },
      };
      break;

    case "Article":
      structuredData = {
        ...structuredData,
        "@type": "Article",
        headline: data?.title,
        description: data?.description,
        author: {
          "@type": "Person",
          name: data?.author,
        },
        datePublished: data?.datePublished,
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
        },
      };
      break;
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
