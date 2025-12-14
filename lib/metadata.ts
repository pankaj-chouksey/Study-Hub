import type { Metadata } from "next";

const siteConfig = {
  name: "Edvora",
  description:
    "Collaborative study materials platform for college students. Share and access notes, videos, PYQs, and important questions across all departments.",
  url: "https://edvora.edu",
  ogImage: "https://edvora.edu/og-image.png",
  keywords: [
    "study materials",
    "college notes",
    "educational platform",
    "student collaboration",
    "past year questions",
    "PYQ",
    "lecture notes",
    "video lectures",
    "engineering notes",
    "study resources",
  ],
};

export function generateMetadata({
  title,
  description,
  image,
  keywords,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string[];
  noIndex?: boolean;
} = {}): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const metaDescription = description || siteConfig.description;
  const metaImage = image || siteConfig.ogImage;
  const metaKeywords = keywords
    ? [...siteConfig.keywords, ...keywords]
    : siteConfig.keywords;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: siteConfig.url,
      title: metaTitle,
      description: metaDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      creator: "@edvora",
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
  };
}

export function generateDepartmentMetadata(department: string): Metadata {
  return generateMetadata({
    title: `${department} Department`,
    description: `Browse study materials, notes, videos, and PYQs for ${department} department. Access resources shared by students and faculty.`,
    keywords: [department, `${department} notes`, `${department} materials`],
  });
}

export function generateBranchMetadata(
  department: string,
  branch: string
): Metadata {
  return generateMetadata({
    title: `${branch} - ${department}`,
    description: `Study materials for ${branch} in ${department} department. Find notes, videos, PYQs, and important questions.`,
    keywords: [branch, department, `${branch} notes`, `${branch} materials`],
  });
}

export function generateSubjectMetadata(
  subject: string,
  branch: string
): Metadata {
  return generateMetadata({
    title: `${subject} - ${branch}`,
    description: `Complete study materials for ${subject}. Access notes, video lectures, past year questions, and important questions shared by students.`,
    keywords: [
      subject,
      branch,
      `${subject} notes`,
      `${subject} PYQ`,
      `${subject} lectures`,
    ],
  });
}

export function generateContentMetadata(
  title: string,
  description: string,
  type: string
): Metadata {
  return generateMetadata({
    title,
    description,
    keywords: [type, title, "study material", "educational content"],
  });
}

export { siteConfig };
