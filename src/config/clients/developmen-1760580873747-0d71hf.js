// Client Configuration for Development
export const clientConfig = {
  business: {
    name: "Development",
    legalName: "Development Technologies LLC",
    tagline: "Building Tomorrow's Technology Today",
    shortDescription: "Expert mobile and software development solutions for innovative founders and startups",
    longDescription: "Development is a cutting-edge technology company specializing in creating exceptional mobile and software solutions. We partner with founders and entrepreneurs to transform their ideas into powerful, scalable applications that drive business growth and user engagement.",
    yearFounded: 2023,
    industry: "Technology",
    license: "MIT"
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
    linkedin: "development-tech",
    twitter: "developmenttech",
    facebook: "developmenttech",
    instagram: "development.tech"
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
      body: "Roboto"
    }
  },

  content: {
    hero: {
      headline: "Transform Your Vision Into Powerful Software",
      subheadline: "Expert mobile and software development for founders who want to build the next big thing",
      cta: "Start Your Project",
      secondaryCta: "View Our Work"
    },

    features: [
      {
        title: "Mobile Development",
        description: "Native and cross-platform mobile applications built for performance and user experience",
        icon: "mobile-device",
        image: "/images/feature-mobile.jpg"
      },
      {
        title: "Custom Software",
        description: "Tailored software solutions that solve complex business challenges",
        icon: "code",
        image: "/images/feature-software.jpg"
      },
      {
        title: "Cloud Architecture",
        description: "Scalable cloud infrastructure designed for growth and reliability",
        icon: "cloud",
        image: "/images/feature-cloud.jpg"
      }
    ],

    services: [
      {
        name: "Mobile App Development",
        description: "Full-cycle mobile application development for iOS and Android",
        features: [
          "Native and cross-platform development",
          "UI/UX design",
          "App Store optimization",
          "Ongoing maintenance and support"
        ],
        price: "Starting at $25,000",
        cta: "Schedule Consultation"
      },
      {
        name: "Custom Software Development",
        description: "Enterprise-grade software solutions built for your specific needs",
        features: [
          "Full-stack development",
          "Cloud integration",
          "API development",
          "Technical documentation"
        ],
        price: "Starting at $35,000",
        cta: "Discuss Your Project"
      }
    ],

    testimonials: [
      {
        quote: "Development delivered our mobile app on time and exceeded our expectations in terms of quality and user experience.",
        author: "Sarah Chen",
        title: "Founder",
        company: "TechStart Inc"
      },
      {
        quote: "Their technical expertise and attention to detail made our software project a complete success.",
        author: "Michael Rodriguez",
        title: "CTO",
        company: "Innovation Labs"
      }
    ],

    about: {
      story: "Founded in 2023, Development emerged from a passion for creating exceptional software solutions that help businesses thrive in the digital age. Our team combines technical expertise with strategic thinking to deliver results that matter.",
      mission: "To empower founders and businesses with innovative software solutions that drive growth and create lasting value.",
      values: [
        "Technical Excellence",
        "Innovation",
        "Client Partnership",
        "Continuous Learning"
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
    title: "Development | Expert Mobile & Software Development Solutions",
    description: "Transform your business with custom mobile apps and software solutions. Expert development services for founders and startups.",
    keywords: [
      "mobile development",
      "software development",
      "custom applications",
      "app development",
      "technical solutions",
      "startup development",
      "enterprise software",
      "cloud solutions"
    ],
    og: {
      title: "Development - Building Tomorrow's Technology Today",
      description: "Expert mobile and software development solutions for innovative founders and startups",
      image: "/images/og-image.jpg",
      url: ""
    }
  }
};