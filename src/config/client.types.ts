/**
 * TypeScript interfaces for the Dynamic Client Configuration System
 * 
 * These interfaces provide complete type safety for all client configuration
 * properties and ensure consistent data structures across the application.
 * 
 * @author Generated with Claude Code
 * @version 1.0.0
 */

// =============================================================================
// CORE INTERFACES
// =============================================================================

/**
 * Main client configuration interface
 */
export interface ClientConfig {
  // Business Identity
  businessName: string;
  tagline: string;
  description: string;
  industry: string;
  foundedYear: number;

  // Contact Information
  contact: ContactInfo;

  // Social Media & Online Presence
  social: SocialLinks;
  website: WebsiteLinks;

  // Branding & Visual Assets
  logo: LogoConfig;
  themeClass: string;
  colors: BrandColors;

  // Content Sections
  sections: ContentSections;

  // SEO & Meta Configuration
  seo: SEOConfig;

  // Configuration Metadata
  meta: ConfigMetadata;
}

// =============================================================================
// CONTACT & BUSINESS INFO
// =============================================================================

/**
 * Contact information structure
 */
export interface ContactInfo {
  email: string;
  phone: string;
  phoneAlt?: string;
  address: BusinessAddress;
  hours: BusinessHours;
}

/**
 * Business address structure
 */
export interface BusinessAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

/**
 * Business operating hours
 */
export interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

// =============================================================================
// SOCIAL & WEB PRESENCE
// =============================================================================

/**
 * Social media links configuration
 */
export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
  pinterest?: string;
}

/**
 * Website and online presence URLs
 */
export interface WebsiteLinks {
  domain: string;
  blog?: string;
  support?: string;
}

// =============================================================================
// BRANDING & VISUAL ASSETS
// =============================================================================

/**
 * Logo configuration for different contexts
 */
export interface LogoConfig {
  main: string;
  dark: string;
  favicon: string;
  altText: string;
}

/**
 * Brand color palette
 */
export interface BrandColors {
  primary: string;
  secondary: string;
  accent: string;
}

// =============================================================================
// CONTENT SECTIONS
// =============================================================================

/**
 * All content sections configuration
 */
export interface ContentSections {
  hero: HeroSection;
  features: FeaturesSection;
  services: ServiceItem[];
  testimonials: TestimonialItem[];
  about: AboutSection;
  contact: ContactSection;
}

// -------------------------------------------------------------------------
// HERO SECTION
// -------------------------------------------------------------------------

/**
 * Hero section configuration
 */
export interface HeroSection {
  headline: string;
  subheadline: string;
  cta: HeroCTAButtons;
  media: HeroMedia;
  trustedBy: TrustedBySection;
}

/**
 * Hero call-to-action buttons
 */
export interface HeroCTAButtons {
  primary: CTAButton;
  secondary: CTAButton;
}

/**
 * Call-to-action button structure
 */
export interface CTAButton {
  text: string;
  link: string;
  style: 'primary' | 'secondary' | 'outline' | 'ghost';
}

/**
 * Hero media configuration
 */
export interface HeroMedia {
  type: 'image' | 'video';
  src: string;
  alt: string;
  poster?: string; // For video type
}

/**
 * Trusted by/client logos section
 */
export interface TrustedBySection {
  enabled: boolean;
  title: string;
  logos: TrustedByLogo[];
}

/**
 * Individual trusted by logo
 */
export interface TrustedByLogo {
  src: string;
  alt: string;
  height: string;
}

// -------------------------------------------------------------------------
// FEATURES SECTION
// -------------------------------------------------------------------------

/**
 * Features section configuration
 */
export interface FeaturesSection {
  title: string;
  subtitle: string;
  items: FeatureItem[];
}

/**
 * Individual feature item
 */
export interface FeatureItem {
  title: string;
  description: string;
  icon: string; // Icon identifier
  image?: string; // Optional feature image
}

// -------------------------------------------------------------------------
// SERVICES/PRICING SECTION
// -------------------------------------------------------------------------

/**
 * Service/pricing item structure
 */
export interface ServiceItem {
  name: string;
  description: string;
  price: string;
  billing: 'monthly' | 'yearly' | 'one-time' | 'contact';
  popular: boolean;
  features: string[];
  cta: CTAButton;
}

// -------------------------------------------------------------------------
// TESTIMONIALS SECTION
// -------------------------------------------------------------------------

/**
 * Individual testimonial structure
 */
