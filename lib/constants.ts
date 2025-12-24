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
            subjects: [
              {
                id: "physics",
                name: "Physics",
                code: "PHY101",
                yearId: "1",
                topics: []
              },
              {
                id: "mathematics-1",
                name: "Mathematics-I",
                code: "MATH101",
                yearId: "1",
                topics: []
              },
              {
                id: "engineering-mechanics",
                name: "Engineering Mechanics & Civil Engineering",
                code: "CE101",
                yearId: "1",
                topics: []
              },
              {
                id: "mechanical-engineering",
                name: "Fundamentals of Mechanical Engineering",
                code: "ME101",
                yearId: "1",
                topics: []
              },
              {
                id: "computer-science",
                name: "Fundamentals of Computer Science & Engineering",
                code: "CSE101",
                yearId: "1",
                topics: []
              }
            ]
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
            subjects: [
              {
                id: "engineering-physics",
                name: "Engineering Physics",
                code: "PHY102",
                yearId: "1",
                topics: []
              },
              {
                id: "mathematics-1",
                name: "Mathematics-I",
                code: "MATH101",
                yearId: "1",
                topics: []
              },
              {
                id: "electrical-engineering",
                name: "Fundamentals of Electrical Engineering",
                code: "EE101",
                yearId: "1",
                topics: []
              },
              {
                id: "electronics-engineering",
                name: "Fundamental of Electronics Engineering",
                code: "EC101",
                yearId: "1",
                topics: []
              },
              {
                id: "information-technology",
                name: "Fundamentals of Information Technology",
                code: "IT101",
                yearId: "1",
                topics: []
              }
            ]
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
            subjects: [
              {
                id: "chemistry",
                name: "Chemistry",
                code: "CHEM101",
                yearId: "1",
                topics: []
              },
              {
                id: "mathematics-1",
                name: "Mathematics-I",
                code: "MATH101",
                yearId: "1",
                topics: []
              },
              {
                id: "english",
                name: "English",
                code: "ENG101",
                yearId: "1",
                topics: []
              },
              {
                id: "electrical-engineering",
                name: "Fundamentals of Electrical Engineering",
                code: "EE101",
                yearId: "1",
                topics: []
              },
              {
                id: "engineering-graphics",
                name: "Engineering Graphics",
                code: "EG101",
                yearId: "1",
                topics: []
              }
            ]
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
            subjects: [
              {
                id: "mechanical-engineering",
                name: "Fundamentals of Mechanical Engineering",
                code: "ME101",
                yearId: "1",
                topics: []
              },
              {
                id: "mathematics-1",
                name: "Mathematics-I",
                code: "MATH101",
                yearId: "1",
                topics: []
              },
              {
                id: "english",
                name: "English",
                code: "ENG101",
                yearId: "1",
                topics: []
              },
              {
                id: "electrical-engineering",
                name: "Fundamental of Electrical Engineering",
                code: "EE101",
                yearId: "1",
                topics: []
              },
              {
                id: "renewable-energy",
                name: "Renewable Energy Resources",
                code: "RE101",
                yearId: "1",
                topics: []
              }
            ]
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
            subjects: [
              {
                id: "chemistry",
                name: "Chemistry",
                code: "CHEM101",
                yearId: "1",
                topics: []
              },
              {
                id: "mathematics-1",
                name: "Mathematics-I",
                code: "MATH101",
                yearId: "1",
                topics: []
              },
              {
                id: "english",
                name: "English",
                code: "ENG101",
                yearId: "1",
                topics: []
              },
              {
                id: "electrical-engineering",
                name: "Fundamentals of Electrical Engineering",
                code: "EE101",
                yearId: "1",
                topics: []
              },
              {
                id: "engineering-graphics",
                name: "Engineering Graphics",
                code: "EG101",
                yearId: "1",
                topics: []
              }
            ]
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
            subjects: [
              {
                id: "chemistry",
                name: "Chemistry",
                code: "CHEM101",
                yearId: "1",
                topics: []
              },
              {
                id: "mathematics-1",
                name: "Mathematics-I",
                code: "MATH101",
                yearId: "1",
                topics: []
              },
              {
                id: "english",
                name: "English",
                code: "ENG101",
                yearId: "1",
                topics: []
              },
              {
                id: "electrical-engineering",
                name: "Fundamentals of Electrical Engineering",
                code: "EE101",
                yearId: "1",
                topics: []
              },
              {
                id: "engineering-graphics",
                name: "Engineering Graphics",
                code: "EG101",
                yearId: "1",
                topics: []
              }
            ]
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
            subjects: [
              {
                id: "chemistry",
                name: "Chemistry",
                code: "CHEM101",
                yearId: "1",
                topics: []
              },
              {
                id: "mathematics-1",
                name: "Mathematics-I",
                code: "MATH101",
                yearId: "1",
                topics: []
              },
              {
                id: "english",
                name: "English",
                code: "ENG101",
                yearId: "1",
                topics: []
              },
              {
                id: "electrical-engineering",
                name: "Fundamentals of Electrical Engineering",
                code: "EE101",
                yearId: "1",
                topics: []
              },
              {
                id: "engineering-graphics",
                name: "Engineering Graphics",
                code: "EG101",
                yearId: "1",
                topics: []
              }
            ]
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
            subjects: [
              {
                id: "mathematical-concepts-ai",
                name: "Mathematical Concepts for AI",
                code: "AL101",
                yearId: "1",
                topics: []
              },
              {
                id: "basic-computer-engineering",
                name: "Basic Computer Engineering",
                code: "AL102",
                yearId: "1",
                topics: []
              },
              {
                id: "principles-electronics",
                name: "Principles of Electronics",
                code: "AL103",
                yearId: "1",
                topics: []
              },
              {
                id: "fundamentals-physics",
                name: "Fundamentals of Physics",
                code: "AL104",
                yearId: "1",
                topics: []
              },
              {
                id: "communication-skills",
                name: "Communication Skills",
                code: "AL105",
                yearId: "1",
                topics: []
              }
            ]
          },
          {
            level: 2,
            name: "Semester 2",
            subjects: [
              {
                id: "discrete-structures",
                name: "Discrete Structures",
                code: "AL201",
                yearId: "2",
                topics: []
              },
              {
                id: "statistical-methods",
                name: "Statistical Methods",
                code: "AL202",
                yearId: "2",
                topics: []
              },
              {
                id: "digital-logic-design",
                name: "Digital Logic Design",
                code: "AL203",
                yearId: "2",
                topics: []
              },
              {
                id: "object-oriented-programming",
                name: "Object Oriented Programming",
                code: "AL204",
                yearId: "2",
                topics: []
              },
              {
                id: "introduction-artificial-intelligence",
                name: "Introduction to Artificial Intelligence",
                code: "AL205",
                yearId: "2",
                topics: []
              }
            ]
          },
          {
            level: 3,
            name: "Semester 3",
            subjects: [
              {
                id: "al301-design-thinking",
                name: "Design Thinking",
                code: "AL301",
                yearId: "3",
                topics: []
              },
              {
                id: "al302-computer-organization-architecture",
                name: "Computer Organization and Architecture",
                code: "AL302",
                yearId: "3",
                topics: []
              },
              {
                id: "al303-data-structures-algorithms",
                name: "Data Structures and Algorithms",
                code: "AL303",
                yearId: "3",
                topics: []
              },
              {
                id: "al304-database-management-systems",
                name: "Database Management Systems",
                code: "AL304",
                yearId: "3",
                topics: []
              },
              {
                id: "al305-introduction-machine-learning",
                name: "Introduction to Machine Learning",
                code: "AL305",
                yearId: "3",
                topics: []
              }
            ]
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
            subjects: [
              {
                id: "cd101-statistics-probability-calculus",
                name: "Introductory Topics in Statistics, Probability and Calculus",
                code: "CD101",
                yearId: "1",
                topics: []
              },
              {
                id: "cd102-basic-computer-engineering",
                name: "Basic Computer Engineering",
                code: "CD102",
                yearId: "1",
                topics: []
              },
              {
                id: "cd103-principles-of-electronics",
                name: "Principles of Electronics",
                code: "CD103",
                yearId: "1",
                topics: []
              },
              {
                id: "cd104-fundamentals-of-physics",
                name: "Fundamentals of Physics",
                code: "CD104",
                yearId: "1",
                topics: []
              },
              {
                id: "cd105-communication-skills",
                name: "Communication Skills",
                code: "CD105",
                yearId: "1",
                topics: []
              }
            ]
          },
          {
            level: 2,
            name: "Semester 2",
            subjects: [
              {
                id: "cd201-discrete-structures",
                name: "Discrete Structures",
                code: "CD201",
                yearId: "2",
                topics: []
              },
              {
                id: "cd202-statistical-methods",
                name: "Statistical Methods",
                code: "CD202",
                yearId: "2",
                topics: []
              },
              {
                id: "cd203-digital-logic-design",
                name: "Digital Logic Design",
                code: "CD203",
                yearId: "2",
                topics: []
              },
              {
                id: "cd204-object-oriented-programming",
                name: "Object Oriented Programming",
                code: "CD204",
                yearId: "2",
                topics: []
              },
              {
                id: "cd205-introduction-to-data-analytics",
                name: "Introduction to Data Analytics",
                code: "CD205",
                yearId: "2",
                topics: []
              }
            ]
          },
          {
            level: 3,
            name: "Semester 3",
            subjects: [
              {
                id: "cd301-design-thinking",
                name: "Design Thinking",
                code: "CD301",
                yearId: "3",
                topics: []
              },
              {
                id: "cd302-computer-organization-and-architecture",
                name: "Computer Organization and Architecture",
                code: "CD302",
                yearId: "3",
                topics: []
              },
              {
                id: "cd303-data-structures-and-algorithms",
                name: "Data Structures and Algorithms",
                code: "CD303",
                yearId: "3",
                topics: []
              },
              {
                id: "cd304-database-management-systems",
                name: "Database Management Systems",
                code: "CD304",
                yearId: "3",
                topics: []
              },
              {
                id: "cd305-introduction-to-data-science",
                name: "Introduction to Data Science",
                code: "CD305",
                yearId: "3",
                topics: []
              }
            ]
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
            subjects: [
              {
                id: "cb101-discrete-mathematics",
                name: "Discrete Mathematics",
                code: "CB101",
                yearId: "1",
                topics: []
              },
              {
                id: "cb102-introductory-topics-statistics-probability-calculus",
                name: "Introductory Topics in Statistics, Probability and Calculus",
                code: "CB102",
                yearId: "1",
                topics: []
              },
              {
                id: "cb103-fundamentals-computer-science",
                name: "Fundamentals of Computer Science",
                code: "CB103",
                yearId: "1",
                topics: []
              },
              {
                id: "cb104-principles-electrical-engineering",
                name: "Principles of Electrical Engineering",
                code: "CB104",
                yearId: "1",
                topics: []
              },
              {
                id: "cb105-fundamentals-physics",
                name: "Fundamentals of Physics",
                code: "CB105",
                yearId: "1",
                topics: []
              },
              {
                id: "cb106-business-communication-value-science-i",
                name: "Business Communication and Value Science–I",
                code: "CB106",
                yearId: "1",
                topics: []
              }
            ]
          },
          {
            level: 2,
            name: "Semester 2",
            subjects: [
              {
                id: "cb201-linear-algebra",
                name: "Linear Algebra",
                code: "CB201",
                yearId: "2",
                topics: []
              },
              {
                id: "cb202-statistical-methods",
                name: "Statistical Methods",
                code: "CB202",
                yearId: "2",
                topics: []
              },
              {
                id: "cb203-data-structures-algorithms",
                name: "Data Structures & Algorithms",
                code: "CB203",
                yearId: "2",
                topics: []
              },
              {
                id: "cb204-principles-electronics",
                name: "Principles of Electronics",
                code: "CB204",
                yearId: "2",
                topics: []
              },
              {
                id: "cb205-fundamentals-economics",
                name: "Fundamentals of Economics",
                code: "CB205",
                yearId: "2",
                topics: []
              },
              {
                id: "cb206-business-communication-value-science-ii",
                name: "Business Communication and Value Science-II",
                code: "CB206",
                yearId: "2",
                topics: []
              }
            ]
          },
          {
            level: 3,
            name: "Semester 3",
            subjects: [
              {
                id: "cb301-formal-language-automata-theory",
                name: "Formal Language and Automata Theory",
                code: "CB301",
                yearId: "3",
                topics: []
              },
              {
                id: "cb302-computer-organization-architecture",
                name: "Computer Organization & Architecture",
                code: "CB302",
                yearId: "3",
                topics: []
              },
              {
                id: "cb303-object-oriented-programming",
                name: "Object Oriented Programming",
                code: "CB303",
                yearId: "3",
                topics: []
              },
              {
                id: "cb304-computational-statistics",
                name: "Computational Statistics",
                code: "CB304",
                yearId: "3",
                topics: []
              },
              {
                id: "cb305-database-management-systems",
                name: "Database Management Systems",
                code: "CB305",
                yearId: "3",
                topics: []
              }
            ]
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
