# API Reference

## Overview

Complete API reference for the Dynamic Website Template, including configuration objects, component props, utility functions, and theme system APIs.

## Table of Contents

- [Configuration API](#configuration-api)
- [Component Props API](#component-props-api)
- [Theme System API](#theme-system-api)
- [Utility Functions](#utility-functions)
- [Type Definitions](#type-definitions)
- [Hooks and Events](#hooks-and-events)

## Configuration API

### ClientConfig Object

The main configuration object that drives the entire website.

```typescript
interface ClientConfig {
  businessInfo: BusinessInfo;
  contact: ContactInfo;
  content: ContentSections;
  theme: ThemeConfig;
  features?: FeatureFlags;
  integrations?: Integrations;
  analytics?: Analytics;
  performance?: PerformanceOptions;
  accessibility?: AccessibilityOptions;
}
```

### BusinessInfo

```typescript
interface BusinessInfo {
  businessName: string;           // Required: Company name
  tagline: string;                // Required: Short tagline (5-15 words)
  description: string;             // Required: Business description (50-150 words)
  industry?: string;               // Industry category
  yearEstablished?: number;        // Year founded
  employeeCount?: string;          // Employee range (e.g., "50-100")
  logo?: LogoConfig;               // Logo configuration
  seo?: SEOMetadata;               // SEO metadata
}

interface LogoConfig {
  url: string;                     // Path to logo file
  alt: string;                     // Alt text for accessibility
  width?: number;                  // Logo width in pixels
  height?: number;                 // Logo height in pixels
  darkModeUrl?: string;            // Alternative logo for dark mode
}

interface SEOMetadata {
  title?: string;                  // Page title override
  description?: string;            // Meta description override
  keywords?: string[];             // SEO keywords
  author?: string;                 // Content author
  ogImage?: string;                // Open Graph image URL
  twitterCard?: 'summary' | 'summary_large_image';
}
```

### ContactInfo

```typescript
interface ContactInfo {
  email: string;                   // Required: Primary email
  phone: string;                   // Required: Primary phone
  fax?: string;                    // Fax number
  address?: Address;               // Physical address
  hours?: BusinessHours;           // Operating hours
  social?: SocialLinks;            // Social media links
}

interface Address {
  street: string;
  suite?: string;
  city: string;
  state: string;
  zip: string;
  country?: string;
}

interface BusinessHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
  timezone?: string;               // e.g., "America/New_York"
}

interface SocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
  github?: string;
  [key: string]: string | undefined; // Allow custom social platforms
}
```

### ContentSections

```typescript
interface ContentSections {
  hero?: HeroSection;
  features?: Feature[];
  services?: Service[];
  pricing?: PricingSection;
  testimonials?: Testimonial[];
  team?: TeamMember[];
  faq?: FAQItem[];
  cta?: CTASection;
}

interface HeroSection {
  headline: string;
  subheadline?: string;
  primaryCTA?: CTAButton;
  secondaryCTA?: CTAButton;
  background?: BackgroundConfig;
  image?: ImageConfig;
}

interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string | IconConfig;
  highlight?: boolean;
  link?: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  features?: string[];
  price?: PriceConfig;
  image?: string;
  cta?: CTAButton;
}

interface Testimonial {
  id: string;
  name: string;
  role?: string;
  company?: string;
  content: string;
  rating?: number;
  image?: string;
  featured?: boolean;
}
```

## Component Props API

### Layout Component

```typescript
interface LayoutProps {
  title: string;                   // Page title
  description?: string;            // Meta description
  clientTheme?: string;            // Theme class name
  fullWidth?: boolean;             // Full width layout
  noHeader?: boolean;              // Hide header
  noFooter?: boolean;              // Hide footer
}
```

### Section Components

#### HeroSection

```typescript
interface HeroSectionProps {
  headline: string;
  subheadline?: string;
  primaryCTA?: {
    text: string;
    link: string;
    variant?: 'primary' | 'secondary' | 'accent';
  };
  secondaryCTA?: {
    text: string;
    link: string;
    variant?: 'primary' | 'secondary' | 'outline';
  };
  backgroundImage?: string;
  overlay?: boolean;
  theme?: string;
}
```

#### FeaturesSection

```typescript
interface FeaturesSectionProps {
  title?: string;
  subtitle?: string;
  features: Array<{
    title: string;
    description: string;
    icon?: string;
    link?: string;
  }>;
  columns?: 2 | 3 | 4;
  theme?: string;
}
```

#### PricingSection

```typescript
interface PricingSectionProps {
  title?: string;
  subtitle?: string;
  plans: Array<{
    name: string;
    price: number | string;
    period?: string;
    description?: string;
    features: string[];
    highlighted?: boolean;
    cta: string;
    ctaLink?: string;
  }>;
  currency?: string;
  theme?: string;
}
```

### UI Components

#### Button

```typescript
interface ButtonProps {
  text: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}
```

#### Card

```typescript
interface CardProps {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  href?: string;
  variant?: 'default' | 'elevated' | 'bordered';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  theme?: string;
}
```

#### Input

```typescript
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'number';
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  hint?: string;
  icon?: string;
  onChange?: (value: string) => void;
}
```

## Theme System API

### CSS Custom Properties

#### Color Variables

```css
/* Primary colors */
--color-primary-50: string;     /* Lightest */
--color-primary-100: string;
--color-primary-200: string;
--color-primary-300: string;
--color-primary-400: string;
--color-primary-500: string;    /* Base */
--color-primary-600: string;
--color-primary-700: string;
--color-primary-800: string;
--color-primary-900: string;
--color-primary-950: string;    /* Darkest */

/* Secondary colors */
--color-secondary-50 through --color-secondary-950

/* Accent color */
--color-accent: string;

/* Semantic colors */
--color-success: string;
--color-warning: string;
--color-error: string;
--color-info: string;

/* UI colors */
--color-background: string;
--color-surface: string;
--color-border: string;
--color-text: string;
--color-text-muted: string;
```

#### Typography Variables

```css
/* Font families */
--font-family-sans: string;
--font-family-serif: string;
--font-family-mono: string;
--font-family-display: string;

/* Font sizes */
--font-size-xs: string;
--font-size-sm: string;
--font-size-base: string;
--font-size-lg: string;
--font-size-xl: string;
--font-size-2xl: string;
--font-size-3xl: string;
--font-size-4xl: string;
--font-size-5xl: string;

/* Font weights */
--font-weight-light: number;
--font-weight-normal: number;
--font-weight-medium: number;
--font-weight-semibold: number;
--font-weight-bold: number;

/* Line heights */
--line-height-tight: number;
--line-height-normal: number;
--line-height-relaxed: number;
--line-height-loose: number;
```

#### Spacing Variables

```css
/* Spacing scale */
--spacing-0: string;  /* 0 */
--spacing-1: string;  /* 0.25rem */
--spacing-2: string;  /* 0.5rem */
--spacing-3: string;  /* 0.75rem */
--spacing-4: string;  /* 1rem */
--spacing-5: string;  /* 1.25rem */
--spacing-6: string;  /* 1.5rem */
--spacing-8: string;  /* 2rem */
--spacing-10: string; /* 2.5rem */
--spacing-12: string; /* 3rem */
--spacing-16: string; /* 4rem */
--spacing-20: string; /* 5rem */
--spacing-24: string; /* 6rem */

/* Section spacing */
--spacing-section: string;
--spacing-element: string;
```

#### Other Variables

```css
/* Border radius */
--border-radius-none: string;
--border-radius-sm: string;
--border-radius-base: string;
--border-radius-md: string;
--border-radius-lg: string;
--border-radius-xl: string;
--border-radius-full: string;

/* Shadows */
--shadow-sm: string;
--shadow-base: string;
--shadow-md: string;
--shadow-lg: string;
--shadow-xl: string;

/* Transitions */
--transition-fast: string;
--transition-base: string;
--transition-slow: string;

/* Z-index */
--z-index-dropdown: number;
--z-index-sticky: number;
--z-index-fixed: number;
--z-index-modal: number;
--z-index-popover: number;
--z-index-tooltip: number;
```

## Utility Functions

### Configuration Utilities

```typescript
// Validate configuration
function validateConfig(config: unknown): ValidationResult {
  errors: string[];
  warnings: string[];
  isValid: boolean;
}

// Merge with defaults
function mergeWithDefaults(config: Partial<ClientConfig>): ClientConfig

// Load client configuration
async function loadClientConfig(clientName: string): Promise<ClientConfig>

// Generate configuration from inputs
async function generateConfig(inputs: GenerationInputs): Promise<ClientConfig>
```

### Theme Utilities

```typescript
// Apply theme to element
function applyTheme(element: HTMLElement, themeName: string): void

// Get current theme
function getCurrentTheme(): string

// Extract colors from logo
async function extractLogoColors(logoPath: string): Promise<ColorPalette>

// Generate theme from industry
function generateIndustryTheme(industry: string): ThemeConfig

// Check color contrast
function checkContrast(fg: string, bg: string): ContrastResult

// Convert color formats
function hexToRgb(hex: string): RGB
function rgbToHsl(rgb: RGB): HSL
```

### Content Utilities

```typescript
// Generate AI content
async function generateContent(
  businessInfo: BusinessInfo,
  options?: GenerationOptions
): Promise<GeneratedContent>

// Validate content quality
function validateContent(content: string): ContentValidation

// Format content
function formatContent(
  content: string,
  format: 'markdown' | 'html' | 'plain'
): string

// Extract keywords
function extractKeywords(content: string): string[]
```

### Performance Utilities

```typescript
// Lazy load images
function lazyLoadImages(selector?: string): void

// Optimize images
async function optimizeImage(
  imagePath: string,
  options?: OptimizeOptions
): Promise<string>

// Measure performance
function measurePerformance(): PerformanceMetrics

// Cache resources
function cacheResources(resources: string[]): Promise<void>
```

## Type Definitions

### Common Types

```typescript
// Color types
type HexColor = string;
type RGB = { r: number; g: number; b: number };
type HSL = { h: number; s: number; l: number };

// Size types
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type Breakpoint = 'mobile' | 'tablet' | 'desktop' | 'wide';

// Status types
type Status = 'idle' | 'loading' | 'success' | 'error';
type Variant = 'primary' | 'secondary' | 'accent' | 'neutral';

// Configuration types
type Industry = 'healthcare' | 'technology' | 'finance' | 'retail' | 'creative' | string;
type ColorScheme = 'light' | 'dark' | 'auto';
```

### Validation Types

```typescript
interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

interface ValidationError {
  field: string;
  message: string;
  code: string;
}

interface ValidationWarning {
  field: string;
  message: string;
  suggestion?: string;
}
```

### Generation Types

```typescript
interface GenerationInputs {
  businessName: string;
  industry: string;
  targetAudience?: string;
  logo?: File | string;
  preferences?: GenerationPreferences;
}

interface GenerationPreferences {
  tone: 'professional' | 'casual' | 'playful';
  colorIntensity: 'muted' | 'balanced' | 'vibrant';
  style: 'modern' | 'classic' | 'minimal';
}

interface GeneratedContent {
  tagline: string;
  description: string;
  features: Feature[];
  benefits: string[];
  cta: CTAContent;
}
```

## Hooks and Events

### Lifecycle Hooks

```typescript
// Component mounted
onMount(() => {
  console.log('Component mounted');
});

// Component updated
onUpdate(() => {
  console.log('Component updated');
});

// Component unmounted
onUnmount(() => {
  console.log('Component unmounted');
});
```

### Custom Events

```typescript
// Theme change event
window.addEventListener('themechange', (event: CustomEvent) => {
  console.log('Theme changed to:', event.detail.theme);
});

// Config update event
window.addEventListener('configupdate', (event: CustomEvent) => {
  console.log('Config updated:', event.detail.config);
});

// Generation complete event
window.addEventListener('generationcomplete', (event: CustomEvent) => {
  console.log('Generation complete:', event.detail.result);
});
```

### Event Emitters

```typescript
// Emit custom event
function emitEvent(name: string, detail?: any): void {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

// Theme change emitter
function emitThemeChange(theme: string): void {
  emitEvent('themechange', { theme });
}

// Config update emitter
function emitConfigUpdate(config: ClientConfig): void {
  emitEvent('configupdate', { config });
}
```

## Error Handling

### Error Types

```typescript
class ConfigError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
    this.name = 'ConfigError';
  }
}

class ThemeError extends Error {
  constructor(message: string, public theme?: string) {
    super(message);
    this.name = 'ThemeError';
  }
}

class GenerationError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'GenerationError';
  }
}
```

### Error Handlers

```typescript
// Global error handler
function handleError(error: Error): void {
  if (error instanceof ConfigError) {
    console.error('Configuration error:', error.message);
  } else if (error instanceof ThemeError) {
    console.error('Theme error:', error.message);
  } else if (error instanceof GenerationError) {
    console.error('Generation error:', error.message);
  } else {
    console.error('Unexpected error:', error);
  }
}

// Async error wrapper
async function withErrorHandling<T>(
  fn: () => Promise<T>,
  fallback?: T
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    handleError(error as Error);
    if (fallback !== undefined) {
      return fallback;
    }
    throw error;
  }
}
```

## Migration Guide

### From v1.x to v2.0

```typescript
// Old v1.x format
const config = {
  company: "Acme Corp",
  slogan: "Innovation",
  email: "contact@acme.com"
};

// New v2.0 format
const config: ClientConfig = {
  businessInfo: {
    businessName: "Acme Corp",
    tagline: "Innovation",
    description: "Leading provider of innovative solutions"
  },
  contact: {
    email: "contact@acme.com",
    phone: "(555) 123-4567"
  },
  theme: {
    name: "modern-business"
  }
};
```

### Migration Helper

```typescript
function migrateConfig(oldConfig: any): ClientConfig {
  return {
    businessInfo: {
      businessName: oldConfig.company || oldConfig.businessName,
      tagline: oldConfig.slogan || oldConfig.tagline,
      description: oldConfig.description || ''
    },
    contact: {
      email: oldConfig.email,
      phone: oldConfig.phone || ''
    },
    theme: {
      name: oldConfig.theme || 'default'
    }
  };
}
```

## Examples

### Complete Configuration Example

```typescript
const completeConfig: ClientConfig = {
  businessInfo: {
    businessName: "Acme Corporation",
    tagline: "Innovation at Scale",
    description: "Leading provider of enterprise solutions",
    industry: "technology",
    yearEstablished: 2015,
    logo: {
      url: "/images/logo.png",
      alt: "Acme Corporation Logo",
      width: 200,
      height: 60
    }
  },

  contact: {
    email: "contact@acmecorp.com",
    phone: "(555) 123-4567",
    address: {
      street: "123 Tech Boulevard",
      city: "San Francisco",
      state: "CA",
      zip: "94105"
    },
    social: {
      linkedin: "https://linkedin.com/company/acmecorp",
      twitter: "https://twitter.com/acmecorp"
    }
  },

  content: {
    hero: {
      headline: "Transform Your Business",
      subheadline: "Enterprise solutions that scale",
      primaryCTA: {
        text: "Get Started",
        link: "#contact"
      }
    },
    features: [
      {
        id: "feature1",
        title: "Scalable",
        description: "Grows with your business",
        icon: "rocket"
      }
    ]
  },

  theme: {
    name: "tech-modern",
    industry: "technology"
  }
};
```

## Support

For API support and questions:
- Consult the [documentation](../README.md)
- Check [examples](../examples/) for implementation patterns
- Open an [issue](https://github.com/WebAsAService/base-template/issues) on GitHub
- Contact the development team