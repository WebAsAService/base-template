/**
 * Crown Client Configuration
 * 
 * Example configuration for the Crown client demonstrating how to customize
 * the base configuration for specific client needs while maintaining
 * compatibility with existing components.
 * 
 * This shows how existing hardcoded content can be moved to configuration.
 */

import { clientConfig as baseConfig } from '../client.js';

/**
 * Crown-specific configuration
 * Merges with base configuration and overrides specific values
 */
export const crownConfig = {
  ...baseConfig,
  
  // Business Identity - Crown specific
  businessName: "Crown",
  tagline: "Connect the dots",
  description: "Financial intelligence for strategic decision makers. We help executives make data-driven decisions that drive growth and success.",
  industry: "Financial Consulting",
  foundedYear: 2018,

  // Contact Information
  contact: {
    ...baseConfig.contact,
    email: "contact@crown-financial.com",
    phone: "+1 (555) 987-6543",
    address: {
      street: "456 Financial District",
      city: "New York",
      state: "NY", 
      zipCode: "10005",
      country: "United States"
    }
  },

  // Social Media
  social: {
    ...baseConfig.social,
    facebook: "https://facebook.com/crownfinancial",
    twitter: "https://twitter.com/crown_finance",
    linkedin: "https://linkedin.com/company/crown-financial"
  },

  // Branding - Crown theme
  logo: {
    main: "/images/clients/crown/logo-purple-h.png",
    dark: "/images/clients/crown/logo-white-h.png", 
    favicon: "/images/clients/crown/favicon.svg",
    altText: "Crown Financial Intelligence Logo"
  },
  
  themeClass: "theme-crown",
  
  colors: {
    primary: "#7C3AED",
    secondary: "#1E293B", 
    accent: "#F59E0B"
  },

  // Content Sections - Crown specific content
  sections: {
    // Hero Section
    hero: {
      headline: "Crown",
      subheadline: "Connect the dots",
      cta: {
        primary: {
          text: "Our Services",
          link: "#services",
          style: "primary"
        },
        secondary: {
          text: "Schedule Consultation", 
          link: "#contact",
          style: "outline"
        }
      },
      media: {
        type: "image",
        src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Financial data visualization and analytics"
      },
      trustedBy: {
        enabled: true,
        title: "Trusted by Fortune 500 companies",
        logos: [
          { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png", alt: "Google", height: "32px" },
          { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png", alt: "Microsoft", height: "32px" },
          { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png", alt: "Amazon", height: "32px" }
        ]
      }
    },

    // Features Section
    features: {
      title: "Financial Intelligence Services",
      subtitle: "Transform complex financial data into actionable intelligence for your executive team",
      items: [
        {
          title: "Data-Driven Insights",
          description: "Transform complex financial data into actionable intelligence for your executive team.",
          icon: "analytics",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
          title: "Future-Proof Decisions",
          description: "Develop robust financial strategies aligned with your organization's long-term vision.",
          icon: "strategy",
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
          title: "Mitigate Uncertainty", 
          description: "Identify and address financial risks before they impact your bottom line.",
          icon: "risk",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        }
      ]
    },

    // Services/Pricing
    services: [
      {
        name: "Financial Analysis",
        description: "Comprehensive analysis of your financial data with actionable insights",
        price: "$5,000",
        billing: "monthly",
        popular: false,
        features: [
          "Monthly financial reports",
          "KPI dashboard setup",
          "Trend analysis",
          "Email support"
        ],
        cta: {
          text: "Get Started",
          link: "#contact"
        }
      },
      {
        name: "Strategic Planning",
        description: "Complete financial strategy and planning service for growing businesses",
        price: "$12,000", 
        billing: "monthly",
        popular: true,
        features: [
          "Everything in Financial Analysis",
          "Strategic planning sessions",
          "Risk assessment",
          "Dedicated account manager",
          "Priority support"
        ],
        cta: {
          text: "Choose Strategic",
          link: "#contact"
        }
      },
      {
        name: "Enterprise Solutions",
        description: "Custom financial intelligence solutions for large organizations",
        price: "Custom",
        billing: "contact",
        popular: false,
        features: [
          "Everything in Strategic Planning",
          "Custom integrations",
          "24/7 premium support", 
          "On-site training",
          "SLA guarantee"
        ],
        cta: {
          text: "Contact Sales",
          link: "#contact"
        }
      }
    ],

    // Testimonials
    testimonials: [
      {
        name: "Robert Chen",
        company: "TechCorp Industries",
        position: "CFO", 
        text: "Crown's financial intelligence transformed how we make strategic decisions. Their insights helped us identify $2M in cost savings.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
      },
      {
        name: "Sarah Martinez",
        company: "Growth Ventures",
        position: "CEO",
        text: "The strategic planning service provided by Crown was instrumental in our successful Series B funding round.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108755-2616b68a2c8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
      },
      {
        name: "David Park",
        company: "InnovateLabs",
        position: "COO",
        text: "Crown's risk management insights helped us navigate the challenging market conditions and emerge stronger.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
      }
    ],

    // About Section
    about: {
      title: "About Crown Financial Intelligence",
      content: "Founded in 2018, Crown has been at the forefront of financial intelligence and strategic advisory services. Our team of experienced financial analysts, strategists, and data scientists work together to deliver insights that drive real business results.\n\nWe specialize in helping executives make data-driven decisions by transforming complex financial data into clear, actionable intelligence. Our mission is to empower organizations with the financial clarity they need to thrive in competitive markets.",
      team: [
        {
          name: "Michael Thompson",
          position: "Founder & CEO",
          bio: "Former McKinsey partner with 20+ years in financial strategy and advisory services.",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
          social: {
            linkedin: "https://linkedin.com/in/michaelthompson",
            twitter: "https://twitter.com/mthompson"
          }
        },
        {
          name: "Jennifer Liu",
          position: "Head of Analytics",
          bio: "Expert in financial modeling and data analysis with 15+ years of experience.",
          image: "https://images.unsplash.com/photo-1494790108755-2616b68a2c8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
          social: {
            linkedin: "https://linkedin.com/in/jenniferliu"
          }
        }
      ],
      stats: [
        { label: "Clients Served", value: "200+" },
        { label: "Cost Savings Generated", value: "$50M+" },
        { label: "Years of Experience", value: "6+" },
        { label: "Team Members", value: "25" }
      ]
    },

    // Contact Section
    contact: {
      title: "Ready to Transform Your Financial Intelligence?",
      subtitle: "Let's discuss how Crown can help you make better strategic decisions. Schedule a consultation with our team today.",
      form: {
        enabled: true,
        fields: [
          { name: "name", label: "Full Name", type: "text", required: true },
          { name: "email", label: "Email Address", type: "email", required: true },
          { name: "company", label: "Company", type: "text", required: true },
          { name: "position", label: "Job Title", type: "text", required: false },
          { name: "service", label: "Service Interest", type: "select", required: true, options: [
            "Financial Analysis",
            "Strategic Planning",
            "Enterprise Solutions",
            "Consultation Only"
          ]},
          { name: "message", label: "Tell us about your needs", type: "textarea", required: true }
        ],
        submitText: "Schedule Consultation",
        successMessage: "Thank you for your interest! We'll contact you within 24 hours to schedule your consultation.",
        errorMessage: "Sorry, there was an error submitting your request. Please try again or contact us directly."
      },
      methods: [
        {
          type: "email",
          label: "Email Us",
          value: "contact@crown-financial.com",
          icon: "email"
        },
        {
          type: "phone",
          label: "Call Us", 
          value: "+1 (555) 987-6543",
          icon: "phone"
        },
        {
          type: "address",
          label: "Visit Us",
          value: "456 Financial District\nNew York, NY 10005",
          icon: "location"
        }
      ]
    }
  },

  // SEO Configuration
  seo: {
    titleTemplate: "%s | Crown Financial Intelligence",
    description: "Crown provides financial intelligence and strategic advisory services to help executives make data-driven decisions that drive growth and success.",
    keywords: ["financial intelligence", "strategic advisory", "data analysis", "financial consulting", "executive decision making"],
    openGraph: {
      siteName: "Crown Financial Intelligence",
      image: "/images/clients/crown/og-image.jpg",
      imageAlt: "Crown Financial Intelligence - Strategic Advisory Services",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      site: "@crown_finance",
      creator: "@crown_finance"
    }
  },

  // Metadata
  meta: {
    version: "1.0.0",
    lastUpdated: "2025-08-28T17:00:00Z",
    author: "Claude Code AI System",
    isAIGenerated: true,
    notes: "Crown client configuration based on existing hardcoded content"
  }
};

/**
 * Export Crown configuration as default for easy importing
 */
export default crownConfig;