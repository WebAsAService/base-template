/**
 * Tech Startup Configuration Example
 * Modern, innovative configuration for technology companies
 */

export const clientConfig = {
  // Business Information
  businessInfo: {
    businessName: "CloudSync AI",
    tagline: "Intelligence Meets Infrastructure",
    description: "Next-generation cloud automation platform powered by artificial intelligence. Streamline your DevOps, reduce costs by 60%, and deploy with confidence.",
    industry: "technology",
    yearEstablished: 2021,
    employeeCount: "25-50",
    fundingStage: "Series A",

    logo: {
      url: "/images/clients/cloudsync/logo.svg",
      alt: "CloudSync AI",
      width: 180,
      height: 45,
      darkModeUrl: "/images/clients/cloudsync/logo-dark.svg"
    },

    seo: {
      keywords: ["cloud automation", "AI DevOps", "infrastructure as code", "kubernetes", "cloud optimization", "MLOps"],
      author: "CloudSync AI",
      ogImage: "/images/og-tech.jpg",
      twitterCard: "summary_large_image"
    }
  },

  // Contact Information
  contact: {
    email: "hello@cloudsync.ai",
    phone: "(555) 321-9876",

    address: {
      street: "2100 Innovation Way",
      suite: "Floor 12",
      city: "San Francisco",
      state: "CA",
      zip: "94107"
    },

    hours: {
      monday: "9:00 AM - 6:00 PM PST",
      tuesday: "9:00 AM - 6:00 PM PST",
      wednesday: "9:00 AM - 6:00 PM PST",
      thursday: "9:00 AM - 6:00 PM PST",
      friday: "9:00 AM - 6:00 PM PST",
      support: "24/7 Technical Support Available"
    },

    social: {
      github: "https://github.com/cloudsync-ai",
      linkedin: "https://linkedin.com/company/cloudsync-ai",
      twitter: "https://twitter.com/cloudsync_ai",
      producthunt: "https://producthunt.com/products/cloudsync-ai",
      youtube: "https://youtube.com/c/cloudsyncai"
    }
  },

  // Content Sections
  content: {
    hero: {
      headline: "Deploy 10x Faster with AI-Powered Cloud Automation",
      subheadline: "Join 500+ companies automating their infrastructure with intelligent DevOps",
      primaryCTA: {
        text: "Start Free Trial",
        link: "#signup",
        style: "primary"
      },
      secondaryCTA: {
        text: "Watch Demo",
        link: "#demo",
        style: "outline"
      },
      metrics: [
        { value: "60%", label: "Cost Reduction" },
        { value: "10x", label: "Faster Deployment" },
        { value: "99.99%", label: "Uptime SLA" },
        { value: "500+", label: "Happy Teams" }
      ]
    },

    features: [
      {
        id: "ai-optimization",
        title: "AI-Driven Optimization",
        description: "Machine learning algorithms continuously optimize your infrastructure for performance and cost",
        icon: "brain",
        highlight: true
      },
      {
        id: "auto-scaling",
        title: "Intelligent Auto-Scaling",
        description: "Predictive scaling based on historical patterns and real-time demand",
        icon: "chart-line",
        highlight: true
      },
      {
        id: "security",
        title: "Zero-Trust Security",
        description: "Enterprise-grade security with automated compliance and threat detection",
        icon: "shield-check"
      },
      {
        id: "multi-cloud",
        title: "Multi-Cloud Support",
        description: "Deploy seamlessly across AWS, Azure, GCP, and hybrid environments",
        icon: "cloud"
      },
      {
        id: "gitops",
        title: "GitOps Integration",
        description: "Native integration with your existing CI/CD pipelines and version control",
        icon: "git-branch"
      },
      {
        id: "observability",
        title: "Full-Stack Observability",
        description: "Complete visibility into your infrastructure, applications, and costs",
        icon: "eye"
      }
    ],

    pricing: {
      currency: "USD",
      billingCycles: ["monthly", "yearly"],

      plans: [
        {
          name: "Starter",
          price: {
            monthly: 0,
            yearly: 0
          },
          description: "Perfect for small teams getting started",
          features: [
            "Up to 10 nodes",
            "Basic AI optimization",
            "Community support",
            "Single cloud provider",
            "Standard integrations"
          ],
          cta: "Start Free",
          ctaLink: "#signup"
        },
        {
          name: "Growth",
          price: {
            monthly: 499,
            yearly: 4990
          },
          description: "For growing teams that need more power",
          features: [
            "Up to 100 nodes",
            "Advanced AI optimization",
            "Priority support",
            "Multi-cloud support",
            "Custom integrations",
            "SLA guarantee"
          ],
          highlighted: true,
          badge: "Most Popular",
          cta: "Start Trial",
          ctaLink: "#signup"
        },
        {
          name: "Enterprise",
          price: {
            monthly: "Custom",
            yearly: "Custom"
          },
          description: "Custom solutions for large organizations",
          features: [
            "Unlimited nodes",
            "Custom AI models",
            "Dedicated support",
            "On-premise deployment",
            "Custom contracts",
            "Training included"
          ],
          cta: "Contact Sales",
          ctaLink: "#contact"
        }
      ]
    },

    integrations: [
      { name: "GitHub", icon: "/images/integrations/github.svg" },
      { name: "GitLab", icon: "/images/integrations/gitlab.svg" },
      { name: "Jenkins", icon: "/images/integrations/jenkins.svg" },
      { name: "Kubernetes", icon: "/images/integrations/k8s.svg" },
      { name: "Terraform", icon: "/images/integrations/terraform.svg" },
      { name: "AWS", icon: "/images/integrations/aws.svg" },
      { name: "Azure", icon: "/images/integrations/azure.svg" },
      { name: "GCP", icon: "/images/integrations/gcp.svg" }
    ],

    testimonials: [
      {
        id: "testimonial1",
        name: "David Kim",
        role: "VP of Engineering",
        company: "TechCorp",
        content: "CloudSync AI reduced our deployment time from hours to minutes. The AI optimization alone saved us $100k annually.",
        rating: 5,
        image: "/images/testimonials/david.jpg",
        featured: true,
        logo: "/images/companies/techcorp.svg"
      },
      {
        id: "testimonial2",
        name: "Lisa Anderson",
        role: "DevOps Lead",
        company: "StartupXYZ",
        content: "The predictive scaling is game-changing. We handle 10x traffic spikes without any manual intervention.",
        rating: 5,
        image: "/images/testimonials/lisa.jpg",
        logo: "/images/companies/startupxyz.svg"
      }
    ],

    team: [
      {
        name: "Alex Chen",
        role: "CEO & Co-founder",
        bio: "Former AWS Principal Engineer",
        image: "/images/team/alex.jpg",
        linkedin: "https://linkedin.com/in/alexchen"
      },
      {
        name: "Maria Rodriguez",
        role: "CTO & Co-founder",
        bio: "AI researcher, ex-Google Brain",
        image: "/images/team/maria.jpg",
        linkedin: "https://linkedin.com/in/mariarodriguez"
      }
    ],

    cta: {
      headline: "Ready to Revolutionize Your DevOps?",
      description: "Join hundreds of teams deploying faster and smarter with AI",
      button: {
        text: "Start Your Free 14-Day Trial",
        link: "#signup"
      },
      note: "No credit card required • Setup in 5 minutes"
    }
  },

  // Theme Configuration
  theme: {
    name: "tech-modern",
    industry: "technology",

    colors: {
      primary: {
        50: "#f5f3ff",
        500: "#8b5cf6",
        900: "#4c1d95"
      },
      secondary: {
        50: "#f0fdff",
        500: "#06b6d4",
        900: "#164e63"
      },
      accent: "#f59e0b"
    },

    typography: {
      fontFamily: {
        sans: "Inter, -apple-system, system-ui, sans-serif",
        serif: "Charter, Georgia, serif",
        mono: "JetBrains Mono, Consolas, monospace",
        display: "Cal Sans, Inter, sans-serif"
      },
      fontSize: {
        base: "16px",
        scale: 1.25
      }
    },

    layout: {
      borderRadius: "0.25rem",
      containerWidth: "1280px",
      spacing: {
        section: "5rem"
      }
    },

    animations: {
      enabled: true,
      duration: "200ms",
      easing: "cubic-bezier(0.4, 0, 0.2, 1)"
    }
  },

  // Features & Integrations
  features: {
    enableChat: true,
    enableAnalytics: true,
    enableNewsletter: true,
    enableDocs: true,
    enableAPI: true,
    enableStatus: true,
    enableDarkMode: true
  },

  integrations: {
    chat: {
      provider: "intercom",
      appId: "abc123xyz"
    },
    analytics: {
      google: {
        measurementId: "G-TECHXYZ123"
      },
      segment: {
        writeKey: "segment_key_123"
      },
      amplitude: {
        apiKey: "amplitude_key_123"
      }
    },
    docs: {
      url: "https://docs.cloudsync.ai"
    },
    api: {
      url: "https://api.cloudsync.ai",
      version: "v1"
    },
    status: {
      url: "https://status.cloudsync.ai"
    }
  },

  // Performance optimizations
  performance: {
    lazyLoad: true,
    preconnect: [
      "https://api.cloudsync.ai",
      "https://cdn.cloudsync.ai"
    ],
    prefetch: [
      "/dashboard",
      "/docs"
    ]
  }
};