// Single source of truth for site copy and content.
// Replace placeholder text (marked TODO) with confirmed company details.

export const site = {
  name: "JAMPOWER",
  tagline: "Energy & Power",
  description:
    "JAMPOWER delivers solar energy and power solutions for businesses and communities across Jamaica.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  contact: {
    email: "info@jampower.example", // TODO: replace with the real address
    phone: "+1 (876) 000-0000", // TODO: replace with the real number
    location: "Jamaica", // TODO: replace with the office address
  },
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/team", label: "Team" },
  { href: "/consultation", label: "Contact" },
];

export const services = [
  {
    title: "Solar Installation",
    body: "Design and installation of solar systems for commercial buildings, dealerships and industrial sites.",
  },
  {
    title: "Solar Farms",
    body: "Ground-mounted solar arrays built to supply power at utility scale, from site survey to commissioning.",
  },
  {
    title: "Energy Storage",
    body: "Battery integration that keeps your power on through peak demand and grid outages.",
  },
  {
    title: "Monitoring & Maintenance",
    body: "Ongoing performance monitoring, preventive maintenance and fast fault response.",
  },
];

export type Project = {
  slug: string;
  title: string;
  location: string;
  category: string;
  summary: string;
  image: string;
  alt: string;
  /** Further site photos, shown after `image` in the project's filmstrip. */
  gallery?: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    slug: "toyota-jamaica",
    title: "Toyota Jamaica",
    location: "Jamaica",
    category: "Commercial Solar",
    summary: "Solar project at the Toyota Jamaica dealership.", // TODO: confirm scope
    image: "/images/projects/toyota-jamaica.jpg",
    alt: "Toyota Jamaica dealership building",
  },
  {
    slug: "toyota-montego-bay",
    title: "Toyota Montego Bay",
    location: "Montego Bay",
    category: "Commercial Solar",
    summary: "Solar project at the Toyota Montego Bay dealership.", // TODO: confirm scope
    image: "/images/projects/toyota-mobay.jpg",
    alt: "Toyota Montego Bay dealership",
    gallery: [{ src: "/images/projects/toyota-mobay-2.avif", alt: "Solar installation at Toyota Montego Bay" }],
  },
  {
    slug: "toyota-spanish-town-road",
    title: "Toyota Spanish Town Road",
    location: "Spanish Town",
    category: "Commercial Solar",
    summary: "Solar project at the Toyota Spanish Town Road branch.", // TODO: confirm scope
    image: "/images/projects/toyota-spanish-town.jpg",
    alt: "Toyota Spanish Town Road branch",
  },
  {
    slug: "utility-solar-farm",
    title: "Utility Solar Farm",
    location: "Jamaica",
    category: "Solar Farm",
    summary: "Ground-mounted solar array on an open site.", // TODO: confirm scope
    image: "/images/solar-farm.avif",
    alt: "Aerial view of a ground-mounted solar farm",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  image: string;
};

export const team: TeamMember[] = [
  { name: "David Pijuan-Mota", role: "Director", image: "/images/team/david.png" },
  { name: "Shantel Baker", role: "Administration Manager", image: "/images/team/shantel.avif" },
  { name: "Henry McFarlane", role: "CTO", image: "/images/team/henry.avif" },
  { name: "Re-K McFarlane", role: "Engineer", image: "/images/team/rek.avif" },
  { name: "Emmanuel Casco", role: "Engineer", image: "/images/team/emmanuel.png" },
];

export type Testimonial = {
  project: string;
  location: string;
  /** Site photo. Omit when we don't have one and a branded panel is shown instead. */
  image?: string;
  alt?: string;
  quote: string;
  author: string;
  role: string;
  photo: string;
};

