import { MetadataRoute } from "next";
import { DEPARTMENTS } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://edvora.edu";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/departments`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/leaderboard`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/discussion`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/upload`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  // Dynamic department pages
  const departmentPages: MetadataRoute.Sitemap = DEPARTMENTS.flatMap((dept) => {
    const deptPages: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}/departments/${dept.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
    ];

    // Add branch pages
    const branchPages: MetadataRoute.Sitemap = dept.branches.flatMap((branch) => {
      const branchPageList: MetadataRoute.Sitemap = [
        {
          url: `${baseUrl}/departments/${dept.slug}/${branch.slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly",
          priority: 0.7,
        },
      ];

      // Add year pages
      const yearPages: MetadataRoute.Sitemap = branch.years.flatMap((year) => {
        const yearSlug = year.name.toLowerCase().replace(/\s+/g, "-");
        const yearPageList: MetadataRoute.Sitemap = [
          {
            url: `${baseUrl}/departments/${dept.slug}/${branch.slug}/${yearSlug}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.6,
          },
        ];

        // Add subject pages
        const subjectPages: MetadataRoute.Sitemap = year.subjects.map((subject) => {
          const subjectSlug = subject.name.toLowerCase().replace(/\s+/g, "-");
          return {
            url: `${baseUrl}/departments/${dept.slug}/${branch.slug}/${yearSlug}/${subjectSlug}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.5,
          };
        });

        return [...yearPageList, ...subjectPages];
      });

      return [...branchPageList, ...yearPages];
    });

    return [...deptPages, ...branchPages];
  });

  return [...staticPages, ...departmentPages];
}