export interface TestimonialItem {
  name: string;
  company: string;
  position: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  image?: string;
}

// -------------------------------------------------------------------------
// ABOUT SECTION
// -------------------------------------------------------------------------

/**
 * About section configuration
 */
export interface AboutSection {
  title: string;
  content: string;
  team: TeamMember[];
  stats: StatItem[];
}

/**
 * Team member profile
 */
export interface TeamMember {
  name: string;
  position: string;
  bio: string;
  image?: string;
  social: SocialLinks;
}

/**
 * Company statistic item
 */
export interface StatItem {
  label: string;
  value: string;
}

// -------------------------------------------------------------------------
// CONTACT SECTION
// -------------------------------------------------------------------------

/**
 * Contact section configuration
 */
export interface ContactSection {
  title: string;
  subtitle: string;
  form: ContactForm;
  methods: ContactMethod[];
}

/**
 * Contact form configuration
 */
export interface ContactForm {
  enabled: boolean;
  fields: FormField[];
  submitText: string;
  successMessage: string;
  errorMessage: string;
}

/**
 * Contact form field definition
 */
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  required: boolean;
  options?: string[]; // For select type
}

/**
 * Contact method (email, phone, address)
 */
export interface ContactMethod {
  type: 'email' | 'phone' | 'address';
  label: string;
  value: string;
  icon: string;
}

// =============================================================================
// SEO & META CONFIGURATION
// =============================================================================

/**
 * SEO and meta tag configuration
 */
export interface SEOConfig {
  titleTemplate: string;
  description: string;
  keywords: string[];
  openGraph: OpenGraphConfig;
  twitter: TwitterConfig;
}

/**
 * Open Graph configuration for social sharing
 */
export interface OpenGraphConfig {
  siteName: string;
  image: string;
  imageAlt: string;
  type: string;
}

/**
 * Twitter Card configuration
 */
export interface TwitterConfig {
  card: 'summary' | 'summary_large_image' | 'app' | 'player';
  site: string;
  creator: string;
}

// =============================================================================
// METADATA & SYSTEM
// =============================================================================

/**
 * Configuration metadata for system tracking
 */
export interface ConfigMetadata {
  version: string;
  lastUpdated: string;
  author: string;
  isAIGenerated: boolean;
  notes?: string;
}

// =============================================================================
// HELPER FUNCTION TYPES
// =============================================================================

/**
 * Type for the getConfigValue helper function
 */
export type ConfigValuePath = 
  | 'businessName'
  | 'tagline'
  | 'description'
  | 'industry'
  | 'foundedYear'
  | 'contact.email'
  | 'contact.phone'
  | 'contact.address.street'
  | 'contact.address.city'
  | 'contact.address.state'
  | 'social.facebook'
  | 'social.twitter'
  | 'social.linkedin'
  | 'logo.main'
  | 'logo.dark'
  | 'themeClass'
  | 'sections.hero.headline'
  | 'sections.hero.subheadline'
  | 'sections.features.title'
  | 'sections.about.title'
  | 'sections.contact.title'
  | 'seo.description'
  | 'seo.titleTemplate'
  | string; // Allow any string for flexibility

/**
 * Sections that can be enabled/disabled
 */
export type ConfigSection = 
  | 'hero'
  | 'features'
  | 'services'
  | 'testimonials'
  | 'about'
  | 'contact';

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Make specific properties optional for partial updates
 */
export type PartialClientConfig = Partial<ClientConfig>;

/**
 * Pick specific sections from the configuration
 */
export type ConfigSectionPick<T extends keyof ContentSections> = Pick<ContentSections, T>;

/**
 * Theme-related configuration subset
 */
export type ThemeConfig = Pick<ClientConfig, 'themeClass' | 'colors' | 'logo'>;

/**
 * Business info subset for quick access
 */
export type BusinessInfo = Pick<ClientConfig, 'businessName' | 'tagline' | 'description' | 'contact'>;

// =============================================================================
// VALIDATION & DEFAULTS
// =============================================================================

/**
 * Required fields that must be present in any valid configuration
 */
export type RequiredConfigFields = Required<Pick<ClientConfig, 
  'businessName' | 'tagline' | 'description' | 'contact' | 'sections'
>>;

/**
 * Configuration validation result
 */
export interface ConfigValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Default configuration override options
 */
export interface ConfigDefaults {
  useDefaults: boolean;
  overrideFields?: Partial<ClientConfig>;
}