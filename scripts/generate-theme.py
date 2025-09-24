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
    
    def create_user_prompt(self, business_data: Dict[str, Any]) -> str:
        # Extract and prepare logo colors for the prompt
        extracted_colors = {'primary': '#2563eb', 'secondary': '#64748b', 'accent': '#f59e0b', 'neutral': '#64748b'}
        colors_info = ""
        
        if business_data.get('logo_colors'):
            try:
                logo_colors = json.loads(business_data['logo_colors'])
                # Use the same logic as theme generation for consistency
                if 'palette' in logo_colors:
                    palette = logo_colors['palette']
                    extracted_colors['primary'] = palette.get('primary', extracted_colors['primary'])
                    extracted_colors['secondary'] = palette.get('secondary', extracted_colors['secondary']) 
                    extracted_colors['accent'] = palette.get('accent', extracted_colors['accent'])
                    extracted_colors['neutral'] = palette.get('neutral', extracted_colors['secondary'])
                elif 'dominantColors' in logo_colors and len(logo_colors['dominantColors']) >= 3:
                    dominant = logo_colors['dominantColors']
                    extracted_colors['primary'] = dominant[0]
                    extracted_colors['secondary'] = dominant[1] 
                    extracted_colors['accent'] = dominant[2]
                    extracted_colors['neutral'] = dominant[3] if len(dominant) > 3 else dominant[1]
                    
                colors_info = f"""
Brand Colors Extracted from Logo:
- Primary: {extracted_colors['primary']}
- Secondary: {extracted_colors['secondary']}
- Accent: {extracted_colors['accent']}
- Neutral: {extracted_colors['neutral']}
- Full extraction: {logo_colors.get('palette', logo_colors.get('dominantColors', []))}"""
            except:
                colors_info = "Logo colors: Using default professional palette"
        
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
      secondaryCta: "[Secondary CTA]",
      image: "/images/hero.jpg"
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
            
            message = self.client.messages.create(
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
            
            message = self.client.messages.create(
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
            
            # Replace placeholder content in the base config with custom content
            updated_config = base_config
            
            # Replace hero section
            if 'hero' in custom_data:
                hero = custom_data['hero']
                updated_config = re.sub(
                    r'headline: "[^"]*"',
                    f'headline: "{hero.get("headline", "")}"',
                    updated_config
                )
                updated_config = re.sub(
                    r'subheadline: "[^"]*"',
                    f'subheadline: "{hero.get("subheadline", "")}"',
                    updated_config
                )
                updated_config = re.sub(
                    r'cta: "[^"]*"',
                    f'cta: "{hero.get("cta", "")}"',
                    updated_config
                )
                updated_config = re.sub(
                    r'secondaryCta: "[^"]*"',
                    f'secondaryCta: "{hero.get("secondaryCta", "")}"',
                    updated_config
                )
            
            # Replace features section
            if 'features' in custom_data and custom_data['features']:
                features_js = "[\n"
                for feature in custom_data['features']:
                    features_js += f"""      {{
        title: "{feature.get('title', '')}",
        description: "{feature.get('description', '')}",
        icon: "code",
        image: "/images/feature.jpg"
      }},\n"""
                features_js = features_js.rstrip(',\n') + "\n    ]"
                
                # Replace features array
                updated_config = re.sub(
                    r'features: \[[\s\S]*?\]',
                    f'features: {features_js}',
                    updated_config
                )
            
            # Replace services section 
            if 'services' in custom_data and custom_data['services']:
                services_js = "[\n"
                for service in custom_data['services']:
                    features_list = '", "'.join(service.get('features', []))
                    services_js += f"""      {{
        name: "{service.get('name', '')}",
        description: "{service.get('description', '')}",
        features: ["{features_list}"],
        price: "{service.get('price', '')}",
        cta: "{service.get('cta', '')}"
      }},\n"""
                services_js = services_js.rstrip(',\n') + "\n    ]"
                
                updated_config = re.sub(
                    r'services: \[[\s\S]*?\]',
                    f'services: {services_js}',
                    updated_config
                )
            
            # Replace testimonials section
            if 'testimonials' in custom_data and custom_data['testimonials']:
                testimonials_js = "[\n"
                for testimonial in custom_data['testimonials']:
                    testimonials_js += f"""      {{
        quote: "{testimonial.get('quote', '')}",
        author: "{testimonial.get('author', '')}",
        title: "{testimonial.get('title', '')}",
        company: "{testimonial.get('company', '')}"
      }},\n"""
                testimonials_js = testimonials_js.rstrip(',\n') + "\n    ]"
                
                updated_config = re.sub(
                    r'testimonials: \[[\s\S]*?\]',
                    f'testimonials: {testimonials_js}',
                    updated_config
                )
            
            # Replace about section
            if 'about' in custom_data:
                about = custom_data['about']
                values_list = '", "'.join(about.get('values', []))
                
                about_js = f"""{{
      story: "{about.get('story', '')}",
      mission: "{about.get('mission', '')}",
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
                    r'about: \{[\s\S]*?\}(?=\s*\})',
                    f'about: {about_js}',
                    updated_config
                )
            
            return updated_config
            
        except Exception as e:
            print(f"Warning: Could not merge custom content: {e}")
            return base_config
    
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
        """Generate CSS theme styles based on brand colors"""
        client_name = business_data['client_name']
        
        # Extract colors from logo analysis - prioritize actual logo colors
        colors = {'primary': '#2563eb', 'secondary': '#64748b', 'accent': '#f59e0b'}
        if business_data.get('logo_colors'):
            try:
                extracted_colors = json.loads(business_data['logo_colors'])
                # Use the extracted palette if available
                if 'palette' in extracted_colors:
                    palette = extracted_colors['palette']
                    colors['primary'] = palette.get('primary', colors['primary'])
                    colors['secondary'] = palette.get('secondary', colors['secondary']) 
                    colors['accent'] = palette.get('accent', colors['accent'])
                    colors['neutral'] = palette.get('neutral', colors['secondary'])
                # Fallback to dominant colors
                elif 'dominantColors' in extracted_colors and len(extracted_colors['dominantColors']) >= 3:
                    dominant = extracted_colors['dominantColors']
                    colors['primary'] = dominant[0]
                    colors['secondary'] = dominant[1] 
                    colors['accent'] = dominant[2]
                    colors['neutral'] = dominant[3] if len(dominant) > 3 else dominant[1]
                # Use raw vibrant colors as last resort
                elif 'raw' in extracted_colors:
                    raw = extracted_colors['raw']
                    colors['primary'] = raw.get('vibrant', colors['primary'])
                    colors['secondary'] = raw.get('muted', colors['secondary'])
                    colors['accent'] = raw.get('lightVibrant', colors['accent'])
                    colors['neutral'] = raw.get('darkMuted', colors['secondary'])
            except Exception as e:
                print(f"Warning: Could not parse logo colors, using defaults: {e}")
                pass
        
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
        
        # Generate color palette variations
        def generate_color_scale(base_color: str) -> Dict[str, str]:
            """Generate a proper color scale based on the base color"""
            # Convert hex to RGB for manipulation
            def hex_to_rgb(hex_color):
                hex_color = hex_color.lstrip('#')
                return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
            
            def rgb_to_hex(rgb):
                return '#{:02x}{:02x}{:02x}'.format(int(rgb[0]), int(rgb[1]), int(rgb[2]))
            
            def adjust_lightness(rgb, factor):
                """Adjust lightness by factor (0-2, where 1 is unchanged)"""
                return tuple(max(0, min(255, c * factor)) for c in rgb)
            
            try:
                base_rgb = hex_to_rgb(base_color)
                
                return {
                    '50': rgb_to_hex(adjust_lightness(base_rgb, 1.9)),
                    '100': rgb_to_hex(adjust_lightness(base_rgb, 1.7)),
                    '200': rgb_to_hex(adjust_lightness(base_rgb, 1.5)),
                    '300': rgb_to_hex(adjust_lightness(base_rgb, 1.3)),
                    '400': rgb_to_hex(adjust_lightness(base_rgb, 1.1)),
                    '500': base_color,
                    '600': rgb_to_hex(adjust_lightness(base_rgb, 0.9)),
                    '700': rgb_to_hex(adjust_lightness(base_rgb, 0.7)),
                    '800': rgb_to_hex(adjust_lightness(base_rgb, 0.5)),
                    '900': rgb_to_hex(adjust_lightness(base_rgb, 0.3)),
                    '950': rgb_to_hex(adjust_lightness(base_rgb, 0.1))
                }
            except:
                # Fallback to neutral scale if color parsing fails
                return {
                    '50': '#f8fafc', '100': '#f1f5f9', '200': '#e2e8f0', '300': '#cbd5e1',
                    '400': '#94a3b8', '500': base_color, '600': base_color, '700': base_color,
                    '800': base_color, '900': '#1e293b', '950': '#0f172a'
                }
        
        primary_scale = generate_color_scale(colors['primary'])
        secondary_scale = generate_color_scale(colors['secondary'])
        accent_scale = generate_color_scale(colors['accent'])
        
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
            'logo_path': args.logo_path
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