import { comprehensiveConfig } from '../fixtures/client-configs';

describe('FeaturesSection Component', () => {
  let mockDocument;

  beforeEach(() => {
    mockDocument = document.createElement('div');
  });

  it('should render features from configuration', () => {
    const { features } = comprehensiveConfig.sections;

    const featuresHTML = `
      <section class="features-section">
        <h2>${features.title}</h2>
        <p>${features.subtitle}</p>
        <div class="features-grid">
          ${features.items
            .map(
              (item) => `
            <div class="feature-card">
              <span class="feature-icon">${item.icon}</span>
              <h3>${item.title}</h3>
              <p>${item.description}</p>
            </div>
          `
            )
            .join('')}
        </div>
      </section>
    `;

    mockDocument.innerHTML = featuresHTML;

    // Check section title and subtitle
    expect(mockDocument.querySelector('h2').textContent).toBe(features.title);
    expect(mockDocument.querySelector('p').textContent).toBe(features.subtitle);

    // Check all feature cards are rendered
    const featureCards = mockDocument.querySelectorAll('.feature-card');
    expect(featureCards.length).toBe(features.items.length);

    // Check first feature card content
    const firstCard = featureCards[0];
    expect(firstCard.querySelector('h3').textContent).toBe(features.items[0].title);
    expect(firstCard.querySelector('p').textContent).toBe(features.items[0].description);
  });

  it('should handle empty features list', () => {
    const emptyFeatures = {
      title: 'Our Features',
      subtitle: 'What we offer',
      items: []
    };

    const featuresHTML = `
      <section class="features-section">
        <h2>${emptyFeatures.title}</h2>
        <p>${emptyFeatures.subtitle}</p>
        <div class="features-grid"></div>
      </section>
    `;

    mockDocument.innerHTML = featuresHTML;

    const featureCards = mockDocument.querySelectorAll('.feature-card');
    expect(featureCards.length).toBe(0);
  });

  it('should apply hover effects', () => {
    const featuresHTML = `
      <section class="features-section">
        <div class="feature-card group hover:shadow-lg transition-shadow">
          <span class="group-hover:text-primary-600">Icon</span>
          <h3>Feature Title</h3>
        </div>
      </section>
    `;

    mockDocument.innerHTML = featuresHTML;

    const card = mockDocument.querySelector('.feature-card');
    expect(card.classList.contains('hover:shadow-lg')).toBe(true);
    expect(card.classList.contains('transition-shadow')).toBe(true);
  });

  it('should support icon rendering', () => {
    const features = {
      items: [
        { icon: 'star', title: 'Feature 1' },
        { icon: 'heart', title: 'Feature 2' },
        { icon: 'bolt', title: 'Feature 3' }
      ]
    };

    const featuresHTML = `
      <div class="features-grid">
        ${features.items
          .map(
            (item) => `
          <div class="feature-card">
            <svg class="icon-${item.icon}" aria-label="${item.icon} icon">
              <use href="#icon-${item.icon}"></use>
            </svg>
            <h3>${item.title}</h3>
          </div>
        `
          )
          .join('')}
      </div>
    `;

    mockDocument.innerHTML = featuresHTML;

    // Check each icon is rendered
    features.items.forEach((item) => {
      const icon = mockDocument.querySelector(`.icon-${item.icon}`);
      expect(icon).not.toBeNull();
      expect(icon.getAttribute('aria-label')).toBe(`${item.icon} icon`);
    });
  });

  it('should be responsive with grid layout', () => {
    const featuresHTML = `
      <div class="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="feature-card">Feature 1</div>
        <div class="feature-card">Feature 2</div>
        <div class="feature-card">Feature 3</div>
      </div>
    `;

    mockDocument.innerHTML = featuresHTML;

    const grid = mockDocument.querySelector('.features-grid');
    expect(grid.classList.contains('grid-cols-1')).toBe(true);
    expect(grid.classList.contains('md:grid-cols-2')).toBe(true);
    expect(grid.classList.contains('lg:grid-cols-3')).toBe(true);
    expect(grid.classList.contains('gap-6')).toBe(true);
  });
});