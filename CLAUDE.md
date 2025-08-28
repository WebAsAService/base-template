# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This project uses Yarn for package management. All commands are run from the root directory:

| Command | Action |
|---------|--------|
| `yarn install` | Install all dependencies |
| `yarn dev` | Start development server at http://localhost:3000 |
| `yarn build` | Build production site to `./dist/` |
| `yarn preview` | Preview production build locally |
| `yarn astro ...` | Run Astro CLI commands (add integrations, type check, etc.) |

## Project Architecture

This is a **multi-client Astro template** designed for a "Website as a Service" (WaaS) business model. The architecture enables rapid customization for different clients while maintaining a shared codebase.

### Core Architecture Concepts

**Theme System**: The project uses a CSS variable-based theming system that allows complete visual customization per client:
- Base theme variables defined in `src/styles/theme.css`
- Client-specific overrides in `src/styles/client-themes.css`
- Themes applied via CSS classes on the `<html>` element
- Tailwind CSS configured to use CSS variables for all colors

**Client Structure**: Each client gets their own namespace:
- Client pages: `src/pages/clients/{client-name}/`
- Client components: `src/components/clients/{client-name}/`
- Client assets: `public/images/clients/{client-name}/`
- Client themes: CSS classes like `theme-{client-name}`

**Shared Components**: Reusable sections in `src/components/sections/` that work across all clients:
- `HeroSection.astro` - Landing page hero
- `FeaturesSection.astro` - Product/service features
- `PricingSection.astro` - Pricing tables
- `TestimonialsSection.astro` - Customer testimonials
- `ContactSection.astro` - Contact forms

### Path Aliases

The project uses Vite path aliases for clean imports:
- `@` → `./src`
- `@components` → `./src/components`
- `@layouts` → `./src/layouts`
- `@styles` → `./src/styles`
- `@utils` → `./src/utils`

### Styling System

**Tailwind Configuration**: 
- Uses CSS variables for all theme colors (primary, secondary, accent)
- Responsive breakpoints include custom 'xs' (480px)
- Safelist includes all theme class names to prevent purging

**Color System**:
- Primary: Main brand color (50-950 scale)
- Secondary: Supporting color palette
- Accent: Call-to-action and highlight color
- All colors use CSS variables for easy theme switching

**Typography**:
- Font families defined as CSS variables
- Sans, serif, and mono font stacks configurable per theme
- Custom typography classes in `src/styles/typography.css`

### Client Implementation Pattern

1. **Create client directory structure**:
   ```
   src/pages/clients/{client-name}/
   src/components/clients/{client-name}/
   public/images/clients/{client-name}/
   ```

2. **Define client theme** in `src/styles/client-themes.css`:
   - Override color variables
   - Set typography preferences
   - Adjust border radius and spacing

3. **Create client page** using Layout component:
   - Pass `clientTheme` prop to apply theme class
   - Mix shared and custom components as needed

4. **Custom components** for client-specific needs go in `src/components/clients/{client-name}/`

### Layout System

**Main Layout** (`src/layouts/Layout.astro`):
- Accepts `title`, `description`, and `clientTheme` props
- Applies theme class to both `<html>` and `<body>` elements
- Includes debug indicators for theme verification
- Imports global styles and sets up viewport meta tags

**Header/Footer**: Shared layout components with customizable:
- Logo paths
- Color schemes via Tailwind classes
- Navigation items
- Background and text colors

## File Structure Guidelines

When working with this codebase:

1. **New shared components** go in `src/components/sections/` or `src/components/ui/`
2. **Client-specific components** go in `src/components/clients/{client-name}/`
3. **Global styles** go in `src/styles/global.css`
4. **Theme definitions** go in `src/styles/client-themes.css`
5. **Client assets** go in `public/images/clients/{client-name}/`

## Theme Development

To create a new client theme:

1. Add theme class to `tailwind.config.js` safelist
2. Define theme in `src/styles/client-themes.css` with:
   - Color palette (primary, secondary, accent)
   - Typography settings
   - Border radius preferences
   - Background colors for visual distinction
3. Create client page that applies the theme class
4. Test theme switching using the theme demo pages

The theming system is designed to be completely self-contained - changing CSS variables automatically updates all Tailwind utilities that reference those variables.