// Client Configuration for Netflix
export const clientConfig = {
  business: {
    name: "Netflix",
    legalName: "Netflix, Inc.",
    tagline: "Unlimited entertainment, unlimited possibilities",
    shortDescription: "Stream award-winning movies, TV shows, documentaries, and more on any device",
    longDescription: "Netflix is the world's leading streaming entertainment service with over 230 million paid memberships in over 190 countries enjoying TV series, documentaries, feature films, and mobile games across a wide variety of genres and languages.",
    yearFounded: 1997,
    industry: "Entertainment",
    license: "Digital Streaming Service Provider"
  },

  contact: {
    email: "test@netflix.com",
    phone: "",
    address: {
      street: "100 Winchester Circle",
      city: "Los Gatos",
      state: "California",
      country: "United States",
      zip: "95032"
    },
    hours: {
      monday: "24/7",
      tuesday: "24/7",
      wednesday: "24/7",
      thursday: "24/7",
      friday: "24/7",
      saturday: "24/7",
      sunday: "24/7"
    },
    website: "netflix.com"
  },

  social: {
    linkedin: "company/netflix",
    twitter: "netflix",
    facebook: "netflix",
    instagram: "netflix"
  },

  branding: {
    logo: {
      main: "/images/netflix-logo.svg",
      dark: "/images/netflix-logo-dark.svg",
      light: "/images/netflix-logo-light.svg"
    },
    colors: {
      primary: "#e40c14",
      secondary: "#cc0d15",
      accent: "#e59a9d",
      neutral: "#91070c"
    },
    fonts: {
      heading: "Netflix Sans",
      body: "Netflix Sans"
    }
  },

  content: {
    hero: {
      headline: "Unlimited movies, TV shows, and more",
      subheadline: "Watch anywhere. Cancel anytime.",
      cta: "Get Started",
      secondaryCta: "See Plans",
      image: "/images/hero-streaming.jpg"
    },

    features: [
      {
        title: "Watch on any device",
        description: "Stream on your phone, tablet, laptop, and TV without paying more",
        icon: "devices",
        image: "/images/feature-devices.jpg"
      },
      {
        title: "Download and go",
        description: "Save your data and watch offline on the Netflix mobile app",
        icon: "download",
        image: "/images/feature-download.jpg"
      },
      {
        title: "No commitments",
        description: "Cancel online anytime if you're not satisfied",
        icon: "freedom",
        image: "/images/feature-cancel.jpg"
      }
    ],

    services: [
      {
        name: "Basic with ads",
        description: "The most economical Netflix experience",
        features: [
          "Good video quality in HD",
          "Watch on your TV, computer, mobile phone and tablet",
          "Access to most Netflix catalog"
        ],
        price: "$6.99/month",
        cta: "Subscribe Now"
      },
      {
        name: "Standard",
        description: "Our most popular plan",
        features: [
          "Great video quality in Full HD",
          "Watch on 2 devices at the same time",
          "Download on 2 devices",
          "Ad-free experience"
        ],
        price: "$15.49/month",
        cta: "Subscribe Now"
      },
      {
        name: "Premium",
        description: "Our best video quality",
        features: [
          "Our best video quality in Ultra HD",
          "Watch on 4 devices at the same time",
          "Download on 6 devices",
          "Netflix spatial audio"
        ],
        price: "$19.99/month",
        cta: "Subscribe Now"
      }
    ],

    testimonials: [
      {
        quote: "Netflix has transformed how my family enjoys entertainment. The kids section is amazing!",
        author: "Sarah Johnson",
        title: "Parent",
        company: "Family Subscriber"
      },
      {
        quote: "The original content keeps getting better. Stranger Things alone is worth the subscription.",
        author: "Mike Chen",
        title: "Tech Professional",
        company: "Premium Subscriber"
      }
    ],

    about: {
      story: "Starting as a DVD-by-mail service in 1997, Netflix has evolved into the world's leading streaming entertainment service. We've pioneered streaming media and continue to innovate in both technology and content creation.",
      mission: "To entertain the world through amazing stories",
      values: [
        "Innovation",
        "Excellence in Entertainment",
        "Inclusion",
        "Global Perspective",
        "Member Satisfaction"
      ],
      team: [
        {
          name: "Reed Hastings",
          title: "Co-founder and Executive Chairman",
          image: "/images/team/reed-hastings.jpg"
        },
        {
          name: "Ted Sarandos",
          title: "Co-CEO and Chief Content Officer",
          image: "/images/team/ted-sarandos.jpg"
        }
      ]
    }
  },

  seo: {
    title: "Netflix - Watch TV Shows Online, Watch Movies Online",
    description: "Watch Netflix movies & TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more.",
    keywords: [
      "streaming",
      "movies",
      "TV shows",
      "documentaries",
      "entertainment",
      "original series",
      "watch online",
      "binge watching",
      "netflix originals"
    ],
    og: {
      title: "Netflix - Unlimited Entertainment",
      description: "Watch anywhere. Cancel anytime. Join millions of subscribers enjoying unlimited movies and TV shows.",
      image: "/images/og-netflix-banner.jpg",
      url: "https://www.netflix.com"
    }
  }
};