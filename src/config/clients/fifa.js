```javascript
// FIFA Website Configuration
export const clientConfig = {
  // Business Identity
  business: {
    name: "FIFA",
    legalName: "Fédération Internationale de Football Association",
    tagline: "For the Game. For the World.",
    description: "The international governing body of football, futsal and beach soccer, promoting the development of football worldwide.",
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
      primary: "/assets/fifa-logo.svg",
      alternate: "/assets/fifa-logo-white.svg",
      favicon: "/assets/favicon.ico"
    },
    colors: {
      primary: "#2563eb",
      secondary: "#64748b", 
      accent: "#f59e0b",
      neutral: "#ffffff"
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
      subheadline: "Uniting the globe through football, developing the sport, and building a better future through the power of the game.",
      cta: "Explore Tournaments",
      image: "/assets/hero-world-cup.jpg"
    },

    features: [
      {
        title: "International Tournaments",
        description: "Organizing and operating the world's premier football competitions including the FIFA World Cup™",
        icon: "trophy"
      },
      {
        title: "Football Development",
        description: "Investment in grassroots programs and infrastructure to grow the sport globally",
        icon: "users"
      },
      {
        title: "Rules & Regulations",
        description: "Setting and enforcing the laws of the game to maintain fairness and integrity",
        icon: "book"
      },
      {
        title: "Member Associations",
        description: "Supporting 211 member associations worldwide to develop football locally",
        icon: "globe"
      }
    ],

    tournaments: {
      headline: "Major Tournaments",
      tiers: [
        {
          name: "FIFA World Cup™",
          description: "The pinnacle of international football competition held every four years",
          features: [
            "32 national teams",
            "Month-long tournament",
            "Global broadcast coverage",
            "Millions in prize money"
          ]
        },
        {
          name: "Women's World Cup™",
          description: "The premier international competition in women's football",
          features: [
            "32 national teams",
            "Growing global audience",
            "Professional organization",
            "Equal prize money"
          ]
        },
        {
          name: "Youth Tournaments",
          description: "U-17 and U-20 World Cups for developing future stars",
          features: [
            "Age group competitions",
            "Development focused",
            "Global scouting platform",
            "Future talent showcase"
          ]
        }
      ]
    },

    testimonials: [
      {
        quote: "FIFA's organization of the World Cup was impeccable, creating an unforgettable experience for fans and players alike.",
        author: "Carlos Alberto",
        title: "Former World Cup Winner",
        image: "/assets/testimonials/carlos.jpg"
      },
      {
        quote: "The development programs have transformed grassroots football in our region.",
        author: "Sarah Thompson",
        title: "National Association Director",
        image: "/assets/testimonials/sarah.jpg"
      },
      {
        quote: "FIFA's commitment to growing women's football has created new opportunities for the next generation.",
        author: "Michelle Adams",
        title: "Women's Football Ambassador",
        image: "/assets/testimonials/michelle.jpg"
      },
      {
        quote: "The technical support and resources provided by FIFA have been instrumental in developing our national program.",
        author: "James Chen",
        title: "Technical Director",
        image: "/assets/testimonials/james.jpg"
      }
    ],

    about: {
      headline: "Uniting the World Through Football",
      story: "Since 1904, FIFA has grown from a small organization to the global governing body of football. Our mission is to promote the development of football, touch the world through its inspiring tournaments, and build a better future through the power of the game.",
      values: [
        "Integrity and ethical behavior",
        "Sporting excellence",
        "Unity and solidarity",
        "Social responsibility"
      ],
      team: [
        {
          name: "Gianni Infantino",
          role: "President",
          image: "/assets/team/president.jpg"
        }
      ]
    }
  },

  // SEO Configuration
  seo: {
    title: "FIFA - For the Game. For the World.",
    description: "FIFA is the international governing body of football, futsal and beach soccer. We develop the game, touch the world, and build a better future through football.",
    keywords: [
      "FIFA",
      "football",
      "soccer",
      "World Cup",
      "international football",
      "football development",
      "football governance",
      "football tournaments"
    ],
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://www.fifa.com",
      site_name: "FIFA",
      images: [
        {
          url: "/assets/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "FIFA - For the Game. For the World."
        }
      ]
    }
  }
};
```