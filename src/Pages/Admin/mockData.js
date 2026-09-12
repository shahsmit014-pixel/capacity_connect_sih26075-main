// Realistic Mock Data for Capacity Connect Admin Panel

export const INITIAL_USERS = [
  {
    id: "usr-101",
    name: "Dr. Rajesh Sharma",
    email: "rajesh.sharma@capacityconnect.gov.in",
    role: "Admin",
    department: "Executive & Governance",
    organization: "National Capacity Mission",
    phone: "+91 98765 43210",
    joinedDate: "2024-01-15",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    bio: "Senior administrator overseeing competency frameworks, cross-ministry training cohorts, and digital learning compliance.",
    coursesCount: 14,
    progress: 100,
    competencyLevel: "Expert",
    recentActivity: [
      { action: "Approved Master Trainer Certification", time: "15 mins ago", type: "approval" },
      { action: "Updated Digital Governance Competency Matrix", time: "2 hours ago", type: "system" },
      { action: "Generated Q3 Departmental Analytics Report", time: "1 day ago", type: "report" }
    ]
  },
  {
    id: "usr-102",
    name: "Ananya Deshmukh",
    email: "ananya.d@iitb.ac.in",
    role: "Trainer",
    department: "Computer Science & AI",
    organization: "IIT Bombay Extension",
    phone: "+91 94231 87654",
    joinedDate: "2024-02-10",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    bio: "AI research fellow and lead facilitator for Public Sector AI Adoption and Machine Learning frameworks.",
    coursesCount: 8,
    progress: 92,
    competencyLevel: "Expert",
    rating: 4.9,
    expertise: "Artificial Intelligence & Public Systems",
    recentActivity: [
      { action: "Submitted new module for 'AI in Public Administration'", time: "40 mins ago", type: "course" },
      { action: "Graded 45 capstone projects", time: "3 hours ago", type: "grading" }
    ]
  },
  {
    id: "usr-103",
    name: "Vikramaditya Rathore",
    email: "v.rathore@rajasthan.gov.in",
    role: "Learner",
    department: "Public Infrastructure & Works",
    organization: "State Public Works Department",
    phone: "+91 98290 11223",
    joinedDate: "2024-03-01",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    bio: "Executive Engineer specializing in sustainable urban drainage, smart contracts, and project lifecycle management.",
    coursesCount: 5,
    progress: 68,
    competencyLevel: "Intermediate",
    recentActivity: [
      { action: "Completed quiz on 'Smart Tender Protocols'", time: "1 hour ago", type: "quiz" },
      { action: "Started 'Sustainable Concrete & Green Roads'", time: "Yesterday", type: "learning" }
    ]
  },
  {
    id: "usr-104",
    name: "Pooja Sundaram",
    email: "p.sundaram@nic.in",
    role: "Learner",
    department: "Digital Services & IT",
    organization: "National Informatics Centre",
    phone: "+91 97112 34567",
    joinedDate: "2024-03-12",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    bio: "Cybersecurity analyst leading national data protection assessments and zero-trust cloud migrations.",
    coursesCount: 9,
    progress: 84,
    competencyLevel: "Advanced",
    recentActivity: [
      { action: "Earned Certificate in 'Zero Trust Architecture'", time: "2 hours ago", type: "cert" },
      { action: "Submitted assessment for Cyber Law Module", time: "2 days ago", type: "assessment" }
    ]
  },
  {
    id: "usr-105",
    name: "Sunil Narang",
    email: "sunil.narang@karmayogi.in",
    role: "Trainer",
    department: "Leadership & Administrative Reform",
    organization: "National Institute of Good Governance",
    phone: "+91 98101 22334",
    joinedDate: "2024-01-22",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    bio: "Former bureaucrat and master mentor on ethical decision-making, citizen-centric service design, and crisis diplomacy.",
    coursesCount: 12,
    progress: 98,
    competencyLevel: "Expert",
    rating: 4.8,
    expertise: "Civil Service Ethics & Leadership",
    recentActivity: [
      { action: "Conducted live webinar for 350 officers", time: "Yesterday", type: "webinar" }
    ]
  },
  {
    id: "usr-106",
    name: "Aakash Banerjee",
    email: "aakash.b@wbfin.org",
    role: "Organization",
    department: "Public Financial Management",
    organization: "Department of Expenditure & Finance",
    phone: "+91 98300 99887",
    joinedDate: "2024-04-05",
    status: "Pending",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
    bio: "Chief Accounts Officer spearheading automated budgeting pipelines and DBT optimization systems.",
    coursesCount: 2,
    progress: 25,
    competencyLevel: "Beginner",
    recentActivity: [
      { action: "Submitted organization registration request", time: "3 hours ago", type: "approval" }
    ]
  },
  {
    id: "usr-107",
    name: "Meera Krishnan",
    email: "meera.k@isro.gov.in",
    role: "Learner",
    department: "Space Technology & Satellite Data",
    organization: "Indian Space Research Organisation",
    phone: "+91 99401 55667",
    joinedDate: "2024-02-18",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    bio: "Remote sensing scientist exploring geospatial intelligence for agricultural disaster relief and flood mapping.",
    coursesCount: 7,
    progress: 76,
    competencyLevel: "Advanced",
    recentActivity: [
      { action: "Completed 'GIS for Hydrological Risk Models'", time: "4 hours ago", type: "course" }
    ]
  },
  {
    id: "usr-108",
    name: "Col. Sanjeev Kapoor",
    email: "sanjeev.k@disastermgmt.gov.in",
    role: "Trainer",
    department: "Emergency Response & Resilience",
    organization: "National Disaster Management Authority",
    phone: "+91 98681 77889",
    joinedDate: "2024-01-30",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    bio: "Crisis operational commander with 25 years of tactical disaster logistics, triage, and multi-agency coordination experience.",
    coursesCount: 6,
    progress: 100,
    competencyLevel: "Expert",
    rating: 4.95,
    expertise: "Emergency Command & Incident Resilience",
    recentActivity: [
      { action: "Published 'Monsoon Flood Triage Playbook'", time: "2 days ago", type: "resource" }
    ]
  },
  {
    id: "usr-109",
    name: "Deepak Verma",
    email: "deepak.verma@delhipolice.nic.in",
    role: "Learner",
    department: "Law Enforcement & Cyber Cell",
    organization: "State Police Training Academy",
    phone: "+91 98110 44556",
    joinedDate: "2024-05-14",
    status: "Suspended",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80",
    bio: "Sub-Inspector undergoing disciplinary assessment and administrative credential validation.",
    coursesCount: 1,
    progress: 10,
    competencyLevel: "Beginner",
    recentActivity: [
      { action: "Account flagged for multiple failed authentications", time: "4 days ago", type: "alert" }
    ]
  },
  {
    id: "usr-110",
    name: "Kavita Ranganathan",
    email: "kavita.r@healthmission.gov.in",
    role: "Learner",
    department: "Public Healthcare & Epidemiology",
    organization: "National Health Authority",
    phone: "+91 99802 33445",
    joinedDate: "2024-04-20",
    status: "Active",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80",
    bio: "District epidemiologist focusing on community immunization surveillance and Ayushman Bharat health portal ops.",
    coursesCount: 6,
    progress: 58,
    competencyLevel: "Intermediate",
    recentActivity: [
      { action: "Enrolled in 'Digital Health Record Standards (FHIR)'", time: "1 day ago", type: "course" }
    ]
  }
];

