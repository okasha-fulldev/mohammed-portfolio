import type { Content } from "./ar";

export const en: Content = {
  locale: "en",
  dir: "ltr",
  home: "/en",
  contactPath: "/en/contact",
  other: { label: "ع", aria: "التبديل إلى العربية", home: "/", contact: "/contact" },

  meta: {
    title: "Mohammed Masoud Okasha | Software Developer & AI Solutions Engineer",
    description:
      "Software developer and AI solutions engineer who designs smart, AI-driven solutions and complete web systems that turn ideas into real results.",
    contactTitle: "Contact | Mohammed Masoud Okasha",
  },

  nav: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ],

  ui: {
    mainNav: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    theme: "Toggle light and dark mode",
    accounts: "My accounts",
    contactMe: "Contact me",
    downloadCv: "Download my CV",
    scrollDown: "Scroll down",
    moreAbout: "More about me",
    showAll: "View all projects",
    showFeatured: "Show featured projects",
    statsLabel: "Numbers",
    sendMessage: "Send a message",
    whatsapp: "WhatsApp",
    phone: "Phone",
    email: "Email",
    copy: "Copy",
    copied: "Copied",
    tagline: "Building a better future, together",
    rights: "All rights reserved",
    home: "Home",
  },

  hero: {
    name: "Mohammed Okasha",
    fullName: "Mohammed Masoud Okasha",
    badge: "Software Developer",
    greeting: "Hi, I'm",
    subtitle:
      "Software developer and AI solutions engineer. I turn ideas and real-world challenges into smart, AI-driven solutions that save time and make work more efficient.",
  },

  about: {
    title: "About me",
    paragraphs: [
      "I'm Mohammed Masoud Okasha, a software developer and AI solutions engineer. I look for the real problem behind every idea, then create a smart solution for it, putting AI and workflow automation to work inside complete web systems built with Laravel, React, Supabase and n8n, integrated with OpenAI and Gemini.",
      "I've worked across a wide range of projects, from government systems and learning platforms to e-commerce, fleet management and geographic mapping; from chatbots and AI pronunciation analysis to the Ghaith online store and running a store on the Noon marketplace. Beyond development, I bring field experience in running operations, organizing data and working with teams.",
    ],
    facts: ["AI solutions · Web systems", "Arabic (native) · English B1", "Technical Diploma — Hermes Institute"],
    codeComment: "an agent that understands Arabic and serves users around the clock",
  },

  skills: {
    title: "Skills",
    subtitle: "The tools and technologies I work with",
    groups: {
      web: "Web development",
      ai: "AI & automation",
      integrations: "Integrations & e-commerce",
      tools: "Tools & productivity",
    },
    names: {
      react: "React", laravel: "Laravel", php: "PHP", javascript: "JavaScript", supabase: "Supabase",
      openai: "OpenAI", gemini: "Gemini", n8n: "n8n", api: "REST APIs", python: "Python",
      agents: "AI Agents", mcp: "MCP Protocol", prompt: "Prompt Engineering", blade: "Blade",
      otp: "OTP Gateways (Authentica)", daftra: "Daftra Integration", noon: "Noon Integration",
      video: "AI Video Generation", excel: "Advanced Excel", office: "Microsoft Office",
      gis: "Maps & GIS / GPS",
    },
  },

  projects: {
    title: "Projects & Work",
    subtitle: "Some I built myself, others I helped build as part of a team.",
    inProgress: "In development",
    items: {
      haramain: { name: "Qimam Al-Haramain", kind: "Government system", description: "A system for the General Presidency for the Affairs of the Grand Mosque." },
      awnak: { name: "Awnak", kind: "Platform + chatbot", description: "A platform with a chatbot powered by an AI agent." },
      uloom: { name: "Qimam Al-Uloom", kind: "LMS platform", description: "A complete learning platform for an English-language institute." },
      shahadati: { name: "Shahadati", kind: "Graduation project", description: "Generates certificates for educational institutions and emails them automatically." },
      zumala: { name: "Zumala / Al-Tamkeen", kind: "Admin systems", description: "Internal administrative systems built for the company." },
      matarati: { name: "Matarati", kind: "Fleet management app", description: "An app for managing a fleet: vehicles, trips and day-to-day operations.", inProgress: true },
      ghaith: { name: "Ghaith Store", kind: "Online store", description: "A complete online store for showcasing products and receiving and managing orders." },
      superqudrat: { name: "Super Qudrat", kind: "Learning platform", description: "A platform that prepares students for the Qudrat aptitude test with practice and interactive tests." },
      hajjgis: { name: "Hajj Route Mapping", kind: "GIS system", description: "Splitting and organizing GPS data for Hajj sites: points with points, routes with routes, and areas with areas." },
    },
  },

  experience: {
    title: "Experience",
    subtitle: "My journey in tech",
    items: [
      {
        role: "Software Developer",
        org: "MTE",
        period: "Nov 2025 – Present",
        icon: "code",
        points: [
          "Built a management system for live training sessions.",
          "Built the AI agent powering the chatbot of the Awnak platform.",
          "Built an AI pronunciation trainer that analyzes trainees' English, Urdu and Turkish recordings and scores their accuracy.",
          "Helped obtain the e-learning license from the National eLearning Center (NELC).",
          "Managed the company's store on the Noon marketplace: products, orders and stock.",
          "Integrated invoicing with Daftra via API.",
        ],
      },
      {
        role: "Operations Supervisor",
        org: "Charity — Hajj seasons",
        period: "~4 consecutive Hajj seasons",
        icon: "users",
        points: [
          "Ran the charity's field operations during Hajj seasons, supervising how services were organized and distributed to pilgrims.",
          "Collected and organized data from the field and handed it to the technical team, giving them a clear, accurate picture for decisions.",
          "Worked in field teams under high pressure.",
        ],
      },
      {
        role: "Technical Diploma",
        org: "Hermes Institute",
        period: "Completed — certificate pending",
        icon: "graduation",
        points: ["In addition to a High School Diploma."],
      },
    ],
  },

  stats: [
    { value: 9, prefix: "+", label: "Projects & work" },
    { value: 21, prefix: "", label: "Tools & technologies" },
    { value: 4, prefix: "", label: "Hajj seasons serving pilgrims" },
    { value: null, text: "NELC", label: "Helped obtain the e-learning license" },
  ],

  contact: {
    title: "Contact me",
    lead: "Have a project idea or an opportunity? Send me a message and it goes straight to my inbox. I'll get back to you soon.",
    pageTitle: "Let's start your next project",
    pageLead:
      "Whether it's a project idea, a job opportunity or a question about a system or an AI agent, fill in the form and your message lands directly in my email.",
    otherWays: "Other ways to reach me",
    replyNote: "I usually reply within 24 hours.",
    form: {
      name: "Name",
      namePh: "Your name",
      email: "Email",
      emailPh: "you@example.com",
      topic: "Message type",
      topics: ["New project", "Job opportunity", "Question", "Other"],
      message: "Message",
      messagePh: "Tell me about your idea or question…",
      send: "Send message",
      sending: "Sending…",
      success: "Your message was sent. Thanks for reaching out, I'll reply soon.",
      sendAnother: "Send another message",
      errors: {
        name: "Enter your name (at least 2 characters).",
        email: "Enter a valid email so I can reply to you.",
        message: "Write your message (at least 10 characters).",
        server: "The message wasn't sent because of a server error. Try again, or reach me on WhatsApp.",
        notConfigured: "Sending isn't switched on yet. For now, reach me on WhatsApp or email me directly.",
        rate: "You've sent several messages in a short time. Wait a minute and try again.",
      },
    },
  },
};
