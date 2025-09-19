/**
 * Healthcare Practice Configuration Example
 * Professional, trust-building configuration for medical practices
 */

export const clientConfig = {
  // Business Information
  businessInfo: {
    businessName: "Harmony Health Medical Center",
    tagline: "Compassionate Care, Advanced Medicine",
    description: "Full-service family medical practice providing comprehensive healthcare services. Our board-certified physicians and caring staff are dedicated to your health and wellness journey.",
    industry: "healthcare",
    yearEstablished: 1998,
    employeeCount: "50-100",

    logo: {
      url: "/images/clients/harmony-health/logo.png",
      alt: "Harmony Health Medical Center",
      width: 220,
      height: 70
    },

    seo: {
      keywords: ["family medicine", "primary care", "medical center", "healthcare", "pediatrics", "internal medicine"],
      author: "Harmony Health Medical Center",
      description: "Comprehensive family healthcare services with board-certified physicians. Primary care, pediatrics, and specialized treatments."
    }
  },

  // Contact Information
  contact: {
    email: "info@harmonyhealthmc.com",
    phone: "(555) 456-7890",
    fax: "(555) 456-7891",

    address: {
      street: "1234 Wellness Drive",
      suite: "Building A",
      city: "Boston",
      state: "MA",
      zip: "02108"
    },

    hours: {
      monday: "8:00 AM - 5:00 PM",
      tuesday: "8:00 AM - 5:00 PM",
      wednesday: "8:00 AM - 5:00 PM",
      thursday: "8:00 AM - 7:00 PM",
      friday: "8:00 AM - 5:00 PM",
      saturday: "9:00 AM - 1:00 PM",
      sunday: "Closed",
      note: "24/7 Emergency Line Available"
    },

    social: {
      facebook: "https://facebook.com/harmonyhealthmc",
      linkedin: "https://linkedin.com/company/harmony-health-medical",
      youtube: "https://youtube.com/harmonyhealthmc"
    }
  },

  // Content Sections
  content: {
    hero: {
      headline: "Your Health Is Our Priority",
      subheadline: "Trusted family healthcare with a personal touch since 1998",
      primaryCTA: {
        text: "Schedule Appointment",
        link: "#appointment",
        style: "primary"
      },
      secondaryCTA: {
        text: "Patient Portal",
        link: "https://portal.harmonyhealthmc.com",
        style: "secondary"
      }
    },

    features: [
      {
        id: "primary-care",
        title: "Primary Care",
        description: "Comprehensive preventive care and treatment for all ages",
        icon: "stethoscope",
        highlight: true
      },
      {
        id: "pediatrics",
        title: "Pediatric Services",
        description: "Specialized care for infants, children, and adolescents",
        icon: "baby"
      },
      {
        id: "womens-health",
        title: "Women's Health",
        description: "Complete women's healthcare and wellness services",
        icon: "heart"
      },
      {
        id: "urgent-care",
        title: "Urgent Care",
        description: "Same-day appointments for non-emergency medical needs",
        icon: "clock"
      },
      {
        id: "lab-services",
        title: "On-Site Lab & Imaging",
        description: "Convenient diagnostic services with rapid results",
        icon: "microscope"
      },
      {
        id: "telemedicine",
        title: "Telehealth Services",
        description: "Virtual consultations from the comfort of your home",
        icon: "video-camera"
      }
    ],

    services: [
      {
        id: "family-medicine",
        name: "Family Medicine",
        description: "Complete healthcare for your entire family",
        features: [
          "Annual wellness exams",
          "Chronic disease management",
          "Preventive care screenings",
          "Immunizations and vaccinations",
          "Minor procedure care",
          "Health education and counseling"
        ],
        image: "/images/services/family-medicine.jpg"
      },
      {
        id: "specialty-care",
        name: "Specialty Services",
        description: "Specialized care from expert physicians",
        features: [
          "Cardiology consultations",
          "Dermatology services",
          "Mental health counseling",
          "Nutrition counseling",
          "Physical therapy",
          "Sleep medicine"
        ],
        image: "/images/services/specialty.jpg"
      }
    ],

    providers: [
      {
        id: "dr-williams",
        name: "Dr. Sarah Williams, MD",
        role: "Chief Medical Officer",
        specialty: "Internal Medicine",
        bio: "Board-certified with 20+ years of experience in family medicine",
        image: "/images/providers/dr-williams.jpg",
        education: ["Harvard Medical School", "Johns Hopkins Residency"],
        certifications: ["Board Certified - Internal Medicine", "Fellow - American College of Physicians"]
      },
      {
        id: "dr-johnson",
        name: "Dr. Michael Johnson, MD",
        role: "Pediatrics Department Head",
        specialty: "Pediatrics",
        bio: "Specializing in pediatric care and adolescent medicine",
        image: "/images/providers/dr-johnson.jpg",
        education: ["Yale School of Medicine", "Boston Children's Hospital Fellowship"]
      }
    ],

    testimonials: [
      {
        id: "testimonial1",
        name: "Jennifer Martinez",
        role: "Patient",
        content: "The staff at Harmony Health truly cares about their patients. Dr. Williams has been our family doctor for 10 years, and we couldn't be happier with the care we receive.",
        rating: 5,
        featured: true
      },
      {
        id: "testimonial2",
        name: "Robert Chen",
        role: "Patient",
        content: "Excellent medical care with a personal touch. The online appointment system and patient portal make managing my healthcare so convenient.",
        rating: 5
      },
      {
        id: "testimonial3",
        name: "Patricia Brown",
        role: "Patient",
        content: "The pediatric team is amazing with my children. They make every visit comfortable and stress-free.",
        rating: 5
      }
    ],

    insurance: {
      accepted: [
        "Blue Cross Blue Shield",
        "Aetna",
        "Cigna",
        "United Healthcare",
        "Medicare",
        "Medicaid",
        "Harvard Pilgrim",
        "Tufts Health Plan"
      ],
      note: "We accept most major insurance plans. Please contact us to verify coverage."
    },

    cta: {
      headline: "Ready to Take Control of Your Health?",
      description: "Join thousands of satisfied patients who trust us with their healthcare",
      button: {
        text: "Become a Patient",
        link: "#new-patient"
      }
    }
  },

  // Theme Configuration
  theme: {
    name: "healthcare-professional",
    industry: "healthcare",

    colors: {
      primary: {
        50: "#f0f9ff",
        500: "#0891b2",
        900: "#164e63"
      },
      secondary: {
        50: "#f0fdf4",
        500: "#10b981",
        900: "#064e3b"
      },
      accent: "#3b82f6"
    },

    typography: {
      fontFamily: {
        sans: "Source Sans Pro, system-ui, sans-serif",
        serif: "Lora, Georgia, serif",
        display: "Raleway, system-ui, sans-serif"
      }
    },

    layout: {
      borderRadius: "0.75rem",
      spacing: {
        section: "6rem"
      }
    }
  },

  // Features & Integrations
  features: {
    enableChat: false,
    enableAnalytics: true,
    enableAppointmentBooking: true,
    enablePatientPortal: true,
    enableNewsletter: true,
    enableEmergencyBanner: true
  },

  integrations: {
    appointments: {
      provider: "healthie",
      clientId: "harmony-health"
    },
    patientPortal: {
      url: "https://portal.harmonyhealthmc.com"
    },
    forms: {
      provider: "hipaa-forms",
      endpoint: "https://secure.harmonyhealthmc.com/forms"
    },
    analytics: {
      google: {
        measurementId: "G-HEALTHXYZ"
      }
    }
  },

  // Compliance & Accessibility
  compliance: {
    hipaa: true,
    ada: true,
    wcag: "AA"
  }
};