export const INITIAL_COURSES = [
  {
    id: "crs-201",
    title: "AI & Data-Driven Governance for Public Systems",
    description: "An intensive training curriculum empowering public officials to leverage machine learning, computer vision, and predictive analytics for transparent, equitable citizen delivery.",
    trainer: "Ananya Deshmukh",
    trainerAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    trainerEmail: "ananya.d@iitb.ac.in",
    category: "Digital Skills",
    level: "Advanced",
    duration: "6 Weeks (24 Hours)",
    learners: 1420,
    rating: 4.9,
    reviewsCount: 312,
    createdDate: "2024-01-20",
    status: "Published",
    modules: [
      {
        id: "m1",
        title: "Module 1: Foundations of Ethical AI in Civil Administration",
        duration: "3 hrs 45 mins",
        lessons: [
          "Understanding Algorithmic Bias in Citizen Profiling",
          "Open Government Data (OGD) Frameworks",
          "Case Studies: Smart Traffic & Crop Yield AI"
        ]
      },
      {
        id: "m2",
        title: "Module 2: Predictive Modeling for Resource Optimization",
        duration: "5 hrs 20 mins",
        lessons: [
          "Supervised vs Unsupervised Learning for Public Budgets",
          "Evaluating Precision vs Recall in Welfare Screening",
          "Interactive Lab: Python on Cloud Jupyter Notebooks"
        ]
      },
      {
        id: "m3",
        title: "Module 3: Privacy, DPDP Act Compliance & Security",
        duration: "4 hrs 10 mins",
        lessons: [
          "Compliance with India Digital Personal Data Protection Act",
          "Anonymization and Differential Privacy in Open Datasets",
          "Audit Trails and Explainability Pipelines"
        ]
      },
      {
        id: "m4",
        title: "Module 4: Capstone Project & Departmental Implementation",
        duration: "6 hrs 00 mins",
        lessons: [
          "Designing a 90-Day AI Pilot for Your Ministry",
          "Stakeholder Communication & Change Management",
          "Peer Review and Final Presentation"
        ]
      }
    ],
    outcomes: [
      "Formulate verifiable AI adoption roadmaps aligned with national standards",
      "Detect and rectify algorithmic prejudice in automated government screening",
      "Deploy safe data pipeline schemas complying with privacy legislation",
      "Champion evidence-based policymaking across inter-departmental teams"
    ],
    reviews: [
      {
        user: "Vikramaditya Rathore",
        rating: 5,
        date: "2 days ago",
        comment: "Outstanding structure! The case studies on GIS and municipal asset tracking directly helped our road division."
      },
      {
        user: "Pooja Sundaram",
        rating: 5,
        date: "1 week ago",
        comment: "Essential training for every technical officer transitioning legacy database workflows into modern AI stacks."
      }
    ]
  },
  {
    id: "crs-202",
    title: "Public Procurement & GeM Portal Masterclass",
    description: "End-to-end guidance through the Government e-Marketplace (GeM) ecosystem, General Financial Rules (GFR), reverse auctions, and contract dispute resolution.",
    trainer: "Dr. Rajesh Sharma",
    trainerAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    trainerEmail: "rajesh.sharma@capacityconnect.gov.in",
    category: "Management",
    level: "Intermediate",
    duration: "4 Weeks (16 Hours)",
    learners: 2850,
    rating: 4.8,
    reviewsCount: 520,
    createdDate: "2024-02-05",
    status: "Published",
    modules: [
      {
        id: "m1",
        title: "Module 1: General Financial Rules 2017 Deep Dive",
        duration: "4 hrs",
        lessons: ["Principles of Public Buying", "Thresholds for Tendering & Quotations", "Proprietary Article Certificates"]
      },
      {
        id: "m2",
        title: "Module 2: GeM Navigation, BOQ & Reverse Auctions",
        duration: "6 hrs",
        lessons: ["Direct Purchase vs L1 vs Bidding", "Creating Custom Catalogues", "Conducting Online Reverse Auctions"]
      }
    ],
    outcomes: [
      "Execute compliant procurement cycles under GFR guidelines",
      "Operate GeM portal features with zero vendor dispute escalations",
      "Analyze price variation formulas and performance guarantees"
    ],
    reviews: [
      {
        user: "Suresh Menon",
        rating: 4.8,
        date: "3 days ago",
        comment: "Saved our department weeks of audit back-and-forth by clarifying tender evaluation matrices."
      }
    ]
  },
  {
    id: "crs-203",
    title: "Transformational Leadership & Ethical Decision Making",
    description: "Cultivating adaptive leadership traits, emotional intelligence, anti-corruption frameworks, and crisis team stewardship in administrative roles.",
    trainer: "Sunil Narang",
    trainerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    trainerEmail: "sunil.narang@karmayogi.in",
    category: "Leadership",
    level: "Intermediate",
    duration: "5 Weeks (20 Hours)",
    learners: 980,
    rating: 4.95,
    reviewsCount: 184,
    createdDate: "2024-03-01",
    status: "Published",
    modules: [
      {
        id: "m1",
        title: "Module 1: Adaptive Leadership in Ambiguous Scenarios",
        duration: "5 hrs",
        lessons: ["Navigating Multi-Stakeholder Conflict", "Empathy as an Operational Driver", "Constructive Dissent"]
      }
    ],
    outcomes: [
      "Apply principled ethical frameworks under political and time pressures",
      "Lead cross-functional crisis strike teams with psychological safety"
    ],
    reviews: []
  },
  {
    id: "crs-204",
    title: "Incident Command System (ICS) for Disaster Preparedness",
    description: "Standardized on-scene all-hazard incident management concept designed to enable effective, efficient domestic incident management by integrating a combination of facilities, equipment, personnel, procedures, and communications.",
    trainer: "Col. Sanjeev Kapoor",
    trainerAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    trainerEmail: "sanjeev.k@disastermgmt.gov.in",
    category: "Industry Skills",
    level: "Advanced",
    duration: "8 Weeks (32 Hours)",
    learners: 640,
    rating: 4.9,
    reviewsCount: 96,
    createdDate: "2024-03-18",
    status: "Pending",
    modules: [],
    outcomes: ["Deploy command structures under NDMA protocols", "Manage inter-agency logistics during severe climate shocks"],
    reviews: []
  },
  {
    id: "crs-205",
    title: "Cloud Migration Architecture for State Portals",
    description: "Architectural blueprint for transitioning monolithic citizen portals to microservices on MeghRaj cloud with high-availability load balancing.",
    trainer: "Pooja Sundaram",
    trainerAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    trainerEmail: "p.sundaram@nic.in",
    category: "Technical Skills",
    level: "Expert",
    duration: "6 Weeks (25 Hours)",
    learners: 410,
    rating: 4.7,
    reviewsCount: 54,
    createdDate: "2024-04-10",
    status: "Draft",
    modules: [],
    outcomes: ["Design resilient sovereign cloud topologies", "Implement automated disaster recovery drills"],
    reviews: []
  },
  {
    id: "crs-206",
    title: "Strategic Communications for Citizen Engagement",
    description: "Crisis communication, press briefing design, combating digital misinformation, and crafting empathetic public awareness campaigns across vernacular channels.",
    trainer: "Sunil Narang",
    trainerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    trainerEmail: "sunil.narang@karmayogi.in",
    category: "Communication",
    level: "Beginner",
    duration: "3 Weeks (12 Hours)",
    learners: 1120,
    rating: 4.65,
    reviewsCount: 140,
    createdDate: "2024-04-22",
    status: "Published",
    modules: [],
    outcomes: ["Master clear, transparent public messaging in times of urgency", "Identify and neutralize fake social rumors"],
    reviews: []
  }
];

