// Client Configuration for Tech 10
export const clientConfig = {
  business: {
    name: "Tech 10",
    legalName: "Tech 10 Solutions Inc.",
    tagline: "Building Tomorrow's Technology Infrastructure Today",
    shortDescription: "Premier telecom and software development solutions for enterprise and startup innovation",
    longDescription: "Tech 10 is a leading technology solutions provider specializing in telecommunications infrastructure and custom software development. We bridge the gap between complex network requirements and innovative software solutions, delivering enterprise-grade systems that power the future of digital communication.",
    yearFounded: 2018,
    industry: "Technology & Telecommunications",
    license: "Professional Engineering License #T10-2023-ON"
  },

  contact: {
    email: "jonasgraterol@gmail.com",
    phone: "6475225312",
    address: {
      street: "2425 Matheson Blvd East",
      city: "Mississauga",
      state: "Ontario",
      country: "Canada",
      zip: "L4W 5K4"
    },
    hours: {
      monday: "9:00 AM - 6:00 PM",
      tuesday: "9:00 AM - 6:00 PM",
      wednesday: "9:00 AM - 6:00 PM",
      thursday: "9:00 AM - 6:00 PM",
      friday: "9:00 AM - 5:00 PM",
      saturday: "By Appointment",
      sunday: "Closed"
    },
    website: "techintenius.com"
  },

  social: {
    linkedin: "tech10-solutions",
    twitter: "Tech10Solutions",
    facebook: "Tech10SolutionsInc",
    instagram: "tech10solutions"
  },

  branding: {
    logo: {
      main: "/images/tech10-logo.svg",
      dark: "/images/tech10-logo-dark.svg",
      light: "/images/tech10-logo-light.svg"
    },
    colors: {
      primary: "#fc7c04",
      secondary: "#d46c04",
      accent: "#fcbc7a",
      neutral: "#974a01"
    },
    fonts: {
      heading: "Montserrat",
      body: "Open Sans"
    }
  },

  content: {
    hero: {
      headline: "Enterprise-Grade Technology Solutions",
      subheadline: "Custom Software Development & Telecom Infrastructure Excellence",
      cta: "Schedule a Consultation",
      secondaryCta: "View Our Solutions",
      image: "/images/hero-tech-infrastructure.jpg"
    },

    features: [
      {
        title: "Custom Mobile Development",
        description: "Enterprise-grade mobile applications built with cutting-edge technology and seamless user experience",
        icon: "mobile-device",
        image: "/images/mobile-dev.jpg"
      },
      {
        title: "Telecom Network Solutions",
        description: "Comprehensive network infrastructure design and implementation for maximum reliability",
        icon: "network-tower",
        image: "/images/telecom-network.jpg"
      },
      {
        title: "Fiber Optic Installation",
        description: "Professional fiber optic deployment with industry-leading quality and performance",
        icon: "fiber-cable",
        image: "/images/fiber-installation.jpg"
      }
    ],

    services: [
      {
        name: "Enterprise Mobile Development",
        description: "Full-cycle mobile application development tailored for enterprise needs",
        features: [
          "Native iOS and Android Development",
          "Cross-platform Solutions",
          "Enterprise Integration",
          "Secure Data Management",
          "24/7 Support"
        ],
        price: "Starting at $75,000",
        cta: "Get Enterprise Quote"
      },
      {
        name: "Telecom Network Implementation",
        description: "Complete network infrastructure solutions for telecommunications companies",
        features: [
          "Network Architecture Design",
          "Equipment Installation",
          "Performance Optimization",
          "Security Implementation",
          "Maintenance Services"
        ],
        price: "Custom Quote",
        cta: "Discuss Your Project"
      },
      {
        name: "Fiber Optic Solutions",
        description: "Professional fiber optic installation and maintenance services",
        features: [
          "Site Survey and Planning",
          "Cable Installation",
          "Testing and Certification",
          "Network Integration",
          "Ongoing Support"
        ],
        price: "Project-based Pricing",
        cta: "Request Quote"
      }
    ],

    testimonials: [
      {
        quote: "Tech 10 transformed our network infrastructure with their expertise in fiber optics and software integration.",
        author: "Sarah Chen",
        title: "CTO",
        company: "GlobalTel Communications"
      },
      {
        quote: "Their mobile development team delivered an enterprise solution that exceeded our expectations in both functionality and security.",
        author: "Michael Rodriguez",
        title: "Director of Digital Innovation",
        company: "TechStart Solutions"
      }
    ],

    about: {
      story: "Founded in 2018, Tech 10 emerged from a vision to bridge the gap between advanced telecommunications infrastructure and modern software solutions. Our journey began with a team of experienced engineers and developers who understood the growing need for integrated technology solutions in the enterprise space.",
      mission: "To deliver cutting-edge technology solutions that empower businesses to build robust digital infrastructure and innovative software applications.",
      values: [
        "Technical Excellence",
        "Innovation Leadership",
        "Client Partnership",
        "Quality Assurance",
        "Continuous Improvement"
      ],
      team: [
        {
          name: "Jonas Graterol",
          title: "Chief Executive Officer",
          image: "/images/team/jonas-graterol.jpg"
        }
      ]
    }
  },

  seo: {
    title: "Tech 10 | Enterprise Technology Solutions & Custom Software Development",
    description: "Leading provider of enterprise mobile development, telecom network solutions, and fiber optic installations. Transform your business with custom technology solutions.",
    keywords: [
      "enterprise mobile development",
      "telecom network solutions",
      "fiber optic installation",
      "custom software development",
      "network infrastructure",
      "enterprise technology",
      "telecommunications solutions",
      "mobile app development"
    ],
    og: {
      title: "Tech 10 - Enterprise Technology & Software Solutions",
      description: "Transform your business with custom mobile development, telecom networks, and fiber optic solutions.",
      image: "/images/og-tech10.jpg",
      url: "https://techintenius.com"
    }
  }
};