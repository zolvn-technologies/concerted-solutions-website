export const contact = {
  address: "Dubai Silicon Oasis, Dubai Digital Park, Building A5, Office 3005, Dubai, UAE",
  phone: "+971 4 328 9986",
  email: "info@concertedsolutions.ae",
  web: "www.concertedsolutions.ae",
};

export const contactPage = {
  metaTitle: "Contact Concerted Solutions | Dubai, UAE",
  metaDescription:
    "Talk to the Concerted Solutions team in Dubai about digital engineering, digital twins, asset management, and integration.",
  heading: "Connect your projects. Data. Systems. Assets.",
  subline: "Digitize. Integrate. Operate. Optimize.",
  office: "Dubai – Headquarters",
  fields: {
    name: "Name",
    company: "Company",
    email: "Email",
    phone: "Phone",
    country: "Country",
    interest: "Area of interest",
    message: "Message",
  },
  button: "Talk to Our Team",
};

export const home = {
  metaTitle: "Concerted Solutions | Digital Engineering for the Built World",
  metaDescription:
    "Digital engineering and technology for the planning, design, construction, handover, and operation of built assets. Dubai-based since 2016.",
  hero: {
    eyebrow: "Digital Engineering for the Built World",
    title: "Advancing digital transformation in the",
    titleAccent: "built environment",
    tagline: "Align – Orchestrate – Achieve",
    text: "Digital engineering and technology for built assets, from individual buildings to entire cities.",
    primary: "Explore Our Solutions",
    secondary: "Talk to Our Team",
  },
  intro: {
    eyebrow: "Introduction",
    heading: "Digitalizing delivery and operations of your built assets",
    text: "We connect project information, digital models, physical assets and operational systems, so every asset is supported from design to operations.",
  },
  philosophy: { eyebrow: "Our Philosophy", heading: "From digitalization to asset performance" },
  solutions: {
    eyebrow: "Solutions",
    heading: "Integrated digital solutions across the asset lifecycle",
    button: "View All Solutions",
  },
  projects: {
    eyebrow: "Selected Projects",
    heading: "Proven delivery across complex assets",
    button: "View All Projects",
    names: [
      "Fakeeh University Hospital",
      "Olaya Towers",
      "Sharjah International Airport Expansion",
    ],
  },
  closing: {
    heading: "Connect your projects. Data. Systems. Assets.",
    line: "Digitize. Integrate. Operate. Optimize.",
    button: "Talk to Our Team",
  },
};

export const stats = [
  { value: "2016", label: "Founded in Dubai, UAE" },
  { value: "6M+ m²", label: "Built-up area of digital engineering experience" },
];

export const philosophy = [
  { name: "DIGITIZE", text: "Turn assets and project information into structured digital data." },
  { name: "INTEGRATE", text: "Connect models, platforms and systems." },
  { name: "OPERATE", text: "Run assets with reliable information." },
  { name: "OPTIMIZE", text: "Improve performance with analytics, automation and AI." },
];

export const lifecycle = ["PLAN", "DESIGN", "BUILD", "HANDOVER", "OPERATE", "OPTIMIZE"];

export const solutionsPage = {
  metaTitle: "Solutions | Concerted Solutions",
  metaDescription:
    "Integrated digital solutions across the asset lifecycle, from strategy and digital engineering to digital twins, asset management, and analytics.",
  eyebrow: "Solutions",
  heading: "Integrated digital solutions across the asset lifecycle",
  text: "Our capabilities support clients from project development and construction through handover and long-term operations.",
  button: "Talk to Our Team",
  related: "Related",
};

export type Solution = {
  slug: string;
  title: string;
  card: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  cards: { t: string; d: string }[];
  related: string[];
  button?: string;
  steps?: string[];
  stepsLabel?: string;
  graphic?: string[];
  graphicResult?: string;
};

