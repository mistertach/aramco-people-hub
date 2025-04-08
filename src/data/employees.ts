export interface TeamType {
  id: string;
  name: string;
  description: string;
  members: string[]; // employee IDs
  projects?: {
    name: string;
    description: string;
    status: 'active' | 'completed' | 'planned';
  }[];
}

export interface EmployeeType {
  id: string;
  name: string;
  title: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  photoUrl?: string;
  bio?: string;
  skills?: string[];
  interests?: string[];
  projects?: {
    name: string;
    description: string;
    role: string;
    period: string;
  }[];
  manager?: string;
  directReports?: EmployeeType[];
  responsibilities?: string;
  achievements?: {
    title: string;
    date: string;
    description: string;
  }[];
  awards?: {
    title: string;
    issuer: string;
    year: string;
  }[];
  mentoring?: {
    available: boolean;
    topics?: string[];
    experience?: string;
  };
  teamId?: string; // Reference to which team they belong to
}

// Base employee list without hierarchy relationships
const employeesList: EmployeeType[] = [
  {
    id: "e001",
    name: "Amin Nasser",
    title: "President & CEO",
    department: "Executive Management",
    email: "amin.nasser@example.com",
    phone: "+966-13-555-1001",
    location: "Dhahran, Saudi Arabia",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    bio: "Amin H. Nasser is the president and chief executive officer of Saudi Aramco, the world's leading integrated energy and chemicals company.",
    skills: ["Strategic Leadership", "Energy Industry", "Corporate Governance", "International Business", "Digital Transformation"],
    interests: ["Sustainable Energy", "Innovation", "Technology Adoption", "Industry 4.0"],
    projects: [
      {
        name: "Aramco Digital Transformation",
        description: "Company-wide initiative to leverage digital technologies to enhance operational efficiency and decision making.",
        role: "Executive Sponsor",
        period: "2019 - Present"
      },
      {
        name: "Sustainability Program",
        description: "Long-term strategy for sustainable operations and reduced environmental impact.",
        role: "Executive Sponsor",
        period: "2018 - Present"
      }
    ],
    responsibilities: "Leading overall company strategy and operations, focusing on digital transformation initiatives and sustainable energy development.",
    achievements: [
      {
        title: "IPO Leadership",
        date: "December 2019",
        description: "Successfully led Saudi Aramco's record-breaking initial public offering."
      },
      {
        title: "Digital Transformation",
        date: "2020-Present",
        description: "Spearheaded the company-wide digital transformation program."
      }
    ],
    awards: [
      {
        title: "Global Energy Leader of the Year",
        year: "2020",
        issuer: "Energy Intelligence"
      },
      {
        title: "Distinguished Executive Award",
        year: "2018",
        issuer: "World Petroleum Council"
      }
    ],
    mentoring: {
      available: true,
      topics: ["Leadership", "Corporate Strategy", "Energy Transition"],
      experience: "Over 30 years in the energy industry with expertise in navigating complex global markets and strategic leadership."
    }
  },
  {
    id: "e002",
    name: "Mohammed Al-Qahtani",
    title: "Senior VP, Upstream",
    department: "Upstream",
    email: "m.qahtani@example.com",
    phone: "+966-13-555-1002",
    location: "Dhahran, Saudi Arabia",
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    bio: "Dr. Mohammed Y. Al-Qahtani oversees all of Saudi Aramco's upstream operations, the largest oil and gas operation in the world.",
    skills: ["Petroleum Engineering", "Reservoir Management", "Energy Economics", "Team Leadership"],
    interests: ["Enhanced Oil Recovery", "Unconventional Resources", "Geological Modeling"],
    projects: [
      {
        name: "Unconventional Gas Initiative",
        description: "Development of unconventional gas resources to support the Kingdom's energy mix.",
        role: "Program Lead",
        period: "2020 - Present"
      }
    ]
  },
  {
    id: "e003",
    name: "Ahmad Al-Sa'adi",
    title: "Senior VP, Technical Services",
    department: "Technical Services",
    email: "ahmad.saadi@example.com",
    phone: "+966-13-555-1003",
    location: "Dhahran, Saudi Arabia",
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    bio: "Ahmad A. Al-Sa'adi leads Saudi Aramco's Engineering Services, Project Management, Information Technology, and Procurement & Supply Chain Management.",
    skills: ["Engineering Management", "Project Management", "Supply Chain Optimization", "IT Strategy"],
    interests: ["Engineering Excellence", "Automation", "Procurement Innovation"],
    projects: [
      {
        name: "Capital Efficiency Program",
        description: "Initiative to optimize capital spending while maintaining project delivery excellence.",
        role: "Executive Lead",
        period: "2019 - Present"
      }
    ],
    responsibilities: "Overseeing human resources strategy, talent acquisition, employee experience, and corporate services operations.",
    achievements: [
      {
        title: "Talent Excellence Program Launch",
        date: "January 2021",
        description: "Successfully launched the Talent Excellence Program across all departments."
      },
      {
        title: "HR Digitalization",
        date: "2020-2022",
        description: "Led the digitalization of key HR processes, improving efficiency by 35%."
      }
    ],
    awards: [
      {
        title: "HR Leader of the Year",
        year: "2022",
        issuer: "Middle East HR Excellence Awards"
      }
    ],
    mentoring: {
      available: true,
      topics: ["HR Strategy", "Professional Development", "Change Management"],
      experience: "15+ years helping professionals develop their careers in the energy sector with a focus on leadership development."
    }
  },
  {
    id: "e004",
    name: "Nabeel Al-Jama",
    title: "Senior VP, HR & Corporate Services",
    department: "Human Resources",
    email: "nabeel.jama@example.com",
    phone: "+966-13-555-1004",
    location: "Dhahran, Saudi Arabia",
    photoUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    bio: "Nabeel A. Al-Jama leads Human Resources and Corporate Services at Saudi Aramco, focusing on talent development and organizational excellence.",
    skills: ["HR Strategy", "Talent Management", "Organizational Development", "Change Management"],
    interests: ["Future of Work", "Employee Experience", "Leadership Development"],
    projects: [
      {
        name: "Talent Excellence Program",
        description: "Comprehensive initiative to attract, develop and retain top talent across the organization.",
        role: "Program Sponsor",
        period: "2020 - Present"
      }
    ]
  },
  {
    id: "e005",
    name: "Ziad Al-Murshed",
    title: "CFO & Senior VP, Finance",
    department: "Finance",
    email: "ziad.murshed@example.com",
    phone: "+966-13-555-1005",
    location: "Dhahran, Saudi Arabia",
    photoUrl: "https://images.unsplash.com/photo-1513910367299-bce8d8a0ebf6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    bio: "Ziad Al-Murshed oversees Saudi Aramco's financial strategy, planning, and operations, playing a key role in the company's financial management.",
    skills: ["Financial Management", "Strategic Planning", "Investment Analysis", "Risk Management"],
    interests: ["Capital Markets", "Financial Technology", "Economic Analysis"],
    projects: [
      {
        name: "Financial Transformation Initiative",
        description: "Multi-year program to enhance financial processes, systems and capabilities.",
        role: "Executive Sponsor",
        period: "2021 - Present"
      }
    ]
  },
  {
    id: "e006",
    name: "Nasir Al-Naimi",
    title: "VP, Petroleum Engineering",
    department: "Upstream",
    email: "nasir.naimi@example.com",
    phone: "+966-13-555-1006",
    location: "Dhahran, Saudi Arabia",
    skills: ["Reservoir Engineering", "Production Optimization", "Field Development Planning"],
    interests: ["Reservoir Simulation", "Production Technology", "Enhanced Oil Recovery"]
  },
  {
    id: "e007",
    name: "Khaled Al-Buraik",
    title: "VP, Southern Area Oil Operations",
    department: "Upstream",
    email: "khaled.buraik@example.com",
    phone: "+966-13-555-1007",
    location: "Dhahran, Saudi Arabia",
    skills: ["Oil Operations", "Production Management", "Operational Excellence"],
    interests: ["Process Safety", "Operational Efficiency", "Field Digitalization"]
  },
  {
    id: "e008",
    name: "Abdullah Al-Baiz",
    title: "VP, Information Technology",
    department: "Technical Services",
    email: "abdullah.baiz@example.com",
    phone: "+966-13-555-1008",
    location: "Dhahran, Saudi Arabia",
    photoUrl: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    skills: ["IT Strategy", "Digital Transformation", "Cybersecurity", "Cloud Computing"],
    interests: ["Artificial Intelligence", "IoT", "Blockchain", "Data Analytics"]
  },
  {
    id: "e009",
    name: "Faisal Al-Nughaimish",
    title: "VP, Procurement & Supply Chain",
    department: "Technical Services",
    email: "faisal.nughaimish@example.com",
    phone: "+966-13-555-1009",
    location: "Dhahran, Saudi Arabia",
    skills: ["Supply Chain Management", "Procurement Strategy", "Vendor Management"],
    interests: ["Supply Chain Innovation", "Local Content Development", "Strategic Sourcing"]
  },
  {
    id: "e010",
    name: "Fawwaz Al-Sahan",
    title: "Director, Talent Development",
    department: "Human Resources",
    email: "fawwaz.sahan@example.com",
    phone: "+966-13-555-1010",
    location: "Dhahran, Saudi Arabia",
    skills: ["Leadership Development", "Learning Programs", "Talent Assessment"],
    interests: ["Educational Technology", "Performance Management", "Coaching"]
  },
  {
    id: "e011",
    name: "Rania Ahmed",
    title: "IT Security Specialist",
    department: "Technical Services",
    email: "rania.ahmed@example.com",
    phone: "+966-13-555-1011",
    location: "Dhahran, Saudi Arabia",
    photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    skills: ["Cybersecurity", "Threat Analysis", "Security Architecture", "Penetration Testing"],
    interests: ["Ethical Hacking", "Security Frameworks", "Blockchain Security"]
  },
  {
    id: "e012",
    name: "Fahad Al-Otaibi",
    title: "Financial Analyst",
    department: "Finance",
    email: "fahad.otaibi@example.com",
    phone: "+966-13-555-1012",
    location: "Dhahran, Saudi Arabia",
    skills: ["Financial Analysis", "Budgeting", "Forecasting", "Investment Analysis"],
    interests: ["Financial Modeling", "Corporate Finance", "Market Analysis"]
  },
  {
    id: "e013",
    name: "Layla Mahmoud",
    title: "Environmental Engineer",
    department: "Engineering",
    email: "layla.mahmoud@example.com",
    phone: "+966-13-555-1013",
    location: "Dhahran, Saudi Arabia",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    skills: ["Environmental Impact Assessment", "Sustainability", "Pollution Control", "Remediation"],
    interests: ["Climate Change", "Renewable Energy", "Green Technologies"]
  },
  {
    id: "e014",
    name: "Omar Al-Zahrani",
    title: "Drilling Engineer",
    department: "Upstream",
    email: "omar.zahrani@example.com",
    phone: "+966-13-555-1014",
    location: "Dhahran, Saudi Arabia",
    skills: ["Drilling Operations", "Well Engineering", "Downhole Technology"],
    interests: ["Advanced Drilling Technologies", "Well Integrity", "Drilling Optimization"]
  },
  {
    id: "e015",
    name: "Sarah Al-Ghamdi",
    title: "Data Scientist",
    department: "Technical Services",
    email: "sarah.ghamdi@example.com",
    phone: "+966-13-555-1015",
    location: "Dhahran, Saudi Arabia",
    photoUrl: "https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    skills: ["Machine Learning", "Data Analytics", "Python", "Statistical Modeling"],
    interests: ["AI Applications in Energy", "Predictive Maintenance", "Natural Language Processing"]
  },
  
  // Adding new employees with quantum computing expertise
  {
    id: "e016",
    name: "Fatima Al-Hashimi",
    title: "Quantum Computing Scientist",
    department: "Research & Development",
    email: "fatima.hashimi@example.com",
    phone: "+966-13-555-1016",
    location: "Dhahran, Saudi Arabia",
    photoUrl: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    bio: "Dr. Fatima Al-Hashimi leads Aramco's quantum computing research initiatives, focusing on applications in energy optimization and materials science.",
    skills: ["Quantum Computing", "Quantum Algorithms", "Physics", "Machine Learning", "Materials Science"],
    interests: ["Quantum Machine Learning", "Quantum Chemistry", "Optimization Problems"],
    projects: [
      {
        name: "Quantum Computing for Reservoir Simulation",
        description: "Developing quantum algorithms to enhance reservoir modeling accuracy and efficiency.",
        role: "Lead Researcher",
        period: "2022 - Present"
      },
      {
        name: "Quantum-Secured Communications",
        description: "Implementing quantum key distribution for secure communications across critical infrastructure.",
        role: "Project Lead",
        period: "2023 - Present"
      }
    ],
    responsibilities: "Leading quantum computing research team, collaborating with academic institutions, and identifying industry applications for quantum technologies.",
    achievements: [
      {
        title: "Quantum Algorithm Patent",
        date: "June 2023",
        description: "Patented a novel quantum algorithm for optimizing energy distribution networks."
      }
    ],
    awards: [
      {
        title: "Emerging Technology Innovator",
        year: "2023",
        issuer: "World Energy Forum"
      }
    ],
    mentoring: {
      available: true,
      topics: ["Quantum Computing", "Scientific Research", "Women in STEM"],
      experience: "8 years mentoring graduate students and early-career scientists in quantum physics and computing."
    },
    teamId: "team006" // Will be added to a new team below
  },
  {
    id: "e017",
    name: "Khalid Al-Farsi",
    title: "Quantum Software Engineer",
    department: "Research & Development",
    email: "khalid.farsi@example.com",
    phone: "+966-13-555-1017",
    location: "Dhahran, Saudi Arabia",
    photoUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    bio: "Khalid specializes in developing software interfaces for quantum computing hardware, bridging the gap between theoretical algorithms and practical implementations.",
    skills: ["Quantum Computing", "Software Engineering", "Python", "Qiskit", "Algorithm Design"],
    interests: ["Quantum Programming", "Quantum Error Correction", "Hybrid Quantum-Classical Algorithms"],
    projects: [
      {
        name: "Quantum Computing Development Framework",
        description: "Building a custom software framework for oil & gas applications of quantum computing.",
        role: "Lead Developer",
        period: "2022 - Present"
      }
    ],
    teamId: "team006" // Will be added to a new team below
  },
  
  // Adding sustainability experts
  {
    id: "e018",
    name: "Noura Al-Thani",
    title: "Sustainability Director",
    department: "Environmental & Sustainability",
    email: "noura.thani@example.com",
    phone: "+966-13-555-1018",
    location: "Dhahran, Saudi Arabia",
    photoUrl: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    bio: "Noura leads Aramco's sustainability initiatives, focusing on reducing environmental impact while maintaining operational excellence.",
    skills: ["Environmental Management", "Sustainability Strategy", "Carbon Capture", "Renewable Energy Integration", "ESG Reporting"],
    interests: ["Green Hydrogen", "Circular Economy", "Net Zero Initiatives", "Sustainable Development"],
    projects: [
      {
        name: "Carbon Capture Utilization & Storage",
        description: "Leading large-scale CCUS projects to reduce carbon emissions across operations.",
        role: "Program Director",
        period: "2021 - Present"
      },
      {
        name: "Sustainable Water Management",
        description: "Implementing water conservation and recycling technologies across facilities.",
        role: "Executive Sponsor",
        period: "2020 - Present"
      }
    ],
    responsibilities: "Developing and implementing company-wide sustainability strategy, managing ESG reporting, and leading cross-functional sustainability projects.",
    achievements: [
      {
        title: "Sustainability Transformation",
        date: "2022",
        description: "Reduced operational carbon intensity by 15% through targeted sustainability initiatives."
      }
    ],
    awards: [
      {
        title: "Environmental Leadership Award",
        year: "2023",
        issuer: "Middle East Energy Council"
      }
    ],
    mentoring: {
      available: true,
      topics: ["Environmental Leadership", "Sustainable Business Practices", "ESG Strategy"],
      experience: "12 years mentoring professionals in sustainability and environmental management."
    },
    teamId: "team002" // Added to existing Sustainability Task Force
  },
  {
    id: "e019",
    name: "Ahmed Al-Mansouri",
    title: "Renewable Energy Specialist",
    department: "Environmental & Sustainability",
    email: "ahmed.mansouri@example.com",
    phone: "+966-13-555-1019",
    location: "Dhahran, Saudi Arabia",
    photoUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    bio: "Ahmed specializes in integrating renewable energy technologies into Aramco's operations and leads feasibility studies for large-scale renewable projects.",
    skills: ["Renewable Energy", "Solar Power", "Wind Energy", "Energy Storage", "Sustainability"],
    interests: ["Green Hydrogen", "Hybrid Energy Systems", "Energy Transition"],
    projects: [
      {
        name: "Solar PV Implementation",
        description: "Deploying solar photovoltaic systems across Aramco facilities.",
        role: "Technical Lead",
        period: "2021 - Present"
      }
    ],
    teamId: "team002" // Added to existing Sustainability Task Force
  },
  {
    id: "e020",
    name: "Leila Mahmoud",
    title: "Environmental Compliance Manager",
    department: "Environmental & Sustainability",
    email: "leila.mahmoud@example.com",
    phone: "+966-13-555-1020",
    location: "Dhahran, Saudi Arabia",
    photoUrl: "https://images.unsplash.com/photo-1554727242-741c14fa561c?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80",
    bio: "Leila oversees environmental compliance across Aramco operations and leads initiatives to exceed regulatory requirements through proactive environmental management.",
    skills: ["Environmental Compliance", "Sustainability", "Waste Management", "Environmental Impact Assessment"],
    interests: ["Circular Economy", "Biodiversity Conservation", "Environmental Policy"],
    projects: [
      {
        name: "Zero Waste Initiative",
        description: "Implementing comprehensive waste reduction and recycling programs across operations.",
        role: "Program Manager",
        period: "2022 - Present"
      }
    ],
    teamId: "team002" // Added to existing Sustainability Task Force
  }
];

