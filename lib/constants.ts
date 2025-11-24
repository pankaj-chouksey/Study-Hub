import { Department, User, LeaderboardEntry, DiscussionPost, Content } from "./types";

// University Departments Structure
export const DEPARTMENTS: Department[] = [
  {
    id: "uit",
    name: "UIT",
    fullName: "University Institute of Technology",
    slug: "uit",
    description: "Engineering and Technology programs",
    icon: "🏛️",
    branches: [
      {
        id: "cse",
        name: "CSE",
        fullName: "Computer Science Engineering",
        slug: "cse",
        years: [
          {
            level: 1,
            name: "Semester 1",
            subjects: []
          },
          {
            level: 2,
            name: "Semester 2",
            subjects: []
          },
          {
            level: 3,
            name: "Semester 3",
            subjects: []
          },
          {
            level: 4,
            name: "Semester 4",
            subjects: []
          }
        ]
      },
      {
        id: "it",
        name: "IT",
        fullName: "Information Technology",
        slug: "it",
        years: [
          {
            level: 1,
            name: "Semester 1",
            subjects: []
          },
          {
            level: 2,
            name: "Semester 2",
            subjects: []
          },
          {
            level: 3,
            name: "Semester 3",
            subjects: []
          },
          {
            level: 4,
            name: "Semester 4",
            subjects: []
          }
        ]
      },
      {
        id: "ece",
        name: "ECE",
        fullName: "Electronics & Communication Engineering",
        slug: "ece",
        years: [
          {
            level: 1,
            name: "Semester 1",
            subjects: []
          },
          {
            level: 2,
            name: "Semester 2",
            subjects: []
          },
          {
            level: 3,
            name: "Semester 3",
            subjects: []
          },
          {
            level: 4,
            name: "Semester 4",
            subjects: []
          }
        ]
      },
      {
        id: "ex",
        name: "EX",
        fullName: "Electrical Engineering",
        slug: "ex",
        years: [
          {
            level: 1,
            name: "Semester 1",
            subjects: []
          },
          {
            level: 2,
            name: "Semester 2",
            subjects: []
          },
          {
            level: 3,
            name: "Semester 3",
            subjects: []
          },
          {
            level: 4,
            name: "Semester 4",
            subjects: []
          }
        ]
      },
      {
        id: "me",
        name: "ME",
        fullName: "Mechanical Engineering",
        slug: "me",
        years: [
          {
            level: 1,
            name: "Semester 1",
            subjects: []
          },
          {
            level: 2,
            name: "Semester 2",
            subjects: []
          },
          {
            level: 3,
            name: "Semester 3",
            subjects: []
          },
          {
            level: 4,
            name: "Semester 4",
            subjects: []
          }
        ]
      },
      {
        id: "au",
        name: "AU",
        fullName: "Automobile Engineering",
        slug: "au",
        years: [
          {
            level: 1,
            name: "Semester 1",
            subjects: []
          },
          {
            level: 2,
            name: "Semester 2",
            subjects: []
          },
          {
            level: 3,
            name: "Semester 3",
            subjects: []
          },
          {
            level: 4,
            name: "Semester 4",
            subjects: []
          }
        ]
      },
      {
        id: "ce",
        name: "CE",
        fullName: "Civil Engineering",
        slug: "ce",
        years: [
          {
            level: 1,
            name: "Semester 1",
            subjects: []
          },
          {
            level: 2,
            name: "Semester 2",
            subjects: []
          },
          {
            level: 3,
            name: "Semester 3",
            subjects: []
          },
          {
            level: 4,
            name: "Semester 4",
            subjects: []
          }
        ]
      },
      {
        id: "pct",
        name: "PCT",
        fullName: "Petrochemical Technology",
        slug: "pct",
        years: [
          {
            level: 1,
            name: "Semester 1",
            subjects: []
          },
          {
            level: 2,
            name: "Semester 2",
            subjects: []
          },
          {
            level: 3,
            name: "Semester 3",
            subjects: []
          },
          {
            level: 4,
            name: "Semester 4",
            subjects: []
          }
        ]
      }
    ]
  },
  {
    id: "soit",
    name: "SOIT",
    fullName: "School of Information Technology",
    slug: "soit",
    description: "Advanced IT and Data Science programs",
    icon: "💻",
    branches: [
      {
        id: "aiml",
        name: "AIML",
        fullName: "Artificial Intelligence & Machine Learning",
        slug: "aiml",
        years: [
          {
            level: 1,
            name: "Semester 1",
            subjects: []
          },
          {
            level: 2,
            name: "Semester 2",
            subjects: []
          },
          {
            level: 3,
            name: "Semester 3",
            subjects: []
          },
          {
            level: 4,
            name: "Semester 4",
            subjects: []
          }
        ]
      },
      {
        id: "ds",
        name: "DS",
        fullName: "Data Science",
        slug: "ds",
        years: [
          {
            level: 1,
            name: "Semester 1",
            subjects: []
          },
          {
            level: 2,
            name: "Semester 2",
            subjects: []
          },
          {
            level: 3,
            name: "Semester 3",
            subjects: []
          },
          {
            level: 4,
            name: "Semester 4",
            subjects: []
          }
        ]
      },
      {
        id: "bs",
        name: "BS",
        fullName: "Business Systems",
        slug: "bs",
        years: [
          {
            level: 1,
            name: "Semester 1",
            subjects: []
          },
          {
            level: 2,
            name: "Semester 2",
            subjects: []
          },
          {
            level: 3,
            name: "Semester 3",
            subjects: []
          },
          {
            level: 4,
            name: "Semester 4",
            subjects: []
          }
        ]
      }
    ]
  }
];

// Mock Users (for development - will be replaced with real users)
export const MOCK_USERS: User[] = [];

// Mock Content (not used - all content from MongoDB)
export const MOCK_CONTENT: Content[] = [];

// Mock Leaderboard (not used - will be calculated from real data)
export const MOCK_LEADERBOARD: LeaderboardEntry[] = [];

// Mock Discussion Posts (not used - will come from MongoDB)
export const MOCK_DISCUSSIONS: DiscussionPost[] = [];

// Quick Access Cards for Homepage
export const QUICK_ACCESS_CARDS = [
  {
    id: "notes",
    title: "Notes",
    description: "Browse study notes",
    icon: "FileText",
    href: "/departments?type=note",
    color: "blue"
  },
  {
    id: "videos",
    title: "Videos",
    description: "Watch video lectures",
    icon: "Video",
    href: "/departments?type=video",
    color: "purple"
  },
  {
    id: "pyqs",
    title: "PYQs",
    description: "Previous year questions",
    icon: "FileQuestion",
    href: "/departments?type=pyq",
    color: "teal"
  },
  {
    id: "important",
    title: "Important",
    description: "Important questions",
    icon: "Star",
    href: "/departments?type=important",
    color: "orange"
  }
];
