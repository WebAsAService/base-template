// Client Configuration for Tech 6
export const clientConfig = {
  // Business Identity
  business: {
    name: "Tech 6",
    legalName: "Tech 6 Solutions Inc.",
    tagline: "Enterprise Software & Telecom Infrastructure",
    shortDescription: "Leading provider of custom software development and telecom network solutions for enterprise clients.",
    longDescription: "Tech 6 is a full-service technology company specializing in enterprise software development, mobile solutions, and telecommunications infrastructure. With over a decade of experience serving major telecom providers and innovative startups, we deliver scalable, future-proof solutions that drive digital transformation.",
    yearFounded: 2015,
    industry: "Technology & Telecommunications",
    license: "TX-458921",
  },

  // Contact Information
  contact: {
    email: "jonasgraterol@gmail.com",
    phone: "647-522-5312",
    address: {
      street: "",
      city: "Toronto",
      state: "ON",
      country: "Canada",
      zip: ""
    },
    hours: {
      monday: "9:00 AM - 6:00 PM",
      tuesday: "9:00 AM - 6:00 PM",
      wednesday: "9:00 AM - 6:00 PM",
      thursday: "9:00 AM - 6:00 PM",
      friday: "9:00 AM - 5:00 PM",
      saturday: "Closed",
      sunday: "Closed"
    },
    website: "techintenius.com"
  },

  // Social Media
  social: {
    linkedin: "tech6-solutions",
    github: "tech6dev",
    twitter: "tech6solutions",
    facebook: "tech6solutions",
  },

  // Branding
  branding: {
    logo: {
      main: "/images/logo.svg",
      dark: "/images/logo-dark.svg",
      light: "/images/logo-light.svg",
    },
    colors: {
      primary: "#2563eb",
      secondary: "#64748b", 
      accent: "#f59e0b",
      neutral: "#974a01"
    },
    fonts: {
      heading: "Inter",
      body: "Inter"
    }
  },

  // Content Sections
  content: {
    hero: {
      headline: "Enterprise Software & Network Solutions",
      subheadline: "Custom software development and telecom infrastructure for industry leaders",
      cta: "Schedule a Consultation",
      secondaryCta: "View Our Work",
      image: "/images/hero-telecom.jpg"
    },

    features: [
      {
        title: "Custom Software Development",
        description: "Enterprise-grade software solutions built with cutting-edge technology",
        icon: "code",
        image: "/images/feature-software.jpg"
      },
      {
        title: "Mobile Development",
        description: "Cross-platform mobile applications optimized for performance",
        icon: "mobile",
        image: "/images/feature-mobile.jpg"
      },
      {
        title: "Telecom Network Infrastructure",
        description: "End-to-end network planning, deployment and maintenance",
        icon: "network",
        image: "/images/feature-network.jpg"
      },
      {
        title: "Fiber Optic Solutions",
        description: "High-speed fiber optic installation and configuration",
        icon: "fiber",
        image: "/images/feature-fiber.jpg"
      }
    ],

    services: [
      {
        name: "Enterprise Software",
        description: "Custom software development for large organizations",
        features: [
          "Requirements analysis",
          "Architecture design",
          "Custom development",
          "Testing & QA",
          "Deployment",
          "Maintenance & support"
        ],
        price: "Starting at $50,000",
        cta: "Request Quote"
      },
      {
        name: "Mobile Development",
        description: "Native and cross-platform mobile applications",
        features: [
          "iOS & Android development",
          "React Native / Flutter",
          "UI/UX design",
          "API integration",
          "App store submission",
          "Ongoing maintenance"
        ],
        price: "Starting at $25,000",
        cta: "Schedule Call"
      },
      {
        name: "Network Infrastructure",
        description: "Complete telecom network solutions",
        features: [
          "Network planning",
          "Equipment procurement",
          "Installation",
          "Configuration",
          "Testing",
          "24/7 support"
        ],
        price: "Custom Quote",
        cta: "Contact Us"
      }
    ],

    testimonials: [
      {
        quote: "Tech 6 delivered our enterprise software platform on time and on budget. Their expertise in telecom systems was invaluable.",
        author: "Sarah Chen",
        title: "CTO",
        company: "Global Telecom Inc."
      },
      {
        quote: "The mobile app they developed for us has over 1M downloads and maintains a 4.8 star rating. Exceptional work.",
        author: "Michael Roberts",
        title: "Product Director",
        company: "StartupCo"
      },
      {
        quote: "Their fiber optic installation team was professional and efficient. Network performance has been flawless.",
        author: "David Wilson",
        title: "Infrastructure Manager",
        company: "Enterprise Solutions Ltd"
      },
      {
        quote: "Tech 6 is our go-to partner for all software development. They consistently exceed expectations.",
        author: "Jessica Thompson",
        title: "VP Engineering",
        company: "TechCorp Systems"
      }
    ],

    about: {
      story: "Founded in 2015, Tech 6 has grown from a small software consultancy to a full-service technology partner for enterprise clients. Our team of over 50 engineers, developers, and telecom experts delivers innovative solutions that power modern businesses.",
      mission: "To accelerate digital transformation through cutting-edge software and infrastructure solutions.",
      values: [
        "Technical Excellence",
        "Innovation",
        "Client Partnership",
        "Reliability"
      ],
      team: [
        {
          name: "Jonas Graterol",
          title: "CEO & Founder",
          image: "/images/team/jonas.jpg"
        }
      ]
    }
  },

  // SEO Configuration
  seo: {
    title: "Tech 6 - Enterprise Software & Telecom Solutions",
    description: "Leading provider of custom software development, mobile applications, and telecommunications infrastructure for enterprise clients.",
    keywords: [
      "enterprise software development",
      "custom software solutions",
      "mobile app development",
      "telecom infrastructure",
      "fiber optic installation",
      "network solutions",
      "Toronto software company",
      "enterprise technology partner"
    ],
    og: {
      title: "Tech 6 - Enterprise Software & Telecom Solutions",
      description: "Custom software development and telecommunications infrastructure for industry leaders",
      image: "/images/og-image.jpg",
      url: "https://techintenius.com"
    }
  }
};