# Dynamic Client Configuration System

This directory contains the centralized configuration system that enables AI-powered generation of personalized websites for different clients while maintaining a shared codebase.

## Overview

The Dynamic Client Configuration System provides:
- **Centralized Content Management**: All website content in one place
- **Type Safety**: Complete TypeScript interfaces for all configuration properties
- **Validation**: Built-in validation to ensure configurations are complete and valid
- **AI-Friendly Structure**: Designed for easy population by AI systems
- **Fallback Values**: Default values prevent broken websites

## Files Structure

```
src/config/
├── client.js           # Main configuration object with comprehensive defaults
├── client.types.ts     # TypeScript interfaces for type safety
├── validation.ts       # Validation utilities and helpers
└── README.md          # This documentation file
```

## Quick Start

### 1. Basic Import and Usage

```javascript
// Import the main configuration
import { clientConfig, getConfigValue, isSectionEnabled } from '@config/client.js';

// Use in Astro components
---
const businessName = clientConfig.businessName;
const heroHeadline = clientConfig.sections.hero.headline;
---

<h1>{businessName}</h1>
<h2>{heroHeadline}</h2>
```

### 2. Type-Safe Usage (TypeScript)

```typescript
// Import types for TypeScript projects
import type { ClientConfig, HeroSection } from '@config/client.types';
import { clientConfig } from '@config/client.js';

// Type-safe access
const hero: HeroSection = clientConfig.sections.hero;
const businessName: string = clientConfig.businessName;
```

### 3. Helper Functions

```javascript
// Get nested values safely with fallbacks
const email = getConfigValue('contact.email', 'hello@example.com');
const themeClass = getConfigValue('themeClass', 'theme-default');

// Check if sections are enabled/configured
if (isSectionEnabled('testimonials')) {
  // Render testimonials section
}
```

## Configuration Structure

### Business Identity
Core business information used throughout the site:

```javascript
{
  businessName: "Your Business Name",
  tagline: "Your Marketing Tagline",
  description: "Extended business description...",
  industry: "Your Industry",
  foundedYear: 2020
}
```

### Contact Information
Complete contact details with structured address:

```javascript
{
  contact: {
    email: "contact@business.com",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Business St",
      city: "Your City", 
      state: "State",
      zipCode: "12345",
      country: "Country"
    },
    hours: {
      monday: "9:00 AM - 6:00 PM",
      // ... other days
    }
  }
}
```

### Social Media & Online Presence
Social links and website URLs:

```javascript
{
  social: {
    facebook: "https://facebook.com/yourbusiness",
    twitter: "https://twitter.com/yourbiz",
    linkedin: "https://linkedin.com/company/yourbusiness"
    // Set to empty string to hide platforms
  },
  website: {
    domain: "https://yourbusiness.com",
    blog: "https://yourbusiness.com/blog"
  }
}
```

### Content Sections
All page content organized by section:

#### Hero Section
```javascript
sections: {
  hero: {
    headline: "Your Main Headline",
    subheadline: "Supporting description...",
    cta: {
      primary: { text: "Get Started", link: "#contact", style: "primary" },
      secondary: { text: "Learn More", link: "#about", style: "outline" }
    },
    media: {
      type: "image",
      src: "path/to/hero-image.jpg",
      alt: "Hero image description"
    }
  }
}
```

#### Features Section
```javascript
features: {
  title: "Why Choose Us",
  subtitle: "Our key advantages...",
  items: [
    {
      title: "Feature Name",
      description: "Feature description...",
      icon: "feature-icon-id",
      image: "optional-feature-image.jpg"
    }
  ]
}
```

#### Services/Pricing
```javascript
services: [
  {
    name: "Service Package Name",
    description: "Package description...",
    price: "$99",
    billing: "monthly", // "monthly" | "yearly" | "one-time" | "contact"
    popular: true,
    features: ["Feature 1", "Feature 2", "Feature 3"],
    cta: { text: "Choose Plan", link: "#contact" }
  }
]
```

#### Testimonials
```javascript
testimonials: [
  {
    name: "Customer Name",
    company: "Company Name",
    position: "Job Title",
    text: "Testimonial content...",
    rating: 5,
    image: "customer-photo.jpg"
  }
]
```

## Using in Astro Components

### Hero Section Example
```astro
---
// src/components/sections/HeroSection.astro
import { clientConfig } from '@config/client.js';

const hero = clientConfig.sections.hero;
---

<section class="hero">
  <div class="container">
    <h1>{hero.headline}</h1>
    <p>{hero.subheadline}</p>
    
    <div class="cta-buttons">
      <a href={hero.cta.primary.link} class={`btn btn-${hero.cta.primary.style}`}>
        {hero.cta.primary.text}
      </a>
      <a href={hero.cta.secondary.link} class={`btn btn-${hero.cta.secondary.style}`}>
        {hero.cta.secondary.text}
      </a>
    </div>
  </div>
</section>
```

### Features Section Example
```astro
---
// src/components/sections/FeaturesSection.astro  
import { clientConfig } from '@config/client.js';

const features = clientConfig.sections.features;
---

<section class="features">
  <div class="container">
    <h2>{features.title}</h2>
    <p>{features.subtitle}</p>
    
    <div class="features-grid">
      {features.items.map(feature => (
        <div class="feature-card">
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
          {feature.image && (
            <img src={feature.image} alt={feature.title} />
          )}
        </div>
      ))}
    </div>
  </div>
</section>
```

