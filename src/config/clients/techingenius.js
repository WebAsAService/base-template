// Client Configuration for Tech Test
export const clientConfig = {
  business: {
    name: "Tech Test",
    legalName: "Tech Test Solutions LLC",
    tagline: "Building Tomorrow's Technology Today",
    shortDescription: "Enterprise-grade software development and telecom solutions for industry leaders",
    longDescription: "Tech Test is a premier software factory and telecommunications solutions provider, delivering custom mobile applications, enterprise software, and innovative telecom solutions. We partner with leading telecom companies and ambitious startups to transform their digital presence and technical capabilities.",
    yearFounded: 2020,
    industry: "Technology & Telecommunications",
    license: "ISO 9001:2015 Certified"
  },

  contact: {
    email: "contact@techtest.com",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Innovation Drive",
      city: "Silicon Valley",
      state: "California",
      country: "United States",
      zip: "94025"
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
    website: "https://techtest.com"
  },

  social: {
    linkedin: "tech-test-solutions",
    twitter: "techtestdev",
    facebook: "techtestsolutions",
    instagram: "techtestglobal"
  },

  branding: {
    logo: {
      main: "/images/logo.svg",
      dark: "/images/logo-dark.svg",
      light: "/images/logo-light.svg"
    },
    colors: {
      primary: "#fc7c04",
      secondary: "#d46c04",
      accent: "#fcbc7a",
      neutral: "#d46c04"
    },
    fonts: {
      heading: "Montserrat",
      body: "Inter"
    }
  },

  content: {
    hero: {
      headline: "Transforming Ideas into Enterprise Solutions",
      subheadline: "Custom software development and telecom solutions that drive industry innovation",
      cta: "Start Your Project",
      secondaryCta: "View Our Work"
    },

    features: [
      {
        title: "Custom Software Development",
        description: "Enterprise-grade applications built with cutting-edge technology",
        icon: "code-bracket",
        image: "/images/feature-software.jpg"
      },
      {
        title: "Telecom Solutions",
        description: "Innovative telecommunications infrastructure and systems",
        icon: "signal",
        image: "/images/feature-telecom.jpg"
      },
      {
        title: "Mobile Development",
        description: "Cross-platform mobile applications for modern businesses",
        icon: "device-mobile",
        image: "/images/feature-mobile.jpg"
      }
    ],

    services: [
      {
        name: "Enterprise Software Development",
        description: "Full-cycle custom software development for large-scale enterprises",
        features: [
          "Custom Architecture Design",
          "Scalable Infrastructure",
          "API Integration",
          "Legacy System Modernization"
        ],
        price: "Starting at $50,000",
        cta: "Request Proposal"
      },
      {
        name: "Telecom Solutions",
        description: "Comprehensive telecommunications systems and infrastructure",
        features: [
          "Network Design",
          "System Integration",
          "Performance Optimization",
          "24/7 Support"
        ],
        price: "Custom Pricing",
        cta: "Schedule Consultation"
      },
      {
        name: "Mobile App Development",
        description: "Native and cross-platform mobile applications",
        features: [
          "iOS & Android Development",
          "UI/UX Design",
          "App Store Optimization",
          "Maintenance & Updates"
        ],
        price: "Starting at $25,000",
        cta: "Start Development"
      }
    ],

    testimonials: [
      {
        quote: "Tech Test delivered our enterprise solution on time and exceeded our expectations in terms of performance and scalability.",
        author: "Sarah Chen",
        title: "CTO",
        company: "GlobalTech Communications"
      },
      {
        quote: "Their expertise in telecom solutions helped us modernize our infrastructure and reduce operational costs by 40%.",
        author: "Michael Rodriguez",
        title: "Director of Operations",
        company: "NextGen Telecom"
      }
    ],

    about: {
      story: "Founded in 2020, Tech Test emerged from a vision to bridge the gap between cutting-edge technology and enterprise needs. Our team of industry veterans brings decades of combined experience in software development and telecommunications.",
      mission: "To deliver innovative, scalable, and reliable technology solutions that empower businesses to thrive in the digital age.",
      values: [
        "Technical Excellence",
        "Innovation",
        "Client Partnership",
        "Sustainable Development"
      ],
      team: [
        {
          name: "David Chang",
          title: "Chief Executive Officer",
          image: "/images/team/david-chang.jpg"
        },
        {
          name: "Lisa Martinez",
          title: "Chief Technology Officer",
          image: "/images/team/lisa-martinez.jpg"
        }
      ]
    }
  },

  seo: {
    title: "Tech Test - Enterprise Software Development & Telecom Solutions",
    description: "Leading provider of custom software development, telecom solutions, and mobile applications for enterprise clients and innovative startups.",
    keywords: [
      "enterprise software development",
      "telecom solutions",
      "custom mobile apps",
      "software factory",
      "telecommunications",
      "digital transformation",
      "tech consulting"
    ],
    og: {
      title: "Tech Test - Building Tomorrow's Technology Today",
      description: "Enterprise-grade software development and telecom solutions for industry leaders",
      image: "/images/og-image.jpg",
      url: "https://techtest.com"
    }
  }
};