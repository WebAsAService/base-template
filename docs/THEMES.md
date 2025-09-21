# Theme Customization Guide

## Overview

The dynamic website template features a powerful CSS custom properties-based theme system that enables complete visual customization while maintaining consistency and performance. This guide covers creating, customizing, and managing themes.

## Table of Contents

- [Theme System Architecture](#theme-system-architecture)
- [Creating Custom Themes](#creating-custom-themes)
- [Industry-Specific Presets](#industry-specific-presets)
- [AI Theme Generation](#ai-theme-generation)
- [Color System](#color-system)
- [Typography](#typography)
- [Component Theming](#component-theming)
- [Dark Mode Support](#dark-mode-support)
- [Performance Optimization](#performance-optimization)
- [Best Practices](#best-practices)

## Theme System Architecture

### How It Works

The theme system uses CSS custom properties (CSS variables) that cascade through the entire application:

```css
:root {
  /* Theme variables defined here */
  --color-primary: #3b82f6;
  --font-family-sans: 'Inter', system-ui, sans-serif;
  --border-radius-base: 0.5rem;
}

/* Theme class overrides */
.theme-modern-business {
  --color-primary: #0ea5e9;
  --font-family-sans: 'Roboto', sans-serif;
}
```

### File Structure

```
src/styles/
├── global.css           # Global styles and resets
├── theme.css            # Base theme variables
├── client-themes.css    # Client-specific theme overrides
└── typography.css       # Typography utilities
```

## Creating Custom Themes

### Step 1: Define Theme Class

Add your theme to `src/styles/client-themes.css`:

```css
.theme-your-business {
  /* Color Palette */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-200: #bfdbfe;
  --color-primary-300: #93c5fd;
  --color-primary-400: #60a5fa;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-700: #1d4ed8;
  --color-primary-800: #1e40af;
  --color-primary-900: #1e3a8a;
  --color-primary-950: #172554;

  /* Typography */
  --font-family-sans: 'Your Font', system-ui, sans-serif;
  --font-family-serif: 'Georgia', serif;
  --font-family-mono: 'JetBrains Mono', monospace;

  /* Spacing & Layout */
  --border-radius-sm: 0.25rem;
  --border-radius-base: 0.5rem;
  --border-radius-lg: 0.75rem;
  --border-radius-full: 9999px;
}
```

### Step 2: Configure Theme in Tailwind

Add theme to safelist in `tailwind.config.js`:

```javascript
module.exports = {
  safelist: [
    'theme-your-business',
    // Other theme classes
  ]
};
```

### Step 3: Apply Theme

Use theme in your configuration:

```javascript
export const clientConfig = {
  theme: {
    name: "your-business",
    // Additional theme settings
  }
};
```

## Industry-Specific Presets

### Healthcare Theme

Clean, trustworthy design with calming colors:

```css
.theme-healthcare {
  /* Calming blues and greens */
  --color-primary: #0891b2;    /* Cyan */
  --color-secondary: #10b981;  /* Emerald */
  --color-accent: #3b82f6;     /* Blue */

  /* Clean, readable typography */
  --font-family-sans: 'Source Sans Pro', sans-serif;

  /* Soft, rounded corners */
  --border-radius-base: 0.75rem;

  /* Light, airy spacing */
  --spacing-section: 6rem;
}
```

### Tech Startup Theme

Modern, bold design with sharp contrasts:

```css
.theme-tech-startup {
  /* Bold, modern colors */
  --color-primary: #8b5cf6;    /* Purple */
  --color-secondary: #0ea5e9;  /* Cyan */
  --color-accent: #f59e0b;     /* Amber */

  /* Modern typography */
  --font-family-sans: 'Inter', sans-serif;
  --font-family-mono: 'Fira Code', monospace;

  /* Sharp, minimal corners */
  --border-radius-base: 0.25rem;

  /* Tight, efficient spacing */
  --spacing-section: 4rem;
}
```

### Creative Agency Theme

Bold, artistic design with vibrant colors:

```css
.theme-creative-agency {
  /* Vibrant, creative colors */
  --color-primary: #dc2626;    /* Red */
  --color-secondary: #7c3aed;  /* Violet */
  --color-accent: #facc15;     /* Yellow */

  /* Artistic typography */
  --font-family-sans: 'Poppins', sans-serif;
  --font-family-display: 'Playfair Display', serif;

  /* Dynamic, varied corners */
  --border-radius-base: 1.5rem;

  /* Generous, creative spacing */
  --spacing-section: 8rem;
}
```

### Professional Services Theme

Conservative, professional design:

```css
.theme-professional {
  /* Conservative colors */
  --color-primary: #1e40af;    /* Navy */
  --color-secondary: #64748b;  /* Slate */
  --color-accent: #059669;     /* Emerald */

  /* Traditional typography */
  --font-family-sans: 'Lato', sans-serif;
  --font-family-serif: 'Merriweather', serif;

  /* Traditional corners */
  --border-radius-base: 0.375rem;

  /* Balanced spacing */
  --spacing-section: 5rem;
}
```

## AI Theme Generation

### How It Works

The AI theme generation system:
1. Analyzes your logo for dominant colors
2. Considers your industry and business type
3. Generates appropriate color palettes
4. Selects suitable typography
5. Creates a cohesive theme

### Configuration

```javascript
aiThemeGeneration: {
  enabled: true,
  source: "logo",  // logo, manual, industry

  // Logo analysis settings
  logoAnalysis: {
    extractColors: true,
    colorCount: 5,
    algorithm: "vibrant"  // vibrant, quantize, dominant
  },

  // Generation preferences
  preferences: {
    style: "modern",  // modern, classic, playful, minimal
    colorIntensity: "balanced",  // vibrant, balanced, muted
    contrast: "high",  // high, medium, low
    accessibility: true  // Ensure WCAG compliance
  }
}
```

### Manual Override

Override AI-generated themes:

```javascript
theme: {
  ai: {
    enabled: true,
    override: {
      primaryColor: "#custom-color",
      fontFamily: "Custom Font"
    }
  }
}
```

## Color System

### Color Scales

Each color uses a 50-950 scale for flexibility:

```css
/* Primary color scale */
--color-primary-50: /* Lightest */
--color-primary-100:
--color-primary-200:
--color-primary-300:
--color-primary-400:
--color-primary-500: /* Base color */
--color-primary-600:
--color-primary-700:
--color-primary-800:
--color-primary-900:
--color-primary-950: /* Darkest */
```

### Semantic Colors

Define colors by purpose:

```css
/* Semantic color mapping */
--color-success: var(--color-green-500);
--color-warning: var(--color-yellow-500);
--color-error: var(--color-red-500);
--color-info: var(--color-blue-500);

/* UI colors */
--color-background: var(--color-white);
--color-surface: var(--color-gray-50);
--color-border: var(--color-gray-200);
--color-text: var(--color-gray-900);
--color-text-muted: var(--color-gray-600);
```

### Color Accessibility

Ensure WCAG compliance:

```javascript
// Color contrast checker
const checkContrast = (fg, bg) => {
  const ratio = getContrastRatio(fg, bg);
  return {
    AA: ratio >= 4.5,      // Normal text
    AAA: ratio >= 7,       // Enhanced
    largeText: ratio >= 3  // Large text
  };
};
```

## Typography

### Font Stacks

Define comprehensive font stacks:

```css
/* Sans-serif stack */
--font-family-sans:
  'Inter',
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  Roboto,
  sans-serif;

/* Serif stack */
--font-family-serif:
  'Crimson Text',
  Georgia,
  Cambria,
  'Times New Roman',
  serif;

/* Monospace stack */
--font-family-mono:
  'Fira Code',
  'JetBrains Mono',
  Consolas,
  'Courier New',
  monospace;
```

### Type Scale

Modular scale for consistent sizing:

```css
/* Base size and scale ratio */
--font-size-base: 1rem;      /* 16px */
--font-scale-ratio: 1.25;    /* Major third */

/* Computed sizes */
--font-size-xs: calc(var(--font-size-base) / var(--font-scale-ratio) / var(--font-scale-ratio));
--font-size-sm: calc(var(--font-size-base) / var(--font-scale-ratio));
--font-size-md: var(--font-size-base);
--font-size-lg: calc(var(--font-size-base) * var(--font-scale-ratio));
--font-size-xl: calc(var(--font-size-base) * var(--font-scale-ratio) * var(--font-scale-ratio));
--font-size-2xl: calc(var(--font-size-base) * var(--font-scale-ratio) * var(--font-scale-ratio) * var(--font-scale-ratio));
```

### Font Loading

Optimize font loading:

```html
<!-- Preconnect to font services -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Font loading strategy -->
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>
```

## Component Theming

### Button Variations

```css
/* Button base */
.btn {
  background: var(--color-primary-500);
  color: var(--color-white);
  border-radius: var(--border-radius-base);
  padding: var(--spacing-2) var(--spacing-4);
  font-family: var(--font-family-sans);
}

/* Button variations */
.btn-secondary {
  background: var(--color-secondary-500);
}

.btn-accent {
  background: var(--color-accent);
}

.btn-outline {
  background: transparent;
  border: 2px solid var(--color-primary-500);
  color: var(--color-primary-500);
}
```

### Card Styling

```css
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-sm);
}

.card-elevated {
  box-shadow: var(--shadow-lg);
}
```

### Form Elements

```css
.input {
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-base);
  padding: var(--spacing-2) var(--spacing-3);
  font-family: var(--font-family-sans);
  background: var(--color-background);
}

.input:focus {
  border-color: var(--color-primary-500);
  outline: 2px solid transparent;
  outline-offset: 2px;
  box-shadow: 0 0 0 3px var(--color-primary-100);
}
```

## Dark Mode Support

### Automatic Dark Mode

```css
/* Light mode (default) */
:root {
  --color-background: #ffffff;
  --color-text: #0f172a;
  --color-surface: #f8fafc;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0f172a;
    --color-text: #f8fafc;
    --color-surface: #1e293b;
  }
}
```

### Manual Dark Mode Toggle

```javascript
// Theme toggle implementation
const toggleDarkMode = () => {
  const html = document.documentElement;
  const isDark = html.classList.contains('dark');

  if (isDark) {
    html.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
};

// Restore user preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' ||
    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark');
}
```

### Dark Mode Styles

```css
/* Dark mode specific styles */
.dark {
  --color-background: #0f172a;
  --color-text: #f8fafc;
  --color-surface: #1e293b;
  --color-border: #334155;

  /* Adjust shadows for dark mode */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}
```

## Performance Optimization

### Critical CSS

Inline critical theme variables:

```html
<style>
  /* Critical theme variables */
  :root {
    --color-primary-500: #3b82f6;
    --color-background: #ffffff;
    --color-text: #0f172a;
    --font-family-sans: 'Inter', sans-serif;
  }
</style>
```

### CSS Custom Property Fallbacks

Provide fallbacks for older browsers:

```css
.element {
  /* Fallback */
  color: #3b82f6;
  /* Modern browsers */
  color: var(--color-primary-500, #3b82f6);
}
```

### Theme Loading Strategy

```javascript
// Lazy load non-critical themes
const loadTheme = async (themeName) => {
  const theme = await import(`./themes/${themeName}.css`);
  document.adoptedStyleSheets = [...document.adoptedStyleSheets, theme.default];
};
```

## Best Practices

### 1. Naming Conventions

Use consistent naming:
- Colors: `--color-{name}-{shade}`
- Spacing: `--spacing-{size}`
- Typography: `--font-{property}-{variant}`
- Borders: `--border-{property}-{size}`

### 2. Theme Testing

Test themes across:
- Different browsers
- Light/dark modes
- Various screen sizes
- Accessibility tools
- Print styles

### 3. Documentation

Document your themes:

```css
/* Healthcare Theme
 * Target: Medical practices, hospitals
 * Mood: Professional, trustworthy, calming
 * Primary: Cyan (#0891b2)
 * Secondary: Emerald (#10b981)
 */
.theme-healthcare {
  /* ... */
}
```

### 4. Maintenance

Keep themes maintainable:
- Use CSS variables consistently
- Avoid hardcoded values
- Document color choices
- Test color contrast
- Version control themes

## Theme Gallery

### Live Preview

```html
<div class="theme-preview-grid">
  <div class="theme-modern-business">
    <!-- Preview content -->
  </div>
  <div class="theme-healthcare">
    <!-- Preview content -->
  </div>
  <div class="theme-tech-startup">
    <!-- Preview content -->
  </div>
</div>
```

### Interactive Theme Switcher

```javascript
// Theme switcher component
const ThemeSwitcher = () => {
  const themes = [
    'modern-business',
    'healthcare',
    'tech-startup',
    'creative-agency'
  ];

  return (
    <select onChange={(e) => applyTheme(e.target.value)}>
      {themes.map(theme => (
        <option value={theme}>{theme}</option>
      ))}
    </select>
  );
};
```

## Troubleshooting

### Common Issues

1. **Theme not applying**: Check class name and safelist configuration
2. **Colors look wrong**: Verify CSS variable names and values
3. **Dark mode issues**: Check media queries and class toggling
4. **Font not loading**: Verify font URLs and preconnect tags
5. **Poor contrast**: Use accessibility tools to check ratios

### Debug Mode

Enable theme debugging:

```javascript
// Show active theme variables
const debugTheme = () => {
  const computed = getComputedStyle(document.documentElement);
  const themeVars = {};

  for (const prop of computed) {
    if (prop.startsWith('--')) {
      themeVars[prop] = computed.getPropertyValue(prop);
    }
  }

  console.table(themeVars);
};
```

## Examples

See complete theme implementations in [examples](../examples/):
- `basic-business/theme.css` - Simple, clean theme
- `creative-agency/theme.css` - Bold, artistic theme
- `healthcare-practice/theme.css` - Professional medical theme
- `tech-startup/theme.css` - Modern tech theme

## Resources

- [CSS Custom Properties Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Web Content Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Color Theory for Designers](https://www.interaction-design.org/literature/topics/color-theory)
- [Typography Best Practices](https://www.typography.com/blog/best-practices)