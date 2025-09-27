#!/usr/bin/env python3

"""
AI Theme Generator Script
Uses Claude API to generate personalized website content and themes
"""

import json
import argparse
import os
import sys
from datetime import datetime
import asyncio
import aiohttp
import time
import random
from typing import Dict, List, Optional, Any

try:
    import anthropic
except ImportError:
    print("Error: anthropic package not found. Install with: pip install anthropic")
    sys.exit(1)

class ThemeGenerator:
    def __init__(self, api_key: str):
        if not api_key:
            raise ValueError("Anthropic API key is required")
        self.client = anthropic.Anthropic(api_key=api_key)
    
    async def call_claude_with_retry(self, **kwargs):
        """Call Claude API with exponential backoff retry for overload errors"""
        max_retries = 5
        base_delay = 2  # Start with 2 seconds
        
        for attempt in range(max_retries):
            try:
                return self.client.messages.create(**kwargs)
            except anthropic.RateLimitError as e:
                if attempt == max_retries - 1:  # Last attempt
                    raise e
                
                # Calculate delay with exponential backoff + jitter
                delay = base_delay * (2 ** attempt) + random.uniform(0, 1)
                print(f"API rate limited (attempt {attempt + 1}/{max_retries}). Retrying in {delay:.1f} seconds...")
                time.sleep(delay)
            except anthropic.APIStatusError as e:
                # Check if it's a 529 overload error or similar retryable error
                if hasattr(e, 'status_code') and e.status_code in [429, 529]:
                    if attempt == max_retries - 1:  # Last attempt
                        raise e
                    
                    # Calculate delay with exponential backoff + jitter
                    delay = base_delay * (2 ** attempt) + random.uniform(0, 1)
                    print(f"API overloaded (status {e.status_code}, attempt {attempt + 1}/{max_retries}). Retrying in {delay:.1f} seconds...")
                    time.sleep(delay)
                else:
                    # For other API errors, don't retry
                    raise e
            except Exception as e:
                # For other errors, don't retry
                raise e
    
    def create_system_prompt(self) -> str:
        return """You are an expert web developer and brand designer specializing in creating personalized website configurations. Given business information and brand colors, you generate complete website configurations that include:

1. Compelling marketing copy and messaging
2. Custom color themes that complement brand colors
3. Industry-appropriate content and features
4. SEO-optimized descriptions and keywords
5. Professional service/pricing structures
6. Testimonials and social proof elements

Your output should be a complete JavaScript configuration object that can be directly used in an Astro.js website. The configuration should follow the existing structure but be completely personalized for the specific business.

Key requirements:
- Use provided brand colors as the foundation for the theme
- Create industry-appropriate messaging and content
- Generate realistic pricing and service structures
- Include compelling calls-to-action
- Ensure all content is professional and conversion-focused
- Make the configuration complete and ready-to-use

CRITICAL: Always respond with ONLY valid JavaScript code that can be directly saved as a .js file. Do NOT wrap the JavaScript in markdown code fences (```javascript or ```). The response should start with comments or export statement and end with the closing brace and semicolon."""
    
    def generate_business_based_colors(self, business_data: Dict[str, Any]) -> Dict[str, str]:
        """Generate color palette based on business information"""
        business_name = business_data.get('business_name', '').lower()
        industry = business_data.get('industry', '').lower()
        description = business_data.get('business_description', '').lower()
        target_audience = business_data.get('target_audience', '').lower()
        
        # Industry-based color mappings
        industry_colors = {
            # Technology & Software
            'technology': {'primary': '#2563eb', 'secondary': '#475569', 'accent': '#06b6d4'},
            'software': {'primary': '#1d4ed8', 'secondary': '#64748b', 'accent': '#0ea5e9'},
            'ai': {'primary': '#7c3aed', 'secondary': '#64748b', 'accent': '#a855f7'},
            'cybersecurity': {'primary': '#dc2626', 'secondary': '#374151', 'accent': '#f59e0b'},
            
            # Finance & Legal
            'finance': {'primary': '#065f46', 'secondary': '#374151', 'accent': '#d97706'},
            'banking': {'primary': '#1e40af', 'secondary': '#475569', 'accent': '#059669'},
            'legal': {'primary': '#1f2937', 'secondary': '#6b7280', 'accent': '#b45309'},
            'consulting': {'primary': '#374151', 'secondary': '#6b7280', 'accent': '#0891b2'},
            
            # Healthcare
            'health': {'primary': '#059669', 'secondary': '#6b7280', 'accent': '#0284c7'},
            'medical': {'primary': '#0369a1', 'secondary': '#64748b', 'accent': '#059669'},
            'wellness': {'primary': '#16a34a', 'secondary': '#64748b', 'accent': '#0ea5e9'},
            
            # Creative & Marketing
            'creative': {'primary': '#dc2626', 'secondary': '#64748b', 'accent': '#f59e0b'},
            'design': {'primary': '#7c3aed', 'secondary': '#64748b', 'accent': '#f59e0b'},
            'marketing': {'primary': '#dc2626', 'secondary': '#6b7280', 'accent': '#ea580c'},
            'advertising': {'primary': '#c2410c', 'secondary': '#64748b', 'accent': '#7c3aed'},
            
            # Real Estate & Construction
            'real estate': {'primary': '#0369a1', 'secondary': '#64748b', 'accent': '#d97706'},
            'construction': {'primary': '#b45309', 'secondary': '#6b7280', 'accent': '#dc2626'},
            
            # Education
            'education': {'primary': '#1d4ed8', 'secondary': '#64748b', 'accent': '#059669'},
            'training': {'primary': '#0369a1', 'secondary': '#6b7280', 'accent': '#16a34a'},
            
            # Retail & E-commerce
            'retail': {'primary': '#dc2626', 'secondary': '#64748b', 'accent': '#f59e0b'},
            'ecommerce': {'primary': '#7c3aed', 'secondary': '#64748b', 'accent': '#dc2626'},
            
            # Food & Hospitality
            'food': {'primary': '#dc2626', 'secondary': '#64748b', 'accent': '#f59e0b'},
            'restaurant': {'primary': '#b45309', 'secondary': '#6b7280', 'accent': '#dc2626'},
            'hospitality': {'primary': '#0369a1', 'secondary': '#64748b', 'accent': '#d97706'},
        }
        
        # Name-based color heuristics (simple hash-based approach)
        def name_to_color(name: str) -> str:
            """Generate a color based on business name characteristics"""
            name_hash = abs(hash(name)) % 12
            name_colors = [
                '#2563eb', '#dc2626', '#059669', '#d97706', '#7c3aed', '#0369a1',
                '#b45309', '#0891b2', '#16a34a', '#c2410c', '#1d4ed8', '#065f46'
            ]
            return name_colors[name_hash]
        
        # Find matching industry colors
        colors = None
        for industry_key, industry_palette in industry_colors.items():
            if industry_key in industry:
                colors = industry_palette.copy()
                break
        
        # If no industry match, generate from business characteristics
        if not colors:
            # Check for keywords in business description and target audience
            keywords_to_colors = {
                'premium': {'primary': '#1f2937', 'secondary': '#6b7280', 'accent': '#d97706'},
                'luxury': {'primary': '#0f172a', 'secondary': '#64748b', 'accent': '#f59e0b'},
                'eco': {'primary': '#059669', 'secondary': '#64748b', 'accent': '#16a34a'},
                'green': {'primary': '#16a34a', 'secondary': '#64748b', 'accent': '#059669'},
                'digital': {'primary': '#2563eb', 'secondary': '#64748b', 'accent': '#06b6d4'},
                'innovation': {'primary': '#7c3aed', 'secondary': '#64748b', 'accent': '#a855f7'},
                'global': {'primary': '#0369a1', 'secondary': '#64748b', 'accent': '#0891b2'},
                'local': {'primary': '#b45309', 'secondary': '#6b7280', 'accent': '#dc2626'},
                'enterprise': {'primary': '#374151', 'secondary': '#6b7280', 'accent': '#0891b2'},
                'startup': {'primary': '#dc2626', 'secondary': '#64748b', 'accent': '#f59e0b'},
            }
            
            combined_text = f"{description} {target_audience}".lower()
            for keyword, keyword_colors in keywords_to_colors.items():
                if keyword in combined_text:
                    colors = keyword_colors.copy()
                    break
        
        # Final fallback: generate from business name
        if not colors:
            primary_color = name_to_color(business_name)
            colors = {
                'primary': primary_color,
                'secondary': '#64748b',
                'accent': name_to_color(business_name + 'accent')
            }
        
        # Add neutral color
        colors['neutral'] = colors.get('secondary', '#64748b')
        
        return colors

    def validate_hex_color(self, color: str) -> bool:
        """Validate hex color format (#RRGGBB)"""
        if not color:
            return False
        
        # Remove # if present
        if color.startswith('#'):
            color = color[1:]
        
        # Check if it's exactly 6 hex characters
        if len(color) != 6:
            return False
            
        try:
            int(color, 16)
            return True
        except ValueError:
            return False

    def hex_to_hsl(self, hex_color: str) -> tuple:
        """Convert hex color to HSL"""
        # Remove # if present
        hex_color = hex_color.lstrip('#')
        
        # Convert to RGB
        r = int(hex_color[0:2], 16) / 255.0
        g = int(hex_color[2:4], 16) / 255.0
        b = int(hex_color[4:6], 16) / 255.0
        
        max_val = max(r, g, b)
        min_val = min(r, g, b)
        
        h = 0
        s = 0
        l = (max_val + min_val) / 2
        
        if max_val == min_val:
            h = s = 0  # achromatic
        else:
            d = max_val - min_val
            s = d / (2 - max_val - min_val) if l > 0.5 else d / (max_val + min_val)
            
            if max_val == r:
                h = (g - b) / d + (6 if g < b else 0)
            elif max_val == g:
                h = (b - r) / d + 2
            elif max_val == b:
                h = (r - g) / d + 4
            h /= 6
        
        return (h * 360, s * 100, l * 100)

    def hsl_to_hex(self, h: float, s: float, l: float) -> str:
        """Convert HSL to hex color"""
        h = h / 360
        s = s / 100
        l = l / 100
        
        def hue_to_rgb(p, q, t):
            if t < 0:
                t += 1
            if t > 1:
                t -= 1
            if t < 1/6:
                return p + (q - p) * 6 * t
            if t < 1/2:
                return q
            if t < 2/3:
                return p + (q - p) * (2/3 - t) * 6
            return p
        
        if s == 0:
            r = g = b = l  # achromatic
        else:
            q = l * (1 + s) if l < 0.5 else l + s - l * s
            p = 2 * l - q
            r = hue_to_rgb(p, q, h + 1/3)
            g = hue_to_rgb(p, q, h)
            b = hue_to_rgb(p, q, h - 1/3)
        
        return f"#{int(r * 255):02x}{int(g * 255):02x}{int(b * 255):02x}"

    def generate_color_scale(self, hex_color: str) -> Dict[str, str]:
        """Generate Tailwind-compatible color scale (50-950) from base color"""
        try:
            if not self.validate_hex_color(hex_color):
                # Return neutral scale if invalid
                return {
                    '50': '#f8fafc', '100': '#f1f5f9', '200': '#e2e8f0', '300': '#cbd5e1',
                    '400': '#94a3b8', '500': hex_color, '600': '#64748b', '700': '#475569',
                    '800': '#334155', '900': '#1e293b', '950': '#0f172a'
                }
            
            # Ensure proper hex format
            if not hex_color.startswith('#'):
                hex_color = f'#{hex_color}'
            
            h, s, l = self.hex_to_hsl(hex_color)
            scales = {}
            
            # Generate lighter shades (50-400)
            lightness_values = [95, 90, 80, 65, 50]  # More refined lightness distribution
            for i, shade in enumerate([50, 100, 200, 300, 400]):
                new_lightness = lightness_values[i]
                scales[str(shade)] = self.hsl_to_hex(h, max(s * 0.9, 10), new_lightness)
            
            # Base color (500)
            scales['500'] = hex_color
            
            # Generate darker shades (600-950)
            darkness_values = [40, 30, 20, 12, 6]  # More refined darkness distribution
            for i, shade in enumerate([600, 700, 800, 900, 950]):
                new_lightness = darkness_values[i]
                scales[str(shade)] = self.hsl_to_hex(h, min(s * 1.1, 100), new_lightness)
            
            return scales
            
        except Exception as e:
            print(f"Warning: Error generating color scale for {hex_color}: {e}")
            # Return neutral scale as fallback
            return {
                '50': '#f8fafc', '100': '#f1f5f9', '200': '#e2e8f0', '300': '#cbd5e1',
                '400': '#94a3b8', '500': hex_color, '600': '#64748b', '700': '#475569',
                '800': '#334155', '900': '#1e293b', '950': '#0f172a'
            }

    def validate_color_harmony(self, primary: str, secondary: str, accent: str) -> Dict[str, Any]:
        """Validate color harmony and provide accessibility warnings"""
        warnings = []
        suggestions = []
        
        try:
            # Convert colors to HSL for analysis
            if self.validate_hex_color(primary):
                p_h, p_s, p_l = self.hex_to_hsl(primary)
            else:
                warnings.append("Invalid primary color format")
                return {"warnings": warnings, "suggestions": ["Use valid hex format (#RRGGBB)"]}
            
            if self.validate_hex_color(secondary):
                s_h, s_s, s_l = self.hex_to_hsl(secondary)
            else:
                secondary = primary  # Use primary as fallback
                s_h, s_s, s_l = p_h, p_s, p_l
                warnings.append("Invalid secondary color, using primary as fallback")
            
            if self.validate_hex_color(accent):
                a_h, a_s, a_l = self.hex_to_hsl(accent)
            else:
                # Generate complementary accent
                accent = self.hsl_to_hex((p_h + 180) % 360, p_s, max(p_l + 20, 70))
                a_h, a_s, a_l = self.hex_to_hsl(accent)
                warnings.append("Invalid accent color, generated complementary color")
            
            # Check contrast ratios (simplified)
            if p_l < 20:
                warnings.append("Primary color may be too dark for accessibility")
                suggestions.append("Consider using a lighter shade for better contrast")
            
            if abs(p_l - s_l) < 15:
                warnings.append("Primary and secondary colors have similar lightness")
                suggestions.append("Consider adjusting lightness for better distinction")
            
            if a_l < 50:
                warnings.append("Accent color may not be vibrant enough for CTAs")
                suggestions.append("Consider using a brighter accent color for call-to-action elements")
            
            # Check color harmony
            hue_diff_ps = abs(p_h - s_h)
            hue_diff_pa = abs(p_h - a_h)
            
            if hue_diff_ps < 30 and hue_diff_pa < 30:
                warnings.append("Colors may be too similar - consider more contrast")
                suggestions.append("Try using complementary or triadic color schemes")
            
            return {
                "warnings": warnings,
                "suggestions": suggestions,
                "harmony_score": max(0, 10 - len(warnings)),  # Simple scoring
                "accessible": len([w for w in warnings if "accessibility" in w.lower()]) == 0
            }
            
        except Exception as e:
            return {
                "warnings": [f"Error validating colors: {e}"],
                "suggestions": ["Please check color format and try again"],
                "harmony_score": 0,
                "accessible": False
            }

    def get_user_colors_with_priority(self, business_data: Dict[str, Any]) -> Dict[str, str]:
        """Get colors with priority: user-specified > logo-extracted > business-based"""
        colors = {'primary': '', 'secondary': '', 'accent': ''}
        
        # Priority 1: User-specified colors (highest priority)
        user_primary = business_data.get('primary_color', '').strip()
        user_secondary = business_data.get('secondary_color', '').strip()
        user_accent = business_data.get('accent_color', '').strip()
        
        # Validate and use user colors if provided
        if user_primary and self.validate_hex_color(user_primary):
            colors['primary'] = user_primary if user_primary.startswith('#') else f'#{user_primary}'
            print(f"Using user-specified primary color: {colors['primary']}")
        
        if user_secondary and self.validate_hex_color(user_secondary):
            colors['secondary'] = user_secondary if user_secondary.startswith('#') else f'#{user_secondary}'
            print(f"Using user-specified secondary color: {colors['secondary']}")
            
        if user_accent and self.validate_hex_color(user_accent):
            colors['accent'] = user_accent if user_accent.startswith('#') else f'#{user_accent}'
            print(f"Using user-specified accent color: {colors['accent']}")
        
        # Priority 2: Logo-extracted colors (for missing user colors)
        if business_data.get('logo_colors'):
            try:
                logo_colors = json.loads(business_data['logo_colors'])
                
                if not logo_colors.get('businessBased'):  # Only use if not business-based
                    if not colors['primary'] and 'palette' in logo_colors:
                        palette = logo_colors['palette']
                        if palette.get('primary'):
                            colors['primary'] = palette['primary']
                            print(f"Using logo-extracted primary color: {colors['primary']}")
                    
                    if not colors['secondary'] and 'palette' in logo_colors:
                        palette = logo_colors['palette']
                        if palette.get('secondary'):
                            colors['secondary'] = palette['secondary']
                            print(f"Using logo-extracted secondary color: {colors['secondary']}")
                    
                    if not colors['accent'] and 'palette' in logo_colors:
                        palette = logo_colors['palette']
                        if palette.get('accent'):
                            colors['accent'] = palette['accent']
                            print(f"Using logo-extracted accent color: {colors['accent']}")
            except:
                pass
        
        # Priority 3: Business-based colors (for remaining missing colors)
        business_colors = self.generate_business_based_colors(business_data)
        
        if not colors['primary']:
            colors['primary'] = business_colors['primary']
            print(f"Using business-based primary color: {colors['primary']}")
            
        if not colors['secondary']:
            colors['secondary'] = business_colors['secondary']
            print(f"Using business-based secondary color: {colors['secondary']}")
            
        if not colors['accent']:
            colors['accent'] = business_colors['accent']
            print(f"Using business-based accent color: {colors['accent']}")
        
        # Validate color harmony if user provided colors
        if any([user_primary, user_secondary, user_accent]):
            harmony = self.validate_color_harmony(colors['primary'], colors['secondary'], colors['accent'])
            if harmony['warnings']:
                print("🎨 Color Harmony Analysis:")
                for warning in harmony['warnings']:
                    print(f"  ⚠️  {warning}")
                if harmony['suggestions']:
                    print("💡 Suggestions:")
                    for suggestion in harmony['suggestions']:
                        print(f"  💡 {suggestion}")
                print(f"📊 Harmony Score: {harmony['harmony_score']}/10")
        
        return colors

    def create_user_prompt(self, business_data: Dict[str, Any]) -> str:
        # Get colors using priority system: user-specified > logo-extracted > business-based
        colors = self.get_user_colors_with_priority(business_data)
        extracted_colors = {
            'primary': colors['primary'],
            'secondary': colors['secondary'], 
            'accent': colors['accent'],
            'neutral': colors['secondary']
        }
        
        # Determine color source for info message
        user_colors = [business_data.get('primary_color', ''), business_data.get('secondary_color', ''), business_data.get('accent_color', '')]
        user_provided = any(color.strip() for color in user_colors)
        
        if user_provided:
            colors_info = f"""
User-Specified Theme Colors (High Priority):
- Primary: {extracted_colors['primary']} (user-specified: {business_data.get('primary_color', 'auto-generated')})
- Secondary: {extracted_colors['secondary']} (user-specified: {business_data.get('secondary_color', 'auto-generated')})
- Accent: {extracted_colors['accent']} (user-specified: {business_data.get('accent_color', 'auto-generated')})
- Neutral: {extracted_colors['neutral']}
- Color Priority: User colors override logo/business colors"""
        else:
            # Determine source based on what was actually used
            try:
                logo_colors = json.loads(business_data.get('logo_colors', '{}'))
                if logo_colors.get('businessBased'):
                    colors_info = f"""
Business-Based Theme Colors (No Logo Provided):
- Primary: {extracted_colors['primary']} (derived from: {business_data.get('industry', 'business characteristics')})
- Secondary: {extracted_colors['secondary']}
- Accent: {extracted_colors['accent']}
- Neutral: {extracted_colors['neutral']}
- Generation method: Industry + business name analysis"""
                elif 'palette' in logo_colors or 'dominantColors' in logo_colors:
                    colors_info = f"""
Brand Colors Extracted from Logo:
- Primary: {extracted_colors['primary']}
- Secondary: {extracted_colors['secondary']}
- Accent: {extracted_colors['accent']}
- Neutral: {extracted_colors['neutral']}
- Source: Logo color extraction"""
                else:
                    colors_info = f"""
Business-Based Theme Colors:
- Primary: {extracted_colors['primary']}
- Secondary: {extracted_colors['secondary']}
- Accent: {extracted_colors['accent']}
- Neutral: {extracted_colors['neutral']}"""
            except:
                colors_info = f"""
Theme Colors:
- Primary: {extracted_colors['primary']}
- Secondary: {extracted_colors['secondary']}
- Accent: {extracted_colors['accent']}
- Neutral: {extracted_colors['neutral']}"""
        
        services_list = business_data.get('services', '').split(',') if business_data.get('services') else []
        services_formatted = '\n'.join([f"- {service.strip()}" for service in services_list if service.strip()])
        
        return f"""Generate a complete website configuration for this business:

Business Information:
- Name: {business_data['business_name']}
- Industry: {business_data['industry']}
- Description: {business_data.get('business_description', 'Professional services business')}
- Target Audience: {business_data.get('target_audience', 'Business professionals')}
- Contact Email: {business_data['contact_email']}
- Contact Phone: {business_data.get('contact_phone', '')}
- Website Domain: {business_data.get('website_domain', '')}

Services/Products:
{services_formatted if services_formatted else '- Professional consulting services'}

{colors_info}

CRITICAL: You must follow this EXACT nested object structure. Do NOT use flat properties:

```javascript
// Client Configuration for [Business Name]
export const clientConfig = {{
  // Business Identity - NESTED under 'business'
  business: {{
    name: "[Business Name]",
    legalName: "[Legal Business Name]",
    tagline: "[Compelling tagline]",
    shortDescription: "[Brief description for meta tags]",
    longDescription: "[Detailed company description]",
    yearFounded: 2020,
    industry: "[Industry]",
    license: "[License if applicable]"
  }},

  // Contact Information - NESTED under 'contact'
  contact: {{
    email: "{business_data['contact_email']}",
    phone: "{business_data.get('contact_phone', '')}",
    address: {{
      street: "[Street Address]",
      city: "[City]",
      state: "[State/Province]",
      country: "[Country]",
      zip: "[Postal Code]"
    }},
    hours: {{
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "9:00 AM - 5:00 PM",
      thursday: "9:00 AM - 5:00 PM",
      friday: "9:00 AM - 5:00 PM",
      saturday: "Closed",
      sunday: "Closed"
    }},
    website: "{business_data.get('website_domain', '')}"
  }},

  // Social Media - NESTED under 'social'
  social: {{
    linkedin: "[linkedin-handle]",
    twitter: "[twitter-handle]",
    facebook: "[facebook-handle]",
    instagram: "[instagram-handle]"
  }},

  // Branding - NESTED under 'branding'
  branding: {{
    logo: {{
      main: "/images/logo.svg",
      dark: "/images/logo-dark.svg",
      light: "/images/logo-light.svg"
    }},
    colors: {{
      primary: "{extracted_colors['primary']}",
      secondary: "{extracted_colors['secondary']}", 
      accent: "{extracted_colors['accent']}",
      neutral: "{extracted_colors['neutral']}"
    }},
    fonts: {{
      heading: "[Heading Font]",
      body: "[Body Font]"
    }}
  }},

  // Content Sections - NESTED under 'content'
  content: {{
    hero: {{
      headline: "[Powerful headline]",
      subheadline: "[Supporting subheadline]",
      cta: "[Primary CTA]",
      secondaryCta: "[Secondary CTA]"
      // No image required - will use CSS gradient visual
    }},

    features: [
      {{
        title: "[Feature Title]",
        description: "[Feature Description]",
        icon: "[icon-name]",
        image: "/images/feature1.jpg"
      }}
      // ... more features
    ],

    services: [
      {{
        name: "[Service Name]",
        description: "[Service Description]",
        features: [
          "[Feature 1]",
          "[Feature 2]"
        ],
        price: "[Price]",
        cta: "[CTA Text]"
      }}
      // ... more services
    ],

    testimonials: [
      {{
        quote: "[Customer testimonial]",
        author: "[Author Name]",
        title: "[Author Title]",
        company: "[Company Name]"
      }}
      // ... more testimonials
    ],

    about: {{
      story: "[Company story]",
      mission: "[Mission statement]",
      values: ["[Value 1]", "[Value 2]"],
      team: [
        {{
          name: "[Team Member Name]",
          title: "[Title]",
          image: "/images/team/member.jpg"
        }}
      ]
    }}
  }},

  // SEO Configuration - NESTED under 'seo'
  seo: {{
    title: "[SEO Title]",
    description: "[Meta description]",
    keywords: ["[keyword1]", "[keyword2]"],
    og: {{
      title: "[Open Graph Title]",
      description: "[OG Description]",
      image: "/images/og-image.jpg",
      url: "[Website URL]"
    }}
  }}
}};
```

IMPORTANT PROPERTY ACCESS PATTERNS:
- Business name: clientConfig.business.name (NOT clientConfig.businessName)
- Brand colors: clientConfig.branding.colors.primary (NOT clientConfig.colors.primary)
- Hero content: clientConfig.content.hero.headline (NOT clientConfig.hero.headline)
- Contact info: clientConfig.contact.email (NOT clientConfig.email)

Generate the complete JavaScript configuration object following this EXACT structure."""

    def create_content_generation_prompt(self, business_data: Dict[str, Any]) -> str:
        """Create a detailed prompt for generating custom marketing copy"""
        services_list = business_data.get('services', '').split(',') if business_data.get('services') else []
        services_formatted = '\n'.join([f"- {service.strip()}" for service in services_list if service.strip()])
        
        return f"""You are a professional copywriter and marketing expert. Create compelling, conversion-focused content for this business:

BUSINESS PROFILE:
- Company: {business_data['business_name']}
- Industry: {business_data['industry']}
- Description: {business_data.get('business_description', 'Professional services business')}
- Target Audience: {business_data.get('target_audience', 'Business professionals')}
- Services/Products: {services_formatted if services_formatted else '- Professional consulting services'}

CONTENT REQUIREMENTS:

1. HERO SECTION:
   - Create a powerful, attention-grabbing headline (6-10 words)
   - Write a compelling subheadline that explains the value proposition (15-25 words)
   - Generate 2 strong call-to-action buttons (primary + secondary)
   - Make it specific to their industry and services, not generic

2. FEATURES SECTION (4-6 features):
   - Each feature should highlight a key business strength or service
   - Write benefit-focused descriptions (not just feature lists)
   - Make each feature unique and valuable to the target audience
   - Use industry-specific terminology where appropriate

3. SERVICES/PRICING (3 tiers):
   - Create realistic service packages based on their offerings
   - Include 4-6 specific features per service tier
   - Set appropriate pricing for the industry and market
   - Make CTAs action-oriented and specific

4. TESTIMONIALS (4 testimonials):
   - Write realistic customer testimonials that feel authentic
   - Include specific results/benefits (numbers, outcomes, improvements)
   - Create believable customer personas (names, titles, companies)
   - Make testimonials industry-relevant and credible

5. ABOUT SECTION:
   - Write a compelling company story that builds trust
   - Create a mission statement that resonates with target audience
   - List 4 core business values
   - Include founder/team information if appropriate

TONE & STYLE:
- Match the industry professional level (corporate vs. creative vs. technical)
- Use industry-appropriate language and terminology  
- Focus on benefits over features
- Create urgency and desire without being pushy
- Make it conversion-focused but authentic

OUTPUT: Provide ONLY the content sections in this JSON structure:
{{
  "hero": {{
    "headline": "[Powerful headline]",
    "subheadline": "[Value proposition subheadline]", 
    "cta": "[Primary CTA text]",
    "secondaryCta": "[Secondary CTA text]"
  }},
  "features": [
    {{"title": "[Feature name]", "description": "[Benefit-focused description]"}},
    // ... 4-6 features total
  ],
  "services": [
    {{
      "name": "[Service tier name]",
      "description": "[Service description]",
      "features": ["[Feature 1]", "[Feature 2]", "[Feature 3]", "[Feature 4]"],
      "price": "[Realistic pricing]",
      "cta": "[Specific CTA]"
    }},
    // ... 3 service tiers total  
  ],
  "testimonials": [
    {{
      "quote": "[Specific, results-focused testimonial]",
      "author": "[Realistic name]", 
      "title": "[Job title]",
      "company": "[Company name]"
    }},
    // ... 4 testimonials total
  ],
  "about": {{
    "story": "[Compelling company story]",
    "mission": "[Clear mission statement]", 
    "values": ["[Value 1]", "[Value 2]", "[Value 3]", "[Value 4]"]
  }}
}}"""
    
    async def generate_theme_config(self, business_data: Dict[str, Any]) -> str:
        """Generate theme configuration using Claude API"""
        try:
            system_prompt = self.create_system_prompt()
            user_prompt = self.create_user_prompt(business_data)
            
            print("Generating AI content with Claude API...")
            
            message = await self.call_claude_with_retry(
                model="claude-3-5-sonnet-20241022",
                max_tokens=4000,
                temperature=0.7,
                system=system_prompt,
                messages=[
                    {"role": "user", "content": user_prompt}
                ]
            )
            
            response_content = message.content[0].text
            print(f"Generated {len(response_content)} characters of configuration")
            
            # Clean up any markdown code fences that might have been generated
            response_content = self.clean_javascript_response(response_content)
            
            return response_content
            
        except Exception as e:
            print(f"Error generating AI content: {str(e)}")
            raise

    async def generate_custom_content(self, business_data: Dict[str, Any]) -> str:
        """Generate custom marketing content using Claude API"""
        try:
            content_prompt = self.create_content_generation_prompt(business_data)
            
            print("Generating custom marketing content with Claude API...")
            
            message = await self.call_claude_with_retry(
                model="claude-3-5-sonnet-20241022",
                max_tokens=4000,
                temperature=0.8,  # Slightly higher temperature for creative content
                system="You are a professional copywriter and marketing expert. Create compelling, industry-specific marketing content that converts visitors into customers. Always provide content in valid JSON format without markdown code blocks.",
                messages=[
                    {"role": "user", "content": content_prompt}
                ]
            )
            
            content_response = message.content[0].text.strip()
            print(f"Generated {len(content_response)} characters of custom content")
            
            # Clean any potential markdown artifacts
            if content_response.startswith('```json'):
                lines = content_response.split('\n')
                content_response = '\n'.join(lines[1:-1])
            elif content_response.startswith('```'):
                lines = content_response.split('\n')
                content_response = '\n'.join(lines[1:-1])
            
            return content_response
            
        except Exception as e:
            print(f"Error generating custom content: {str(e)}")
            raise

    def merge_custom_content_into_config(self, base_config: str, custom_content: str) -> str:
        """Merge custom generated content into the base configuration"""
        try:
            import re
            
            # Parse the custom content JSON
            custom_data = json.loads(custom_content)
            
            # Escape quotes and newlines in strings for safe JS insertion
            def escape_js_string(s):
                if not isinstance(s, str):
                    return str(s)
                return s.replace('"', '\\"').replace('\n', '\\n').replace('\r', '\\r')
            
            # Replace placeholder content in the base config with custom content
            updated_config = base_config
            
            # Replace hero section with more specific patterns
            if 'hero' in custom_data:
                hero = custom_data['hero']
                
                # Use more specific regex patterns to avoid conflicts
                updated_config = re.sub(
                    r'(hero: \{[^}]*?)headline: "[^"]*"',
                    f'\\1headline: "{escape_js_string(hero.get("headline", ""))}"',
                    updated_config, flags=re.DOTALL
                )
                updated_config = re.sub(
                    r'(hero: \{[^}]*?)subheadline: "[^"]*"',
                    f'\\1subheadline: "{escape_js_string(hero.get("subheadline", ""))}"',
                    updated_config, flags=re.DOTALL
                )
                updated_config = re.sub(
                    r'(hero: \{[^}]*?)cta: "[^"]*"',
                    f'\\1cta: "{escape_js_string(hero.get("cta", ""))}"',
                    updated_config, flags=re.DOTALL
                )
                updated_config = re.sub(
                    r'(hero: \{[^}]*?)secondaryCta: "[^"]*"',
                    f'\\1secondaryCta: "{escape_js_string(hero.get("secondaryCta", ""))}"',
                    updated_config, flags=re.DOTALL
                )
            
            # Replace features section with proper bracket matching
            if 'features' in custom_data and custom_data['features']:
                features_js = "[\n"
                for feature in custom_data['features']:
                    title = escape_js_string(feature.get('title', ''))
                    desc = escape_js_string(feature.get('description', ''))
                    features_js += f"""      {{
        title: "{title}",
        description: "{desc}",
        icon: "code",
        image: "/images/feature.jpg"
      }},\n"""
                features_js = features_js.rstrip(',\n') + "\n    ]"
                
                # Use more precise regex for features array
                updated_config = re.sub(
                    r'(features: )\[[\s\S]*?\](\s*,?\s*(?=\w+:|\}))',
                    f'\\1{features_js}\\2',
                    updated_config, flags=re.DOTALL
                )
            
            # Replace services section with better parsing
            if 'services' in custom_data and custom_data['services']:
                services_js = "[\n"
                for service in custom_data['services']:
                    name = escape_js_string(service.get('name', ''))
                    desc = escape_js_string(service.get('description', ''))
                    price = escape_js_string(service.get('price', ''))
                    cta = escape_js_string(service.get('cta', ''))
                    
                    # Handle features array properly
                    features = service.get('features', [])
                    if features and len(features) > 0:
                        features_str = '", "'.join([escape_js_string(f) for f in features])
                        features_array = f'["{features_str}"]'
                    else:
                        features_array = '[]'
                    
                    services_js += f"""      {{
        name: "{name}",
        description: "{desc}",
        features: {features_array},
        price: "{price}",
        cta: "{cta}"
      }},\n"""
                services_js = services_js.rstrip(',\n') + "\n    ]"
                
                # Use more precise regex for services array
                updated_config = re.sub(
                    r'(services: )\[[\s\S]*?\](\s*,?\s*(?=\w+:|\}))',
                    f'\\1{services_js}\\2',
                    updated_config, flags=re.DOTALL
                )
            
            # Replace testimonials section
            if 'testimonials' in custom_data and custom_data['testimonials']:
                testimonials_js = "[\n"
                for testimonial in custom_data['testimonials']:
                    quote = escape_js_string(testimonial.get('quote', ''))
                    author = escape_js_string(testimonial.get('author', ''))
                    title = escape_js_string(testimonial.get('title', ''))
                    company = escape_js_string(testimonial.get('company', ''))
                    
                    testimonials_js += f"""      {{
        quote: "{quote}",
        author: "{author}",
        title: "{title}",
        company: "{company}"
      }},\n"""
                testimonials_js = testimonials_js.rstrip(',\n') + "\n    ]"
                
                updated_config = re.sub(
                    r'(testimonials: )\[[\s\S]*?\](\s*,?\s*(?=\w+:|\}))',
                    f'\\1{testimonials_js}\\2',
                    updated_config, flags=re.DOTALL
                )
            
            # Replace about section
            if 'about' in custom_data:
                about = custom_data['about']
                story = escape_js_string(about.get('story', ''))
                mission = escape_js_string(about.get('mission', ''))
                values = about.get('values', [])
                values_list = '", "'.join([escape_js_string(v) for v in values])
                
                about_js = f"""{{
      story: "{story}",
      mission: "{mission}",
      values: ["{values_list}"],
      team: [
        {{
          name: "Team Member",
          title: "Position",
          image: "/images/team/member.jpg"
        }}
      ]
    }}"""
                
                updated_config = re.sub(
                    r'(about: )\{[\s\S]*?\}(\s*(?=\}\s*,?\s*\w+:|^\s*\}|$))',
                    f'\\1{about_js}\\2',
                    updated_config, flags=re.DOTALL | re.MULTILINE
                )
            
            # Validate the merged configuration before returning
            if self.validate_javascript_config(updated_config):
                return updated_config
            else:
                print("Warning: Merged config failed validation, using base config")
                return base_config
            
        except Exception as e:
            print(f"Warning: Could not merge custom content, using base config: {e}")
            import traceback
            traceback.print_exc()
            return base_config

    def validate_javascript_config(self, config_content: str) -> bool:
        """Validate that the JavaScript configuration is syntactically correct"""
        try:
            import subprocess
            import tempfile
            import os
            
            # Create a temporary file with the config
            with tempfile.NamedTemporaryFile(mode='w', suffix='.js', delete=False) as f:
                f.write(config_content)
                temp_file = f.name
            
            try:
                # Use Node.js to validate the syntax
                result = subprocess.run(
                    ['node', '--check', temp_file], 
                    capture_output=True, 
                    text=True,
                    timeout=10
                )
                
                is_valid = result.returncode == 0
                if not is_valid:
                    print(f"JavaScript validation failed: {result.stderr}")
                
                return is_valid
                
            finally:
                # Clean up temp file
                try:
                    os.unlink(temp_file)
                except:
                    pass
                    
        except Exception as e:
            print(f"Warning: Could not validate JavaScript (validation disabled): {e}")
            # If validation fails, assume it's valid to not block the process
            return True
    
    def clean_javascript_response(self, content: str) -> str:
        """Clean up AI response to ensure pure JavaScript code"""
        # Remove markdown code fences if present
        content = content.strip()
        
        # Remove opening code fence
        if content.startswith('```javascript') or content.startswith('```js'):
            lines = content.split('\n')
            content = '\n'.join(lines[1:])  # Remove first line
        elif content.startswith('```'):
            lines = content.split('\n')
            content = '\n'.join(lines[1:])  # Remove first line
        
        # Remove closing code fence
        if content.endswith('```'):
            lines = content.split('\n')
            content = '\n'.join(lines[:-1])  # Remove last line
        
        # Clean up any remaining artifacts
        content = content.strip()
        
        # Validate that it looks like JavaScript
        if not (content.startswith('//') or content.startswith('/*') or content.startswith('export')):
            print("Warning: Generated content may not be valid JavaScript")
        
        return content
    
    def generate_css_theme(self, business_data: Dict[str, Any]) -> str:
        """Generate CSS theme styles based on brand colors or business information"""
        client_name = business_data['client_name']
        
        # Get colors using priority system: user-specified > logo-extracted > business-based
        colors = self.get_user_colors_with_priority(business_data)
        print(f"Final theme colors: {colors}")
        
        # Generate industry-appropriate styling
        industry = business_data.get('industry', '').lower()
        
        # Set typography and styling based on industry
        if 'technology' in industry or 'software' in industry:
            font_primary = 'Inter'
            font_heading = 'JetBrains Mono'
            radius = '4px'
            shadow = 'var(--shadow-lg)'
        elif 'finance' in industry or 'legal' in industry or 'consulting' in industry:
            font_primary = 'Inter'
            font_heading = 'Playfair Display'
            radius = '6px'
            shadow = 'var(--shadow-sm)'
        elif 'creative' in industry or 'design' in industry or 'marketing' in industry:
            font_primary = 'Inter'
            font_heading = 'Playfair Display'
            radius = '16px'
            shadow = 'var(--shadow-lg)'
        elif 'health' in industry or 'medical' in industry:
            font_primary = 'Source Sans Pro'
            font_heading = 'Source Sans Pro'
            radius = '8px'
            shadow = 'var(--shadow-md)'
        else:
            font_primary = 'Inter'
            font_heading = 'Inter'
            radius = '8px'
            shadow = 'var(--shadow-md)'
        
        # Generate color scales using new algorithm
        primary_scale = self.generate_color_scale(colors['primary'])
        secondary_scale = self.generate_color_scale(colors['secondary'])
        accent_scale = self.generate_color_scale(colors['accent'])
        
        # Generate CSS theme
        css_theme = f"""
/* 
 * Client Theme: {business_data['business_name']}
 * Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
 * Industry: {business_data['industry']}
 */
.theme-{client_name} {{
  /* Background for visual distinction */
  background-color: {primary_scale['50']};
  
  /* Primary color scale */
  --color-primary-50: {primary_scale['50']};
  --color-primary-100: {primary_scale['100']};
  --color-primary-200: {primary_scale['200']};
  --color-primary-300: {primary_scale['300']};
  --color-primary-400: {primary_scale['400']};
  --color-primary-500: {primary_scale['500']};
  --color-primary-600: {primary_scale['600']};
  --color-primary-700: {primary_scale['700']};
  --color-primary-800: {primary_scale['800']};
  --color-primary-900: {primary_scale['900']};
  --color-primary-950: {primary_scale['950']};

  /* Secondary color scale */
  --color-secondary-50: {secondary_scale['50']};
  --color-secondary-100: {secondary_scale['100']};
  --color-secondary-200: {secondary_scale['200']};
  --color-secondary-300: {secondary_scale['300']};
  --color-secondary-400: {secondary_scale['400']};
  --color-secondary-500: {secondary_scale['500']};
  --color-secondary-600: {secondary_scale['600']};
  --color-secondary-700: {secondary_scale['700']};
  --color-secondary-800: {secondary_scale['800']};
  --color-secondary-900: {secondary_scale['900']};
  --color-secondary-950: {secondary_scale['950']};

  /* Accent color scale */
  --color-accent-50: {accent_scale['50']};
  --color-accent-100: {accent_scale['100']};
  --color-accent-200: {accent_scale['200']};
  --color-accent-300: {accent_scale['300']};
  --color-accent-400: {accent_scale['400']};
  --color-accent-500: {accent_scale['500']};
  --color-accent-600: {accent_scale['600']};
  --color-accent-700: {accent_scale['700']};
  --color-accent-800: {accent_scale['800']};
  --color-accent-900: {accent_scale['900']};
  --color-accent-950: {accent_scale['950']};

  /* Typography */
  --font-family-primary: '{font_primary}', sans-serif;
  --font-family-heading: '{font_heading}', sans-serif;
  --font-scale-ratio: 1.25;
  --font-weight-heading: var(--font-weight-semibold);
  --letter-spacing-heading: var(--letter-spacing-tight);
  
  /* Component theming */
  --button-radius: {radius};
  --card-radius: calc({radius} * 1.5);
  --input-radius: calc({radius} * 0.75);
  --card-shadow: {shadow};
  --button-shadow: var(--shadow-sm);
  
  /* Border radius */
  --border-radius-md: {radius};
  --border-radius-lg: calc({radius} * 1.5);
}}
"""
        return css_theme