export const INITIAL_TRAINING_PROGRAMS = [
  {
    id: "prog-301",
    name: "Digital District Collectors Fellowship 2024",
    organization: "Ministry of Electronics & Information Technology",
    trainer: "Ananya Deshmukh",
    startDate: "2024-06-01",
    endDate: "2024-08-30",
    participants: 120,
    status: "Active",
    progress: 72,
    department: "Administration"
  },
  {
    id: "prog-302",
    name: "Executive Leadership for Municipal Commissioners",
    organization: "Ministry of Housing & Urban Affairs",
    trainer: "Sunil Narang",
    startDate: "2024-07-15",
    endDate: "2024-09-15",
    participants: 85,
    status: "Active",
    progress: 45,
    department: "Urban Development"
  },
  {
    id: "prog-303",
    name: "Disaster Quick-Response Operations Cohort IV",
    organization: "National Disaster Response Force (NDRF)",
    trainer: "Col. Sanjeev Kapoor",
    startDate: "2024-09-20",
    endDate: "2024-11-20",
    participants: 250,
    status: "Upcoming",
    progress: 0,
    department: "Emergency Response"
  },
  {
    id: "prog-304",
    name: "Advanced Cyber Defense & Critical Infrastructure",
    organization: "CERT-In & Department of Telecom",
    trainer: "Pooja Sundaram",
    startDate: "2024-03-01",
    endDate: "2024-05-30",
    participants: 320,
    status: "Completed",
    progress: 100,
    department: "Cybersecurity"
  },
  {
    id: "prog-305",
    name: "Public Health Surveillance & Epidemic Command",
    organization: "National Health Mission",
    trainer: "Kavita Ranganathan",
    startDate: "2024-08-10",
    endDate: "2024-10-10",
    participants: 180,
    status: "Active",
    progress: 30,
    department: "Healthcare"
  }
];

