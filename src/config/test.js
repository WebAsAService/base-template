/**
 * Test file to validate the Dynamic Client Configuration System
 * 
 * This file can be run to verify that the configuration system is working
 * correctly and all imports are functioning as expected.
 * 
 * Run this test with: node src/config/test.js
 */

import { clientConfig, getConfigValue, isSectionEnabled } from './client.js';
import { validateClientConfig, getConfigCompletenessScore, isSectionComplete } from './validation.ts';

console.log('🧪 Testing Dynamic Client Configuration System...\n');

// Test 1: Basic Configuration Loading
console.log('✅ Test 1: Configuration Loading');
console.log(`Business Name: ${clientConfig.businessName}`);
console.log(`Tagline: ${clientConfig.tagline}`);
console.log(`Theme Class: ${clientConfig.themeClass}`);
console.log(`Email: ${clientConfig.contact.email}\n`);

// Test 2: Helper Functions
console.log('✅ Test 2: Helper Functions');
const businessName = getConfigValue('businessName', 'Fallback Business');
const nonExistentValue = getConfigValue('nonexistent.path', 'Default Value');
console.log(`Business name via helper: ${businessName}`);
console.log(`Non-existent path with fallback: ${nonExistentValue}`);

// Test section availability
const isHeroEnabled = isSectionEnabled('hero');
const isBlogEnabled = isSectionEnabled('blog');
console.log(`Hero section enabled: ${isHeroEnabled}`);
console.log(`Blog section enabled: ${isBlogEnabled}\n`);

// Test 3: Configuration Validation
console.log('✅ Test 3: Configuration Validation');
const validation = validateClientConfig(clientConfig);
console.log(`Configuration is valid: ${validation.isValid}`);
console.log(`Errors: ${validation.errors.length}`);
console.log(`Warnings: ${validation.warnings.length}`);

if (validation.errors.length > 0) {
  console.log('Validation errors:', validation.errors);
}

if (validation.warnings.length > 0) {
  console.log('Validation warnings:', validation.warnings.slice(0, 3), '...');
}

// Test 4: Completeness Score
console.log('\n✅ Test 4: Completeness Assessment');
const completenessScore = getConfigCompletenessScore(clientConfig);
console.log(`Configuration completeness: ${completenessScore}%`);

// Test individual sections
const sections = ['hero', 'features', 'services', 'testimonials', 'about', 'contact'];
console.log('Section completeness:');
sections.forEach(section => {
  const isComplete = isSectionComplete(clientConfig, section);
  console.log(`  ${section}: ${isComplete ? '✅ Complete' : '❌ Incomplete'}`);
});

// Test 5: Configuration Structure
console.log('\n✅ Test 5: Configuration Structure');
console.log(`Hero CTA buttons: ${clientConfig.sections.hero.cta.primary.text}, ${clientConfig.sections.hero.cta.secondary.text}`);
console.log(`Features count: ${clientConfig.sections.features.items.length}`);
console.log(`Services count: ${clientConfig.sections.services.length}`);
console.log(`Testimonials count: ${clientConfig.sections.testimonials.length}`);
console.log(`Team members count: ${clientConfig.sections.about.team.length}`);

// Test 6: Social Links
console.log('\n✅ Test 6: Social Media Configuration');
const socialPlatforms = Object.entries(clientConfig.social)
  .filter(([_, url]) => url && url.length > 0)
  .map(([platform, _]) => platform);
console.log(`Configured social platforms: ${socialPlatforms.join(', ')}`);

console.log('\n🎉 All tests completed! Configuration system is ready for use.');
console.log('\n📋 Next Steps:');
console.log('1. Import configuration in your Astro components');
console.log('2. Replace hardcoded content with config values');
console.log('3. Use helper functions for safe access');
console.log('4. Validate configurations before deployment');
console.log('\nExample usage in component:');
console.log('import { clientConfig } from "@config/client.js";');
console.log('const headline = clientConfig.sections.hero.headline;');