/**
 * Theme Validation and Accessibility Utilities
 * 
 * Provides utilities for validating theme configurations,
 * checking color contrast ratios, and ensuring WCAG compliance.
 */

/**
 * Convert hex color to RGB
 * @param {string} hex - Hex color string (e.g., '#ff0000' or 'ff0000')
 * @returns {Object} RGB object with r, g, b properties
 */
function hexToRgb(hex) {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substr(0, 2), 16);
  const g = parseInt(cleanHex.substr(2, 2), 16);
  const b = parseInt(cleanHex.substr(4, 2), 16);
  return { r, g, b };
}

/**
 * Calculate relative luminance of a color
 * @param {Object} rgb - RGB color object
 * @returns {number} Relative luminance value
 */
function getRelativeLuminance(rgb) {
  const { r, g, b } = rgb;
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calculate contrast ratio between two colors
 * @param {string} color1 - First color (hex)
 * @param {string} color2 - Second color (hex)
 * @returns {number} Contrast ratio
 */
export function getContrastRatio(color1, color2) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  const lum1 = getRelativeLuminance(rgb1);
  const lum2 = getRelativeLuminance(rgb2);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if contrast ratio meets WCAG standards
 * @param {number} ratio - Contrast ratio
 * @param {'AA'|'AAA'} level - WCAG compliance level
 * @param {'normal'|'large'} textSize - Text size category
 * @returns {boolean} Whether the ratio meets the standard
 */
export function meetsWCAG(ratio, level = 'AA', textSize = 'normal') {
  const requirements = {
    AA: { normal: 4.5, large: 3.0 },
    AAA: { normal: 7.0, large: 4.5 }
  };
  
  return ratio >= requirements[level][textSize];
}

/**
 * Validate a theme configuration for accessibility compliance
 * @param {Object} themeConfig - Theme configuration object
 * @returns {Object} Validation results
 */
export function validateTheme(themeConfig) {
  const results = {
    valid: true,
    warnings: [],
    errors: [],
    suggestions: []
  };

  // Common color combinations to check
  const colorChecks = [
    { 
      fg: themeConfig.colors?.primary?.[500], 
      bg: '#ffffff', 
      name: 'Primary on white background' 
    },
    { 
      fg: '#ffffff', 
      bg: themeConfig.colors?.primary?.[500], 
      name: 'White text on primary background' 
    },
    { 
      fg: themeConfig.colors?.secondary?.[500], 
      bg: '#ffffff', 
      name: 'Secondary on white background' 
    },
    { 
      fg: themeConfig.colors?.accent?.[500], 
      bg: '#ffffff', 
      name: 'Accent on white background' 
    }
  ];

  // Check contrast ratios
  colorChecks.forEach(check => {
    if (check.fg && check.bg) {
      const ratio = getContrastRatio(check.fg, check.bg);
      
      if (!meetsWCAG(ratio, 'AA', 'normal')) {
        results.errors.push({
          type: 'contrast',
          message: `${check.name} has insufficient contrast ratio: ${ratio.toFixed(2)}. Minimum required: 4.5 for AA compliance.`,
          ratio,
          colors: { foreground: check.fg, background: check.bg }
        });
        results.valid = false;
      } else if (!meetsWCAG(ratio, 'AAA', 'normal')) {
        results.warnings.push({
          type: 'contrast',
          message: `${check.name} meets AA but not AAA standards. Ratio: ${ratio.toFixed(2)}`,
          ratio,
          colors: { foreground: check.fg, background: check.bg }
        });
      }
    }
  });

  // Check typography scale ratio
  const scaleRatio = themeConfig.typography?.scaleRatio || 1.25;
  if (scaleRatio < 1.15) {
    results.warnings.push({
      type: 'typography',
      message: 'Font scale ratio is quite small, may affect readability hierarchy'
    });
  } else if (scaleRatio > 1.5) {
    results.warnings.push({
      type: 'typography',
      message: 'Font scale ratio is quite large, may cause spacing issues'
    });
  }

  // Check for sufficient color palette depth
  ['primary', 'secondary', 'accent'].forEach(colorType => {
    const colors = themeConfig.colors?.[colorType];
    if (colors && Object.keys(colors).length < 5) {
      results.suggestions.push({
        type: 'palette',
        message: `Consider expanding ${colorType} color palette for more design flexibility`
      });
    }
  });

  return results;
}

/**
 * Generate accessible color variations from a base color
 * @param {string} baseColor - Base hex color
 * @param {number} steps - Number of variations to generate
 * @returns {Array} Array of color variations
 */
export function generateAccessiblePalette(baseColor, steps = 10) {
  // This is a simplified implementation
  // In a real application, you'd use a proper color library
  const variations = [];
  const base = hexToRgb(baseColor);
  
  for (let i = 0; i < steps; i++) {
    const factor = (i / (steps - 1)) * 2; // 0 to 2
    let r, g, b;
    
    if (factor <= 1) {
      // Lighter variations
      r = Math.round(base.r + (255 - base.r) * (1 - factor));
      g = Math.round(base.g + (255 - base.g) * (1 - factor));
      b = Math.round(base.b + (255 - base.b) * (1 - factor));
    } else {
      // Darker variations
      const darkFactor = factor - 1;
      r = Math.round(base.r * (1 - darkFactor));
      g = Math.round(base.g * (1 - darkFactor));
      b = Math.round(base.b * (1 - darkFactor));
    }
    
    variations.push(`#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`);
  }
  
  return variations;
}

/**
 * Extract dominant colors from logo/image for theme generation
 * This would typically use Canvas API or image processing library
 * @param {string} imageUrl - URL to the image
 * @returns {Promise<Array>} Promise resolving to array of dominant colors
 */
export async function extractColorsFromImage(imageUrl) {
  // Placeholder implementation
  // In a real scenario, you'd use libraries like:
  // - Colorthief
  // - Vibrant.js
  // - Custom Canvas-based extraction
  
  return new Promise((resolve) => {
    // Simulated extraction - would be replaced with actual implementation
    resolve(['#3b82f6', '#1e40af', '#60a5fa']);
  });
}

/**
 * Industry-specific theme generation configuration
 */
export const industryPresets = {
  professional: {
    colorProfile: 'conservative',
    primaryHues: ['blue', 'navy', 'teal'],
    fontCategories: ['sans-serif'],
    borderRadius: 'minimal',
    shadows: 'subtle'
  },
  creative: {
    colorProfile: 'vibrant',
    primaryHues: ['purple', 'orange', 'pink'],
    fontCategories: ['serif', 'display'],
    borderRadius: 'rounded',
    shadows: 'prominent'
  },
  healthcare: {
    colorProfile: 'trustworthy',
    primaryHues: ['teal', 'blue', 'green'],
    fontCategories: ['sans-serif'],
    borderRadius: 'medium',
    shadows: 'subtle'
  },
  technology: {
    colorProfile: 'modern',
    primaryHues: ['blue', 'cyan', 'green'],
    fontCategories: ['monospace', 'sans-serif'],
    borderRadius: 'minimal',
    shadows: 'dramatic'
  },
  finance: {
    colorProfile: 'authoritative',
    primaryHues: ['navy', 'blue', 'gold'],
    fontCategories: ['serif', 'sans-serif'],
    borderRadius: 'minimal',
    shadows: 'subtle'
  },
  retail: {
    colorProfile: 'energetic',
    primaryHues: ['orange', 'red', 'yellow'],
    fontCategories: ['sans-serif'],
    borderRadius: 'rounded',
    shadows: 'medium'
  }
};

/**
 * Generate theme configuration from industry preset and brand colors
 * @param {string} industry - Industry type
 * @param {Array} brandColors - Array of brand colors extracted from logo
 * @param {Object} options - Additional customization options
 * @returns {Object} Complete theme configuration
 */
export function generateThemeFromIndustry(industry, brandColors, options = {}) {
  const preset = industryPresets[industry] || industryPresets.professional;
  
  // This would contain the logic for generating a complete theme
  // based on industry requirements and brand colors
  return {
    id: `generated-${industry}-${Date.now()}`,
    name: `${industry.charAt(0).toUpperCase() + industry.slice(1)} Theme`,
    industry,
    colors: {
      primary: brandColors[0] || '#3b82f6',
      secondary: brandColors[1] || '#64748b',
      accent: brandColors[2] || '#f59e0b'
    },
    typography: {
      primary: preset.fontCategories[0] === 'sans-serif' ? 'Inter' : 'Playfair Display',
      heading: preset.fontCategories[0] === 'serif' ? 'Playfair Display' : 'Inter',
      scale: preset.colorProfile === 'dramatic' ? 1.33 : 1.25
    },
    preset
  };
}