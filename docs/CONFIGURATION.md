# Configuration Guide

## Overview

The dynamic website template uses a powerful configuration system that allows you to customize every aspect of your website through a single `clientConfig` object. This guide covers all configuration options and best practices.

## Table of Contents

- [Basic Setup](#basic-setup)
- [Business Information](#business-information)
- [Contact Configuration](#contact-configuration)
- [Content Sections](#content-sections)
- [Theme Configuration](#theme-configuration)
- [Advanced Options](#advanced-options)
- [Validation & Best Practices](#validation--best-practices)

## Basic Setup

Create your configuration file in `src/data/clients/your-business.js`:

```javascript
export const clientConfig = {
  // Your configuration here
};
```

### Minimal Configuration

```javascript
export const clientConfig = {
  businessName: "Acme Corporation",
  tagline: "Innovation at its finest",
  description: "Leading provider of innovative solutions",

  contact: {
    email: "contact@acmecorp.com",
    phone: "(555) 123-4567"
  },

  theme: {
    name: "modern-business"
  }
};
```

## Business Information

Core business details that appear throughout the site:

```javascript
businessInfo: {
  businessName: "Your Business Name",     // Required
  tagline: "Your compelling tagline",     // Required, can be AI-generated
  description: "Detailed description",    // Required, for SEO
  industry: "technology",                 // Helps with AI generation
  yearEstablished: 2020,                  // Optional
  employeeCount: "50-100",                // Optional

  // Logo configuration
  logo: {
    url: "/images/clients/your-business/logo.png",
    alt: "Your Business Logo",
    width: 200,
    height: 60
  },

  // SEO metadata
  seo: {
    keywords: ["keyword1", "keyword2"],
    author: "Your Name",
    ogImage: "/images/og-image.png"
  }
}
```

## Contact Configuration

Complete contact information and social media links:

```javascript
contact: {
  email: "contact@yourbusiness.com",      // Required
  phone: "(555) 123-4567",                // Required
  fax: "(555) 123-4568",                  // Optional

  // Physical address
  address: {
    street: "123 Main Street",
    suite: "Suite 100",                   // Optional
    city: "Your City",
    state: "ST",
    zip: "12345",
    country: "USA"                        // Optional
  },

  // Business hours
  hours: {
    monday: "9:00 AM - 5:00 PM",
    tuesday: "9:00 AM - 5:00 PM",
    wednesday: "9:00 AM - 5:00 PM",
    thursday: "9:00 AM - 5:00 PM",
    friday: "9:00 AM - 5:00 PM",
    saturday: "10:00 AM - 2:00 PM",
    sunday: "Closed"
  },

  // Social media links
  social: {
    facebook: "https://facebook.com/yourbusiness",
    twitter: "https://twitter.com/yourbusiness",
    linkedin: "https://linkedin.com/company/yourbusiness",
    instagram: "https://instagram.com/yourbusiness",
    youtube: "https://youtube.com/c/yourbusiness"
  }
}
```

## Content Sections

### Hero Section

Landing page hero configuration:

```javascript
hero: {
  headline: "Welcome to Excellence",
  subheadline: "Your success is our mission",

  // Call-to-action buttons
  primaryCTA: {
    text: "Get Started",
    link: "#contact",
    style: "primary"  // primary, secondary, accent
  },

  secondaryCTA: {
    text: "Learn More",
    link: "#features",
    style: "secondary"
  },

  // Background options
  background: {
    type: "image",  // image, video, gradient
    image: "/images/hero-bg.jpg",
    overlay: true,
    overlayOpacity: 0.5
  }
}
```

### Features Section

Product or service features:

```javascript
features: [
  {
    title: "Fast Performance",
    description: "Lightning-fast load times",
    icon: "rocket",  // Icon name or custom SVG
    highlight: true  // Featured item
  },
  {
    title: "Secure & Reliable",
    description: "Bank-level security",
    icon: "shield"
  },
  {
    title: "24/7 Support",
    description: "Always here to help",
    icon: "support"
  }
]
```

### Services Section

Detailed service offerings:

```javascript
services: [
  {
    id: "consulting",
    name: "Business Consulting",
    description: "Expert guidance for your business",
    features: [
      "Strategic planning",
      "Market analysis",
      "Growth optimization"
    ],
    price: {
      amount: 5000,
      currency: "USD",
      period: "month"  // month, year, project, hour
    },
    image: "/images/services/consulting.jpg",
    cta: {
      text: "Book Consultation",
      link: "#contact"
    }
  }
]
```

### Pricing Section

Pricing tiers and plans:

```javascript
pricing: {
  currency: "USD",
  billingCycles: ["monthly", "yearly"],

  plans: [
    {
      name: "Starter",
      price: {
        monthly: 29,
        yearly: 290  // Discounted annual price
      },
      description: "Perfect for small businesses",
      features: [
        "Up to 10 users",
        "Basic features",
        "Email support"
      ],
      highlighted: false,
      cta: "Start Free Trial"
    },
    {
      name: "Professional",
      price: {
        monthly: 99,
        yearly: 990
      },
      description: "For growing teams",
      features: [
        "Unlimited users",
        "Advanced features",
        "Priority support",
        "API access"
      ],
      highlighted: true,  // Recommended plan
      badge: "Most Popular",
      cta: "Get Started"
    }
  ]
}
```

### Testimonials Section

Customer reviews and testimonials:

```javascript
testimonials: [
  {
    name: "John Doe",
    role: "CEO",
    company: "Tech Corp",
    content: "Outstanding service and results!",
    rating: 5,
    image: "/images/testimonials/john-doe.jpg",
    featured: true
  },
  {
    name: "Jane Smith",
    role: "Marketing Director",
    company: "Growth Inc",
    content: "Transformed our business completely.",
    rating: 5
  }
]
```

### Team Section

Team member profiles:

```javascript
team: [
  {
    name: "Alice Johnson",
    role: "Founder & CEO",
    bio: "20+ years of industry experience",
    image: "/images/team/alice.jpg",
    social: {
      linkedin: "https://linkedin.com/in/alice",
      twitter: "https://twitter.com/alice"
    }
  }
]
```

## Theme Configuration

Customize the visual appearance:

```javascript
theme: {
  name: "modern-business",  // Theme preset name
  industry: "technology",   // Industry for AI theming

  // Color customization
  colors: {
    primary: {
      50: "#eff6ff",
      500: "#3b82f6",
      900: "#1e3a8a"
    },
    secondary: {
      50: "#f8fafc",
      500: "#64748b",
      900: "#0f172a"
    },
    accent: "#f59e0b"
  },

  // Typography
  typography: {
    fontFamily: {
      sans: "Inter, system-ui, sans-serif",
      serif: "Georgia, serif",
      mono: "JetBrains Mono, monospace"
    },
    fontSize: {
      base: "16px",
      scale: 1.25  // Typography scale ratio
    }
  },

  // Layout options
  layout: {
    borderRadius: "0.5rem",
    containerWidth: "1280px",
    spacing: {
      section: "5rem",
      element: "1.5rem"
    }
  },

  // Component styling
  components: {
    button: {
      borderRadius: "0.375rem",
      padding: "0.75rem 1.5rem",
      transition: "all 0.2s"
    },
    card: {
      shadow: "0 1px 3px rgba(0,0,0,0.1)",
      borderRadius: "0.5rem"
    }
  }
}
```

## Advanced Options

### Analytics Configuration

```javascript
analytics: {
  google: {
    measurementId: "G-XXXXXXXXXX"
  },
  facebook: {
    pixelId: "XXXXXXXXXXXXXXX"
  },
  hotjar: {
    siteId: "XXXXXXX"
  }
}
```

### Integration Settings

```javascript
integrations: {
  // Form handling
  forms: {
    provider: "formspree",  // formspree, netlify, custom
    endpoint: "https://formspree.io/f/XXXXXXXX"
  },

  // Newsletter
  newsletter: {
    provider: "mailchimp",
    apiKey: process.env.MAILCHIMP_API_KEY,
    listId: "XXXXXXXXXX"
  },

  // Chat widget
  chat: {
    provider: "intercom",
    appId: "XXXXXXXXXX"
  }
}
```

### Performance Options

```javascript
performance: {
  lazyLoad: true,           // Lazy load images
  preconnect: [             // Preconnect to external domains
    "https://fonts.googleapis.com",
    "https://cdn.example.com"
  ],
  criticalCSS: true,        // Inline critical CSS
  compression: true         // Enable compression
}
```

### Accessibility Settings

```javascript
accessibility: {
  skipLinks: true,          // Add skip navigation links
  ariaLabels: true,         // Enhanced ARIA labels
  focusIndicators: true,    // Visible focus indicators
  reducedMotion: true       // Respect prefers-reduced-motion
}
```

## Validation & Best Practices

### Configuration Validation

Use the built-in validator to check your configuration:

```javascript
import { validateConfig } from '@utils/configValidator';

const errors = validateConfig(clientConfig);
if (errors.length > 0) {
  console.error('Configuration errors:', errors);
}
```

### Best Practices

1. **Required Fields**: Always provide businessName, tagline, email, and phone
2. **SEO Optimization**: Include meta descriptions and keywords
3. **Image Optimization**: Use WebP format with fallbacks
4. **Mobile First**: Test configuration on mobile devices
5. **Accessibility**: Provide alt text for all images
6. **Performance**: Optimize image sizes and lazy load
7. **Content Quality**: Write clear, concise copy
8. **Consistency**: Maintain consistent tone and style

### Common Patterns

#### Multi-language Support

```javascript
i18n: {
  defaultLocale: "en",
  locales: ["en", "es", "fr"],
  translations: {
    en: {
      hero: {
        headline: "Welcome"
      }
    },
    es: {
      hero: {
        headline: "Bienvenido"
      }
    }
  }
}
```

#### A/B Testing

```javascript
experiments: {
  heroHeadline: {
    variants: [
      "Welcome to Excellence",
      "Your Success Starts Here"
    ],
    traffic: [0.5, 0.5]  // Traffic split
  }
}
```

#### Environment-specific Config

```javascript
const config = {
  ...baseConfig,
  ...(process.env.NODE_ENV === 'production'
    ? productionConfig
    : developmentConfig)
};
```

## Migration Guide

### From Static HTML

```javascript
// Old static approach
<h1>Acme Corp</h1>
<p>We make things</p>

// New configuration approach
businessName: "Acme Corp",
tagline: "We make things"
```

### From Previous Versions

```javascript
// v1.0 configuration
company: "Acme",
slogan: "Innovation"

// v2.0 configuration
businessInfo: {
  businessName: "Acme",
  tagline: "Innovation"
}
```

## Troubleshooting

### Common Issues

1. **Configuration not loading**: Check file path and export statement
2. **Theme not applying**: Verify theme name matches available themes
3. **Images not showing**: Ensure paths are relative to public directory
4. **Forms not working**: Check integration settings and API keys
5. **SEO issues**: Validate meta tags and structured data

### Debug Mode

Enable debug mode to see configuration details:

```javascript
debug: {
  enabled: true,
  showConfig: true,
  showPerformance: true,
  logLevel: "verbose"  // verbose, info, warn, error
}
```

## Examples

See the [examples](../examples/) directory for complete configuration examples:

- **basic-business**: Simple service business
- **creative-agency**: Portfolio-focused creative agency
- **healthcare-practice**: Medical/healthcare provider
- **tech-startup**: Modern technology company
- **retail-store**: E-commerce and retail
- **restaurant**: Food service business

## API Reference

For detailed API documentation, see [API.md](API.md).

## Support

For help with configuration:

- Check [examples](../examples/) for working configurations
- Review [FAQ](#) for common questions
- Open an [issue](https://github.com/WebAsAService/base-template/issues) on GitHub