/**
 * Configuration Validation Utilities
 * 
 * Provides validation functions to ensure client configurations are complete,
 * valid, and safe to use. Includes helper functions for testing configurations
 * and providing fallbacks for missing values.
 * 
 * @author Generated with Claude Code
 * @version 1.0.0
 */

import type { 
  ClientConfig, 
  ConfigValidationResult, 
  ConfigSection,
  ContactInfo,
  HeroSection,
  FeaturesSection,
  ServiceItem,
  TestimonialItem,
  AboutSection,
  ContactSection 
} from './client.types';

// =============================================================================
// VALIDATION FUNCTIONS
// =============================================================================

/**
 * Validates a complete client configuration object
 * @param config - Client configuration to validate
 * @returns Validation result with errors and warnings
 */
export function validateClientConfig(config: unknown): ConfigValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Type check
  if (!config || typeof config !== 'object') {
    errors.push('Configuration must be a valid object');
    return { isValid: false, errors, warnings };
  }

  const clientConfig = config as Partial<ClientConfig>;

  // Required fields validation
  const requiredFields = [
    'businessName',
    'tagline', 
    'description',
    'contact',
    'sections'
  ];

  for (const field of requiredFields) {
    if (!clientConfig[field as keyof ClientConfig]) {
      errors.push(`Required field '${field}' is missing`);
    }
  }

  // Business name validation
  if (clientConfig.businessName && typeof clientConfig.businessName !== 'string') {
    errors.push('businessName must be a string');
  } else if (clientConfig.businessName && clientConfig.businessName.length < 2) {
    warnings.push('businessName should be at least 2 characters long');
  }

  // Contact information validation
  if (clientConfig.contact) {
    validateContactInfo(clientConfig.contact, errors, warnings);
  }

  // Sections validation
  if (clientConfig.sections) {
    validateSections(clientConfig.sections, errors, warnings);
  }

  // Theme class validation
  if (clientConfig.themeClass && !clientConfig.themeClass.startsWith('theme-')) {
    warnings.push('themeClass should start with "theme-" prefix');
  }

  // Logo paths validation
  if (clientConfig.logo) {
    if (clientConfig.logo.main && !isValidImagePath(clientConfig.logo.main)) {
      warnings.push('Logo main path may not be accessible');
    }
    if (clientConfig.logo.dark && !isValidImagePath(clientConfig.logo.dark)) {
      warnings.push('Logo dark path may not be accessible');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Validates contact information structure
 */
function validateContactInfo(contact: Partial<ContactInfo>, errors: string[], warnings: string[]): void {
  // Email validation
  if (contact.email && !isValidEmail(contact.email)) {
    errors.push('Contact email format is invalid');
  }

  // Phone validation
  if (contact.phone && !isValidPhone(contact.phone)) {
    warnings.push('Contact phone format may be invalid');
  }

  // Address validation
  if (contact.address) {
    const requiredAddressFields = ['street', 'city', 'state', 'zipCode', 'country'];
    for (const field of requiredAddressFields) {
      if (!contact.address[field as keyof typeof contact.address]) {
        warnings.push(`Address ${field} is missing`);
      }
    }
  }
}

/**
 * Validates all content sections
 */
function validateSections(sections: Partial<ClientConfig['sections']>, errors: string[], warnings: string[]): void {
  // Hero section validation
  if (sections.hero) {
    validateHeroSection(sections.hero, errors, warnings);
  }

  // Features section validation
  if (sections.features) {
    validateFeaturesSection(sections.features, errors, warnings);
  }

  // Services validation
  if (sections.services && Array.isArray(sections.services)) {
    sections.services.forEach((service, index) => {
      validateServiceItem(service, index, errors, warnings);
    });
  }

  // Testimonials validation
  if (sections.testimonials && Array.isArray(sections.testimonials)) {
    sections.testimonials.forEach((testimonial, index) => {
      validateTestimonialItem(testimonial, index, errors, warnings);
    });
  }

  // About section validation
  if (sections.about) {
    validateAboutSection(sections.about, errors, warnings);
  }

  // Contact section validation
  if (sections.contact) {
    validateContactSection(sections.contact, errors, warnings);
  }
}

/**
 * Validates hero section structure
 */
function validateHeroSection(hero: Partial<HeroSection>, errors: string[], warnings: string[]): void {
  if (!hero.headline) {
    errors.push('Hero section headline is required');
  }

  if (!hero.subheadline) {
    warnings.push('Hero section subheadline is recommended');
  }

  if (hero.media && hero.media.src && !isValidImagePath(hero.media.src)) {
    warnings.push('Hero media source may not be accessible');
  }
}

/**
 * Validates features section structure
 */
function validateFeaturesSection(features: Partial<FeaturesSection>, errors: string[], warnings: string[]): void {
  if (!features.title) {
    warnings.push('Features section title is recommended');
  }

  if (!features.items || !Array.isArray(features.items) || features.items.length === 0) {
    errors.push('Features section must have at least one feature item');
  }

  if (features.items && features.items.length > 6) {
    warnings.push('Consider limiting features to 6 items for better UX');
  }
}

/**
 * Validates individual service item
 */
function validateServiceItem(service: Partial<ServiceItem>, index: number, errors: string[], warnings: string[]): void {
  if (!service.name) {
    errors.push(`Service item ${index + 1} is missing a name`);
  }

  if (!service.price) {
    errors.push(`Service item ${index + 1} is missing price information`);
  }

  if (!service.features || !Array.isArray(service.features) || service.features.length === 0) {
    warnings.push(`Service item ${index + 1} should have feature list`);
  }
}

/**
 * Validates individual testimonial item
 */
function validateTestimonialItem(testimonial: Partial<TestimonialItem>, index: number, errors: string[], warnings: string[]): void {
  if (!testimonial.name) {
    errors.push(`Testimonial ${index + 1} is missing customer name`);
  }

  if (!testimonial.text) {
    errors.push(`Testimonial ${index + 1} is missing testimonial text`);
  }

  if (testimonial.rating && (testimonial.rating < 1 || testimonial.rating > 5)) {
    errors.push(`Testimonial ${index + 1} rating must be between 1 and 5`);
  }
}

/**
 * Validates about section structure
 */
function validateAboutSection(about: Partial<AboutSection>, errors: string[], warnings: string[]): void {
  if (!about.title) {
    warnings.push('About section title is recommended');
  }

  if (!about.content) {
    warnings.push('About section content is recommended');
  }

  if (about.content && about.content.length < 100) {
    warnings.push('About section content should be more descriptive (100+ characters)');
  }
}

/**
 * Validates contact section structure
 */
function validateContactSection(contact: Partial<ContactSection>, errors: string[], warnings: string[]): void {
  if (!contact.title) {
    warnings.push('Contact section title is recommended');
  }

  if (contact.form && contact.form.enabled && (!contact.form.fields || contact.form.fields.length === 0)) {
    errors.push('Contact form is enabled but has no fields defined');
  }
}

// =============================================================================
// VALIDATION HELPERS
// =============================================================================

/**
 * Validates email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates phone number format (flexible - allows various formats)
 */
export function isValidPhone(phone: string): boolean {
  // Remove all non-digit characters for validation
  const digits = phone.replace(/\D/g, '');
  // Should have at least 10 digits
  return digits.length >= 10;
}

/**
 * Validates image path (basic check for common extensions and URLs)
 */
export function isValidImagePath(path: string): boolean {
  if (!path) return false;
  
  // Check for valid URL
  try {
    new URL(path);
    return true;
  } catch {
    // Not a URL, check for relative path with image extension
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    return imageExtensions.some(ext => path.toLowerCase().endsWith(ext));
  }
}

/**
 * Validates URL format
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// =============================================================================
// CONFIGURATION HELPERS
// =============================================================================

/**
 * Checks if a configuration section has meaningful content
 * @param config - Client configuration
 * @param section - Section name to check
 * @returns Whether section is properly configured
 */
export function isSectionComplete(config: ClientConfig, section: ConfigSection): boolean {
  const sectionData = config.sections[section];
  
  if (!sectionData) return false;

  switch (section) {
    case 'hero':
      return !!(sectionData as HeroSection).headline && !!(sectionData as HeroSection).subheadline;
    
    case 'features':
      const features = sectionData as FeaturesSection;
      return !!(features.title && features.items && features.items.length > 0);
    
    case 'services':
      const services = sectionData as ServiceItem[];
      return Array.isArray(services) && services.length > 0 && services.every(s => s.name && s.price);
    
    case 'testimonials':
      const testimonials = sectionData as TestimonialItem[];
      return Array.isArray(testimonials) && testimonials.length > 0 && testimonials.every(t => t.name && t.text);
    
    case 'about':
      const about = sectionData as AboutSection;
      return !!(about.title && about.content);
    
    case 'contact':
      const contact = sectionData as ContactSection;
      return !!(contact.title && (contact.form?.enabled || contact.methods?.length));
    
    default:
      return false;
  }
}

/**
 * Gets a list of incomplete or missing sections
 * @param config - Client configuration
 * @returns Array of section names that need attention
 */
export function getIncompleteSections(config: ClientConfig): ConfigSection[] {
  const allSections: ConfigSection[] = ['hero', 'features', 'services', 'testimonials', 'about', 'contact'];
  
  return allSections.filter(section => !isSectionComplete(config, section));
}

/**
 * Calculates configuration completeness score (0-100)
 * @param config - Client configuration
 * @returns Completeness percentage
 */
export function getConfigCompletenessScore(config: ClientConfig): number {
  const validation = validateClientConfig(config);
  
  if (!validation.isValid) {
    return 0;
  }

  const allSections: ConfigSection[] = ['hero', 'features', 'services', 'testimonials', 'about', 'contact'];
  const completeSections = allSections.filter(section => isSectionComplete(config, section));
  
  // Base score from sections (70% of total)
  const sectionScore = (completeSections.length / allSections.length) * 70;
  
  // Additional points for complete business info (30% of total)
  let businessInfoScore = 0;
  if (config.businessName && config.tagline && config.description) businessInfoScore += 10;
  if (config.contact.email && config.contact.phone) businessInfoScore += 10;
  if (config.logo.main && config.logo.dark) businessInfoScore += 5;
  if (config.social && Object.values(config.social).some(link => link)) businessInfoScore += 5;
  
  return Math.round(sectionScore + businessInfoScore);
}

// =============================================================================
// SANITIZATION & CLEANUP
// =============================================================================

/**
 * Sanitizes configuration values to prevent XSS and other security issues
 * @param config - Client configuration to sanitize
 * @returns Sanitized configuration
 */
export function sanitizeClientConfig(config: ClientConfig): ClientConfig {
  return JSON.parse(JSON.stringify(config, (key, value) => {
    if (typeof value === 'string') {
      // Basic HTML/script tag removal
      return value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                  .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
                  .trim();
    }
    return value;
  }));
}

/**
 * Deep merges a partial configuration with defaults
 * @param partialConfig - Partial configuration to merge
 * @param defaultConfig - Default configuration values
 * @returns Merged configuration
 */
export function mergeWithDefaults(partialConfig: Partial<ClientConfig>, defaultConfig: ClientConfig): ClientConfig {
  const merged = JSON.parse(JSON.stringify(defaultConfig));
  
  function deepMerge(target: any, source: any): void {
    for (const key in source) {
      if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        target[key] = target[key] || {};
        deepMerge(target[key], source[key]);
      } else if (source[key] !== undefined) {
        target[key] = source[key];
      }
    }
  }
  
  deepMerge(merged, partialConfig);
  return merged;
}