// Client Configuration for Preview Services
export const clientConfig = {
  business: {
    name: "Preview Services",
    legalName: "Preview Services LLC",
    tagline: "Excellence in Pool Construction & Maintenance",
    shortDescription: "Professional pool construction and maintenance services with AI-driven customer experience",
    longDescription: "Preview Services combines expert pool construction and maintenance with cutting-edge AI technology to deliver an unmatched customer experience. We specialize in creating and maintaining beautiful, sustainable pool environments while utilizing innovative technology to streamline communication and service delivery.",
    yearFounded: 2023,
    industry: "Pool Construction & Maintenance",
    license: "State Contractor License #PL2023"
  },

  contact: {
    email: "jonasgraterol@gmail.com",
    phone: "",
    address: {
      street: "1234 Pool Avenue",
      city: "Miami",
      state: "Florida",
      country: "United States",
      zip: "33101"
    },
    hours: {
      monday: "8:00 AM - 6:00 PM",
      tuesday: "8:00 AM - 6:00 PM",
      wednesday: "8:00 AM - 6:00 PM",
      thursday: "8:00 AM - 6:00 PM",
      friday: "8:00 AM - 6:00 PM",
      saturday: "9:00 AM - 2:00 PM",
      sunday: "Closed"
    },
    website: ""
  },

  social: {
    linkedin: "preview-services",
    twitter: "previewservices",
    facebook: "previewservicespool",
    instagram: "previewservices_pools"
  },

  branding: {
    logo: {
      main: "/images/logo.svg",
      dark: "/images/logo-dark.svg",
      light: "/images/logo-light.svg"
    },
    colors: {
      primary: "#1f2937",
      secondary: "#6b7280",
      accent: "#b45309",
      neutral: "#6b7280"
    },
    fonts: {
      heading: "Montserrat",
      body: "Open Sans"
    }
  },

  content: {
    hero: {
      headline: "Transform Your Backyard Into a Paradise",
      subheadline: "Expert Pool Construction & Maintenance with AI-Powered Service",
      cta: "Get Free Consultation",
      secondaryCta: "View Our Projects"
    },

    features: [
      {
        title: "AI-Driven Service Experience",
        description: "Experience seamless communication and service scheduling through our AI-powered platform",
        icon: "artificial-intelligence",
        image: "/images/ai-platform.jpg"
      },
      {
        title: "Custom Pool Design",
        description: "Professional pool design and construction tailored to your specific needs and preferences",
        icon: "pool",
        image: "/images/custom-design.jpg"
      },
      {
        title: "Regular Maintenance",
        description: "Comprehensive maintenance services to keep your pool pristine year-round",
        icon: "maintenance",
        image: "/images/maintenance.jpg"
      }
    ],

    services: [
      {
        name: "Pool Construction",
        description: "Complete pool design and construction services with premium materials",
        features: [
          "Custom design consultation",
          "3D visualization",
          "Premium material selection",
          "Professional installation",
          "Quality assurance"
        ],
        price: "Starting at $30,000",
        cta: "Start Your Project"
      },
      {
        name: "Regular Maintenance",
        description: "Weekly or monthly maintenance packages to keep your pool in perfect condition",
        features: [
          "Chemical balance testing",
          "Filter cleaning",
          "Debris removal",
          "Equipment inspection",
          "Water quality reports"
        ],
        price: "From $199/month",
        cta: "Schedule Service"
      }
    ],

    testimonials: [
      {
        quote: "Preview Services transformed our backyard with a stunning pool and their maintenance service is exceptional. The AI-powered scheduling makes everything so convenient!",
        author: "Michael Rodriguez",
        title: "Homeowner",
        company: "Miami Beach"
      },
      {
        quote: "The most professional pool service we've ever worked with. Their attention to detail and customer service is outstanding.",
        author: "Sarah Johnson",
        title: "Property Manager",
        company: "Luxury Estates"
      }
    ],

    about: {
      story: "Founded in 2023, Preview Services was born from a vision to combine traditional pool expertise with modern technology. We saw an opportunity to enhance the customer experience in pool services through AI-driven solutions while maintaining the highest standards of construction and maintenance.",
      mission: "To deliver exceptional pool construction and maintenance services while pioneering AI-driven customer experience in the industry.",
      values: [
        "Innovation in Service",
        "Quality Craftsmanship",
        "Customer-First Approach",
        "Environmental Responsibility"
      ],
      team: [
        {
          name: "Jonas Graterol",
          title: "Founder & CEO",
          image: "/images/team/jonas.jpg"
        }
      ]
    }
  },

  seo: {
    title: "Preview Services | Expert Pool Construction & Maintenance",
    description: "Leading pool construction and maintenance services with AI-powered customer experience. Custom design, professional installation, and comprehensive maintenance packages.",
    keywords: [
      "pool construction",
      "pool maintenance",
      "AI customer service",
      "custom pool design",
      "pool installation",
      "pool maintenance service",
      "Miami pools",
      "swimming pool contractor"
    ],
    og: {
      title: "Preview Services - Transform Your Backyard Into Paradise",
      description: "Expert pool construction and maintenance with AI-powered service experience. Get started with a free consultation today.",
      image: "/images/og-image.jpg",
      url: "https://previewservices.com"
    }
  }
};