export const INITIAL_COMPETENCIES = [
  {
    id: "cmp-401",
    name: "Cloud Security Architecture",
    competency: "Cloud Security Architecture",
    domain: "Technical",
    category: "Technical Skills",
    level: "Expert",
    users: 480,
    certifiedLearners: 480,
    courses: 6,
    coursesMapped: 6,
    status: "Active",
    description: "Designing zero-trust architectures, sovereign data encryptions, and perimeter firewalls."
  },
  {
    id: "cmp-402",
    name: "Ethical AI & Machine Learning Governance",
    competency: "Ethical AI & Machine Learning Governance",
    domain: "Technical",
    category: "Technical Skills",
    level: "Advanced",
    users: 1250,
    certifiedLearners: 1250,
    courses: 8,
    coursesMapped: 8,
    status: "Active",
    description: "Assessing algorithmic models for fairness, auditability, and regulatory compliance."
  },
  {
    id: "cmp-403",
    name: "Crisis Negotiation & Strategic Diplomacy",
    competency: "Crisis Negotiation & Strategic Diplomacy",
    domain: "Leadership",
    category: "Leadership",
    level: "Expert",
    users: 320,
    certifiedLearners: 320,
    courses: 4,
    coursesMapped: 4,
    status: "Active",
    description: "High-stakes consensus building, conflict de-escalation, and civil defense protocol execution."
  },
  {
    id: "cmp-404",
    name: "Cross-Departmental Public Speaking",
    competency: "Cross-Departmental Public Speaking",
    domain: "Communication",
    category: "Communication",
    level: "Intermediate",
    users: 2150,
    certifiedLearners: 2150,
    courses: 11,
    coursesMapped: 11,
    status: "Active",
    description: "Conveying technical policy mandates to non-specialist civic audiences and press briefings."
  },
  {
    id: "cmp-405",
    name: "GeM & Public Procurement Compliance",
    competency: "GeM & Public Procurement Compliance",
    domain: "Management",
    category: "Management",
    level: "Intermediate",
    users: 3420,
    certifiedLearners: 3420,
    courses: 9,
    coursesMapped: 9,
    status: "Active",
    description: "Executing automated tendering, reverse auctions, and GFR financial verification."
  },
  {
    id: "cmp-406",
    name: "Digital Public Goods Integration (UPI/Aadhaar)",
    competency: "Digital Public Goods Integration (UPI/Aadhaar)",
    domain: "Digital",
    category: "Digital Skills",
    level: "Advanced",
    users: 1890,
    certifiedLearners: 1890,
    courses: 7,
    coursesMapped: 7,
    status: "Active",
    description: "Building API client services for state welfare transfers and verification sandboxes."
  },
  {
    id: "cmp-407",
    name: "Rapid Emergency Medical Triage",
    competency: "Rapid Emergency Medical Triage",
    domain: "Governance",
    category: "Industry Skills",
    level: "Beginner",
    users: 870,
    certifiedLearners: 870,
    courses: 5,
    coursesMapped: 5,
    status: "Active",
    description: "Frontline epidemiological triage protocols and pandemic supply chain distribution."
  }
];

