// Client Configuration for Fractional CFO
export const clientConfig = {
  business: {
    name: "Fractional CFO",
    legalName: "Fractional CFO Services LLC",
    tagline: "Enterprise-Level Financial Leadership for Growing SaaS Companies",
    shortDescription: "Strategic financial leadership and CFO services for SaaS founders and startups",
    longDescription: "Fractional CFO provides expert financial leadership and strategic guidance to help SaaS companies optimize cash flow, accelerate growth, and make data-driven decisions. Our seasoned CFOs bring enterprise-level expertise to growing companies at a fraction of the cost of a full-time executive.",
    yearFounded: 2023,
    industry: "Financial Services",
    license: "CPA Licensed"
  },

  contact: {
    email: "jonasgraterol@gmail.com",
    phone: "",
    address: {
      street: "Virtual Service",
      city: "Remote",
      state: "N/A",
      country: "United States",
      zip: "00000"
    },
    hours: {
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "9:00 AM - 5:00 PM",
      thursday: "9:00 AM - 5:00 PM",
      friday: "9:00 AM - 5:00 PM",
      saturday: "By Appointment",
      sunday: "Closed"
    },
    website: ""
  },

  social: {
    linkedin: "fractional-cfo",
    twitter: "fractionalcfo",
    facebook: "fractionalcfoservices",
    instagram: "fractional.cfo"
  },

  branding: {
    logo: {
      main: "/images/logo.svg",
      dark: "/images/logo-dark.svg",
      light: "/images/logo-light.svg"
    },
    colors: {
      primary: "#059669",
      secondary: "#6b7280",
      accent: "#0284c7", 
      neutral: "#6b7280"
    },
    fonts: {
      heading: "Inter",
      body: "Source Sans Pro"
    }
  },

  content: {
    hero: {
      headline: "Scale Your SaaS with Expert Financial Leadership",
      subheadline: "Get enterprise-level CFO expertise without the full-time executive cost",
      cta: "Schedule a Free Consultation",
      secondaryCta: "View Our Services"
    },

    features: [
      {
        title: "Strategic Financial Planning",
        description: "Develop robust financial strategies and forecasting models to drive growth",
        icon: "chart-bar",
        image: "/images/strategic-planning.jpg"
      },
      {
        title: "SaaS Metrics & Analytics",
        description: "Track and optimize key SaaS metrics including MRR, CAC, LTV, and burn rate",
        icon: "presentation-chart",
        image: "/images/metrics-analytics.jpg"
      },
      {
        title: "Funding & Investment",
        description: "Prepare for fundraising and optimize your capital structure",
        icon: "currency-dollar",
        image: "/images/funding.jpg"
      }
    ],

    services: [
      {
        name: "Startup CFO Package",
        description: "Essential financial leadership for early-stage SaaS companies",
        features: [
          "Monthly Financial Review",
          "Cash Flow Management",
          "Basic SaaS Metrics Dashboard",
          "Quarterly Strategy Sessions"
        ],
        price: "Starting at $2,500/month",
        cta: "Get Started"
      },
      {
        name: "Growth CFO Package",
        description: "Comprehensive financial strategy for scaling SaaS companies",
        features: [
          "Weekly Financial Review",
          "Advanced Metrics & Analytics",
          "Investor Relations Support",
          "Monthly Strategy Sessions"
        ],
        price: "Starting at $5,000/month",
        cta: "Learn More"
      }
    ],

    testimonials: [
      {
        quote: "Having a Fractional CFO has transformed our financial strategy and given us the insights we needed to scale effectively.",
        author: "Sarah Chen",
        title: "CEO",
        company: "TechStack Solutions"
      },
      {
        quote: "The expertise and guidance provided by our Fractional CFO helped us secure Series A funding and optimize our burn rate.",
        author: "Michael Rodriguez",
        title: "Founder",
        company: "CloudScale"
      }
    ],

    about: {
      story: "Founded by experienced financial leaders, Fractional CFO was created to bring enterprise-level financial expertise to growing SaaS companies in a flexible, cost-effective way.",
      mission: "To empower SaaS founders with strategic financial leadership that drives growth and creates sustainable business value.",
      values: [
        "Data-Driven Decision Making",
        "Strategic Partnership",
        "Continuous Innovation",
        "Transparent Communication"
      ],
      team: [
        {
          name: "Jonas Graterol",
          title: "Founder & Lead CFO",
          image: "/images/team/jonas.jpg"
        }
      ]
    }
  },

  seo: {
    title: "Fractional CFO | Strategic Financial Leadership for SaaS Companies",
    description: "Expert CFO services for SaaS founders. Get enterprise-level financial leadership to optimize growth, manage cash flow, and make data-driven decisions.",
    keywords: [
      "fractional cfo",
      "saas financial leadership",
      "startup cfo services",
      "financial strategy",
      "saas metrics",
      "cash flow management",
      "financial planning"
    ],
    og: {
      title: "Transform Your SaaS Finance Strategy with Fractional CFO",
      description: "Get enterprise-level financial leadership and CFO expertise at a fraction of the cost. Perfect for growing SaaS companies.",
      image: "/images/og-image.jpg",
      url: "https://fractionalcfo.com"
    }
  }
};