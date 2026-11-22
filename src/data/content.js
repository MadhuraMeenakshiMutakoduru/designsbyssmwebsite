// All page copy lives here so sections can be reused or moved to separate pages later.

export const services = [
  {
    id: "graphic-design",
    title: "Graphic Design",
    icon: "palette",
    desc: "Make your brand stand out with creative visuals that communicate your message clearly and leave a lasting impression.",
    items: [
      "Logo design",
      "Posters and promotional creatives",
      "Social media posts",
      "Brand visuals",
      "Marketing materials"
    ]
  },
  {
    id: "video-editing",
    title: "Video Editing",
    icon: "film",
    desc: "Turn your ideas and raw footage into engaging videos designed to capture attention and communicate your message effectively.",
    items: [
      "Instagram Reels",
      "Promotional videos",
      "YouTube videos",
      "Short-form video content",
      "Business video editing"
    ]
  },
  {
    id: "social-media-management",
    title: "Social Media Management",
    icon: "share",
    desc: "Build a consistent online presence with organized content, thoughtful planning, and professional social media page management.",
    items: [
      "Content planning",
      "Post scheduling",
      "Social media page management",
      "Content calendar preparation",
      "Brand consistency"
    ]
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: "megaphone",
    desc: "Reach the right audience with strategic digital marketing solutions that support your brand's visibility and business objectives.",
    items: [
      "Meta Ads campaign setup and management",
      "SEO fundamentals and optimization",
      "Strategic content planning",
      "Digital campaign support",
      "Online brand visibility"
    ]
  },
  {
    id: "ai-video-creation",
    title: "AI Video Creation",
    icon: "sparkles",
    desc: "Explore new creative possibilities with AI-assisted video production for modern promotional content and brand storytelling.",
    items: [
      "AI-generated promotional videos",
      "AI-assisted visual storytelling",
      "Creative video concepts",
      "Short promotional content",
      "Brand-focused video ideas"
    ]
  },
  {
    id: "website-design",
    title: "Website Design",
    icon: "monitor",
    desc: "Establish a professional online presence with modern, responsive websites designed around your brand, audience, and business needs.",
    items: [
      "Business websites",
      "Landing pages",
      "Portfolio websites",
      "Responsive website design",
      "Professional online brand presentation"
    ]
  }
];

// Form dropdown: the six services plus two extras.
export const serviceOptions = [
  ...services.map((s) => s.title),
  "Multiple Services",
  "Other"
];

export const processSteps = [
  {
    icon: "search",
    title: "Understand Your Business",
    text: "We learn about your brand, audience, requirements, and project objectives."
  },
  {
    icon: "compass",
    title: "Plan the Creative Strategy",
    text: "We define the direction, scope, deliverables, and creative approach for your project."
  },
  {
    icon: "pen",
    title: "Design and Create",
    text: "We develop the designs, videos, website, or digital content based on the agreed plan."
  },
  {
    icon: "refresh",
    title: "Review and Refine",
    text: "We gather your feedback and make the agreed revisions to improve the final work."
  },
  {
    icon: "rocket",
    title: "Deliver or Publish",
    text: "We deliver the approved files or publish the completed work according to the project scope."
  }
];

export const benefits = [
  {
    icon: "bulb",
    title: "Creative and Strategic Thinking",
    text: "We combine creative ideas with a clear understanding of your communication goals."
  },
  {
    icon: "target",
    title: "Tailored Solutions",
    text: "Every project is approached according to your brand, audience, and requirements."
  },
  {
    icon: "layers",
    title: "Consistent Brand Identity",
    text: "We aim to maintain a recognizable and cohesive visual style across your digital content."
  },
  {
    icon: "chat",
    title: "Clear Communication",
    text: "We value transparent discussions, clear expectations, and constructive feedback."
  },
  {
    icon: "clock",
    title: "Reliable Delivery",
    text: "We agree on deliverables and timelines before beginning work."
  },
  {
    icon: "sliders",
    title: "Flexible Project Options",
    text: "Choose support for a single creative project or discuss ongoing digital requirements."
  }
];

export const faqs = [
  {
    q: "What services do you provide?",
    a: "We provide graphic design, video editing, social media management, digital marketing, AI-assisted video creation, and website design."
  },
  {
    q: "Do you work with clients outside Nizamabad?",
    a: "Yes. We can discuss projects with clients from other cities and locations, subject to project requirements and communication arrangements."
  },
  {
    q: "Can I hire you for a single project?",
    a: "Yes. You can contact us for an individual design, video, website, or other service without committing to ongoing work."
  },
  {
    q: "Do you manage social media accounts?",
    a: "We offer social media management services, including content planning, scheduling, and page management. The exact scope can be discussed before starting."
  },
  {
    q: "Do you provide customized packages?",
    a: "Yes. We can discuss a suitable combination of services based on your objectives, deliverables, and budget."
  },
  {
    q: "How does the payment process work?",
    a: "Payment terms, advance payments where applicable, milestones, and final delivery arrangements will be communicated and agreed upon before work begins."
  },
  {
    q: "How can I get a quote?",
    a: "Send us your requirements through the contact form or email designsbyssm.in@gmail.com. Include your preferred service, project details, and budget if available. We will review your enquiry and discuss the next steps."
  }
];

export const preferredContactOptions = [
  "No preference",
  "Email",
  "WhatsApp",
  "Phone call"
];

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "about", label: "About" },
  { id: "process", label: "Our Process" },
  { id: "why-us", label: "Why Choose Us" },
  { id: "faq", label: "FAQs" },
  { id: "contact", label: "Contact" }
];