export const INITIAL_KNOWLEDGE_RESOURCES = [
  {
    id: "res-501",
    title: "National Framework for Public Sector AI Adoption v2.4",
    category: "Policy Documents",
    fileType: "PDF",
    size: "4.8 MB",
    uploadDate: "2024-04-12",
    downloads: 12450,
    uploadedBy: "Dr. Rajesh Sharma",
    status: "Published"
  },
  {
    id: "res-502",
    title: "Mastering GeM Reverse Auctions & Vendor Escrows",
    category: "Guidelines",
    fileType: "VIDEO",
    size: "142 MB",
    uploadDate: "2024-04-28",
    downloads: 8920,
    uploadedBy: "Ananya Deshmukh",
    status: "Published"
  },
  {
    id: "res-503",
    title: "Zero-Trust Cloud Governance for Municipal Bodies",
    category: "Policy Documents",
    fileType: "DOCX",
    size: "2.1 MB",
    uploadDate: "2024-05-02",
    downloads: 5410,
    uploadedBy: "Pooja Sundaram",
    status: "Published"
  },
  {
    id: "res-504",
    title: "Disaster Evacuation Command System: SOP Field Guide",
    category: "Guidelines",
    fileType: "PDF",
    size: "8.5 MB",
    uploadDate: "2024-05-18",
    downloads: 3120,
    uploadedBy: "Col. Sanjeev Kapoor",
    status: "Published"
  },
  {
    id: "res-505",
    title: "Empirical Study on District Skill Index Disparities",
    category: "Research Papers",
    fileType: "PDF",
    size: "6.2 MB",
    uploadDate: "2024-05-20",
    downloads: 1840,
    uploadedBy: "Vikramaditya Rathore",
    status: "Published"
  },
  {
    id: "res-506",
    title: "National Case Study: AI-Powered Ration Leakage Prevention",
    category: "Case Studies",
    fileType: "PPTX",
    size: "18.4 MB",
    uploadDate: "2024-05-25",
    downloads: 4790,
    uploadedBy: "Central Administration",
    status: "Published"
  }
];