// Team data
export const teamsData: TeamType[] = [
  {
    id: "team001",
    name: "Digital Transformation",
    description: "Cross-functional team focused on digital initiatives across the company",
    members: ["e001", "e008", "e011", "e015"],
    projects: [
      {
        name: "AI-Driven Operations",
        description: "Implementing AI solutions to optimize operational efficiency",
        status: "active"
      },
      {
        name: "Cloud Migration",
        description: "Transferring legacy systems to cloud infrastructure",
        status: "active"
      }
    ]
  },
  {
    id: "team002",
    name: "Sustainability Task Force",
    description: "Team focused on environmental initiatives and sustainable practices",
    members: ["e001", "e003", "e013", "e018", "e019", "e020"],
    projects: [
      {
        name: "Carbon Footprint Reduction",
        description: "Initiatives to minimize company-wide carbon emissions",
        status: "active"
      },
      {
        name: "Renewable Energy Integration",
        description: "Exploring renewable energy sources for facilities",
        status: "planned"
      },
      {
        name: "ESG Excellence Program",
        description: "Comprehensive program to enhance ESG performance and reporting",
        status: "active"
      }
    ]
  },
  {
    id: "team003",
    name: "Finance Excellence",
    description: "Team focused on financial optimization and reporting improvements",
    members: ["e005", "e012"],
    projects: [
      {
        name: "Financial Systems Upgrade",
        description: "Modernizing financial tracking and reporting systems",
        status: "active"
      }
    ]
  },
  {
    id: "team004",
    name: "Upstream Technology",
    description: "Team focused on technological advancements in upstream operations",
    members: ["e002", "e006", "e007", "e014"],
    projects: [
      {
        name: "Advanced Drilling Techniques",
        description: "Research and implementation of next-gen drilling technologies",
        status: "active"
      },
      {
        name: "Reservoir Optimization",
        description: "Using data analytics to improve reservoir management",
        status: "active"
      }
    ]
  },
  {
    id: "team005",
    name: "HR Innovation",
    description: "Team focused on improving employee experience and HR processes",
    members: ["e004", "e010"],
    projects: [
      {
        name: "Talent Development Program",
        description: "Comprehensive program for nurturing internal talent",
        status: "active"
      }
    ]
  },
  
  // Adding a new team for quantum computing
  {
    id: "team006",
    name: "Quantum Computing Research",
    description: "Specialized team exploring quantum computing applications for energy industry challenges",
    members: ["e016", "e017"],
    projects: [
      {
        name: "Quantum Algorithms for Energy",
        description: "Researching quantum algorithms to solve complex energy optimization problems",
        status: "active"
      },
      {
        name: "Quantum Computing Infrastructure",
        description: "Establishing quantum computing capabilities and partnerships with technology providers",
        status: "active"
      }
    ]
  },
  
  // Adding a team focused on cybersecurity to ensure results for that query
  {
    id: "team007",
    name: "Cybersecurity Operations",
    description: "Team responsible for protecting digital assets and implementing security measures across the company",
    members: ["e011"],
    projects: [
      {
        name: "Security Operations Center Enhancement",
        description: "Upgrading security monitoring and response capabilities",
        status: "active"
      },
      {
        name: "Zero Trust Architecture Implementation",
        description: "Deploying zero trust security model across corporate networks",
        status: "active"
      }
    ]
  }
];

