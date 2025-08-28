/**
 * Dynamic Client Configuration System
 * 
 * This configuration system enables AI-powered generation of personalized websites
 * for different clients while maintaining a shared codebase. Each property includes
 * comprehensive fallback values to prevent broken sites.
 * 
 * Usage:
 * import { clientConfig } from '@/config/client.js';
 * 
 * Structure supports:
 * - AI population via GitHub Actions
 * - Complete business information
 * - Contact details and social links
 * - Content sections for all page components
 * - Theme integration
 * 
 * @author Generated with Claude Code
 * @version 1.0.0
 */

/**
 * Main client configuration object
 * This structure covers all dynamic content needs across the entire website
 */
export const clientConfig = {
  // =============================================================================
  // BUSINESS IDENTITY
  // =============================================================================
  
  /**
   * Core business information
   * Used in: Headers, footers, SEO meta tags, contact forms
   */
  businessName: "Dynamic Business Solutions",
  
  /**
   * Main marketing tagline
   * Used in: Hero sections, meta descriptions
   */
  tagline: "Innovative Solutions for Modern Businesses",
  
  /**
   * Extended business description
   * Used in: About sections, SEO descriptions, landing pages
   */
  description: "We provide cutting-edge business solutions that help companies thrive in the digital age. Our expert team delivers personalized strategies and innovative technologies to drive growth and success.",
  
  /**
   * Industry/business type categorization
   * Used in: Content customization, industry-specific features
   */
  industry: "Technology Consulting",
  
  /**
   * Year business was founded
   * Used in: About sections, credibility indicators
   */
  foundedYear: 2020,

  // =============================================================================
  // CONTACT INFORMATION
  // =============================================================================
  
  /**
   * Complete contact details
   * Used in: Contact sections, headers, footers, schema markup
   */
  contact: {
    /**
     * Primary business email
     */
    email: "contact@dynamicbusiness.com",
    
    /**
     * Main phone number with international format
     */
    phone: "+1 (555) 123-4567",
    
    /**
     * Alternative phone number (optional)
     */
    phoneAlt: "",
    
    /**
     * Physical business address
     */
    address: {
      street: "123 Innovation Drive",
      city: "San Francisco",
      state: "CA",
      zipCode: "94105",
      country: "United States"
    },
    
    /**
     * Business hours for display
     */
    hours: {
      monday: "9:00 AM - 6:00 PM",
      tuesday: "9:00 AM - 6:00 PM",
      wednesday: "9:00 AM - 6:00 PM",
      thursday: "9:00 AM - 6:00 PM",
      friday: "9:00 AM - 6:00 PM",
      saturday: "10:00 AM - 4:00 PM",
      sunday: "Closed"
    }
  },

  // =============================================================================
  // SOCIAL MEDIA & ONLINE PRESENCE
  // =============================================================================
  
  /**
   * Social media profiles
   * Used in: Headers, footers, social sharing, schema markup
   * Leave empty string to hide specific social platforms
   */
  social: {
    facebook: "https://facebook.com/dynamicbusiness",
    twitter: "https://twitter.com/dynamicbiz",
    instagram: "https://instagram.com/dynamicbusiness",
    linkedin: "https://linkedin.com/company/dynamic-business",
    youtube: "",
    tiktok: "",
    pinterest: ""
  },
  
  /**
   * Website and online presence URLs
   */
  website: {
    domain: "https://dynamicbusiness.com",
    blog: "https://dynamicbusiness.com/blog",
    support: "https://dynamicbusiness.com/support"
  },

  // =============================================================================
  // BRANDING & VISUAL ASSETS
  // =============================================================================
  
  /**
   * Logo configurations for different contexts
   * Used in: Headers, footers, favicons, social sharing
   */
  logo: {
    /**
     * Main logo (light backgrounds)
     */
    main: "/images/clients/default/logo-main.png",
    
    /**
     * Dark version (dark backgrounds)
     */
    dark: "/images/clients/default/logo-dark.png",
    
    /**
     * Favicon path
     */
    favicon: "/images/clients/default/favicon.svg",
    
    /**
     * Logo alt text for accessibility
     */
    altText: "Dynamic Business Solutions Logo"
  },
  
  /**
   * Theme class for CSS customization
   * Used in: Layout component, theme switching
   * Should match theme defined in src/styles/client-themes.css
   */
  themeClass: "theme-dynamic",
  
  /**
   * Brand colors (fallback if theme CSS not loaded)
   */
  colors: {
    primary: "#3B82F6",
    secondary: "#1E293B",
    accent: "#F59E0B"
  },

  // =============================================================================
  // WEBSITE CONTENT SECTIONS
  // =============================================================================
  
  /**
   * All page content sections with comprehensive configuration
   * This structure supports all shared components in src/components/sections/
   */
  sections: {
    // -------------------------------------------------------------------------
    // HERO SECTION
    // -------------------------------------------------------------------------
    hero: {
      /**
       * Main headline (H1)
       */
      headline: "Transform Your Business with Dynamic Solutions",
      
      /**
       * Supporting subheadline
       */
      subheadline: "We help modern businesses leverage cutting-edge technology to achieve unprecedented growth and efficiency.",
      
      /**
       * Call-to-action buttons
       */
      cta: {
        primary: {
          text: "Get Started Today",
          link: "#contact",
          style: "primary"
        },
        secondary: {
          text: "Learn More",
          link: "#features",
          style: "outline"
        }
      },
      
      /**
       * Hero image or video
       */
      media: {
        type: "image", // "image" | "video"
        src: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        alt: "Business team collaborating on innovative solutions",
        poster: "" // For video type
      },
      
      /**
       * Trust indicators (company logos)
       */
      trustedBy: {
        enabled: true,
        title: "Trusted by industry leaders",
        logos: [
          { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png", alt: "Google", height: "32px" },
          { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Slack_Technologies_Logo.svg/2560px-Slack_Technologies_Logo.svg.png", alt: "Slack", height: "32px" },
          { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png", alt: "Microsoft", height: "32px" }
        ]
      }
    },

    // -------------------------------------------------------------------------
    // FEATURES SECTION
    // -------------------------------------------------------------------------
    features: {
      /**
       * Section header
       */
      title: "Why Choose Our Solutions",
      subtitle: "Comprehensive features designed to accelerate your business growth",
      
      /**
       * Feature list
       */
      items: [
        {
          title: "Strategic Consulting",
          description: "Expert guidance to navigate complex business challenges and identify growth opportunities.",
          icon: "strategy", // Icon identifier for component mapping
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
          title: "Technology Integration",
          description: "Seamlessly integrate cutting-edge technologies to streamline operations and boost efficiency.",
          icon: "technology",
          image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
          title: "Data Analytics",
          description: "Transform raw data into actionable insights that drive informed business decisions.",
          icon: "analytics",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        },
        {
          title: "Process Optimization",
          description: "Identify bottlenecks and optimize workflows to maximize productivity and reduce costs.",
          icon: "optimization",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
        }
      ]
    },

    // -------------------------------------------------------------------------
    // SERVICES/PRICING SECTION
    // -------------------------------------------------------------------------
    services: [
      {
        name: "Starter Package",
        description: "Perfect for small businesses looking to establish their digital presence",
        price: "$2,500",
        billing: "one-time",
        popular: false,
        features: [
          "Business strategy consultation",
          "Technology assessment",
          "Implementation roadmap",
          "30 days support"
        ],
        cta: {
          text: "Get Started",
          link: "#contact"
        }
      },
      {
        name: "Growth Package",
        description: "Comprehensive solution for scaling businesses",
        price: "$5,000",
        billing: "monthly",
        popular: true,
        features: [
          "Everything in Starter",
          "Advanced analytics setup",
          "Process automation",
          "Dedicated account manager",
          "Priority support"
        ],
        cta: {
          text: "Choose Growth",
          link: "#contact"
        }
      },
      {
        name: "Enterprise Package",
        description: "Custom solutions for large organizations",
        price: "Custom",
        billing: "contact",
        popular: false,
        features: [
          "Everything in Growth",
          "Custom integrations",
          "24/7 premium support",
          "Training and onboarding",
          "SLA guarantee"
        ],
        cta: {
          text: "Contact Sales",
          link: "#contact"
        }
      }
    ],

    // -------------------------------------------------------------------------
    // TESTIMONIALS SECTION
    // -------------------------------------------------------------------------
    testimonials: [
      {
        name: "Sarah Johnson",
        company: "TechStart Inc.",
        position: "CEO",
        text: "Dynamic Business Solutions transformed our operations completely. Their strategic approach and technical expertise helped us achieve 300% growth in just one year.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108755-2616b68a2c8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
      },
      {
        name: "Michael Chen",
        company: "GrowthCorp",
        position: "CTO",
        text: "The team's ability to integrate complex technologies seamlessly into our existing infrastructure was remarkable. Highly recommend their services.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
      },
      {
        name: "Emily Rodriguez",
        company: "InnovateLabs",
        position: "Operations Director",
        text: "Their data analytics solutions gave us insights we never had before. We're now making decisions based on solid data rather than gut feelings.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
      }
    ],

    // -------------------------------------------------------------------------
    // ABOUT SECTION
    // -------------------------------------------------------------------------
    about: {
      title: "About Dynamic Business Solutions",
      content: "Founded in 2020, Dynamic Business Solutions has been at the forefront of helping businesses navigate the digital transformation landscape. Our team of experienced consultants, developers, and strategists work together to deliver comprehensive solutions that drive real results.\n\nWe believe that every business is unique, which is why we take a personalized approach to each project. Our mission is to empower organizations with the tools, strategies, and insights they need to thrive in an ever-evolving business environment.",
      
      /**
       * Team member profiles
       */
      team: [
        {
          name: "Alex Thompson",
          position: "Founder & CEO",
          bio: "15+ years in strategic consulting with a passion for helping businesses unlock their potential.",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
          social: {
            linkedin: "https://linkedin.com/in/alexthompson",
            twitter: "https://twitter.com/alexthompson"
          }
        },
        {
          name: "Jessica Park",
          position: "Head of Technology",
          bio: "Expert in enterprise integrations and digital transformation with 12+ years of experience.",
          image: "https://images.unsplash.com/photo-1494790108755-2616b68a2c8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
          social: {
            linkedin: "https://linkedin.com/in/jessicapark"
          }
        },
        {
          name: "David Kim",
          position: "Lead Data Analyst",
          bio: "Specializes in turning complex data into actionable business intelligence and insights.",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
          social: {
            linkedin: "https://linkedin.com/in/davidkim"
          }
        }
      ],
      
      /**
       * Company statistics
       */
      stats: [
        { label: "Clients Served", value: "150+" },
        { label: "Projects Completed", value: "300+" },
        { label: "Years of Experience", value: "4+" },
        { label: "Team Members", value: "12" }
      ]
    },

    // -------------------------------------------------------------------------
    // CONTACT SECTION
    // -------------------------------------------------------------------------
    contact: {
      title: "Ready to Transform Your Business?",
      subtitle: "Let's discuss how we can help you achieve your goals. Get in touch with our team today.",
      
      /**
       * Contact form configuration
       */
      form: {
        enabled: true,
        fields: [
          { name: "name", label: "Full Name", type: "text", required: true },
          { name: "email", label: "Email Address", type: "email", required: true },
          { name: "company", label: "Company", type: "text", required: false },
          { name: "phone", label: "Phone Number", type: "tel", required: false },
          { name: "service", label: "Service Interest", type: "select", required: true, options: [
            "Strategic Consulting",
            "Technology Integration", 
            "Data Analytics",
            "Process Optimization",
            "Custom Solution"
          ]},
          { name: "message", label: "Message", type: "textarea", required: true }
        ],
        submitText: "Send Message",
        successMessage: "Thank you for your message! We'll get back to you within 24 hours.",
        errorMessage: "Sorry, there was an error sending your message. Please try again."
      },
      
      /**
       * Additional contact methods
       */
      methods: [
        {
          type: "email",
          label: "Email Us",
          value: "contact@dynamicbusiness.com",
          icon: "email"
        },
        {
          type: "phone", 
          label: "Call Us",
          value: "+1 (555) 123-4567",
          icon: "phone"
        },
        {
          type: "address",
          label: "Visit Us",
          value: "123 Innovation Drive\nSan Francisco, CA 94105",
          icon: "location"
        }
      ]
    }
  },

  // =============================================================================
  // SEO & META CONFIGURATION
  // =============================================================================
  
  /**
   * SEO and meta tag configuration
   * Used in: Layout component, social sharing, search engine optimization
   */
  seo: {
    /**
     * Default page title suffix
     */
    titleTemplate: "%s | Dynamic Business Solutions",
    
    /**
     * Meta description
     */
    description: "Transform your business with Dynamic Business Solutions. We provide strategic consulting, technology integration, and data analytics to drive growth and success.",
    
    /**
     * Keywords for SEO
     */
    keywords: ["business consulting", "digital transformation", "technology integration", "data analytics", "process optimization"],
    
    /**
     * Open Graph configuration for social sharing
     */
    openGraph: {
      siteName: "Dynamic Business Solutions",
      image: "/images/clients/default/og-image.jpg",
      imageAlt: "Dynamic Business Solutions - Transform Your Business",
      type: "website"
    },
    
    /**
     * Twitter Card configuration
     */
    twitter: {
      card: "summary_large_image",
      site: "@dynamicbiz",
      creator: "@dynamicbiz"
    }
  },

  // =============================================================================
  // CONFIGURATION METADATA
  // =============================================================================
  
  /**
   * Configuration metadata for system use
   */
  meta: {
    /**
     * Configuration version for tracking updates
     */
    version: "1.0.0",
    
    /**
     * Last updated timestamp
     */
    lastUpdated: "2025-08-28T17:00:00Z",
    
    /**
     * Configuration author/source
     */
    author: "Claude Code AI System",
    
    /**
     * Whether this is AI-generated content
     */
    isAIGenerated: true,
    
    /**
     * Custom notes or instructions
     */
    notes: "Default configuration template - customize all values for specific clients"
  }
};

/**
 * Helper function to get nested configuration values with fallbacks
 * @param {string} path - Dot notation path (e.g., 'sections.hero.headline')
 * @param {any} fallback - Fallback value if path doesn't exist
 * @returns {any} Configuration value or fallback
 */
export function getConfigValue(path, fallback = null) {
  const keys = path.split('.');
  let current = clientConfig;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return fallback;
    }
  }
  
  return current;
}

/**
 * Helper function to check if a feature/section is enabled
 * @param {string} section - Section name to check
 * @returns {boolean} Whether section is enabled and has content
 */
export function isSectionEnabled(section) {
  const sectionConfig = getConfigValue(`sections.${section}`);
  return sectionConfig && Object.keys(sectionConfig).length > 0;
}

/**
 * Export default configuration for easier importing
 */
export default clientConfig;