export const testimonials: Testimonial[] = [
  {
    project: "Toyota Jamaica",
    location: "Old Hope Rd",
    image: "/images/projects/toyota-jamaica.jpg",
    alt: "Toyota Jamaica dealership building",
    quote:
      "Our electricity bill dropped by 40% to 70% depending on the location since Jampower installed our multiple solar PV systems across the Island.",
    author: "Lee Francis",
    role: "O&M Manager, Toyota Jamaica",
    photo: "/images/testimonials/lee-francis.avif",
  },
  {
    project: "Fontana Pharmacy",
    location: "Waterloo Rd",
    image: "/images/projects/fontana-waterloo.avif",
    alt: "Aerial view of the Fontana Pharmacy building on Waterloo Rd with solar panels on its roof",
    quote:
      "Fontana was extremely pleased with the rollout of our first solar system from Jampower at our Waterloo Rd location. We have experienced greater than anticipated reductions in our utility bill. Jampower was on budget and within our agreed timeline for our Portmore project opening fall of 2023. Our solar provider of choice.",
    author: "Ray Therrien",
    role: "Director, Fontana Pharmacy",
    photo: "/images/testimonials/ray-therrien.avif",
  },
  {
    project: "SOFOS",
    location: "Jamaica",
    image: "/images/solar-farm.avif", // TODO: swap for a photo of a SOFOS installation
    alt: "Aerial view of a ground-mounted solar farm",
    quote:
      "Most of our commercial solar PV installations in Jamaica were installed by Jampower Ltd, due to a strong relationship developed along the way with trust and good practices.",
    author: "Juan Mayoral",
    role: "CEO, SOFOS",
    photo: "/images/testimonials/juan-mayoral.avif",
  },
];

export type Solution = {
  id: string;
  title: string;
  tagline: string;
  image: string;
  alt: string;
  lead: string;
  items: { name: string; desc: string }[];
};