export const INITIAL_APPROVAL_REQUESTS = [
  {
    id: "appr-101",
    category: "trainer",
    applicant: "Dr. Farhan Qureshi",
    title: "Trainer Accreditation: Public Health Emergency Command",
    organization: "AIIMS New Delhi",
    submittedDate: "2024-05-27",
    status: "Pending",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
    summary: "Senior epidemiological instructor requesting Master Trainer accreditation for public healthcare workers.",
    documentsCount: 3
  },
  {
    id: "appr-102",
    category: "trainer",
    applicant: "Prof. Vandana Rao",
    title: "Trainer Certification: Cyber Law & DPDP Compliance",
    organization: "National Law University",
    submittedDate: "2024-05-26",
    status: "Approved",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80",
    summary: "Experienced legal scholar seeking verification to host national courses on digital personal data compliance.",
    documentsCount: 4
  },
  {
    id: "appr-103",
    category: "course",
    applicant: "Col. Sanjeev Kapoor",
    title: "Incident Command System (ICS) for Disaster Preparedness",
    organization: "National Disaster Response Force",
    submittedDate: "2024-05-24",
    status: "Pending",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    summary: "New 8-week curriculum targeting first responders with tactical command exercises.",
    documentsCount: 5
  },
  {
    id: "appr-104",
    category: "course",
    applicant: "Pooja Sundaram",
    title: "Data Sovereignty & Cross-Border API Security",
    organization: "CERT-In Extension",
    submittedDate: "2024-05-28",
    status: "Pending",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    summary: "Advanced technical workshop including live hands-on sandbox code repositories.",
    documentsCount: 2
  },
  {
    id: "appr-105",
    category: "organization",
    applicant: "Aakash Banerjee",
    title: "State Department of Expenditure & Finance Onboarding",
    organization: "Ministry of Finance",
    submittedDate: "2024-05-25",
    status: "Pending",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    summary: "Enterprise onboarding request to register 450 state accounting officers into mandatory public procurement cohorts.",
    documentsCount: 3
  }
];

export const INITIAL_RESOURCES = [
  {
    id: "res-501",
    title: "National Framework for Public Sector AI Adoption v2.4",
    type: "PDF",
    author: "Dr. Rajesh Sharma",
    category: "Digital Skills",
    views: 12450,
    status: "Published",
    date: "2024-04-12"
  },
  {
    id: "res-502",
    title: "Mastering GeM Reverse Auctions & Vendor Escrows",
    type: "Video",
    author: "Ananya Deshmukh",
    category: "Management",
    views: 8920,
    status: "Published",
    date: "2024-04-28"
  },
  {
    id: "res-503",
    title: "Zero-Trust Cloud Governance for Municipal Bodies",
    type: "Article",
    author: "Pooja Sundaram",
    category: "Technical Skills",
    views: 5410,
    status: "Published",
    date: "2024-05-02"
  },
  {
    id: "res-504",
    title: "Disaster Evacuation Command System: SOP Field Guide",
    type: "Guide",
    author: "Col. Sanjeev Kapoor",
    category: "Industry Skills",
    views: 3120,
    status: "Pending",
    date: "2024-05-18"
  },
  {
    id: "res-505",
    title: "Empirical Study on District Skill Index Disparities",
    type: "Research Paper",
    author: "Vikramaditya Rathore",
    category: "Leadership",
    views: 1840,
    status: "Draft",
    date: "2024-05-20"
  },
  {
    id: "res-506",
    title: "Interactive Python Notebook: Analyzing Census Demographics",
    type: "Tutorial",
    author: "Ananya Deshmukh",
    category: "Technical Skills",
    views: 4790,
    status: "Published",
    date: "2024-05-25"
  }
];