### Layout Integration
```astro
---
// src/layouts/Layout.astro
import { clientConfig } from '@config/client.js';

export interface Props {
  title?: string;
  description?: string;
}

const { title, description } = Astro.props;
const pageTitle = title ? `${title} | ${clientConfig.businessName}` : clientConfig.businessName;
const pageDescription = description || clientConfig.description;
---

<html lang="en" class={clientConfig.themeClass}>
  <head>
    <title>{pageTitle}</title>
    <meta name="description" content={pageDescription} />
    <link rel="icon" type="image/svg+xml" href={clientConfig.logo.favicon} />
  </head>
  
  <body>
    <slot />
  </body>
</html>
```

## Validation and Quality Checks

### Validate Configuration
```javascript
import { validateClientConfig, getConfigCompletenessScore } from '@config/validation.ts';

// Validate entire configuration
const validation = validateClientConfig(clientConfig);

if (!validation.isValid) {
  console.log('Configuration errors:', validation.errors);
}

if (validation.warnings.length > 0) {
  console.log('Configuration warnings:', validation.warnings);
}

// Check completeness score (0-100)
const score = getConfigCompletenessScore(clientConfig);
console.log(`Configuration is ${score}% complete`);
```

### Check Section Completeness
```javascript
import { isSectionComplete, getIncompleteSections } from '@config/validation.ts';

// Check specific section
if (!isSectionComplete(clientConfig, 'testimonials')) {
  console.log('Testimonials section needs attention');
}

// Get all incomplete sections
const incomplete = getIncompleteSections(clientConfig);
console.log('Incomplete sections:', incomplete);
```

## AI Integration Guidelines

### Structure for AI Population
The configuration is designed to be easily populated by AI systems:

1. **Clear Property Names**: Self-explanatory field names
2. **Comprehensive Comments**: Each field documented with usage context
3. **Structured Data**: Consistent patterns across all sections
4. **Type Safety**: TypeScript interfaces prevent errors
5. **Validation**: Built-in checks ensure data quality

### AI Population Example
```javascript
// AI can populate like this:
export const clientConfig = {
  businessName: "AI_POPULATED_BUSINESS_NAME",
  tagline: "AI_POPULATED_TAGLINE",
  description: "AI_POPULATED_DESCRIPTION",
  
  contact: {
    email: "AI_POPULATED_EMAIL",
    phone: "AI_POPULATED_PHONE",
    // ... other fields
  },
  
  sections: {
    hero: {
      headline: "AI_POPULATED_HEADLINE",
      subheadline: "AI_POPULATED_SUBHEADLINE",
      // ... other fields
    }
  }
};
```

## Best Practices

### 1. Always Use Helper Functions
```javascript
// Good - with fallback
const email = getConfigValue('contact.email', 'hello@example.com');

// Avoid - direct access without fallback
const email = clientConfig.contact.email; // Could be undefined
```

### 2. Check Section Availability
```javascript
// Good - check if section is properly configured
if (isSectionEnabled('testimonials')) {
  // Render testimonials
}

// Avoid - rendering sections that might be empty
// Always check before rendering
```

### 3. Validate Before Deployment
```javascript
// Always validate configuration before using in production
const validation = validateClientConfig(clientConfig);
if (!validation.isValid) {
  throw new Error(`Configuration invalid: ${validation.errors.join(', ')}`);
}
```

### 4. Use Type Safety
```typescript
// Good - with TypeScript types
import type { ClientConfig } from '@config/client.types';
const config: ClientConfig = clientConfig;

// Enables IDE autocompletion and error checking
```

## Customization for Different Clients

### Method 1: Environment-Based
```javascript
// Load different configs based on environment
const clientId = process.env.CLIENT_ID || 'default';
const config = await import(`./clients/${clientId}.js`);
export const clientConfig = config.default;
```

### Method 2: Dynamic Loading
```javascript
// Load config dynamically based on domain/route
export async function loadClientConfig(clientSlug: string) {
  try {
    const config = await import(`./clients/${clientSlug}.js`);
    return config.clientConfig;
  } catch {
    return defaultConfig;
  }
}
```

## Troubleshooting

### Common Issues

1. **Missing Configuration Values**: Use helper functions with fallbacks
2. **Type Errors**: Import and use TypeScript interfaces  
3. **Broken Images**: Validate image paths using validation utilities
4. **Empty Sections**: Check section completeness before rendering

### Debug Configuration
```javascript
// Log configuration structure
console.log('Full config:', clientConfig);

// Check validation status
const validation = validateClientConfig(clientConfig);
console.log('Validation result:', validation);

// Check completeness
const score = getConfigCompletenessScore(clientConfig);
console.log(`Configuration completeness: ${score}%`);
```

## Migration Guide

### From Hardcoded Content
1. Identify all hardcoded strings in components
2. Move content to appropriate configuration sections
3. Replace hardcoded values with config references
4. Add type imports for TypeScript safety
5. Validate configuration completeness

### Example Migration
```astro
<!-- BEFORE: Hardcoded -->
<h1>Welcome to Our Business</h1>
<p>We provide amazing services...</p>

<!-- AFTER: Configuration-driven -->
---
import { clientConfig } from '@config/client.js';
---
<h1>{clientConfig.sections.hero.headline}</h1>
<p>{clientConfig.sections.hero.subheadline}</p>
```

## Contributing

When adding new configuration options:

1. Update `client.js` with new fields and defaults
2. Add corresponding TypeScript interfaces in `client.types.ts`
3. Add validation rules in `validation.ts` if needed
4. Update this documentation with usage examples
5. Test with existing components to ensure compatibility

## Support

For issues or questions about the configuration system:
- Check validation errors using the validation utilities
- Ensure all required fields are populated
- Verify TypeScript types are properly imported
- Test configuration completeness score