# Dynamic Website Template with AI Generation

A powerful, multi-client Astro template designed for "Website as a Service" (WaaS) with automated AI content and theme generation using Claude AI.

## 🚀 Features

### Core Capabilities
- **Dynamic Configuration System** - Single configuration object drives entire website
- **Multi-Client Architecture** - Support multiple clients from a single codebase
- **AI-Powered Generation** - Automated content and theme creation with Claude AI
- **Industry-Specific Themes** - Pre-configured themes for different business types
- **Responsive Design** - Mobile-first approach with complete device compatibility
- **Performance Optimized** - Built with Astro for blazing-fast load times

### AI Integration
- **Automated Content Generation** - Business-appropriate taglines, descriptions, and features
- **Smart Theme Creation** - Logo color extraction and industry-appropriate styling
- **Pull Request Workflow** - Automated PR creation with generated content
- **Quality Validation** - AI-powered content review and optimization

### Theme System
- **CSS Variable Architecture** - Complete theming via CSS custom properties
- **Dark Mode Support** - Built-in light/dark theme switching
- **Industry Presets** - Healthcare, tech, creative agency, and more
- **Component Theming** - Consistent styling across all components

## 📚 Documentation

- [Configuration Guide](docs/CONFIGURATION.md) - Complete clientConfig documentation
- [Theme Customization](docs/THEMES.md) - Creating and customizing themes
- [AI Workflow](docs/AI_WORKFLOW.md) - Understanding the AI generation process
- [Development Guide](docs/DEVELOPMENT.md) - Setting up your development environment
- [Contributing](docs/CONTRIBUTING.md) - How to contribute to the project
- [API Reference](docs/API.md) - Complete API documentation
- [Claude Integration](docs/CLAUDE_INTEGRATION.md) - Claude AI setup and configuration
- [Enhanced Theme System](docs/ENHANCED_THEME_SYSTEM.md) - Advanced theming features

## 🏃 Quick Start

### Prerequisites
- Node.js 18+
- Yarn package manager
- GitHub account (for AI workflow)
- Claude API key (optional, for AI generation)

### Installation

```bash
# Clone the repository
git clone https://github.com/WebAsAService/base-template.git
cd base-template

# Install dependencies
yarn install

# Start development server
yarn dev
```

Your site will be available at `http://localhost:3000`

### Basic Configuration

Create your client configuration in `src/data/clients/your-business.js`:

```javascript
export const clientConfig = {
  businessName: "Your Business Name",
  tagline: "Your compelling tagline",
  description: "Brief business description",

  contact: {
    email: "contact@yourbusiness.com",
    phone: "(555) 123-4567",
    address: {
      street: "123 Main St",
      city: "Your City",
      state: "ST",
      zip: "12345"
    }
  },

  theme: {
    name: "modern-business",
    industry: "technology"
  }
};
```

## 🛠️ Development Commands

| Command | Action |
|---------|--------|
| `yarn install` | Install all dependencies |
| `yarn dev` | Start development server at http://localhost:3000 |
| `yarn build` | Build production site to `./dist/` |
| `yarn preview` | Preview production build locally |
| `yarn astro ...` | Run Astro CLI commands |

## 📂 Project Structure

```
base-template/
├── src/
│   ├── components/        # Reusable components
│   │   ├── sections/      # Page sections (Hero, Features, etc.)
│   │   ├── ui/            # UI components
│   │   └── clients/       # Client-specific components
│   ├── layouts/           # Page layouts
│   ├── pages/             # Route pages
│   │   └── clients/       # Client-specific pages
│   ├── styles/            # Global styles and themes
│   ├── data/              # Configuration and data
│   └── utils/             # Utility functions
├── public/                # Static assets
│   └── images/
│       └── clients/       # Client-specific assets
├── docs/                  # Documentation
├── examples/              # Example configurations
└── scripts/               # Build and automation scripts
```

## 🎨 Theme System

The template uses a powerful CSS variable-based theme system:

- **Primary Colors** - Main brand colors (50-950 scale)
- **Secondary Colors** - Supporting palette
- **Accent Colors** - CTAs and highlights
- **Typography** - Customizable font stacks
- **Spacing & Radius** - Consistent design tokens

See [Theme Customization Guide](docs/THEMES.md) for detailed documentation.

## 🤖 AI Generation Workflow

1. **Input Business Information** - Provide logo and basic details
2. **AI Content Generation** - Claude creates appropriate content
3. **Theme Creation** - Industry-specific styling generated
4. **Automated PR** - Review and approve changes
5. **Deploy** - Push to production

See [AI Workflow Documentation](docs/AI_WORKFLOW.md) for complete details.

## 💼 Example Configurations

Check out the [examples](examples/) directory for ready-to-use configurations:

- **Basic Business** - Simple service business setup
- **Creative Agency** - Bold, portfolio-focused design
- **Healthcare Practice** - Trust-building medical theme
- **Tech Startup** - Modern, technical aesthetic

## 🚀 Deployment

The template can be deployed to any static hosting service:

### Vercel
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm i -g netlify-cli
netlify deploy
```

### GitHub Pages
See [Astro deployment docs](https://docs.astro.build/en/guides/deploy/github/) for GitHub Actions setup.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](docs/CONTRIBUTING.md) for details on:

- Code style and standards
- Development workflow
- Testing requirements
- Pull request process

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- [Documentation](docs/)
- [GitHub Issues](https://github.com/WebAsAService/base-template/issues)
- [Discord Community](#) (Coming soon)

## 🙏 Acknowledgments

Built with:
- [Astro](https://astro.build) - The web framework for content-driven websites
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Claude AI](https://anthropic.com) - AI-powered content generation

---

Made with ❤️ by the WaaS team