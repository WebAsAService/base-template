```javascript
// FIFA Website Configuration
export const clientConfig = {
  // Business Identity
  business: {
    name: "FIFA",
    legalName: "Fédération Internationale de Football Association",
    tagline: "For the Game. For the World.",
    shortDescription: "The international governing body of association football, futsal and beach soccer.",
    longDescription: "FIFA exists to govern football and to develop the game around the world. Since 1904, we've been striving to improve the game of football constantly to promote it globally in the light of its unifying, educational, cultural and humanitarian values.",
    yearFounded: 1904,
    industry: "Sports & Entertainment",
  },

  // Contact Information
  contact: {
    email: "contact@fifa.com",
    phone: "+41 (0)43 222 7777",
    address: {
      street: "FIFA-Strasse 20",
      city: "Zurich",
      state: "",
      country: "Switzerland",
      postal: "8044"
    },
    hours: {
      monday: "9:00 - 17:00",
      tuesday: "9:00 - 17:00",
      wednesday: "9:00 - 17:00",
      thursday: "9:00 - 17:00",
      friday: "9:00 - 17:00",
      saturday: "Closed",
      sunday: "Closed"
    }
  },

  // Social Media
  social: {
    facebook: "https://facebook.com/fifa",
    twitter: "https://twitter.com/FIFAcom",
    instagram: "https://instagram.com/fifaworldcup",
    youtube: "https://youtube.com/FIFA",
    linkedin: "https://linkedin.com/company/fifa"
  },

  // Branding
  branding: {
    logo: {
      main: "/images/fifa-logo.svg",
      dark: "/images/fifa-logo-dark.svg",
      light: "/images/fifa-logo-light.svg"
    },
    colors: {
      primary: "#2563eb",
      secondary: "#64748b", 
      accent: "#f59e0b",
      neutral: "#6b7280"
    },
    fonts: {
      heading: "Montserrat",
      body: "Open Sans"
    }
  },

  // Content Sections
  content: {
    hero: {
      headline: "The World's Game",
      subheadline: "Uniting the globe through the beautiful game of football",
      cta: "Explore Tournaments",
      image: "/images/hero-stadium.jpg"
    },

    features: [
      {
        title: "World Cup™",
        description: "The most prestigious international football tournament bringing together nations from across the globe.",
        icon: "trophy"
      },
      {
        title: "Women's Football",
        description: "Promoting and developing women's football worldwide through tournaments and grassroots programs.",
        icon: "users"
      },
      {
        title: "Youth Development",
        description: "Investing in the future of football through youth tournaments and development initiatives.",
        icon: "star"
      },
      {
        title: "Football Technology",
        description: "Advancing the game through innovation and technology including VAR and goal-line technology.",
        icon: "chip"
      }
    ],

    tournaments: [
      {
        name: "FIFA World Cup™",
        description: "The premier international football tournament held every four years",
        features: [
          "32 national teams",
          "Month-long tournament",
          "Global broadcast coverage",
          "Trophy and prize money"
        ],
        ctaText: "Learn More"
      },
      {
        name: "Women's World Cup™",
        description: "The flagship tournament for women's international football",
        features: [
          "32 national teams",
          "Global showcase",
          "Prize pool",
          "worldwide broadcast"
        ],
        ctaText: "Discover More"
      },
      {
        name: "Youth Championships",
        description: "U-17 and U-20 World Cups for emerging talent",
        features: [
          "Age group competitions",
          "Development focus",
          "Global scouting platform",
          "Future stars showcase"
        ],
        ctaText: "View Details"
      }
    ],

    testimonials: [
      {
        quote: "FIFA's organization of the World Cup was impeccable, creating unforgettable moments for fans worldwide.",
        author: "Carlos Alberto",
        title: "Former National Team Captain",
        image: "/images/testimonial1.jpg"
      },
      {
        quote: "The development programs have significantly improved football infrastructure in our region.",
        author: "Sarah Thompson",
        title: "National Association President",
        image: "/images/testimonial2.jpg"
      },
      {
        quote: "FIFA's commitment to women's football has created new opportunities for female players globally.",
        author: "Emma Martinez",
        title: "Professional Player",
        image: "/images/testimonial3.jpg"
      },
      {
        quote: "The technology innovations introduced by FIFA have made the game fairer and more exciting.",
        author: "Michael Chen",
        title: "Football Analytics Expert",
        image: "/images/testimonial4.jpg"
      }
    ],

    about: {
      story: "Since our founding in 1904, FIFA has grown from a small organization to the global governing body of football. We oversee all aspects of the game, from major international tournaments to grassroots development programs.",
      mission: "To promote the game of football, protect its integrity and bring the game to all.",
      vision: "Making football truly global, accessible and inclusive for all.",
      values: [
        "Integrity",
        "Innovation",
        "Unity",
        "Development"
      ]
    },

    contact: {
      title: "Connect With FIFA",
      subtitle: "Get in touch with us for any inquiries about football development, tournaments, or general information.",
      methods: [
        {
          type: "email",
          value: "contact@fifa.com",
          label: "Email Us"
        },
        {
          type: "phone",
          value: "+41 (0)43 222 7777",
          label: "Call Us"
        }
      ]
    }
  },

  // SEO Configuration
  seo: {
    title: "FIFA - For the Game. For the World.",
    description: "FIFA is the international governing body of association football, promoting the game's growth and development worldwide through tournaments and programs.",
    keywords: [
      "FIFA",
      "football",
      "soccer",
      "World Cup",
      "international football",
      "football development",
      "football tournaments",
      "women's football",
      "youth football"
    ],
    openGraph: {
      title: "FIFA - International Football Federation",
      description: "The home of international football, organizing world-class tournaments and developing the game globally.",
      image: "/images/fifa-og-image.jpg",
      type: "website"
    }
  }
};
```

This configuration provides a complete, professional structure for FIFA's website with:

- Strong brand identity and messaging
- Comprehensive tournament information
- Professional content structure
- SEO-optimized elements
- Realistic testimonials and features
- Clear contact information
- Brand-consistent color scheme

The configuration is ready to be used in an Astro.js website and includes all necessary sections for a professional sports organization website.