export const solutions: Solution[] = [
  {
    slug: "strategic-advisory",
    title: "Strategic Advisory",
    card: "Digital strategy, technology selection, AI readiness, and change management.",
    h1: "STRATEGIC ADVISORY & DIGITAL TRANSFORMATION",
    metaTitle: "Strategic Advisory & Digital Transformation | Concerted Solutions",
    metaDescription:
      "Digital strategy, roadmaps, technology selection, AI readiness, and change management.",
    intro:
      "Digital transformation starts with a plan. We define the roadmap and the right technologies before implementation begins.",
    cards: [
      { t: "Digital Strategy & Roadmaps", d: "Maturity assessment and phased roadmaps." },
      { t: "Technology Selection", d: "The right platforms and how they connect." },
      { t: "AI Readiness", d: "Where AI adds value, with the right governance." },
      { t: "Change Management", d: "Standards and training that last." },
    ],
    related: ["systems-data-integration", "analytics-ai-automation"],
  },
  {
    slug: "digital-engineering-bim",
    title: "Digital Engineering & BIM",
    card: "Building Information Modeling (BIM) management, modeling, coordination, shop drawings, and quality assurance and control (QA/QC).",
    h1: "DIGITAL ENGINEERING & BIM",
    metaTitle: "Digital Engineering & BIM Services | Concerted Solutions",
    metaDescription:
      "BIM management, modeling, coordination, shop drawings, and BIM QA/QC aligned with ISO 19650.",
    intro:
      "Reliable project information starts with digital engineering. Our Building Information Modeling (BIM) workflows improve coordination, reduce rework and carry forward into handover.",
    cards: [
      {
        t: "BIM & Information Management",
        d: "Execution plans, standards and ISO 19650-aligned workflows.",
      },
      { t: "Modeling & Coordination", d: "Multidisciplinary models with clash detection." },
      { t: "Shop Drawings", d: "Construction-ready drawings and deliverables." },
      { t: "BIM Quality Control", d: "Model audits and handover-ready data." },
    ],
    related: ["reality-capture", "digital-twins"],
  },
  {
    slug: "reality-capture",
    title: "Reality Capture & Asset Digitization",
    card: "Laser scanning, Light Detection and Ranging (LiDAR), Scan-to-BIM, and structured asset data.",
    h1: "REALITY CAPTURE & ASSET DIGITIZATION",
    metaTitle: "Laser Scanning, LiDAR & Scan-to-BIM | Concerted Solutions",
    metaDescription:
      "Laser scanning and Scan-to-BIM that turn existing facilities into accurate models and asset data.",
    intro:
      "Reality capture turns existing facilities into accurate digital models and asset data, in the building, on the ground, in the air and on the water.",
    cards: [
      { t: "Laser Scanning & LiDAR", d: "High-accuracy capture of buildings and infrastructure." },
      { t: "Scan-to-BIM", d: "Point clouds converted into as-built models." },
      {
        t: "Existing-Condition Records",
        d: "Verified documentation for renovation and operations.",
      },
      { t: "Asset Information", d: "Structured registers for asset management." },
    ],
    related: ["digital-engineering-bim", "asset-management"],
  },
  {
    slug: "geospatial-intelligence",
    title: "Geospatial Intelligence",
    card: "Geographic Information Systems (GIS), mapping, surveying, and spatial analytics.",
    h1: "GEOSPATIAL INTELLIGENCE",
    metaTitle: "Geospatial Intelligence & GIS | Concerted Solutions",
    metaDescription:
      "GIS, mapping, advanced surveying, and BIM–GIS integration for infrastructure and urban assets.",
    intro:
      "Infrastructure and urban assets need spatial context. Mapping, Geographic Information Systems (GIS) and analytics support planning and asset decisions.",
    cards: [
      { t: "GIS & Digital Mapping", d: "Spatial platforms for assets, land and networks." },
      { t: "Advanced Surveying", d: "LiDAR, ground-penetrating radar and high-precision surveys." },
      { t: "Risk & Environmental Analysis", d: "Structural, disaster and climate modeling." },
      { t: "BIM–GIS Integration", d: "Models linked to their geographic context." },
    ],
    related: ["smart-cities", "systems-data-integration"],
  },
  {
    slug: "project-cost-information-management",
    title: "Project, Cost & Information Management",
    card: "Project management, cost estimating, benchmarking, and Project Management Information Systems (PMIS).",
    h1: "PROJECT, COST & INFORMATION MANAGEMENT",
    metaTitle: "Project, Cost & Information Management | Concerted Solutions",
    metaDescription:
      "Cost estimating, benchmarking, and PMIS platforms, run by experienced engineers and cost professionals.",
    intro:
      "Platforms and services from one accountable partner: licensed estimating, benchmarking and project management platforms, run by experienced engineers and cost professionals.",
    cards: [
      {
        t: "Cost Estimating & Benchmarking",
        d: "Model-based take-off, 5D estimating and a central cost database.",
      },
      {
        t: "Project Management Information System (PMIS)",
        d: "Paperless workflows, cost control, scheduling integration and dashboards.",
      },
      {
        t: "Cost & Project Management",
        d: "Estimates, value engineering and project management to handover.",
      },
      { t: "Implementation & Support", d: "Licensing, configuration, integration and training." },
    ],
    related: ["digital-engineering-bim", "analytics-ai-automation"],
  },
  {
    slug: "systems-data-integration",
    title: "Systems & Data Integration",
    card: "Connecting BIM, GIS, Enterprise Resource Planning (ERP), Computer-Aided Facility Management (CAFM), Building Management Systems (BMS), Internet of Things (IoT), and enterprise systems.",
    h1: "SYSTEMS & DATA INTEGRATION",
    metaTitle: "Systems & Data Integration | Concerted Solutions",
    metaDescription:
      "Connecting BIM, GIS, PMIS, ERP, CAFM, BMS, and IoT so information is created once and used everywhere.",
    intro:
      "Most organizations already own the systems; they just don’t talk to each other. We connect them so information is created once and used everywhere.",
    cards: [
      {
        t: "Design & Spatial",
        d: "Building Information Modeling (BIM) and Geographic Information Systems (GIS).",
      },
      {
        t: "Project & Enterprise",
        d: "Project platforms, Enterprise Resource Planning (ERP) and business intelligence.",
      },
      {
        t: "Operations & Field",
        d: "Facility management, Building Management Systems (BMS) and Internet of Things (IoT) sensors.",
      },
    ],
    related: ["digital-twins", "strategic-advisory"],
  },
  {
    slug: "digital-twins",
    title: "Digital Twins & Connected Assets",
    card: "Linking models with asset, spatial, system, and operational data.",
    h1: "DIGITAL TWINS & CONNECTED ASSETS",
    metaTitle: "Digital Twins & Connected Assets | Concerted Solutions",
    metaDescription:
      "Digital twins that connect models with asset data, location, systems, and operations in one trusted view.",
    intro:
      "More than a 3D model: a digital twin connects the asset’s model with its data, location, systems and operations in one trusted view.",
    graphic: ["Model", "Asset Data", "Location", "Systems", "Operations"],
    graphicResult: "Digital Twin",
    cards: [
      { t: "Twin Strategy", d: "Use cases, data needs and level of detail." },
      { t: "Data & Model Preparation", d: "Models, scans and registers made twin-ready." },
      { t: "Integration", d: "Connected with facility management, building systems and sensors." },
      { t: "Deployment & Support", d: "Configuration, training and ongoing support." },
    ],
    related: ["asset-management", "smart-factories"],
  },
  {
    slug: "asset-management",
    title: "Asset Management & Operations",
    card: "Digital handover, CAFM, maintenance, and space management.",
    h1: "ASSET MANAGEMENT & OPERATIONS",
    metaTitle: "Asset Management & Operations | Concerted Solutions",
    metaDescription:
      "Digital handover and a cloud-based facility management platform that turn reliable asset data into lower operating costs.",
    intro:
      "Smarter operations start with reliable asset data. We carry it into the systems operators use every day, through a cloud-based facility management and maintenance platform.",
    cards: [
      { t: "Digital Handover", d: "Verified asset data from construction into operations." },
      { t: "Implementation", d: "Registers, maintenance plans and workflows set up." },
      { t: "Integration", d: "Connected with models, digital twins and building systems." },
      { t: "Training & Support", d: "Facility teams enabled over time." },
    ],
    related: ["digital-twins", "reality-capture"],
  },
  {
    slug: "smart-cities",
    title: "Smart Cities & Urban Intelligence",
    card: "City-scale digital twins, smart infrastructure, and public asset portfolio management.",
    h1: "SMART CITIES & URBAN INTELLIGENCE",
    metaTitle: "Smart Cities & Urban Intelligence | Concerted Solutions",
    metaDescription:
      "City-scale digital twins, smart infrastructure, and public asset portfolio management.",
    intro:
      "We help municipalities, authorities and master developers bring spatial, asset and operational data into one reliable view of the city.",
    cards: [
      { t: "City-Scale Digital Twins", d: "Spatial, model and asset data combined." },
      { t: "Smart Infrastructure", d: "Connected traffic, energy and utility assets." },
      {
        t: "Public Asset Portfolios",
        d: "Registers and condition data for government facilities.",
      },
      { t: "Resilient Planning", d: "Data and analytics for proactive city management." },
    ],
    related: ["geospatial-intelligence", "digital-twins"],
  },
  {
    slug: "smart-factories",
    title: "Smart Factories & Logistics",
    card: "Operational digital twins for production and logistics.",
    h1: "SMART FACTORIES & LOGISTICS",
    metaTitle: "Smart Factories & Logistics | Concerted Solutions",
    metaDescription: "Operational digital twins for production and logistics.",
    intro:
      "An operational digital twin connects an accurate model of the factory or warehouse to asset, maintenance and live operational data.",
    cards: [
      {
        t: "Accurate Facility Model",
        d: "Laser scanning and as-built models of halls, utilities and equipment.",
      },
      {
        t: "Live Operational Data",
        d: "Sensors, indoor positioning and building systems linked to the model.",
      },
      {
        t: "Maintenance & Asset Performance",
        d: "Registers and maintenance plans that reduce downtime.",
      },
      {
        t: "Logistics & Layout Optimization",
        d: "Material flow and layouts tested digitally first.",
      },
    ],
    stepsLabel: "How it starts",
    steps: ["Pilot (one hall or warehouse)", "Connect", "Scale"],
    button: "Discuss a Pilot",
    related: ["digital-twins", "asset-management"],
  },
  {
    slug: "analytics-ai-automation",
    title: "Analytics, AI & Automation",
    card: "Dashboards, predictive insights, and intelligent automation.",
    h1: "ANALYTICS, AI & AUTOMATION",
    metaTitle: "Analytics, AI & Automation | Concerted Solutions",
    metaDescription:
      "Dashboards, predictive insights, and automation that turn project and asset data into better decisions.",
    intro:
      "We turn connected project and asset data into dashboards, predictive insights and automation that improve decisions.",
    cards: [
      { t: "Dashboards", d: "Project and asset performance in one view." },
      { t: "Predictive Insights", d: "Maintenance, cost and schedule risks anticipated." },
      { t: "AI & Automation", d: "Routine checks and reporting, under expert supervision." },
      { t: "Decision Support", d: "Scenario analysis for investment and operations." },
    ],
    related: ["systems-data-integration", "strategic-advisory"],
  },
  {
    slug: "high-performance-computing",
    title: "High-Performance Computing – ABOT Systems®",
    card: "Computing power for data-intensive engineering and AI workloads.",
    h1: "HIGH-PERFORMANCE COMPUTING – ABOT SYSTEMS®",
    metaTitle: "High-Performance Computing – ABOT Systems® | Concerted Solutions",
    metaDescription:
      "Workstations, render boxes, servers, and cloud workstations tuned for engineering software.",
    intro:
      "ABOT Systems® is Concerted Solutions’ own computing product, tuned for professional design and engineering software.",
    cards: [
      { t: "Workstations & Laptops", d: "Tuned for BIM, reality capture and design." },
      { t: "Render Boxes", d: "Dedicated rendering and point-cloud processing." },
      { t: "Collaboration Servers", d: "Teams on the same models, reliably." },
      { t: "ABOT-Cloud", d: "Virtual workstations for teams in different locations." },
    ],
    button: "Request a Configuration",
    related: ["reality-capture", "digital-engineering-bim"],
  },
];

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);

