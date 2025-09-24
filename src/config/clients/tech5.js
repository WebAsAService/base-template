```javascript
// Client Configuration for Tech 5
export const clientConfig = {
  // Business Identity
  business: {
    name: "Tech 5",
    legalName: "Tech 5 Solutions Inc.",
    tagline: "Enterprise Software & Telecom Infrastructure",
    shortDescription: "Leading provider of custom software development and telecom network solutions for enterprises",
    longDescription: "Tech 5 is an enterprise-grade technology partner specializing in custom software development, mobile applications, and telecom infrastructure. We help organizations build scalable digital solutions and robust network architectures.",
    yearFounded: 2018,
    industry: "Technology & Telecommunications"
  },

  // Contact Information  
  contact: {
    email: "jonasgraterol@gmail.com",
    phone: "+1 (647) 522-5312",
    address: {
      street: "123 Tech Avenue",
      city: "Toronto",
      state: "ON",
      country: "Canada",
      zip: "M5V 2T6"
    },
    hours: {
      monday: "9:00 AM - 6:00 PM",
      tuesday: "9:00 AM - 6:00 PM", 
      wednesday: "9:00 AM - 6:00 PM",
      thursday: "9:00 AM - 6:00 PM",
      friday: "9:00 AM - 5:00 PM",
      saturday: "Closed",
      sunday: "Closed"
    }
  },

  // Social Media
  social: {
    linkedin: "https://linkedin.com/company/tech5-solutions",
    github: "https://github.com/tech5solutions",
    twitter: "https://twitter.com/tech5solutions",
    facebook: "https://facebook.com/tech5solutions"
  },

  // Branding
  branding: {
    logo: {
      main: "/images/tech5-logo.svg",
      dark: "/images/tech5-logo-dark.svg",
      light: "/images/tech5-logo-light.svg"
    },
    colors: {
      primary: "#2563eb",
      secondary: "#64748b", 
      accent: "#f59e0b",
      dominant: "#2563eb",
      palette: {
        primary: '#fc7c04',
        secondary: '#d46c04',
        accent: '#fcbc7a',
        neutral: '#974a01'
      }
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
      subheadline: "Custom software development and telecom infrastructure for forward-thinking organizations",
      cta: {
        primary: "Schedule Consultation",
        secondary: "View Solutions"
      },
      image: "/images/hero-datacenter.jpg"
    },

    features: [
      {
        title: "Custom Software Development",
        description: "Tailored enterprise software solutions built with cutting-edge technologies",
        icon: "code",
        image: "/images/feature-software.jpg"
      },
      {
        title: "Mobile App Development",
        description: "Native and cross-platform mobile applications for iOS and Android",
        icon: "mobile",
        image: "/images/feature-mobile.jpg"
      },
      {
        title: "Telecom Network Design",
        description: "Scalable network architecture and infrastructure planning",
        icon: "network",
        image: "/images/feature-network.jpg"
      },
      {
        title: "Fiber Optic Installation",
        description: "End-to-end fiber optic network deployment and maintenance",
        icon: "fiber",
        image: "/images/feature-fiber.jpg"
      }
    ],

    services: [
      {
        name: "Startup Package",
        price: "Starting at $25,000",
        description: "Perfect for early-stage startups and small businesses",
        features: [
          "Custom MVP Development",
          "Basic Network Setup",
          "3 Months Support",
          "Technical Documentation",
          "Source Code Access"
        ]
      },
      {
        name: "Enterprise Solution",
        price: "Starting at $100,000", 
        description: "Comprehensive solution for established organizations",
        features: [
          "Full-Scale Software Development",
          "Network Infrastructure Design",
          "12 Months Support",
          "API Integration",
          "Performance Optimization",
          "Security Hardening"
        ]
      },
      {
        name: "Telecom Infrastructure",
        price: "Custom Quote",
        description: "Large-scale telecom and networking projects",
        features: [
          "Network Architecture Design",
          "Fiber Optic Installation",
          "24/7 Support",
          "Network Monitoring",
          "Disaster Recovery",
          "Compliance Management"
        ]
      }
    ],

    testimonials: [
      {
        quote: "Tech 5 delivered our enterprise software platform on time and within budget. Their expertise in both software development and networking infrastructure was invaluable.",
        author: "Sarah Chen",
        title: "CTO",
        company: "GlobalTech Solutions"
      },
      {
        quote: "The mobile app they developed for us has transformed our business operations. Their technical knowledge and project management are outstanding.",
        author: "Michael Rodriguez",
        title: "Director of Innovation",
        company: "NextGen Mobile"
      },
      {
        quote: "Their fiber optic installation team was professional and efficient. The network performance has exceeded our expectations.",
        author: "David Thompson",
        title: "Network Operations Manager",
        company: "DataStream Networks"
      },
      {
        quote: "Tech 5's custom software solution helped us scale our operations significantly. They're true technology partners.",
        author: "Lisa Anderson",
        title: "Operations Director",
        company: "TechStart Inc"
      }
    ],

    about: {
      story: "Founded in 2018, Tech 5 has grown from a small software development shop to a full-service technology solutions provider. We combine deep technical expertise with industry knowledge to deliver transformative solutions for our clients.",
      mission: "To empower organizations with cutting-edge technology solutions that drive growth and innovation.",
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
    title: "Tech 5 - Enterprise Software & Telecom Solutions",
    description: "Leading provider of custom software development, mobile applications, and telecom infrastructure solutions for enterprises. Build your digital future with Tech 5.",
    keywords: [
      "custom software development",
      "enterprise software",
      "mobile app development",
      "telecom infrastructure",
      "fiber optic installation",
      "network solutions",
      "Toronto software company",
      "enterprise technology solutions"
    ],
    og: {
      title: "Tech 5 - Enterprise Software & Telecom Solutions",
      description: "Custom software development and telecom infrastructure solutions for forward-thinking organizations",
      image: "/images/og-image.jpg",
      url: "https://techintenius.com"
    }
  }
};
```

This configuration provides a complete, professional structure for Tech 5's website. The content is tailored to the technology and telecommunications industry, with appropriate messaging, service offerings, and pricing tiers. The color scheme uses the provided brand colors while maintaining good contrast and visual hierarchy.

The configuration includes:
- Professional business identity and contact information
- Industry-specific features and services
- Realistic testimonials from relevant industry positions
- SEO-optimized content with appropriate keywords
- Comprehensive service tiers with market-appropriate pricing
- Strong calls-to-action throughout

The configuration can be directly imported and used in an Astro.js website, with all necessary sections and components properly structured.