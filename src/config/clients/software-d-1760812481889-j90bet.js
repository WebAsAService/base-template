// Client Configuration for Software Development
export const clientConfig = {
  business: {
    name: "Software Development",
    legalName: "Software Development LLC",
    tagline: "Architecting Tomorrow's Digital Solutions",
    shortDescription: "Expert software architecture and development solutions for ambitious startups",
    longDescription: "We specialize in crafting robust, scalable software architectures that empower startups to build future-proof digital products. Our expertise combines cutting-edge technology with strategic thinking to create solutions that drive business growth.",
    yearFounded: 2023,
    industry: "Technology",
    license: "Professional Software Engineering License"
  },

  contact: {
    email: "jonasgraterol@gmail.com",
    phone: "",
    address: {
      street: "Remote",
      city: "Remote",
      state: "Remote",
      country: "Global",
      zip: "00000"
    },
    hours: {
      monday: "9:00 AM - 6:00 PM",
      tuesday: "9:00 AM - 6:00 PM",
      wednesday: "9:00 AM - 6:00 PM",
      thursday: "9:00 AM - 6:00 PM",
      friday: "9:00 AM - 6:00 PM",
      saturday: "By Appointment",
      sunday: "Closed"
    },
    website: ""
  },

  social: {
    linkedin: "software-development",
    twitter: "softwaredev",
    facebook: "softwaredevco",
    instagram: "softwaredev.co"
  },

  branding: {
    logo: {
      main: "/images/logo.svg",
      dark: "/images/logo-dark.svg",
      light: "/images/logo-light.svg"
    },
    colors: {
      primary: "#2563eb",
      secondary: "#475569",
      accent: "#06b6d4",
      neutral: "#475569"
    },
    fonts: {
      heading: "Inter",
      body: "Source Sans Pro"
    }
  },

  content: {
    hero: {
      headline: "Build Your Startup on Rock-Solid Architecture",
      subheadline: "Transform your vision into scalable, maintainable software solutions",
      cta: "Schedule Architecture Consultation",
      secondaryCta: "View Our Process"
    },

    features: [
      {
        title: "Scalable Architecture Design",
        description: "Future-proof your startup with architectures that scale seamlessly as you grow",
        icon: "scale",
        image: "/images/feature-architecture.jpg"
      },
      {
        title: "Cloud-Native Solutions",
        description: "Leverage the full power of modern cloud infrastructure and microservices",
        icon: "cloud",
        image: "/images/feature-cloud.jpg"
      },
      {
        title: "Security By Design",
        description: "Built-in security measures that protect your data and users from day one",
        icon: "shield",
        image: "/images/feature-security.jpg"
      }
    ],

    services: [
      {
        name: "Architecture Assessment",
        description: "Comprehensive review and optimization of your existing software architecture",
        features: [
          "Technical debt analysis",
          "Scalability evaluation",
          "Security assessment",
          "Performance optimization recommendations"
        ],
        price: "Starting at $2,500",
        cta: "Book Assessment"
      },
      {
        name: "Architecture Design",
        description: "Complete software architecture design for new projects",
        features: [
          "System design documentation",
          "Technology stack selection",
          "Infrastructure planning",
          "Implementation roadmap"
        ],
        price: "Starting at $5,000",
        cta: "Start Project"
      },
      {
        name: "Implementation Support",
        description: "Ongoing guidance during architecture implementation",
        features: [
          "Code review",
          "Best practices enforcement",
          "Technical mentorship",
          "Quality assurance"
        ],
        price: "Custom Quote",
        cta: "Get Quote"
      }
    ],

    testimonials: [
      {
        quote: "Their architecture expertise helped us scale from 1,000 to 100,000 users without breaking a sweat.",
        author: "Sarah Chen",
        title: "CTO",
        company: "TechStartup Inc"
      },
      {
        quote: "The architecture assessment saved us months of refactoring and potential technical debt.",
        author: "Michael Rodriguez",
        title: "Founder",
        company: "DataFlow Systems"
      }
    ],

    about: {
      story: "Founded by seasoned software architects, we understand the unique challenges startups face in building scalable, maintainable software systems. Our mission is to help ambitious startups build technology that can grow with their success.",
      mission: "To empower startups with world-class software architecture that accelerates their path to success",
      values: [
        "Technical Excellence",
        "Future-Proof Solutions",
        "Knowledge Sharing",
        "Client Success"
      ],
      team: [
        {
          name: "Jonas Graterol",
          title: "Lead Software Architect",
          image: "/images/team/jonas.jpg"
        }
      ]
    }
  },

  seo: {
    title: "Software Development | Expert Software Architecture for Startups",
    description: "Transform your startup with expert software architecture services. We design scalable, secure, and maintainable solutions for ambitious technology companies.",
    keywords: [
      "software architecture",
      "startup technology",
      "scalable systems",
      "cloud architecture",
      "technical consulting",
      "software design",
      "system architecture"
    ],
    og: {
      title: "Build Your Startup on Rock-Solid Software Architecture",
      description: "Expert software architecture services for ambitious startups. Design scalable, secure systems that grow with your success.",
      image: "/images/og-software-architecture.jpg",
      url: ""
    }
  }
};