export const about = {
  metaTitle: "About Concerted Solutions | Digital Engineering & Technology, Dubai",
  metaDescription:
    "Founded in Dubai in 2016, Concerted Solutions connects engineering expertise, technology, and integration across the built-asset lifecycle.",
  eyebrow: "About CS",
  heading: "Who we are",
  text: "Concerted Solutions is a digital engineering and technology company founded in Dubai in 2016. We combine engineering expertise, advanced technologies and AI-enabled workflows to support built assets from planning and design through construction, handover and operation. Our founders bring extensive regional experience, backed by global technology alliances.",
  whyHeading: "Why Concerted Solutions",
  clients: {
    eyebrow: "Our Clients",
    heading: "Trusted by leading organizations",
    text: "Developers, contractors, consultants and government entities across the region. In Saudi Arabia, projects are delivered in partnership with Saudi-NMG.",
    logos: ["Cloudalize", "Transtek", "IndoorView", "Scenario Advantage", "Granlund", "Nomitech"],
  },
};

export const whyCS = [
  { t: "Regional Experience, Global Alliances", d: "Regional know-how, international technology." },
  { t: "Platforms and Services", d: "The tools and the team, under one point of accountability." },
  { t: "Expert-Led, AI-Enabled", d: "AI speeds the work; engineers assure the result." },
  { t: "Integrated Ecosystems", d: "Connected systems that scale with you." },
  { t: "Lifecycle Perspective", d: "One partner from design to operations." },
  { t: "Data-Driven Decisions", d: "Trusted information for clear choices." },
];