// Update employee records with team associations
export const employeesData = employeesList.map(employee => {
  // Find which team(s) this employee belongs to
  const employeeTeamId = teamsData.find(team => 
    team.members.includes(employee.id)
  )?.id;
  
  return {
    ...employee,
    teamId: employeeTeamId,
    // For simplicity, we're just adding a couple of direct reports based on department
    directReports: employeesList.filter(report => 
      report.department === employee.department && 
      report.id !== employee.id && 
      (report.title.includes("Director") || report.title.includes("Specialist") || report.title.includes("Analyst") || report.title.includes("Engineer"))
    ).slice(0, 3) // Limit to 3 direct reports for the demo
  };
});

// Build organization structure
export const orgChartData: EmployeeType = {
  ...employeesList.find(e => e.id === "e001")!, // CEO
  directReports: [
    { 
      ...employeesList.find(e => e.id === "e002")!, // SVP Upstream
      directReports: [
        { ...employeesList.find(e => e.id === "e006")! }, // VP Petroleum Engineering
        { ...employeesList.find(e => e.id === "e007")! },  // VP Operations
        { ...employeesList.find(e => e.id === "e014")! }   // Drilling Engineer
      ]
    },
    { 
      ...employeesList.find(e => e.id === "e003")!, // SVP Technical Services
      directReports: [
        { ...employeesList.find(e => e.id === "e008")!, // VP IT
          directReports: [
            { ...employeesList.find(e => e.id === "e011")! }, // IT Security
            { ...employeesList.find(e => e.id === "e015")! }  // Data Scientist
          ]
        },
        { ...employeesList.find(e => e.id === "e009")! }, // VP Procurement
        { ...employeesList.find(e => e.id === "e013")! },  // Environmental Engineer
        { ...employeesList.find(e => e.id === "e016")!,    // Quantum Computing Scientist
          directReports: [
            { ...employeesList.find(e => e.id === "e017")! } // Quantum Software Engineer
          ]
        }
      ]
    },
    { 
      ...employeesList.find(e => e.id === "e004")!, // SVP HR
      directReports: [
        { ...employeesList.find(e => e.id === "e010")! } // Director Talent
      ]
    },
    { 
      ...employeesList.find(e => e.id === "e005")!, // CFO
      directReports: [
        { ...employeesList.find(e => e.id === "e012")! } // Financial Analyst
      ]
    },
    { 
      ...employeesList.find(e => e.id === "e018")!, // Sustainability Director
      directReports: [
        { ...employeesList.find(e => e.id === "e019")! }, // Renewable Energy Specialist
        { ...employeesList.find(e => e.id === "e020")! }  // Environmental Compliance Manager
      ]
    }
  ]
};

