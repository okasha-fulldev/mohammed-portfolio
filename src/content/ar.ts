import type { ProjectId, SkillIcon } from "./shared";

export type Locale = "ar" | "en";

export const ar = {
  locale: "ar" as Locale,
  dir: "rtl" as "rtl" | "ltr",
  home: "/",
  contactPath: "/contact",
  other: { label: "EN", aria: "Switch to English", home: "/en", contact: "/en/contact" },

  meta: {
    title: "محمد مسعود عكاشة | مطوّر برمجيات ومهندس حلول ذكاء اصطناعي",
    description:
      "مطوّر برمجيات من مكة المكرمة، أبني أنظمة ويب متكاملة ووكلاء ذكاء اصطناعي باستخدام Laravel وReact وSupabase وn8n.",
    contactTitle: "تواصل معي | محمد مسعود عكاشة",
  },

  nav: [
    { id: "home", label: "الرئيسية" },
    { id: "about", label: "من أنا" },
    { id: "skills", label: "مهاراتي" },
    { id: "projects", label: "مشاريعي" },
    { id: "experience", label: "خبراتي" },
    { id: "contact", label: "تواصل معي" },
  ],

  ui: {
    mainNav: "القائمة الرئيسية",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    theme: "تبديل الوضع الليلي والنهاري",
    accounts: "حساباتي",
    contactMe: "تواصل معي",
    downloadCv: "تحميل سيرتي الذاتية",
    scrollDown: "انزل للأسفل",
    moreAbout: "المزيد عني",
    showAll: "عرض جميع المشاريع",
    showFeatured: "عرض المشاريع المميزة",
    statsLabel: "أرقام",
    sendMessage: "أرسل رسالة",
    whatsapp: "واتساب",
    phone: "رقم الجوال",
    email: "البريد الإلكتروني",
    copy: "نسخ",
    copied: "تم النسخ",
    tagline: "معًا نحو مستقبل أفضل",
    rights: "جميع الحقوق محفوظة",
    home: "الرئيسية",
  },

  hero: {
    name: "محمد عكاشة",
    fullName: "محمد مسعود عكاشة",
    badge: "مطوّر برمجيات",
    greeting: "مرحبًا، أنا",
    subtitle:
      "مطوّر برمجيات ومهندس حلول ذكاء اصطناعي من مكة المكرمة. أبني أنظمة ويب متكاملة ووكلاء ذكاء اصطناعي تصنع فرقًا حقيقيًا.",
  },

  about: {
    title: "من أنا",
    paragraphs: [
      "أنا محمد مسعود عكاشة، مطوّر برمجيات ومهندس حلول ذكاء اصطناعي من مكة المكرمة. أبني أنظمة ويب متكاملة باستخدام Laravel وReact وSupabase، وأصمّم وكلاء ذكاء اصطناعي وأتمتة العمليات عبر n8n والتكامل مع OpenAI وGemini.",
      "أنجزت أنظمة إنتاجية حقيقية تشمل روبوتات محادثة ومنصات تعليمية وأنظمة تحليل صوت بالذكاء الاصطناعي، ولديّ خبرة في قيادة الفرق وإدارة المشاريع.",
    ],
    facts: ["مكة المكرمة", "العربية (اللغة الأم) · الإنجليزية B1", "دبلوم تقني — معهد هرمس"],
    codeComment: "وكيل ذكي يفهم العربي ويخدم المستخدم على مدار الساعة",
  },

  skills: {
    title: "مهاراتي",
    subtitle: "مجموعة من المهارات والأدوات التي أعمل بها",
    names: {
      react: "React", laravel: "Laravel", php: "PHP", javascript: "JavaScript", supabase: "Supabase",
      openai: "OpenAI", gemini: "Gemini", n8n: "n8n", api: "REST APIs", python: "Python",
      agents: "وكلاء الذكاء الاصطناعي", mcp: "بروتوكول MCP", prompt: "هندسة البرومبتات", blade: "Blade",
      otp: "بوابات OTP (Authentica)", daftra: "تكامل دفترة", noon: "تكامل نون",
      video: "توليد الفيديو بالذكاء الاصطناعي", excel: "Excel بإتقان", office: "Microsoft Office",
    } as Record<SkillIcon, string>,
  },

  projects: {
    title: "مشاريعي",
    subtitle: "بعض الأعمال التي أفتخر بها",
    inProgress: "قيد التطوير",
    items: {
      haramain: { name: "قمم الحرمين", kind: "نظام حكومي", description: "نظام تابع للرئاسة العامة لشؤون المسجد الحرام." },
      awnak: { name: "عونك", kind: "منصة + روبوت محادثة", description: "منصة مع روبوت محادثة يعمل بوكيل ذكاء اصطناعي." },
      uloom: { name: "قمم العلوم", kind: "منصة تعليمية LMS", description: "منصة تعليمية متكاملة لمعهد تعليم اللغة الإنجليزية." },
      shahadati: { name: "شهادتي", kind: "مشروع التخرج", description: "نظام لإنشاء شهادات الجهات التعليمية وإرسالها تلقائيًا بالبريد الإلكتروني." },
      zumala: { name: "زملاء / التمكين", kind: "أنظمة إدارية", description: "أنظمة إدارية داخلية من مشاريع الشركة." },
      matarati: { name: "مطاراتي", kind: "تتبع العمليات", description: "نظام تتبع عمليات وإدارة تشغيل.", inProgress: true },
    } as Record<ProjectId, { name: string; kind: string; description: string; inProgress?: boolean }>,
  },

  experience: {
    title: "خبراتي المهنية",
    subtitle: "رحلتي في عالم التقنية",
    items: [
      {
        role: "مطوّر برمجيات",
        org: "شركة MTE",
        period: "نوفمبر 2025 – الآن",
        icon: "code" as const,
        points: [
          "تطوير نظام إدارة وضبط الجلسات التدريبية المباشرة.",
          "بناء وكيل ذكاء اصطناعي (AI Agent) لروبوت المحادثة في منصة «عونك».",
          "تطوير نظام تدريب على النطق بالذكاء الاصطناعي يحلل تسجيل المتدرب بالإنجليزية والأردية ويعطي نسبة دقة النطق.",
          "المساهمة في الحصول على ترخيص التعليم الإلكتروني من المركز الوطني للتعليم الإلكتروني.",
          "ربط نظام الفواتير مع منصة «دفترة» عبر API، وإدارة المنتجات والتكامل مع منصة «نون».",
        ],
      },
      {
        role: "مشرف",
        org: "خدمة ضيوف الرحمن — مواسم الحج",
        period: "قرابة 4 سنوات متتالية",
        icon: "users" as const,
        points: [
          "مشرف في جمعية خيرية خلال مواسم الحج، ومشرف توزيع ينظّم ويدير عمليات التوزيع على الحجاج.",
          "العمل ضمن فرق ميدانية تحت ضغط عمل عالٍ.",
        ],
      },
      {
        role: "دبلوم تقني",
        org: "معهد هرمس",
        period: "مكتمل — بانتظار إصدار الشهادة",
        icon: "graduation" as const,
        points: ["إضافة إلى شهادة الثانوية العامة."],
      },
    ],
  },

  stats: [
    { value: 6, prefix: "+", label: "مشاريع إنتاجية" },
    { value: 20, prefix: "", label: "تقنية وأداة" },
    { value: 4, prefix: "", label: "مواسم في خدمة ضيوف الرحمن" },
    { value: null, text: "NELC", label: "المساهمة في ترخيص التعليم الإلكتروني" },
  ] as { value: number | null; prefix?: string; text?: string; label: string }[],

  contact: {
    title: "تواصل معي",
    lead: "لديك فكرة مشروع أو فرصة تعاون؟ اكتب لي رسالة وستصلني مباشرة على بريدي، وسأرد عليك في أقرب وقت.",
    pageTitle: "لنبدأ مشروعك القادم",
    pageLead:
      "سواء كانت فكرة مشروع، أو فرصة عمل، أو استفسارًا عن نظام أو وكيل ذكاء اصطناعي، املأ النموذج وستصلني رسالتك على بريدي الإلكتروني مباشرة.",
    otherWays: "طرق أخرى للتواصل",
    replyNote: "أرد عادةً خلال 24 ساعة.",
    form: {
      name: "الاسم",
      namePh: "اسمك الكريم",
      email: "البريد الإلكتروني",
      emailPh: "you@example.com",
      topic: "نوع الرسالة",
      topics: ["مشروع جديد", "فرصة عمل", "استفسار", "أخرى"],
      message: "الرسالة",
      messagePh: "اكتب تفاصيل فكرتك أو استفسارك…",
      send: "إرسال الرسالة",
      sending: "جارٍ الإرسال…",
      success: "تم إرسال رسالتك بنجاح. شكرًا لتواصلك، سأرد عليك قريبًا.",
      sendAnother: "إرسال رسالة أخرى",
      errors: {
        name: "اكتب اسمك (حرفان على الأقل).",
        email: "اكتب بريدًا إلكترونيًا صحيحًا حتى أستطيع الرد عليك.",
        message: "اكتب رسالتك (10 أحرف على الأقل).",
        server: "لم تُرسل الرسالة بسبب خطأ في الخادم. حاول مرة أخرى، أو راسلني على واتساب.",
        notConfigured: "خدمة الإرسال غير مفعّلة بعد. راسلني مؤقتًا على واتساب أو البريد الإلكتروني مباشرة.",
        rate: "أرسلت عدة رسائل خلال وقت قصير. انتظر دقيقة ثم حاول مرة أخرى.",
      },
    },
  },
};

export type Content = typeof ar;