async def main():
    parser = argparse.ArgumentParser(description='Generate AI-powered website theme and content')
    parser.add_argument('--business-name', required=True, help='Business name')
    parser.add_argument('--business-description', default='', help='Business description')
    parser.add_argument('--industry', required=True, help='Industry/business type')
    parser.add_argument('--target-audience', default='', help='Target audience')
    parser.add_argument('--services', default='', help='Services (comma-separated)')
    parser.add_argument('--contact-email', required=True, help='Contact email')
    parser.add_argument('--contact-phone', default='', help='Contact phone')
    parser.add_argument('--website-domain', default='', help='Website domain')
    parser.add_argument('--client-name', required=True, help='Client name for files')
    parser.add_argument('--logo-colors', default='{}', help='Extracted logo colors JSON')
    parser.add_argument('--logo-path', default='', help='Path to processed logo')
    parser.add_argument('--primary-color', default='', help='User-specified primary color (hex format)')
    parser.add_argument('--secondary-color', default='', help='User-specified secondary color (hex format)')
    parser.add_argument('--accent-color', default='', help='User-specified accent color (hex format)')
    
    args = parser.parse_args()
    
    # Get API key from environment
    api_key = os.getenv('ANTHROPIC_API_KEY')
    if not api_key:
        print("Error: ANTHROPIC_API_KEY environment variable not set")
        sys.exit(1)
    
    try:
        # Prepare business data
        business_data = {
            'business_name': args.business_name,
            'business_description': args.business_description,
            'industry': args.industry,
            'target_audience': args.target_audience,
            'services': args.services,
            'contact_email': args.contact_email,
            'contact_phone': args.contact_phone,
            'website_domain': args.website_domain,
            'client_name': args.client_name,
            'logo_colors': args.logo_colors,
            'logo_path': args.logo_path,
            'primary_color': args.primary_color,
            'secondary_color': args.secondary_color,
            'accent_color': args.accent_color
        }
        
        print(f"Generating theme for: {args.business_name}")
        print(f"Industry: {args.industry}")
        print(f"Client name: {args.client_name}")
        
        # Initialize theme generator
        generator = ThemeGenerator(api_key)
        
        # Generate AI configuration and custom content in parallel
        print("Step 1: Generating base configuration...")
        base_config = await generator.generate_theme_config(business_data)
        
        print("Step 2: Generating custom marketing content...")
        custom_content = await generator.generate_custom_content(business_data)
        
        print("Step 3: Merging custom content into configuration...")
        client_config = generator.merge_custom_content_into_config(base_config, custom_content)
        
        # Generate CSS theme
        css_theme = generator.generate_css_theme(business_data)
        
        # Create output directories
        os.makedirs('src/config/clients', exist_ok=True)
        
        # Save client configuration
        client_config_path = f'src/config/clients/{args.client_name}.js'
        with open(client_config_path, 'w', encoding='utf-8') as f:
            f.write(client_config)
        print(f"✅ Client configuration saved to: {client_config_path}")
        
        # Append CSS theme to client-themes.css
        themes_css_path = 'src/styles/client-themes.css'
        with open(themes_css_path, 'a', encoding='utf-8') as f:
            f.write(f"\n{css_theme}\n")
        print(f"✅ Theme CSS appended to: {themes_css_path}")
        
        # Save generation metadata
        metadata = {
            'client_name': args.client_name,
            'business_name': args.business_name,
            'industry': args.industry,
            'generated_at': datetime.now().isoformat(),
            'files_created': [client_config_path, themes_css_path],
            'ai_model': 'claude-3-5-sonnet-20241022',
            'generation_steps': ['base_config', 'custom_content', 'theme_css'],
            'content_customized': True,
            'colors_from_logo': True,
            'business_data': business_data
        }
        
        metadata_path = f'src/config/clients/{args.client_name}-metadata.json'
        with open(metadata_path, 'w', encoding='utf-8') as f:
            json.dump(metadata, f, indent=2)
        print(f"✅ Generation metadata saved to: {metadata_path}")
        
        print("\n🎉 AI theme generation completed successfully!")
        print(f"Theme class: theme-{args.client_name}")
        print(f"Config import: import config from '@/config/clients/{args.client_name}.js'")
        
    except Exception as e:
        print(f"❌ Theme generation failed: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == '__main__':
    asyncio.run(main())