export const solutions: Solution[] = [
  {
    id: "solar",
    title: "Solar Projects",
    tagline: "Rooftop, ground and carport PV",
    image: "/images/landing/hero-technicians.avif",
    alt: "Jampower technicians on site",
    lead: "Solar is the core of what we do. We engineer and install photovoltaic systems sized to your load and your site, turning unused roofs, open land and parking lots into a steady source of clean, low-cost power that cuts your dependence on the grid.",
    items: [
      { name: "Rooftop", desc: "Commercial and industrial roof arrays, engineered for your structure and built to withstand hurricane-force winds." },
      { name: "Ground mounted", desc: "Utility-scale and on-site solar farms on open land, with optimised tilt and spacing for maximum yield." },
      { name: "Solar Carport", desc: "Covered parking that generates electricity, providing shade for vehicles and power for your building." },
    ],
  },
  {
    id: "green-buildings",
    title: "Green Buildings",
    tagline: "Construction",
    image: "/images/solutions/green-buildings-towers.avif",
    alt: "Residential towers covered in balcony gardens and climbing plants",
    lead: "We build eco-friendly commercial spaces that use less energy, less water and fewer resources over their lifetime. Sustainability is planned in from the first drawing, so the building performs better and costs less to run.",
    items: [
      { name: "Project Management", desc: "One team coordinating schedule, budget, contractors and permits from concept to handover." },
      { name: "Construction", desc: "Building with efficient materials, passive cooling and integrated renewables suited to the Caribbean climate." },
      { name: "Interior design", desc: "Interiors that use natural light, sustainable finishes and efficient fittings without compromising on comfort." },
    ],
  },
  {
    id: "ev",
    title: "Electric Vehicles",
    tagline: "Fleet and charging",
    image: "/images/solutions/ev-charging.avif",
    alt: "Red electric car plugged in to charge",
    lead: "We help businesses make the move to electric mobility. From fleet planning to the chargers on the ground, we put the infrastructure in place, and when it runs on solar, your vehicles are powered by the sun.",
    items: [
      { name: "Electric vehicle services", desc: "Guidance on fleet electrification, vehicle selection and the transition from fuel to electric." },
      { name: "EV charging stations", desc: "Supply and installation of commercial chargers for staff, customer and fleet parking." },
      { name: "Solar charging carports", desc: "Carports that generate solar power and charge vehicles parked beneath them." },
    ],
  },
  {
    id: "wind",
    title: "Wind Projects",
    tagline: "Full turbine lifecycle",
    image: "/images/solutions/wind.avif",
    alt: "Wind turbines on green hills",
    lead: "The Caribbean's trade winds are a resource that runs day and night. Our wind team handles the full turbine lifecycle, from erection and grid connection to the equipment and upkeep that keep it turning.",
    items: [
      { name: "Assembly and installation", desc: "Foundations, tower erection, nacelle and blade assembly carried out to manufacturer standards." },
      { name: "Electrical installation", desc: "Cabling, substations and grid interconnection to get generated power where it needs to go." },
      { name: "Equipment rental", desc: "Specialised tools and lifting equipment for wind projects, available when you need them." },
      { name: "Maintenance services", desc: "Scheduled inspections, repairs and performance checks that reduce downtime and extend turbine life." },
    ],
  },
  {
    id: "telecom",
    title: "Telecom",
    tagline: "Sites that stay online",
    image: "/images/solutions/telecom.avif",
    alt: "Telecom tower with antennas",
    lead: "Networks depend on sites that stay powered and in service. We engineer, install and maintain telecom infrastructure, and can pair it with solar and battery backup so towers keep running through outages.",
    items: [
      { name: "Telecom engineering", desc: "Site surveys, structural assessments and power system design for towers and network sites." },
      { name: "Installation", desc: "Mounting of antennas, equipment and power systems by certified crews working safely at height." },
      { name: "Maintenance", desc: "Preventive and corrective maintenance that keeps your sites online and your network reliable." },
    ],
  },
  {
    id: "efficiency",
    title: "Energy Efficiency",
    tagline: "Consultation",
    image: "/images/solutions/energy-efficiency.avif",
    alt: "Electrician working on an electrical panel",
    lead: "The cheapest kilowatt-hour is the one you never use. We find where your facility is losing energy and money, then recommend practical upgrades with clear payback, often before any new generation is needed.",
    items: [
      { name: "Energy Audits", desc: "On-site measurement of your consumption, equipment and building envelope, delivered as a prioritised report." },
      { name: "Green Consultation", desc: "A roadmap to lower emissions and operating costs, aligned with your business goals." },
      { name: "LED Technology", desc: "Lighting retrofits that cut lighting energy use substantially and reduce maintenance." },
    ],
  },
  {
    id: "industrial",
    title: "Industrial Construction",
    tagline: "Bare land to operational site",
    image: "/images/solutions/industrial.avif",
    alt: "Engineers reviewing a site plan",
    lead: "We deliver large-scale industrial facilities ready for solar from day one. Wide roof spans, efficient layouts and a single point of contact take your project from bare land to an operational site.",
    items: [
      { name: "Warehouse Construction", desc: "Steel-frame warehouses and logistics buildings designed for storage, workflow and rooftop solar." },
      { name: "Turn Key Projects", desc: "Design, permitting, construction and commissioning under one contract. You receive the keys to a finished facility." },
      { name: "Industrial Estate Development", desc: "Master planning and infrastructure for multi-tenant industrial parks, including shared renewable power." },
    ],
  },
  {
    id: "consulting",
    title: "Consulting",
    tagline: "Independent, technical advice",
    image: "/images/solutions/consulting.avif",
    alt: "Technician inspecting a solar rooftop at sunset",
    lead: "A decade of building renewable and green projects gives us a clear view of what works. We share that experience with developers, investors and businesses who want independent, technically grounded advice before they commit.",
    items: [
      { name: "Solar Projects Consulting", desc: "Feasibility studies, system sizing, yield estimates and financial modelling for solar investments." },
      { name: "Construction Consulting", desc: "Design review, cost planning and site oversight to keep projects on time, on budget and to specification." },
      { name: "RE Consulting", desc: "Renewable energy strategy covering technology selection, regulation and grid integration across solar, wind and geothermal." },
    ],
  },
];