export const deliver = {
  metaTitle: "How We Deliver | Expert-Led, AI-Enabled Digital Engineering",
  metaDescription:
    "Engineers set the direction and verify every output; AI takes on repetitive, data-heavy work.",
  eyebrow: "How We Deliver",
  heading: "Expert-led. AI-enabled.",
  text: "AI takes on repetitive, data-heavy work. Our engineers set the direction, verify every output and stay accountable for the result.",
  timelineHeading: "From Physical Asset to Performance",
  button: "Explore Our Solutions",
};

export const deliverSteps = ["Define", "Accelerate", "Assure"];
export const assetTimeline = [
  "Physical Asset",
  "Reality Capture",
  "Digital Representation",
  "Structured Asset Data",
  "Systems Integration",
  "Asset Management",
  "Operations",
  "Performance Optimization",
];

export const industriesPage = {
  metaTitle: "Industries We Serve | Concerted Solutions",
  metaDescription:
    "Digital engineering and asset technology for government and smart cities, infrastructure, hospitality, healthcare, airports, commercial, industrial facilities and smart factories, and data center assets.",
  heading: "Industries we serve",
  subline: "Complex assets, connected across sectors.",
  intro:
    "Every sector has its own project and operational demands. We apply the same connected approach (digitize, integrate, operate, optimize) to the assets that matter most in each.",
  button: "Talk to Our Team",
};

