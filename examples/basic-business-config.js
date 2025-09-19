/**
 * Basic Business Configuration Example
 * A simple configuration for a local service business
 */

export const clientConfig = {
  // Business Information
  businessInfo: {
    businessName: "Greenfield Landscaping",
    tagline: "Transform Your Outdoor Space Into Paradise",
    description: "Professional landscaping services for residential and commercial properties. We specialize in garden design, lawn care, hardscaping, and seasonal maintenance with over 15 years of experience serving the local community.",
    industry: "landscaping",
    yearEstablished: 2008,
    employeeCount: "10-25",

    logo: {
      url: "/images/clients/greenfield/logo.png",
      alt: "Greenfield Landscaping Logo",
      width: 180,
      height: 60
    },

    seo: {
      keywords: ["landscaping", "lawn care", "garden design", "hardscaping", "landscape maintenance"],
      author: "Greenfield Landscaping",
      description: "Professional landscaping and lawn care services. Transform your outdoor space with our expert garden design and maintenance."
    }
  },

  // Contact Information
  contact: {
    email: "info@greenfieldlandscaping.com",
    phone: "(555) 234-5678",
    fax: "(555) 234-5679",

    address: {
      street: "456 Garden Way",
      city: "Springfield",
      state: "IL",
      zip: "62701"
    },

    hours: {
      monday: "7:00 AM - 6:00 PM",
      tuesday: "7:00 AM - 6:00 PM",
      wednesday: "7:00 AM - 6:00 PM",
      thursday: "7:00 AM - 6:00 PM",
      friday: "7:00 AM - 6:00 PM",
      saturday: "8:00 AM - 4:00 PM",
      sunday: "Closed"
    },

    social: {
      facebook: "https://facebook.com/greenfieldlandscaping",
      instagram: "https://instagram.com/greenfield_landscapes"
    }
  },

  // Content Sections
  content: {
    hero: {
      headline: "Beautiful Landscapes Start Here",
      subheadline: "Professional landscaping services tailored to your vision and budget",
      primaryCTA: {
        text: "Get Free Quote",
        link: "#contact",
        style: "primary"
      },
      secondaryCTA: {
        text: "View Portfolio",
        link: "#portfolio",
        style: "secondary"
      }
    },

    features: [
      {
        id: "design",
        title: "Custom Garden Design",
        description: "Personalized landscape designs that complement your home and lifestyle",
        icon: "palette",
        highlight: true
      },
      {
        id: "maintenance",
        title: "Year-Round Maintenance",
        description: "Keep your landscape pristine with our seasonal maintenance programs",
        icon: "calendar"
      },
      {
        id: "installation",
        title: "Expert Installation",
        description: "Professional installation of plants, irrigation, and hardscape features",
        icon: "tools"
      }
    ],

    services: [
      {
        id: "residential",
        name: "Residential Landscaping",
        description: "Complete landscaping solutions for homeowners",
        features: [
          "Lawn installation and renovation",
          "Garden bed design and planting",
          "Irrigation system installation",
          "Outdoor lighting",
          "Seasonal cleanup"
        ],
        price: {
          amount: "Custom",
          currency: "USD",
          period: "project"
        },
        image: "/images/services/residential.jpg"
      },
      {
        id: "commercial",
        name: "Commercial Grounds Maintenance",
        description: "Professional grounds keeping for businesses",
        features: [
          "Regular lawn maintenance",
          "Parking lot landscaping",
          "Snow removal services",
          "Property enhancement",
          "24/7 emergency service"
        ],
        price: {
          amount: "Starting at $500",
          currency: "USD",
          period: "month"
        },
        image: "/images/services/commercial.jpg"
      }
    ],

    testimonials: [
      {
        id: "testimonial1",
        name: "Sarah Johnson",
        role: "Homeowner",
        content: "Greenfield transformed our backyard into an oasis. Professional, timely, and the results exceeded our expectations!",
        rating: 5,
        featured: true
      },
      {
        id: "testimonial2",
        name: "Mike Chen",
        role: "Property Manager",
        company: "Sunset Apartments",
        content: "Reliable commercial landscaping partner. They keep our property looking pristine year-round.",
        rating: 5
      }
    ],

    cta: {
      headline: "Ready to Transform Your Outdoor Space?",
      description: "Get a free consultation and quote for your landscaping project",
      button: {
        text: "Schedule Consultation",
        link: "#contact"
      }
    }
  },

  // Theme Configuration
  theme: {
    name: "nature-fresh",
    industry: "landscaping",

    colors: {
      primary: {
        50: "#f0fdf4",
        500: "#22c55e",
        900: "#14532d"
      },
      secondary: {
        50: "#fef3c7",
        500: "#f59e0b",
        900: "#78350f"
      },
      accent: "#06b6d4"
    },

    typography: {
      fontFamily: {
        sans: "Open Sans, system-ui, sans-serif",
        serif: "Merriweather, Georgia, serif",
        display: "Montserrat, system-ui, sans-serif"
      }
    }
  },

  // Features & Integrations
  features: {
    enableChat: false,
    enableAnalytics: true,
    enableNewsletter: true,
    enableBooking: true
  },

  integrations: {
    forms: {
      provider: "formspree",
      endpoint: "https://formspree.io/f/example"
    },
    newsletter: {
      provider: "mailchimp",
      listId: "abc123"
    },
    analytics: {
      google: {
        measurementId: "G-XXXXXXXXXX"
      }
    }
  }
};