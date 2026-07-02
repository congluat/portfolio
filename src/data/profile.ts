export const profile = {
  name: 'Nguyen Luat',
  title: 'Senior Software Engineer',
  subtitle: 'Fraud & Financial Crime · Event-Driven Systems · Cloud Native',
  location: 'Ho Chi Minh City, Vietnam',
  email: 'congluat27@gmail.com',
  phone: '+84 38 774 1087',
  linkedin: 'https://www.linkedin.com/in/nguyen-luat-87509289',
  summary:
    'Seasoned backend engineer with 9+ years building scalable, resilient systems across fintech, e-commerce, and insurance. Passionate about real-time fraud detection, event-driven architectures, and translating complex compliance requirements into elegant technical solutions. Aiming for Principal Engineer within 5 years.',
  skills: [
    { name: 'Java / Spring Boot', level: 95, category: 'Backend' },
    { name: 'AWS', level: 88, category: 'Cloud' },
    { name: 'Kubernetes', level: 85, category: 'Cloud' },
    { name: 'Google Cloud Platform', level: 82, category: 'Cloud' },
    { name: 'Microservices', level: 90, category: 'Architecture' },
    { name: 'Event-Driven Systems', level: 92, category: 'Architecture' },
    { name: 'Docker / CI-CD', level: 88, category: 'DevOps' },
    { name: 'MongoDB / SQL', level: 85, category: 'Database' },
    { name: 'RabbitMQ / Kafka', level: 83, category: 'Messaging' },
    { name: 'Redis', level: 80, category: 'Database' },
  ],
  languages: [
    { name: 'Vietnamese', level: 'Native' },
    { name: 'English', level: 'Professional (TOEIC 810)' },
  ],
  certifications: [
    'Scrum Master',
    'MongoDB Certification for Java Developer',
    'TOEIC 810',
  ],
  awards: ['Certificate Of Merit — Java Fresher Training'],
  education: [
    {
      school: 'Hoa Sen University',
      degree: "Bachelor's Degree, Information Technology",
      period: '2012 — 2016',
      note: 'Respect Diversity',
    },
    {
      school: 'Nguyen Cong Tru High School',
      degree: 'High School',
      period: '2010 — 2012',
    },
  ],
  experience: [
    {
      company: 'NAB Innovation Centre Vietnam',
      logo: 'logos/nab.png',
      role: 'Senior Software Engineer',
      period: 'Feb 2023 — Present',
      duration: '3+ years',
      location: 'Ho Chi Minh City, Vietnam',
      description:
        'Working in the Fraud and Financial Crime domain at NAB Innovation Centre Vietnam — one of Australia\'s largest financial institutions — building systems that protect customers and strengthen detection capabilities.',
      highlights: [
        'Delivered end-to-end solutions within the Fraud and Financial Crime domain, strengthening detection and prevention capabilities',
        'Enabled real-time fraud decisioning by building and integrating event-driven data flows across multiple services',
        'Partnered closely with fraud analysts, architecture, and digital teams to deliver secure customer journeys',
        'Improved system resilience and reduced response time for fraud-related critical services',
        'Translated complex risk and compliance requirements into scalable, maintainable technical solutions',
        'Contributed to platform modernization initiatives using cloud-native patterns on AWS and Kubernetes',
      ],
      tech: ['Java', 'Spring Boot', 'AWS', 'Kubernetes', 'GCP', 'Event Streaming', 'Microservices'],
      featured: true,
    },
    {
      company: 'TIKI',
      logo: 'logos/tiki.png',
      role: 'Back End Developer',
      period: 'Apr 2022 — Dec 2022',
      duration: '9 months',
      location: 'Ho Chi Minh City, Vietnam',
      description:
        'Member of the Digital Services Department at Vietnam\'s leading e-commerce platform. Participated in the full software lifecycle — from design and planning to development, deployment, and maintenance of high-traffic payment and digital service systems.',
      projects: [
        {
          name: 'Wholesalers Top Up TikiXu',
          description:
            'Built a tool enabling wholesalers to top up TikiXu via bank transfer — fully automated, eliminating third-party payment fees and saving significant operational costs for Tiki.',
        },
        {
          name: 'Billing Gateway',
          description:
            'Middleware system connecting external partners with Tiki for electric, water, and finance bill payments. Handled ~30% of Tiki\'s annual NMV (~5,000 billion VNĐ). Managed bill reminders, payment flows, and transaction cross-checking.',
        },
        {
          name: 'Flight & Hotel Booking',
          description:
            'Integrated Gotadi API so Tiki users can book flights and hotels directly within the Tiki ecosystem.',
        },
        {
          name: 'Bus Booking',
          description:
            'Integrated VeXeRe API enabling Tiki users to search and book bus tickets seamlessly from the Tiki app.',
        },
      ],
      highlights: [
        'Designed and implemented RESTful APIs and microservices for payment and billing domains',
        'Collaborated with product and partner teams on API integration specifications',
        'Ensured transaction integrity through automated cross-check and reconciliation flows',
      ],
      tech: ['Java', 'Spring Boot', 'Microservices', 'Payment Gateway', 'REST API', 'Partner Integration'],
    },
    {
      company: 'SAI Digital',
      logo: 'logos/sai-digital-black.svg',
      role: 'Software Engineer',
      period: 'Aug 2021 — Apr 2022',
      duration: '9 months',
      location: 'Ho Chi Minh City, Vietnam',
      description:
        'Contributed to Catalyzer Commerce — a next-generation B2B2C e-commerce back office designed to simplify complex enterprise commerce operations with real-time insights and AI-powered forecasting.',
      projects: [
        {
          name: 'Catalyzer Commerce',
          description:
            'Next-gen B2B2C e-commerce back office with real-time dashboard, AI demand forecasting, and seamless integration with SAP Commerce, Shopify, and Magento platforms.',
        },
      ],
      highlights: [
        'Designed and developed new features across backend services and Angular front-end modules',
        'Identified root causes of production bugs and delivered timely fixes',
        'Proposed improvements to enhance both business workflows and technical architecture',
        'Handled DevOps tasks including CI/CD pipeline maintenance and Docker deployments',
        'Supported internal and external product demos for stakeholders and clients',
      ],
      tech: ['Java', 'Spring Boot', 'Microservices', 'Angular', 'MariaDB', 'RabbitMQ', 'Redis', 'Docker', 'Jenkins', 'SAP Hybris'],
    },
    {
      company: 'Sun Life',
      logo: 'logos/sunlife.png',
      role: 'Java Developer',
      period: 'Apr 2020 — Aug 2021',
      duration: '1 year 5 months',
      location: 'Ho Chi Minh City, Vietnam',
      description:
        'Developed and maintained the Event Service — a central event-driven platform providing shared capabilities to multiple insurance systems across Sun Life\'s digital ecosystem.',
      projects: [
        {
          name: 'Event Service Platform',
          description:
            'Event-driven application serving eInvoice, eDistribution, NBTracking, Autodebit, Paperless, and Claim systems. Core capabilities include PDF generation, email/SMS dispatch, digital document signing, and integration with the insurance core system.',
        },
      ],
      highlights: [
        'Designed, maintained, and upgraded the core event processing service',
        'Implemented new features to support dependent projects across the insurance portfolio',
        'Performed root-cause analysis on production incidents and delivered fixes under SLA',
        'Integrated document generation (Docx4j, Aspose) and messaging (ActiveMQ, Camel) pipelines',
        'Worked with Oracle, DB2, and MS SQL Server in enterprise data environments',
      ],
      tech: ['Java 8', 'Spring Boot', 'Spring JPA', 'ActiveMQ', 'Camel', 'Docx4j', 'Aspose', 'Oracle', 'DB2', 'MS SQL Server'],
    },
    {
      company: 'Hee Solutions Limited',
      logo: 'logos/hee.png',
      role: 'Java Software Engineer · Team Lead',
      period: 'Sep 2018 — Mar 2020',
      duration: '1 year 7 months',
      location: 'Hong Kong (remote collaboration)',
      description:
        'Led the Java development team at a HKEX-approved Broker Supplied Systems (BSS) vendor, building trading technology for financial institutions in Hong Kong alongside the local engineering team.',
      projects: [
        {
          name: 'Trading Terminal for Brokers',
          description:
            'Collaborated with the Hong Kong team to build a high-performance trading terminal for stock brokers — covering order management, real-time market data, and HKEX OCG gateway integration.',
        },
      ],
      highlights: [
        'Led Java development team — managed task assignments, code quality, and mentored team members',
        'Resolved complex technical issues and optimized the internal application framework',
        'Received specialized training in Finance and Trading domain knowledge',
        'Delivered low-latency trading features using Java Core and JavaFX desktop UI',
        'Coordinated with Hong Kong stakeholders on requirements, releases, and production support',
      ],
      tech: ['Java Core', 'JavaFX', 'Trading Systems', 'HKEX BSS', 'GitLab', 'Jira'],
    },
    {
      company: 'DXC Technology',
      logo: 'logos/dxc.svg',
      role: 'Software Engineer · Team Lead',
      period: 'Mar 2016 — Aug 2018',
      duration: '2 years 8 months',
      location: 'Ho Chi Minh City, Vietnam · Kuala Lumpur, Malaysia',
      description:
        'Progressed from Java Fresher to Team Lead at a global IT services company. Led development teams, authored technical specifications, and supported system integration and user acceptance testing onsite in Malaysia.',
      highlights: [
        'Led development team — conducted code reviews, mentored members, and drove delivery timelines',
        'Authored and implemented Technical Specification Documents (TSD) for Clients, Agent, and Payment modules',
        'Walked through Business Requirement Documents (BRD) and guided freshers through implementation',
        'Resolved defects raised during functional testing and regression cycles',
        'Collaborated with Technical Architecture team to optimize and upgrade the internal framework',
        'Onsite to Kuala Lumpur (Sep–Nov 2016) to support System Integration Testing (SIT) and User Acceptance Testing (UAT) at BSIB',
        'Trained newcomers on the company\'s internal Java framework and development standards',
      ],
      tech: ['Java', 'JSP/Servlet', 'MS SQL Server', 'Oracle', 'Tomcat', 'JBoss', 'Jenkins', 'GitHub'],
    },
    {
      company: 'Vietbank',
      logo: 'logos/vietbank.ico',
      role: 'Software Development Intern',
      period: 'Jul 2014 — Sep 2014',
      duration: '3 months',
      location: 'Vietnam',
      description:
        'Internship at Vietbank (Ngân Hàng TMCP Việt Nam Thương Tín) — gained early exposure to banking software development practices and enterprise IT environments.',
      highlights: [
        'Assisted senior developers on banking application modules',
        'Learned enterprise development workflows in a regulated financial institution',
        'Practiced Java programming in a real-world banking project context',
      ],
      tech: ['Java', 'Banking Systems'],
    },
  ],
}

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]
