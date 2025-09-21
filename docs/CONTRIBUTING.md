# Contributing Guidelines

## Welcome Contributors! 🎉

Thank you for your interest in contributing to the Dynamic Website Template project! This document provides guidelines and instructions for contributing to make the process smooth and enjoyable for everyone.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Development Standards](#development-standards)
- [Submission Process](#submission-process)
- [Review Process](#review-process)
- [Community](#community)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors. We pledge to:

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

### Expected Behavior

- Be respectful and considerate
- Accept feedback gracefully
- Focus on collaboration over conflict
- Help others when possible
- Follow project guidelines

### Unacceptable Behavior

- Harassment of any kind
- Discriminatory language or actions
- Personal attacks
- Trolling or inflammatory comments
- Publishing private information without consent

## Getting Started

### Prerequisites

Before contributing, ensure you have:

- Node.js 18+ installed
- Yarn package manager
- Git configured with your GitHub account
- Basic knowledge of Astro, TypeScript, and Tailwind CSS
- Familiarity with our [Development Guide](DEVELOPMENT.md)

### First-Time Contributors

New to open source? Here's how to get started:

1. **Find an issue:** Look for issues labeled `good first issue` or `help wanted`
2. **Comment on the issue:** Let us know you're working on it
3. **Fork the repository:** Create your own copy
4. **Make changes:** Follow our development standards
5. **Submit a PR:** We'll review and provide feedback

## Development Setup

### Fork and Clone

```bash
# Fork the repository on GitHub first, then:
git clone https://github.com/YOUR_USERNAME/base-template.git
cd base-template

# Add upstream remote
git remote add upstream https://github.com/WebAsAService/base-template.git
```

### Install Dependencies

```bash
# Install project dependencies
yarn install

# Install development tools
yarn install --dev
```

### Set Up Development Environment

```bash
# Copy environment variables
cp .env.example .env.local

# Start development server
yarn dev
```

### Verify Setup

```bash
# Run tests to ensure everything works
yarn test

# Check linting
yarn lint

# Build project
yarn build
```

## How to Contribute

### Types of Contributions

#### 1. Bug Reports 🐛

Found a bug? Help us fix it:

```markdown
**Bug Description:**
Clear description of the bug

**Steps to Reproduce:**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**
- OS: [e.g., macOS 13.0]
- Node version: [e.g., 18.12.0]
- Browser: [e.g., Chrome 109]

**Screenshots:**
If applicable
```

#### 2. Feature Requests ✨

Have an idea? Share it:

```markdown
**Feature Description:**
Clear description of the feature

**Problem it Solves:**
What problem does this address?

**Proposed Solution:**
How would you implement it?

**Alternatives Considered:**
Other solutions you've thought about

**Additional Context:**
Any other relevant information
```

#### 3. Code Contributions 💻

Ready to code? Follow these steps:

1. **Choose an issue** or create one
2. **Create a branch** with descriptive name
3. **Write clean code** following standards
4. **Add tests** for new functionality
5. **Update documentation** if needed
6. **Submit PR** with clear description

#### 4. Documentation Improvements 📚

Help improve our docs:

- Fix typos and grammar
- Add missing information
- Improve examples
- Translate documentation
- Add tutorials or guides

#### 5. Design Contributions 🎨

Enhance the visual experience:

- Create new themes
- Improve UI components
- Design icons or graphics
- Enhance accessibility
- Optimize responsive design

## Development Standards

### Code Style

#### JavaScript/TypeScript

```typescript
// Use meaningful variable names
const userEmail = 'user@example.com'; // Good
const e = 'user@example.com'; // Bad

// Use async/await over promises
// Good
async function fetchData() {
  try {
    const data = await api.get('/data');
    return data;
  } catch (error) {
    console.error('Failed to fetch:', error);
  }
}

// Add JSDoc comments for functions
/**
 * Validates user email format
 * @param {string} email - User email address
 * @returns {boolean} True if valid email
 */
function validateEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
```

#### Astro Components

```astro
---
// Always define Props interface
export interface Props {
  title: string;
  description?: string;
  variant?: 'primary' | 'secondary';
}

// Destructure props with defaults
const {
  title,
  description = '',
  variant = 'primary'
} = Astro.props;

// Component logic here
const processedTitle = title.trim();
---

<!-- Use semantic HTML -->
<section class={`component ${variant}`}>
  <h2>{processedTitle}</h2>
  {description && <p>{description}</p>}
  <slot />
</section>

<style>
  /* Use CSS custom properties */
  .component {
    padding: var(--spacing-4);
    background: var(--color-surface);
  }
</style>
```

#### CSS/Styling

```css
/* Use consistent naming */
.component-name { /* Block */ }
.component-name__element { /* Element */ }
.component-name--modifier { /* Modifier */ }

/* Use CSS custom properties */
:root {
  --color-primary: #3b82f6;
  --spacing-unit: 0.25rem;
  --spacing-4: calc(var(--spacing-unit) * 4);
}

/* Mobile-first responsive design */
.element {
  /* Mobile styles (default) */
  padding: 1rem;
}

@media (min-width: 768px) {
  .element {
    /* Tablet and up */
    padding: 2rem;
  }
}
```

### Git Commit Messages

Follow the Conventional Commits specification:

```bash
# Format
<type>(<scope>): <subject>

# Types
feat:     New feature
fix:      Bug fix
docs:     Documentation changes
style:    Code style changes (formatting, etc.)
refactor: Code refactoring
perf:     Performance improvements
test:     Adding or updating tests
chore:    Maintenance tasks

# Examples
feat(theme): add dark mode support
fix(navigation): resolve mobile menu bug
docs(api): update configuration examples
style(components): format button styles
refactor(utils): simplify validation logic
perf(images): optimize loading strategy
test(config): add validation tests
chore(deps): update dependencies
```

### Branch Naming

```bash
# Format
<type>/<description>

# Examples
feature/add-newsletter-section
fix/mobile-navigation-bug
docs/update-api-reference
refactor/theme-system
chore/update-dependencies
```

### Testing Requirements

```javascript
// Every new feature needs tests
describe('Feature Name', () => {
  it('should do expected behavior', () => {
    // Arrange
    const input = setupTestData();

    // Act
    const result = performAction(input);

    // Assert
    expect(result).toBe(expected);
  });

  it('should handle edge cases', () => {
    // Test edge cases and error conditions
  });
});
```

### Documentation Standards

```markdown
# Component/Feature Name

## Overview
Brief description of what this does

## Usage
How to use this component/feature

## API
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| prop1 | string | '' | Description |

### Examples
\`\`\`astro
<Component prop1="value" />
\`\`\`

## Notes
Any important information
```

## Submission Process

### Creating a Pull Request

1. **Update your fork:**

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

2. **Create feature branch:**

```bash
git checkout -b feature/your-feature-name
```

3. **Make changes and commit:**

```bash
git add .
git commit -m "feat: add amazing feature"
```

4. **Push to your fork:**

```bash
git push origin feature/your-feature-name
```

5. **Create PR on GitHub:**

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Changes Made
- Change 1
- Change 2

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed

## Screenshots
If applicable

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
- [ ] All tests passing
- [ ] No console errors

## Related Issues
Fixes #123
```

### PR Best Practices

1. **Keep PRs focused:** One feature/fix per PR
2. **Write clear descriptions:** Explain what and why
3. **Add screenshots:** For UI changes
4. **Reference issues:** Link related issues
5. **Update tests:** Add/modify tests as needed
6. **Update docs:** Keep documentation current

## Review Process

### What We Look For

1. **Code Quality**
   - Clean, readable code
   - Proper error handling
   - Performance considerations
   - Security best practices

2. **Testing**
   - Adequate test coverage
   - Tests pass locally
   - Edge cases handled

3. **Documentation**
   - Code comments where needed
   - Updated documentation
   - Clear commit messages

4. **Compatibility**
   - Works across browsers
   - Mobile responsive
   - Backwards compatible

### Review Timeline

- **Initial Review:** Within 48 hours
- **Follow-up:** Within 24 hours of updates
- **Merge Decision:** After all checks pass

### Handling Feedback

```bash
# Make requested changes
git add .
git commit -m "fix: address review feedback"
git push origin feature/your-feature-name
```

## Community

### Communication Channels

- **GitHub Issues:** Bug reports and features
- **GitHub Discussions:** General questions
- **Discord:** Real-time chat (coming soon)
- **Twitter:** Updates and announcements

### Getting Help

If you need help:

1. Check existing documentation
2. Search closed issues
3. Ask in GitHub Discussions
4. Reach out on Discord

### Recognition

We value all contributions! Contributors are:

- Added to our contributors list
- Mentioned in release notes
- Given credit in documentation
- Invited to contributor meetings

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Thank You! 🙏

Your contributions make this project better for everyone. We appreciate your time and effort in helping improve the Dynamic Website Template!

---

**Happy Contributing! 🚀**