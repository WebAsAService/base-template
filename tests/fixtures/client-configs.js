// Minimal valid configuration for testing
export const minimalConfig = {
  clientName: 'test-client',
  theme: 'theme-blue-ocean',
  sections: {
    hero: {
      headline: 'Test Headline',
      subheadline: 'Test Subheadline',
      cta: 'Get Started'
    }
  }
};

// Comprehensive configuration with all features
export const comprehensiveConfig = {
  clientName: 'test-comprehensive',
  theme: 'theme-sunset-orange',
  company: {
    name: 'Test Company',
    logo: '/images/clients/test/logo.png',
    description: 'A comprehensive test company'
  },
  sections: {
    hero: {
      headline: 'Welcome to Test Company',
      subheadline: 'Your trusted partner in testing',
      cta: 'Get Started',
      ctaLink: '/contact',
      backgroundImage: '/images/hero-bg.jpg'
    },
    features: {
      title: 'Our Features',
      subtitle: 'What we offer',
      items: [
        {
          title: 'Feature 1',
          description: 'Description of feature 1',
          icon: 'star'
        },
        {
          title: 'Feature 2',
          description: 'Description of feature 2',
          icon: 'heart'
        },
        {
          title: 'Feature 3',
          description: 'Description of feature 3',
          icon: 'bolt'
        }
      ]
    },
    services: {
      title: 'Our Services',
      subtitle: 'How we can help',
      items: [
        {
          title: 'Service 1',
          description: 'Full service description here',
          price: '$99',
          features: ['Feature A', 'Feature B', 'Feature C']
        },
        {
          title: 'Service 2',
          description: 'Another service description',
          price: '$199',
          features: ['Feature D', 'Feature E', 'Feature F']
        }
      ]
    },
    pricing: {
      title: 'Pricing Plans',
      subtitle: 'Choose the right plan for you',
      plans: [
        {
          name: 'Basic',
          price: '$29',
          period: 'month',
          features: ['10 Projects', 'Basic Support', '1GB Storage'],
          highlighted: false
        },
        {
          name: 'Pro',
          price: '$99',
          period: 'month',
          features: ['Unlimited Projects', 'Priority Support', '100GB Storage'],
          highlighted: true
        },
        {
          name: 'Enterprise',
          price: 'Custom',
          period: null,
          features: ['Custom Solutions', 'Dedicated Support', 'Unlimited Storage'],
          highlighted: false
        }
      ]
    },
    testimonials: {
      title: 'What Our Clients Say',
      subtitle: 'Real feedback from real customers',
      items: [
        {
          name: 'John Doe',
          role: 'CEO, Company A',
          content: 'Excellent service and support!',
          avatar: '/images/avatars/john.jpg',
          rating: 5
        },
        {
          name: 'Jane Smith',
          role: 'CTO, Company B',
          content: 'Transformed our business completely.',
          avatar: '/images/avatars/jane.jpg',
          rating: 5
        }
      ]
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'We would love to hear from you',
      email: 'contact@testcompany.com',
      phone: '+1 (555) 123-4567',
      address: '123 Test Street, Test City, TC 12345',
      formFields: ['name', 'email', 'message']
    }
  },
  seo: {
    title: 'Test Company - Your Testing Partner',
    description: 'Comprehensive testing services for your business',
    keywords: ['testing', 'quality', 'automation'],
    ogImage: '/images/og-image.jpg'
  },
  analytics: {
    googleAnalyticsId: 'UA-TEST-123',
    facebookPixelId: 'FB-TEST-456'
  }
};

// Various invalid configurations for error testing
export const invalidConfigs = [
  {
    name: 'missing-required-fields',
    config: {
      // Missing clientName and sections
      theme: 'theme-blue-ocean'
    },
    expectedError: 'clientName is required'
  },
  {
    name: 'invalid-theme',
    config: {
      clientName: 'test',
      theme: 'invalid-theme-name',
      sections: {}
    },
    expectedError: 'Invalid theme name'
  },
  {
    name: 'malformed-sections',
    config: {
      clientName: 'test',
      theme: 'theme-blue-ocean',
      sections: 'not-an-object'
    },
    expectedError: 'sections must be an object'
  },
  {
    name: 'missing-hero-required',
    config: {
      clientName: 'test',
      theme: 'theme-blue-ocean',
      sections: {
        hero: {
          // Missing headline
          subheadline: 'Test'
        }
      }
    },
    expectedError: 'hero.headline is required'
  }
];

// Theme test configurations
export const themeConfigs = [
  {
    name: 'blue-ocean',
    theme: 'theme-blue-ocean',
    expectedColors: {
      primary: 'rgb(59, 130, 246)',
      secondary: 'rgb(16, 185, 129)',
      accent: 'rgb(251, 146, 60)',
      background: 'rgb(240, 249, 255)'
    }
  },
  {
    name: 'sunset-orange',
    theme: 'theme-sunset-orange',
    expectedColors: {
      primary: 'rgb(251, 146, 60)',
      secondary: 'rgb(239, 68, 68)',
      accent: 'rgb(252, 211, 77)',
      background: 'rgb(255, 247, 237)'
    }
  },
  {
    name: 'crown-official',
    theme: 'theme-crown',
    expectedColors: {
      primary: 'rgb(30, 58, 138)',
      secondary: 'rgb(185, 28, 28)',
      accent: 'rgb(202, 138, 4)',
      background: 'rgb(248, 250, 252)'
    }
  }
];