export const INITIAL_APPROVALS = [
  {
    id: "appr-601",
    title: "Incident Command System (ICS) for Disaster Preparedness",
    submittedBy: "Col. Sanjeev Kapoor",
    type: "Course",
    submittedDate: "2024-05-24",
    status: "Pending",
    details: "New 8-week course curriculum targeting disaster responders with 4 simulation modules."
  },
  {
    id: "appr-602",
    title: "Department of Expenditure & Finance Registration",
    submittedBy: "Aakash Banerjee",
    type: "User",
    submittedDate: "2024-05-25",
    status: "Pending",
    details: "Organization level onboarding for 450 state accounting officers."
  },
  {
    id: "appr-603",
    title: "Disaster Evacuation Command System: SOP Field Guide",
    submittedBy: "Col. Sanjeev Kapoor",
    type: "Resource",
    submittedDate: "2024-05-26",
    status: "Pending",
    details: "High-resolution operational manual with checklists for district magistrates."
  },
  {
    id: "appr-604",
    title: "Trainer Accreditation: Public Health Emergency Command",
    submittedBy: "Dr. Farhan Qureshi",
    type: "Trainer",
    submittedDate: "2024-05-27",
    status: "Pending",
    details: "Master trainer verification application with AIIMS and WHO field experience."
  },
  {
    id: "appr-605",
    title: "Data Sovereignty & Cross-Border API Security",
    submittedBy: "Pooja Sundaram",
    type: "Course",
    submittedDate: "2024-05-28",
    status: "Pending",
    details: "Advanced technical workshop including live sandbox code repositories."
  }
];

export const REPORTS_CATALOG = [
  {
    id: "rep-1",
    title: "User Report",
    description: "Detailed breakdown of all platform users, role distribution, activation trends, and geographic department mappings.",
    lastGenerated: "2024-05-28 14:30"
  },
  {
    id: "rep-2",
    title: "Course Report",
    description: "Course enrollment statistics, average completion timelines, ratings, drop-off checkpoints, and student satisfaction.",
    lastGenerated: "2024-05-27 10:15"
  },
  {
    id: "rep-3",
    title: "Training Report",
    description: "Evaluation metrics for organization cohorts, attendance compliance, trainer performance, and milestone deliveries.",
    lastGenerated: "2024-05-25 18:00"
  },
  {
    id: "rep-4",
    title: "Competency Report",
    description: "Skill inventory matrix, competency gaps across seniority bands, level progression speed, and assessment scores.",
    lastGenerated: "2024-05-26 09:45"
  },
  {
    id: "rep-5",
    title: "Learning Activity Report",
    description: "Aggregate learning hours, peak engagement times, resource view counts, quiz success ratios, and module interactions.",
    lastGenerated: "2024-05-28 08:20"
  },
  {
    id: "rep-6",
    title: "Organization Report",
    description: "Enterprise level capability index, department-wise budget utilization, compliance with national training mandates.",
    lastGenerated: "2024-05-24 16:50"
  }
];

export const MONTHLY_USER_GROWTH = [
  { month: "Jan", users: 5200, active: 4100 },
  { month: "Feb", users: 6400, active: 5300 },
  { month: "Mar", users: 7800, active: 6500 },
  { month: "Apr", users: 9100, active: 7800 },
  { month: "May", users: 10450, active: 8900 },
  { month: "Jun", users: 11200, active: 9600 },
  { month: "Jul", users: 11950, active: 10200 },
  { month: "Aug", users: 12480, active: 10840 }
];

export const LEARNING_HOURS_DATA = [
  { dept: "IT & Digital", hours: 14200 },
  { dept: "Public Works", hours: 9800 },
  { dept: "Healthcare", hours: 8400 },
  { dept: "Finance & Accounts", hours: 7100 },
  { dept: "Administration", hours: 5900 },
  { dept: "Police Academy", hours: 2850 }
];
