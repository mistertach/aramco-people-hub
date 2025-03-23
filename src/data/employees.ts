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
    year: string;
    issuer: string;
  }[];
  mentoring?: {
    available: boolean;
    topics?: string[];
    experience?: string;
  };
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
  }
];

// Build organization structure
export const employeesData = employeesList.map(employee => {
  return {
    ...employee,
    // For simplicity, we're just adding a couple of direct reports based on department
    directReports: employeesList.filter(report => 
      report.department === employee.department && 
      report.id !== employee.id && 
      report.title.includes("Director") || report.title.includes("Specialist") || report.title.includes("Analyst") || report.title.includes("Engineer")
    ).slice(0, 3) // Limit to 3 direct reports for the demo
  };
});

// Create proper org chart structure with CEO at top
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
        { ...employeesList.find(e => e.id === "e013")! }  // Environmental Engineer
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
    }
  ]
};

// Helper function to get an employee by ID
export const getEmployeeById = (id: string): EmployeeType | undefined => {
  return employeesList.find(employee => employee.id === id);
};

// Helper function to search employees
export const searchEmployees = (query: string): EmployeeType[] => {
  const lowercaseQuery = query.toLowerCase();
  return employeesList.filter(employee => 
    employee.name.toLowerCase().includes(lowercaseQuery) || 
    employee.title.toLowerCase().includes(lowercaseQuery) || 
    employee.department.toLowerCase().includes(lowercaseQuery) || 
    employee.skills?.some(skill => skill.toLowerCase().includes(lowercaseQuery)) ||
    employee.location.toLowerCase().includes(lowercaseQuery)
  );
};

export default employeesList;