export const industries = [
  {
    t: "Government & Smart Cities",
    d: "Public asset portfolios, city-scale digital twins, and smart infrastructure.",
  },
  {
    t: "Infrastructure & Public Works",
    d: "Roads, bridges, utilities, and marine projects supported by reality capture, Geographic Information Systems (GIS), and asset information.",
  },
  {
    t: "Hospitality",
    d: "Hotels and resorts supported end to end, from design and construction through handover and into operation.",
  },
  {
    t: "Healthcare",
    d: "Hospitals and clinics where mechanical, electrical, and plumbing (MEP) complexity and uptime are critical.",
  },
  {
    t: "Airports & Transport",
    d: "Large, continuously operating facilities and transport assets.",
  },
  {
    t: "Commercial & Residential",
    d: "Towers, mixed-use developments, and communities, from shop drawings to handover.",
  },
  {
    t: "Industrial Facilities & Smart Factories",
    d: "Plants where as-built accuracy and connected systems drive performance.",
    link: "smart-factories",
  },
  {
    t: "Data Centers",
    d: "Mission-critical facilities needing precise coordination and monitoring.",
  },
];

export const projectsPage = {
  metaTitle: "Selected Projects | Concerted Solutions",
  metaDescription:
    "Digital engineering, reality capture, digital twins and asset information delivered across complex assets in the region.",
  eyebrow: "Selected Projects",
  heading: "Proven delivery across complex assets",
  text: "Digital engineering, reality capture, digital twins and asset information delivered for developers, operators and public authorities across the region.",
  closing: "Planning a project or digitalizing an existing asset?",
  button: "Talk to Our Team",
};

