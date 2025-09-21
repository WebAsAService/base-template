# Development Guide

## Overview

This guide provides comprehensive instructions for setting up and working with the dynamic website template development environment. Whether you're adding features, fixing bugs, or customizing for clients, this guide covers everything you need to know.

## Table of Contents

- [Setup](#setup)
- [Architecture Overview](#architecture-overview)
- [Development Workflow](#development-workflow)
- [Component Development](#component-development)
- [Configuration System](#configuration-system)
- [Theme Development](#theme-development)
- [TypeScript Integration](#typescript-integration)
- [Testing](#testing)
- [Performance Optimization](#performance-optimization)
- [Debugging](#debugging)
- [Deployment](#deployment)

## Setup

### Prerequisites

Ensure you have the following installed:

```bash
# Required versions
node >= 18.0.0
yarn >= 1.22.0
git >= 2.0.0

# Check versions
node --version
yarn --version
git --version
```

### Initial Setup

1. **Clone the repository:**

```bash
git clone https://github.com/WebAsAService/base-template.git
cd base-template
```

2. **Install dependencies:**

```bash
yarn install
```

3. **Set up environment variables:**

```bash
# Copy example environment file
cp .env.example .env.local

# Edit with your values
nano .env.local
```

4. **Start development server:**

```bash
yarn dev
```

Visit `http://localhost:3000` to see your site.

### Environment Variables

```env
# API Keys
CLAUDE_API_KEY=your_claude_api_key
GITHUB_TOKEN=your_github_token

# Service URLs
API_URL=https://api.yourservice.com
WEBHOOK_URL=https://webhooks.yourservice.com

# Feature Flags
ENABLE_AI_GENERATION=true
ENABLE_ANALYTICS=false
DEBUG_MODE=true

# Build Configuration
NODE_ENV=development
BUILD_TARGET=client
```

## Architecture Overview

### Project Structure

```
base-template/
├── src/
│   ├── components/          # Reusable components
│   │   ├── sections/        # Page sections
│   │   │   ├── HeroSection.astro
│   │   │   ├── FeaturesSection.astro
│   │   │   ├── PricingSection.astro
│   │   │   └── ContactSection.astro
│   │   ├── ui/              # UI components
│   │   │   ├── Button.astro
│   │   │   ├── Card.astro
│   │   │   └── Input.astro
│   │   └── clients/         # Client-specific components
│   │       └── {client}/
│   ├── layouts/             # Page layouts
│   │   └── Layout.astro
│   ├── pages/               # Route pages
│   │   ├── index.astro      # Home page
│   │   └── clients/         # Client pages
│   │       └── {client}/
│   ├── styles/              # Global styles
│   │   ├── global.css
│   │   ├── theme.css
│   │   └── client-themes.css
│   ├── data/                # Configuration data
│   │   └── clients/
│   └── utils/               # Utility functions
│       ├── theme.js
│       ├── config.js
│       └── validation.js
├── public/                  # Static assets
├── docs/                    # Documentation
├── examples/                # Example configs
├── scripts/                 # Build scripts
└── tests/                   # Test files
```

### Component Architecture

```astro
---
// Component props and logic
export interface Props {
  title: string;
  theme?: string;
  variant?: 'primary' | 'secondary';
}

const { title, theme = 'default', variant = 'primary' } = Astro.props;

// Component logic here
const processedData = processData();
---

<!-- Component template -->
<section class={`section ${theme}`}>
  <h2>{title}</h2>
  <slot />
</section>

<style>
  /* Component styles */
  .section {
    padding: var(--spacing-section);
  }
</style>
```

### Data Flow

```
┌──────────────┐
│ clientConfig │ <-- Configuration object
└──────┬───────┘
       │
       v
┌──────────────┐
│    Layout    │ <-- Applies theme
└──────┬───────┘
       │
       v
┌──────────────┐
│     Page     │ <-- Renders sections
└──────┬───────┘
       │
       v
┌──────────────┐
│  Components  │ <-- Display content
└──────────────┘
```

## Development Workflow

### Branch Strategy

```bash
main            # Production-ready code
├── develop     # Integration branch
│   ├── feature/add-new-section
│   ├── feature/theme-updates
│   ├── fix/navigation-bug
│   └── client/acme-corp
```

### Creating Features

1. **Create feature branch:**

```bash
git checkout -b feature/your-feature-name
```

2. **Make changes:**

```bash
# Add new component
touch src/components/sections/NewSection.astro

# Update configuration
nano src/data/config.js
```

3. **Test locally:**

```bash
yarn dev
# Test at http://localhost:3000
```

4. **Commit changes:**

```bash
git add .
git commit -m "feat: add new section component"
```

5. **Push and create PR:**

```bash
git push origin feature/your-feature-name
```

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Format code
yarn format

# Lint code
yarn lint

# Fix lint issues
yarn lint:fix
```

### Pre-commit Hooks

```bash
# Install husky
yarn husky install

# Pre-commit runs:
- ESLint
- Prettier
- Type checking
- Unit tests
```

## Component Development

### Creating New Components

1. **Section Component Template:**

```astro
---
// src/components/sections/CustomSection.astro
export interface Props {
  title: string;
  items: Array<{
    id: string;
    name: string;
    description: string;
  }>;
  theme?: string;
}

const { title, items, theme = 'default' } = Astro.props;
---

<section class={`custom-section ${theme}`}>
  <div class="container">
    <h2>{title}</h2>
    <div class="grid">
      {items.map(item => (
        <div key={item.id} class="item">
          <h3>{item.name}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>

<style>
  .custom-section {
    padding: var(--spacing-section);
    background: var(--color-surface);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-4);
  }
</style>
```

2. **UI Component Template:**

```astro
---
// src/components/ui/Badge.astro
export interface Props {
  text: string;
  variant?: 'primary' | 'secondary' | 'success' | 'warning';
  size?: 'sm' | 'md' | 'lg';
}

const { text, variant = 'primary', size = 'md' } = Astro.props;
---

<span class={`badge badge-${variant} badge-${size}`}>
  {text}
</span>

<style>
  .badge {
    display: inline-block;
    padding: var(--spacing-1) var(--spacing-2);
    border-radius: var(--border-radius-full);
    font-size: var(--font-size-sm);
    font-weight: 500;
  }

  .badge-primary {
    background: var(--color-primary-100);
    color: var(--color-primary-900);
  }

  .badge-sm { font-size: var(--font-size-xs); }
  .badge-lg { font-size: var(--font-size-base); }
</style>
```

### Component Composition

```astro
---
// Using multiple components together
import HeroSection from '@components/sections/HeroSection.astro';
import FeaturesSection from '@components/sections/FeaturesSection.astro';
import Badge from '@components/ui/Badge.astro';
---

<HeroSection title="Welcome">
  <Badge text="New" variant="success" />
  <p>Your content here</p>
</HeroSection>

<FeaturesSection features={config.features} />
```

## Configuration System

### Configuration Structure

```javascript
// src/data/clients/example.js
export const clientConfig = {
  // Metadata
  _version: '2.0.0',
  _generated: false,
  _lastModified: '2024-01-20',

  // Core configuration
  businessInfo: { /* ... */ },
  contact: { /* ... */ },
  theme: { /* ... */ },
  content: { /* ... */ },

  // Feature flags
  features: {
    enableChat: true,
    enableAnalytics: false,
    enableNewsletter: true
  }
};
```

### Configuration Validation

```javascript
// src/utils/validation.js
export function validateConfig(config) {
  const errors = [];

  // Required fields
  if (!config.businessInfo?.businessName) {
    errors.push('businessName is required');
  }

  if (!config.contact?.email) {
    errors.push('contact.email is required');
  }

  // Format validation
  if (config.contact?.email && !isValidEmail(config.contact.email)) {
    errors.push('Invalid email format');
  }

  return errors;
}
```

### Dynamic Configuration Loading

```javascript
// src/utils/config-loader.js
export async function loadClientConfig(clientName) {
  try {
    const module = await import(`../data/clients/${clientName}.js`);
    const config = module.clientConfig;

    // Validate
    const errors = validateConfig(config);
    if (errors.length > 0) {
      throw new Error(`Config validation failed: ${errors.join(', ')}`);
    }

    // Apply defaults
    return mergeWithDefaults(config);
  } catch (error) {
    console.error('Failed to load config:', error);
    return getDefaultConfig();
  }
}
```

## Theme Development

### Creating New Themes

1. **Define theme variables:**

```css
/* src/styles/client-themes.css */
.theme-custom {
  /* Colors */
  --color-primary-500: #your-color;
  --color-secondary-500: #your-color;

  /* Typography */
  --font-family-sans: 'Your Font', sans-serif;

  /* Spacing */
  --spacing-section: 6rem;

  /* Components */
  --button-radius: 0.5rem;
  --card-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

2. **Register theme:**

```javascript
// tailwind.config.js
module.exports = {
  safelist: [
    'theme-custom',
    // Other themes
  ]
};
```

3. **Test theme:**

```astro
---
// Test page for theme
import Layout from '@layouts/Layout.astro';
---

<Layout title="Theme Test" clientTheme="theme-custom">
  <!-- Test components -->
</Layout>
```

## TypeScript Integration

### Type Definitions

```typescript
// src/types/config.ts
export interface ClientConfig {
  businessInfo: BusinessInfo;
  contact: ContactInfo;
  theme: ThemeConfig;
  content: ContentSections;
  features?: FeatureFlags;
}

export interface BusinessInfo {
  businessName: string;
  tagline: string;
  description: string;
  industry?: string;
  logo?: LogoConfig;
}

export interface ThemeConfig {
  name: string;
  industry?: string;
  colors?: ColorPalette;
  typography?: Typography;
}
```

### Using Types in Components

```astro
---
// Component with TypeScript
import type { ClientConfig } from '@types/config';

export interface Props {
  config: ClientConfig;
}

const { config } = Astro.props;

// Type-safe access
const businessName = config.businessInfo.businessName;
---
```

### Type Guards

```typescript
// src/utils/type-guards.ts
export function isValidConfig(data: unknown): data is ClientConfig {
  return (
    typeof data === 'object' &&
    data !== null &&
    'businessInfo' in data &&
    'contact' in data
  );
}

export function hasFeature(
  config: ClientConfig,
  feature: keyof FeatureFlags
): boolean {
  return config.features?.[feature] ?? false;
}
```

## Testing

### Unit Testing

```javascript
// tests/unit/config.test.js
import { describe, it, expect } from 'vitest';
import { validateConfig } from '@utils/validation';

describe('Config Validation', () => {
  it('should validate required fields', () => {
    const config = {
      businessInfo: { businessName: 'Test' },
      contact: { email: 'test@example.com' }
    };

    const errors = validateConfig(config);
    expect(errors).toHaveLength(0);
  });

  it('should catch missing fields', () => {
    const config = {};
    const errors = validateConfig(config);
    expect(errors).toContain('businessName is required');
  });
});
```

### Component Testing

```javascript
// tests/components/Button.test.js
import { render } from '@testing-library/astro';
import Button from '@components/ui/Button.astro';

describe('Button Component', () => {
  it('renders with props', async () => {
    const { getByText } = await render(Button, {
      props: { text: 'Click me', variant: 'primary' }
    });

    expect(getByText('Click me')).toBeDefined();
  });
});
```

### Integration Testing

```javascript
// tests/integration/client-page.test.js
import { preview } from 'astro';

describe('Client Page', () => {
  let previewServer;

  beforeAll(async () => {
    previewServer = await preview();
  });

  afterAll(async () => {
    await previewServer.stop();
  });

  it('loads client configuration', async () => {
    const response = await fetch('http://localhost:3000/clients/example');
    expect(response.status).toBe(200);

    const html = await response.text();
    expect(html).toContain('Example Business');
  });
});
```

### Running Tests

```bash
# Run all tests
yarn test

# Run unit tests
yarn test:unit

# Run integration tests
yarn test:integration

# Watch mode
yarn test:watch

# Coverage report
yarn test:coverage
```

## Performance Optimization

### Build Optimization

```javascript
// astro.config.mjs
export default defineConfig({
  build: {
    // Inline critical CSS
    inlineStylesheets: 'auto',

    // Split chunks
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'utils': ['./src/utils/index.js']
        }
      }
    }
  },

  // Image optimization
  image: {
    service: squooshImageService()
  }
});
```

### Lazy Loading

```astro
---
// Lazy load components
const LazyComponent = await import('@components/HeavyComponent.astro');
---

<!-- Lazy load images -->
<img src="image.jpg" loading="lazy" alt="Description" />

<!-- Lazy load scripts -->
<script async src="analytics.js"></script>
```

### Caching Strategy

```javascript
// Service worker for caching
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll([
        '/',
        '/styles/global.css',
        '/scripts/main.js'
      ]);
    })
  );
});
```

## Debugging

### Debug Mode

```javascript
// Enable debug mode in config
export const config = {
  debug: {
    enabled: true,
    showGrid: true,
    showMetrics: true,
    logLevel: 'verbose'
  }
};
```

### Debug Components

```astro
---
// Debug component for development
const isDebug = import.meta.env.DEV;
---

{isDebug && (
  <div class="debug-panel">
    <h3>Debug Info</h3>
    <pre>{JSON.stringify(Astro.props, null, 2)}</pre>
  </div>
)}

<style>
  .debug-panel {
    position: fixed;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0,0.9);
    color: white;
    padding: 1rem;
    max-width: 400px;
    max-height: 300px;
    overflow: auto;
  }
</style>
```

### Browser DevTools

```javascript
// Add debug helpers to window
if (import.meta.env.DEV) {
  window.__DEBUG__ = {
    config: clientConfig,
    theme: getCurrentTheme(),
    metrics: getPerformanceMetrics()
  };
}
```

## Deployment

### Build for Production

```bash
# Build production site
yarn build

# Preview production build
yarn preview

# Analyze bundle size
yarn build:analyze
```

### Deployment Platforms

#### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

#### Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy

# Production deployment
netlify deploy --prod
```

#### Docker

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Environment-Specific Builds

```bash
# Development build
NODE_ENV=development yarn build

# Staging build
NODE_ENV=staging yarn build

# Production build
NODE_ENV=production yarn build
```

### Post-Deployment

```javascript
// Health check endpoint
export async function get() {
  return {
    body: JSON.stringify({
      status: 'healthy',
      version: process.env.npm_package_version,
      timestamp: new Date().toISOString()
    })
  };
}
```

## Troubleshooting

### Common Issues

1. **Module not found:**
```bash
# Clear cache and reinstall
rm -rf node_modules yarn.lock
yarn install
```

2. **Build failures:**
```bash
# Clean build cache
yarn clean
yarn build
```

3. **Theme not applying:**
```javascript
// Check theme class in HTML
console.log(document.documentElement.className);
```

4. **Performance issues:**
```bash
# Profile build
yarn build --profile
```

### Getting Help

- Check [documentation](../README.md)
- Search [GitHub issues](https://github.com/WebAsAService/base-template/issues)
- Ask in [Discord community](#)
- Contact support team