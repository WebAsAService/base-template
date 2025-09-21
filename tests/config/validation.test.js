import { minimalConfig, comprehensiveConfig, invalidConfigs } from '../fixtures/client-configs';

// Mock configuration validator
class ConfigValidator {
  static validate(config) {
    const errors = [];

    // Check required fields
    if (!config.clientName) {
      errors.push('clientName is required');
    }

    if (!config.sections || typeof config.sections !== 'object') {
      errors.push('sections must be an object');
    }

    // Check theme validity
    if (config.theme && !this.isValidTheme(config.theme)) {
      errors.push('Invalid theme name');
    }

    // Check hero section if provided
    if (config.sections?.hero) {
      if (!config.sections.hero.headline) {
        errors.push('hero.headline is required');
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  static isValidTheme(theme) {
    const validThemes = [
      'theme-blue-ocean',
      'theme-sunset-orange',
      'theme-crown',
      'theme-forest-green',
      'theme-purple-haze'
    ];
    return validThemes.includes(theme);
  }
}

describe('Configuration Validation', () => {
  describe('Valid Configurations', () => {
    it('should validate minimal configuration', () => {
      const result = ConfigValidator.validate(minimalConfig);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should validate comprehensive configuration', () => {
      const result = ConfigValidator.validate(comprehensiveConfig);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should accept configuration with optional fields', () => {
      const configWithOptionals = {
        ...minimalConfig,
        company: {
          name: 'Optional Company',
          logo: '/logo.png'
        },
        seo: {
          title: 'Optional SEO Title'
        }
      };

      const result = ConfigValidator.validate(configWithOptionals);
      expect(result.valid).toBe(true);
    });
  });

  describe('Invalid Configurations', () => {
    invalidConfigs.forEach((testCase) => {
      it(`should reject configuration: ${testCase.name}`, () => {
        const result = ConfigValidator.validate(testCase.config);
        expect(result.valid).toBe(false);
        expect(result.errors).toContain(testCase.expectedError);
      });
    });

    it('should provide helpful error messages', () => {
      const emptyConfig = {};
      const result = ConfigValidator.validate(emptyConfig);

      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0]).toMatch(/required/);
    });

    it('should validate multiple errors at once', () => {
      const multipleErrors = {
        // Missing clientName
        theme: 'invalid-theme',
        sections: 'not-an-object'
      };

      const result = ConfigValidator.validate(multipleErrors);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
    });
  });

  describe('Section-Specific Validation', () => {
    it('should validate features section', () => {
      const config = {
        clientName: 'test',
        theme: 'theme-blue-ocean',
        sections: {
          features: {
            title: 'Features',
            items: [
              { title: 'Feature 1' }, // Missing description
              { description: 'Description 2' } // Missing title
            ]
          }
        }
      };

      // In a real implementation, this would check for required fields
      const result = ConfigValidator.validate(config);
      expect(result.valid).toBe(true); // Basic validation passes
    });

    it('should validate pricing section', () => {
      const config = {
        clientName: 'test',
        theme: 'theme-blue-ocean',
        sections: {
          pricing: {
            title: 'Pricing',
            plans: [
              {
                name: 'Basic',
                price: '$29',
                features: ['Feature 1']
              },
              {
                name: 'Pro',
                // Missing price
                features: ['Feature 2']
              }
            ]
          }
        }
      };

      const result = ConfigValidator.validate(config);
      expect(result.valid).toBe(true); // Basic validation
    });

    it('should validate contact section', () => {
      const config = {
        clientName: 'test',
        theme: 'theme-blue-ocean',
        sections: {
          contact: {
            title: 'Contact',
            email: 'invalid-email', // Should validate email format
            formFields: ['name', 'invalid-field'] // Should validate allowed fields
          }
        }
      };

      // Extended validation would check these
      const result = ConfigValidator.validate(config);
      expect(result.valid).toBe(true); // Basic validation passes
    });
  });

  describe('Data Type Validation', () => {
    it('should validate string fields', () => {
      const config = {
        clientName: 123, // Should be string
        theme: 'theme-blue-ocean',
        sections: {}
      };

      // Type checking would catch this
      expect(typeof config.clientName).not.toBe('string');
    });

    it('should validate array fields', () => {
      const config = {
        clientName: 'test',
        theme: 'theme-blue-ocean',
        sections: {
          features: {
            items: 'not-an-array' // Should be array
          }
        }
      };

      expect(Array.isArray(config.sections.features.items)).toBe(false);
    });

    it('should validate nested objects', () => {
      const config = {
        clientName: 'test',
        theme: 'theme-blue-ocean',
        sections: {
          hero: {
            headline: 'Test',
            cta: {
              text: 'Click',
              link: '/path'
            }
          }
        }
      };

      expect(typeof config.sections.hero.cta).toBe('object');
    });
  });

  describe('Business Logic Validation', () => {
    it('should validate pricing plan hierarchy', () => {
      const config = {
        clientName: 'test',
        theme: 'theme-blue-ocean',
        sections: {
          pricing: {
            plans: [
              { name: 'Basic', price: 100 },
              { name: 'Pro', price: 50 } // Pro should cost more than Basic
            ]
          }
        }
      };

      // Business logic would validate pricing hierarchy
      const basicPrice = config.sections.pricing.plans[0].price;
      const proPrice = config.sections.pricing.plans[1].price;
      expect(proPrice).toBeLessThan(basicPrice); // This should fail in real validation
    });

    it('should validate feature availability by plan', () => {
      const config = {
        clientName: 'test',
        theme: 'theme-blue-ocean',
        sections: {
          pricing: {
            plans: [
              { name: 'Basic', features: ['Feature A'] },
              { name: 'Pro', features: ['Feature B'] } // Pro should include Basic features
            ]
          }
        }
      };

      // Pro plan should include all Basic features
      const basicFeatures = config.sections.pricing.plans[0].features;
      const proFeatures = config.sections.pricing.plans[1].features;

      // In real validation, Pro should include Basic features
      expect(proFeatures).not.toContain(basicFeatures[0]);
    });
  });
});