export const projectFilters = [
  "All",
  "Digital Engineering & BIM",
  "Reality Capture",
  "Digital Twins & Asset Management",
  "Strategic Advisory",
  "Project, Cost & Information Management",
];

export type Project = {
  name: string;
  desc: string;
  client: string;
  location: string;
  scale: string;
  service: string;
  outcome: string;
};

export const projects: Project[] = [
  {
    name: "Fakeeh University Hospital",
    desc: "Asset digital twin for a new hospital",
    client: "Fakeeh University Hospital",
    location: "Dubai Silicon Oasis, UAE",
    scale: "Approx. 93,000 m² · 350 beds",
    service: "Digital Twins & Asset Management",
    outcome:
      "One trusted source of asset data, integrated with the hospital’s Computer-Aided Facility Management (CAFM) system from day one.",
  },
  {
    name: "Masar Destination",
    desc: "As-built validation against the design model",
    client: "Masar Destination",
    location: "Makkah, Saudi Arabia",
    scale: "–",
    service: "Reality Capture",
    outcome:
      "A web-based report of every out-of-tolerance deviation for evidence-based quality control.",
  },
  {
    name: "Sharjah International Airport Expansion",
    desc: "Digital roadmap for a major airport expansion",
    client: "Sharjah Airport Authority",
    location: "Sharjah, UAE",
    scale: "New terminal · 17.5 million passengers a year",
    service: "Strategic Advisory",
    outcome: "One agreed digital direction from design through to airport operations.",
  },
  {
    name: "Al Ain Consulting Engineers (ACE)",
    desc: "Firm-wide BIM implementation",
    client: "Al Ain Engineering Consultant Bureau",
    location: "Abu Dhabi, UAE",
    scale: "Company-wide",
    service: "Strategic Advisory",
    outcome: "Processes and standards owned by ACE’s own teams.",
  },
  {
    name: "Abu Dhabi & Al Ain Schools",
    desc: "As-built survey of 11 operating schools",
    client: "Provis (Aldar)",
    location: "Abu Dhabi and Al Ain, UAE",
    scale: "11 schools · approx. 150,000 m²",
    service: "Reality Capture",
    outcome: "An accurate base for the refurbishment design of every school.",
  },
  {
    name: "Abu Dhabi City Municipality – Public Markets",
    desc: "Condition assessment of the city’s public markets",
    client: "Abu Dhabi City Municipality",
    location: "Abu Dhabi, UAE",
    scale: "Approx. 200,000 m² · 10 market sites",
    service: "Reality Capture",
    outcome: "A geo-referenced asset register with condition scores and remedial priorities.",
  },
  {
    name: "Dr. Mohammad Alfagih Hospital",
    desc: "Facility management platform for an operating hospital",
    client: "Dr. Mohammad Alfagih Hospital",
    location: "Riyadh, Saudi Arabia",
    scale: "Approx. 94,000 m² · 350 beds",
    service: "Digital Twins & Asset Management",
    outcome:
      "Full control of hospital maintenance, with Building Management System (BMS) data driving predictive maintenance.",
  },
  {
    name: "Parsons – Cost Estimating Platform",
    desc: "Enterprise platform rolled out across three countries",
    client: "Parsons",
    location: "UAE, Qatar and Saudi Arabia",
    scale: "Enterprise server · 3-country rollout",
    service: "Project, Cost & Information Management",
    outcome: "One shared estimating environment across regional offices.",
  },
  {
    name: "Olaya Towers",
    desc: "Data-rich as-built BIM for an operational office complex",
    client: "Osool Integrated Real Estate Company (with Saudi-NMG)",
    location: "Riyadh, Saudi Arabia",
    scale: "Approx. 237,000 m² · two 38-storey towers",
    service: "Digital Engineering & BIM",
    outcome:
      "A facility-management-ready model with COBie data, dashboards and automated fire-code checks.",
  },
  {
    name: "Granada Business Park",
    desc: "Information-rich BIM for a complete business park",
    client: "Osool Integrated Real Estate Company (with Saudi-NMG)",
    location: "Riyadh, Saudi Arabia",
    scale: "Approx. 214,000 m² · 10 towers and townhouses",
    service: "Digital Engineering & BIM",
    outcome: "A coordinated digital record structured for facilities management.",
  },
  {
    name: "Uptown Dubai – Towers 3 & 4",
    desc: "Construction BIM for two office towers and podium",
    client: "DMCC Properties",
    location: "Uptown Dubai, UAE",
    scale: "Approx. 181,000 m² · 2 towers and podium",
    service: "Digital Engineering & BIM",
    outcome: "One coordinated model from shop drawings to as-built.",
  },
  {
    name: "DIFC Living & Innovation Two (CP-02)",
    desc: "Construction-stage BIM for a mixed-use tower",
    client: "DIFC",
    location: "DIFC, Dubai, UAE",
    scale: "Approx. 76,000 m² · 38 storeys, 174 apartments",
    service: "Digital Engineering & BIM",
    outcome: "Construction-ready information for every discipline, through to as-built handover.",
  },
];

export const technologyPage = {
  metaTitle: "Technology Ecosystem | Concerted Solutions",
  metaDescription:
    "Proven international platforms for digital engineering, project delivery, digital twins, and asset management, supplied and supported locally.",
  heading: "Technology ecosystem",
  subline: "Global technology alliances. Local delivery.",
  intro:
    "Proven international platforms, delivered locally. As distributor, certified agent and implementation partner, Concerted Solutions supplies, implements and supports each technology. Where a project needs specialist capabilities, such as satellite imagery and land surveying, it collaborates with established specialist firms.",
  button: "Talk to Our Team",
};

export const technologies = [
  { name: "Nemetschek Group" },
  { name: "dTwin", link: "digital-twins" },
  { name: "Solibri" },
  { name: "Bluebeam" },
  { name: "Spacewell", link: "asset-management" },
  { name: "Allplan" },
  { name: "dRofus" },
  { name: "CostOS", link: "project-cost-information-management" },
  { name: "SCENARIO", link: "project-cost-information-management" },
  { name: "ABOT Systems®", link: "high-performance-computing" },
];

export const pageMeta = (title: string, description: string) => ({
  meta: [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});
