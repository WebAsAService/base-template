/**
 * Creative Agency Configuration Example
 * Bold, artistic configuration for a design agency
 */

export const clientConfig = {
  // Business Information
  businessInfo: {
    businessName: "Pixel Perfect Studio",
    tagline: "Where Creativity Meets Innovation",
    description: "Award-winning creative agency specializing in brand identity, web design, and digital marketing. We craft compelling visual stories that connect brands with their audiences.",
    industry: "creative",
    yearEstablished: 2016,
    employeeCount: "25-50",

    logo: {
      url: "/images/clients/pixel-perfect/logo.svg",
      alt: "Pixel Perfect Studio",
      width: 200,
      height: 50,
      darkModeUrl: "/images/clients/pixel-perfect/logo-dark.svg"
    },

    seo: {
      keywords: ["creative agency", "web design", "branding", "digital marketing", "graphic design", "UI/UX"],
      author: "Pixel Perfect Studio",
      ogImage: "/images/og-creative.jpg"
    }
  },

  // Contact Information
  contact: {
    email: "hello@pixelperfectstudio.com",
    phone: "(555) 987-6543",

    address: {
      street: "789 Creative Blvd",
      suite: "Suite 300",
      city: "Portland",
      state: "OR",
      zip: "97201"
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

    social: {
      instagram: "https://instagram.com/pixelperfectstudio",
      dribbble: "https://dribbble.com/pixelperfect",
      behance: "https://behance.net/pixelperfect",
      linkedin: "https://linkedin.com/company/pixel-perfect-studio",
      twitter: "https://twitter.com/pixelperfect"
    }
  },

  // Content Sections
  content: {
    hero: {
      headline: "Design That Inspires Action",
      subheadline: "We create bold, memorable experiences that drive results",
      primaryCTA: {
        text: "Start Your Project",
        link: "#contact",
        style: "accent"
      },
      secondaryCTA: {
        text: "Explore Our Work",
        link: "#portfolio",
        style: "outline"
      },
      background: {
        type: "video",
        video: "/videos/creative-reel.mp4",
        poster: "/images/hero-poster.jpg",
        overlay: true,
        overlayOpacity: 0.3
      }
    },

    features: [
      {
        id: "branding",
        title: "Brand Identity",
        description: "Craft a unique visual identity that tells your story",
        icon: "fingerprint",
        highlight: true
      },
      {
        id: "web",
        title: "Web Design & Development",
        description: "Beautiful, functional websites that convert visitors",
        icon: "globe",
        highlight: true
      },
      {
        id: "marketing",
        title: "Digital Marketing",
        description: "Strategic campaigns that reach your target audience",
        icon: "megaphone"
      },
      {
        id: "motion",
        title: "Motion Graphics",
        description: "Dynamic animations that bring your brand to life",
        icon: "video"
      },
      {
        id: "print",
        title: "Print Design",
        description: "Stunning print materials that leave lasting impressions",
        icon: "printer"
      },
      {
        id: "strategy",
        title: "Creative Strategy",
        description: "Data-driven insights that inform creative decisions",
        icon: "lightbulb"
      }
    ],

    services: [
      {
        id: "branding-package",
        name: "Complete Brand Identity",
        description: "Everything you need to launch or refresh your brand",
        features: [
          "Logo design with variations",
          "Color palette and typography",
          "Brand guidelines document",
          "Business card and stationery",
          "Social media templates",
          "3 rounds of revisions"
        ],
        price: {
          amount: 5000,
          currency: "USD",
          period: "project"
        },
        image: "/images/services/branding.jpg",
        cta: {
          text: "Get Started",
          link: "#contact"
        }
      },
      {
        id: "web-package",
        name: "Custom Website Design",
        description: "Responsive, modern websites tailored to your brand",
        features: [
          "Custom UI/UX design",
          "Mobile-responsive development",
          "Content management system",
          "SEO optimization",
          "Performance optimization",
          "6 months support"
        ],
        price: {
          amount: 8000,
          currency: "USD",
          period: "project",
          starting: true
        },
        image: "/images/services/web.jpg",
        cta: {
          text: "View Portfolio",
          link: "#portfolio"
        }
      }
    ],

    portfolio: [
      {
        id: "project1",
        title: "TechStart Rebrand",
        category: "Brand Identity",
        image: "/images/portfolio/techstart.jpg",
        link: "/portfolio/techstart"
      },
      {
        id: "project2",
        title: "Eco Living Website",
        category: "Web Design",
        image: "/images/portfolio/ecoliving.jpg",
        link: "/portfolio/ecoliving"
      },
      {
        id: "project3",
        title: "Urban Coffee Campaign",
        category: "Digital Marketing",
        image: "/images/portfolio/urbancoffee.jpg",
        link: "/portfolio/urbancoffee"
      }
    ],

    testimonials: [
      {
        id: "testimonial1",
        name: "Alex Rivera",
        role: "CEO",
        company: "TechStart Inc",
        content: "Pixel Perfect didn't just design our brand, they brought it to life. The results speak for themselves - 300% increase in brand recognition.",
        rating: 5,
        image: "/images/testimonials/alex.jpg",
        featured: true
      },
      {
        id: "testimonial2",
        name: "Emma Thompson",
        role: "Marketing Director",
        company: "Eco Living Co",
        content: "Their creative vision and technical expertise delivered a website that perfectly captures our brand essence. Conversions are up 150%!",
        rating: 5,
        image: "/images/testimonials/emma.jpg"
      }
    ],

    team: [
      {
        name: "Jordan Lee",
        role: "Creative Director",
        bio: "15+ years crafting award-winning campaigns",
        image: "/images/team/jordan.jpg"
      },
      {
        name: "Sam Parker",
        role: "Lead Designer",
        bio: "Turning ideas into visual masterpieces",
        image: "/images/team/sam.jpg"
      },
      {
        name: "Taylor Kim",
        role: "UX Strategist",
        bio: "User-centered design advocate",
        image: "/images/team/taylor.jpg"
      }
    ]
  },

  // Theme Configuration
  theme: {
    name: "creative-bold",
    industry: "creative",

    colors: {
      primary: {
        50: "#fef2f2",
        500: "#ef4444",
        900: "#7f1d1d"
      },
      secondary: {
        50: "#faf5ff",
        500: "#a855f7",
        900: "#581c87"
      },
      accent: "#fbbf24"
    },

    typography: {
      fontFamily: {
        sans: "Poppins, system-ui, sans-serif",
        serif: "Playfair Display, Georgia, serif",
        display: "Bebas Neue, Impact, sans-serif"
      },
      fontSize: {
        base: "18px",
        scale: 1.333
      }
    },

    layout: {
      borderRadius: "1.5rem",
      containerWidth: "1440px",
      spacing: {
        section: "8rem"
      }
    }
  },

  // Features & Integrations
  features: {
    enableChat: true,
    enableAnalytics: true,
    enableNewsletter: true,
    enablePortfolio: true,
    enableBlog: true
  },

  integrations: {
    chat: {
      provider: "intercom",
      appId: "xyz789"
    },
    forms: {
      provider: "custom",
      endpoint: "/api/contact"
    },
    analytics: {
      google: {
        measurementId: "G-CREATIVEXYZ"
      },
      hotjar: {
        siteId: "1234567"
      }
    }
  }
};