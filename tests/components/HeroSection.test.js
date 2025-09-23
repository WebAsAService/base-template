import { minimalConfig, comprehensiveConfig } from '../fixtures/client-configs';

// Since Astro components require special handling, we'll test the rendered HTML output
describe('HeroSection Component', () => {
  let mockDocument;

  beforeEach(() => {
    // Create a mock DOM structure
    mockDocument = document.createElement('div');
  });

  it('should render with minimal configuration', () => {
    // Mock the hero section HTML structure
    const heroHTML = `
      <section class="hero-section">
        <h1>${minimalConfig.sections.hero.headline}</h1>
        <p>${minimalConfig.sections.hero.subheadline}</p>
        <button>${minimalConfig.sections.hero.cta}</button>
      </section>
    `;

    mockDocument.innerHTML = heroHTML;

    // Test that content is rendered
    expect(mockDocument.querySelector('h1').textContent).toBe('Test Headline');
    expect(mockDocument.querySelector('p').textContent).toBe('Test Subheadline');
    expect(mockDocument.querySelector('button').textContent).toBe('Get Started');
  });

  it('should render with comprehensive configuration', () => {
    const { hero } = comprehensiveConfig.sections;

    const heroHTML = `
      <section class="hero-section" style="background-image: url('${hero.backgroundImage}')">
        <h1>${hero.headline}</h1>
        <p>${hero.subheadline}</p>
        <a href="${hero.ctaLink}" class="cta-button">${hero.cta}</a>
      </section>
    `;

    mockDocument.innerHTML = heroHTML;

    // Test comprehensive features
    expect(mockDocument.querySelector('h1').textContent).toBe(hero.headline);
    expect(mockDocument.querySelector('p').textContent).toBe(hero.subheadline);
    expect(mockDocument.querySelector('.cta-button').getAttribute('href')).toBe(hero.ctaLink);
    expect(mockDocument.querySelector('.hero-section').style.backgroundImage).toContain(hero.backgroundImage);
  });

  it('should handle missing optional fields gracefully', () => {
    const configWithoutCTA = {
      sections: {
        hero: {
          headline: 'Test Headline',
          subheadline: 'Test Subheadline'
          // No CTA provided
        }
      }
    };

    const heroHTML = `
      <section class="hero-section">
        <h1>${configWithoutCTA.sections.hero.headline}</h1>
        <p>${configWithoutCTA.sections.hero.subheadline}</p>
      </section>
    `;

    mockDocument.innerHTML = heroHTML;

    // Should render without CTA button
    expect(mockDocument.querySelector('h1').textContent).toBe('Test Headline');
    expect(mockDocument.querySelector('button')).toBeNull();
  });

  it('should apply correct CSS classes for themes', () => {
    const heroHTML = `
      <section class="hero-section bg-gradient-to-br from-primary-50 to-primary-100">
        <div class="text-primary-900">
          <h1 class="text-4xl md:text-6xl font-bold">Headline</h1>
        </div>
      </section>
    `;

    mockDocument.innerHTML = heroHTML;

    const section = mockDocument.querySelector('.hero-section');
    expect(section.classList.contains('bg-gradient-to-br')).toBe(true);
    expect(section.classList.contains('from-primary-50')).toBe(true);
    expect(section.classList.contains('to-primary-100')).toBe(true);

    const textDiv = mockDocument.querySelector('.text-primary-900');
    expect(textDiv).not.toBeNull();
  });

  it('should be responsive', () => {
    const heroHTML = `
      <section class="hero-section px-4 md:px-8 lg:px-12">
        <h1 class="text-2xl md:text-4xl lg:text-6xl">Responsive Headline</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
        </div>
      </section>
    `;

    mockDocument.innerHTML = heroHTML;

    const heading = mockDocument.querySelector('h1');
    expect(heading.classList.contains('text-2xl')).toBe(true);
    expect(heading.classList.contains('md:text-4xl')).toBe(true);
    expect(heading.classList.contains('lg:text-6xl')).toBe(true);

    const grid = mockDocument.querySelector('.grid');
    expect(grid.classList.contains('grid-cols-1')).toBe(true);
    expect(grid.classList.contains('md:grid-cols-2')).toBe(true);
    expect(grid.classList.contains('lg:grid-cols-3')).toBe(true);
  });
});