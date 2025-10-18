// Client Configuration for Localhost Test Real Estate
export const clientConfig = {
  business: {
    name: "Localhost Test Real Estate",
    legalName: "Localhost Test Real Estate LLC",
    tagline: "Your Trusted Partner in Real Estate Success",
    shortDescription: "Premier real estate services for businesses, specializing in commercial property sales and acquisitions",
    longDescription: "Localhost Test Real Estate is your dedicated partner in commercial real estate, offering comprehensive services for businesses looking to buy, sell, or invest in properties. With our deep market knowledge and personalized approach, we help organizations find their ideal commercial spaces and maximize their real estate investments.",
    yearFounded: 2023,
    industry: "Real Estate",
    license: "Real Estate License #RT123456"
  },

  contact: {
    email: "jonasgraterol@gmail.com",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      country: "",
      zip: ""
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
    website: ""
  },

  social: {
    linkedin: "localhosttest-realestate",
    twitter: "LocalhostRE",
    facebook: "LocalhostTestRealEstate",
    instagram: "localhosttest.realestate"
  },

  branding: {
    logo: {
      main: "/images/logo.svg",
      dark: "/images/logo-dark.svg",
      light: "/images/logo-light.svg"
    },
    colors: {
      primary: "#0369a1",
      secondary: "#64748b",
      accent: "#d97706",
      neutral: "#64748b"
    },
    fonts: {
      heading: "Montserrat",
      body: "Open Sans"
    }
  },

  content: {
    hero: {
      headline: "Find Your Perfect Commercial Space",
      subheadline: "Expert guidance for businesses seeking their ideal property investment",
      cta: "View Properties",
      secondaryCta: "Schedule Consultation"
    },

    features: [
      {
        title: "Commercial Property Sales",
        description: "Expert guidance in buying and selling commercial properties with market-leading insights",
        icon: "building-office",
        image: "/images/feature-commercial.jpg"
      },
      {
        title: "Investment Advisory",
        description: "Strategic investment consulting to maximize your real estate portfolio returns",
        icon: "chart-bar",
        image: "/images/feature-investment.jpg"
      },
      {
        title: "Market Analysis",
        description: "Comprehensive market research and valuation services for informed decisions",
        icon: "presentation-chart-line",
        image: "/images/feature-analysis.jpg"
      }
    ],

    services: [
      {
        name: "Property Acquisition",
        description: "Complete support in finding and purchasing your ideal commercial property",
        features: [
          "Property Search & Selection",
          "Due Diligence Support",
          "Negotiation Assistance",
          "Closing Coordination"
        ],
        price: "Commission-based",
        cta: "Start Search"
      },
      {
        name: "Property Sales",
        description: "Professional marketing and sales service for commercial properties",
        features: [
          "Market Analysis",
          "Property Marketing",
          "Buyer Screening",
          "Transaction Management"
        ],
        price: "% of Sale Price",
        cta: "List Property"
      }
    ],

    testimonials: [
      {
        quote: "Localhost Test Real Estate helped us find the perfect location for our expanding business. Their market knowledge and negotiation skills were invaluable.",
        author: "Sarah Chen",
        title: "CEO",
        company: "Tech Innovations Inc"
      },
      {
        quote: "The team's expertise in commercial real estate made our property acquisition process smooth and successful.",
        author: "Michael Rodriguez",
        title: "Operations Director",
        company: "Global Logistics Co"
      }
    ],

    about: {
      story: "Founded in 2023, Localhost Test Real Estate emerged from a vision to transform how businesses approach real estate decisions. Our foundation is built on market expertise, technological innovation, and unwavering client focus.",
      mission: "To empower businesses with strategic real estate solutions that drive growth and success through expert guidance and market intelligence.",
      values: [
        "Client Success First",
        "Market Excellence",
        "Integrity & Transparency",
        "Innovation in Service"
      ],
      team: [
        {
          name: "Jonas Graterol",
          title: "Principal Broker",
          image: "/images/team/jonas.jpg"
        }
      ]
    }
  },

  seo: {
    title: "Localhost Test Real Estate | Commercial Property Experts",
    description: "Expert commercial real estate services for businesses. Specialized in property sales, acquisitions, and investment advisory. Find your ideal commercial space today.",
    keywords: [
      "commercial real estate",
      "business property",
      "real estate investment",
      "property sales",
      "commercial property acquisition",
      "real estate advisory"
    ],
    og: {
      title: "Localhost Test Real Estate - Your Commercial Property Partner",
      description: "Expert guidance for businesses seeking their ideal commercial property. Professional real estate services tailored to your success.",
      image: "/images/og-image.jpg",
      url: ""
    }
  }
};