// Helper function to get team by ID
export const getTeamById = (id: string): TeamType | undefined => {
  return teamsData.find(team => team.id === id);
};

// Helper function to get all teams
export const getAllTeams = (): TeamType[] => {
  return teamsData;
};

// Helper function to get team members
export const getTeamMembers = (teamId: string): EmployeeType[] => {
  const team = getTeamById(teamId);
  if (!team) return [];
  
  return team.members
    .map(memberId => employeesList.find(emp => emp.id === memberId))
    .filter(member => member !== undefined) as EmployeeType[];
};

// Helper function to get employee by ID
export const getEmployeeById = (id: string): EmployeeType | undefined => {
  return employeesList.find(employee => employee.id === id);
};

// Adding the missing searchEmployees function
export const searchEmployees = (query: string): EmployeeType[] => {
  if (!query || query.trim() === '') {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();
  
  return employeesList.filter(employee => {
    // Search by name
    if (employee.name.toLowerCase().includes(normalizedQuery)) {
      return true;
    }
    
    // Search by title
    if (employee.title.toLowerCase().includes(normalizedQuery)) {
      return true;
    }
    
    // Search by department
    if (employee.department.toLowerCase().includes(normalizedQuery)) {
      return true;
    }
    
    // Search by location
    if (employee.location.toLowerCase().includes(normalizedQuery)) {
      return true;
    }
    
    // Search by skills
    if (employee.skills && employee.skills.some(skill => 
      skill.toLowerCase().includes(normalizedQuery)
    )) {
      return true;
    }
    
    // Search by interests
    if (employee.interests && employee.interests.some(interest => 
      interest.toLowerCase().includes(normalizedQuery)
    )) {
      return true;
    }
    
    // Search by bio
    if (employee.bio && employee.bio.toLowerCase().includes(normalizedQuery)) {
      return true;
    }
    
    return false;
  });
};
