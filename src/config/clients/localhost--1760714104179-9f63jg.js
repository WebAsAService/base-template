// Client Configuration for Localhost Services
export const clientConfig = {
  business: {
    name: "Localhost Services",
    legalName: "Localhost Services LLC",
    tagline: "Building Tomorrow's Software Solutions Today",
    shortDescription: "Custom software development for innovative startups",
    longDescription: "Localhost Services is a premium software development company specializing in creating cutting-edge solutions for startups. We transform innovative ideas into scalable, market-ready applications using modern technologies and best practices in software engineering.",
    yearFounded: 2023,
    industry: "Technology",
    license: "MIT"
  },

  contact: {
    email: "jonasgraterol@gmail.com",
    phone: "",
    address: {
      street: "Remote-First Company",
      city: "Global",
      state: "",
      country: "Worldwide",
      zip: ""
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
    linkedin: "localhost-services",
    twitter: "localhost_dev",
    facebook: "localhostservices",
    instagram: "localhost.services"
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
      headline: "Transform Your Startup Vision Into Reality",
      subheadline: "Expert software development tailored for ambitious startups",
      cta: "Start Your Project",
      secondaryCta: "View Our Work"
    },

    features: [
      {
        title: "Agile Development",
        description: "Rapid iteration and continuous delivery to keep your project moving forward",
        icon: "rocket",
        image: "/images/feature-agile.jpg"
      },
      {
        title: "Scalable Architecture",
        description: "Future-proof solutions built to grow with your business",
        icon: "scale",
        image: "/images/feature-scale.jpg"
      },
      {
        title: "Startup-Focused",
        description: "Understanding the unique needs and pace of startup environments",
        icon: "startup",
        image: "/images/feature-startup.jpg"
      }
    ],

    services: [
      {
        name: "MVP Development",
        description: "Get your minimum viable product to market quickly",
        features: [
          "Requirements analysis",
          "Core feature development",
          "Basic UI/UX design",
          "Testing and deployment"
        ],
        price: "Starting at $15,000",
        cta: "Launch Your MVP"
      },
      {
        name: "Full-Stack Development",
        description: "Complete software solution from frontend to backend",
        features: [
          "Custom architecture design",
          "Advanced feature development",
          "Database optimization",
          "Security implementation"
        ],
        price: "Starting at $30,000",
        cta: "Build Your Platform"
      },
      {
        name: "Technical Consultation",
        description: "Expert guidance for your technical decisions",
        features: [
          "Architecture review",
          "Technology stack selection",
          "Scalability planning",
          "Security audit"
        ],
        price: "$200/hour",
        cta: "Book Consultation"
      }
    ],

    testimonials: [
      {
        quote: "Localhost Services turned our concept into a working product in record time. Their technical expertise and startup-minded approach made all the difference.",
        author: "Sarah Chen",
        title: "CEO",
        company: "TechStart Solutions"
      },
      {
        quote: "The team's ability to understand our business needs and translate them into technical solutions was impressive.",
        author: "Marcus Rodriguez",
        title: "Founder",
        company: "InnovateLab"
      }
    ],

    about: {
      story: "Founded by developers for startups, Localhost Services emerged from the recognition that innovative ideas need technical expertise to thrive. We combine deep technical knowledge with startup experience to deliver solutions that matter.",
      mission: "To empower startups with technology solutions that accelerate their path to success",
      values: [
        "Technical Excellence",
        "Startup Speed",
        "Innovation First",
        "Collaborative Growth"
      ],
      team: [
        {
          name: "Jonas Graterol",
          title: "Founder & Lead Developer",
          image: "/images/team/jonas.jpg"
        }
      ]
    }
  },

  seo: {
    title: "Localhost Services | Custom Software Development for Startups",
    description: "Transform your startup vision into reality with custom software development solutions. Specialized in MVP development, full-stack solutions, and technical consultation.",
    keywords: [
      "software development",
      "startup technology",
      "MVP development",
      "custom software",
      "technical consultation",
      "full-stack development",
      "startup solutions"
    ],
    og: {
      title: "Build Your Startup's Future with Localhost Services",
      description: "Expert software development solutions tailored for ambitious startups. Transform your vision into reality.",
      image: "/images/og-image.jpg",
      url: ""
    }
  }
};