// Art & Craft Page Data

export const artworks = [
    { 
        id: 'candle',
        title: "Scented Candles", 
        description: "Hand-poured scented candles in various fragrances.",
        images: Array.from({length: 8}, (_, i) => `/images/anc/candle/${i+1}.jpeg`)
    },
    { 
        id: 'canvas',
        title: "Canvas Painting",
        description: "Beautiful hand-painted canvas artworks created by our talented artists.",
        images: Array.from({length: 9}, (_, i) => `/images/anc/canvas/${i+1}.jpeg`)
    },
    { 
        id: 'bookmarks',
        title: "Bookmarks", 
        description: "Handmade bookmarks with unique designs.",
        images: Array.from({length: 5}, (_, i) => `/images/anc/bookmarks/${i+1}.jpeg`)
    },
    { 
        id: 'magnets',
        title: "Fridge Magnets", 
        description: "Handcrafted decorative magnets for your refrigerator.",
        images: Array.from({length: 9}, (_, i) => `/images/anc/magnets/${i+1}.jpeg`)
    },
    { 
        id: 'lippan',
        title: "Lippan Art", 
        description: "Traditional Indian mud and mirror work art pieces.",
        images: Array.from({length: 5}, (_, i) => `/images/anc/lippan/${i+1}.jpeg`)
    },
    { 
        id: 'mandala',
        title: "Mandala Art", 
        description: "Intricate mandala designs created with precision and care.",
        images: Array.from({length: 4}, (_, i) => `/images/anc/mandala/${i+1}.jpeg`)
    }
];

export const artForms = [
    { icon: 'fas fa-palette', name: 'Painting' },
    { icon: 'fas fa-hands', name: 'Handicrafts' },
    { icon: 'fas fa-pencil-alt', name: 'Sketching' },
    { icon: 'fas fa-sun', name: 'Mandala' },
    { icon: 'fas fa-hand-sparkles', name: 'Lippan Art' },
    { icon: 'fas fa-desktop', name: 'Digital Art' },
    { icon: 'fas fa-cog', name: 'Customizable products' },
    { icon: 'fas fa-flask', name: 'Resin Art' }
];

export const programs = [
    {
        icon: 'fas fa-paint-brush',
        title: 'Volunteer with us',
        description: 'Join our team and help nurture young creative minds'
    },
    {
        icon: 'fas fa-box-open',
        title: 'Donate material',
        description: 'Support our programs with art supplies and materials'
    },
    {
        icon: 'fas fa-school',
        title: 'School collaboration',
        description: 'Partner with us to bring art programs to your school'
    },
    {
        icon: 'fas fa-gift',
        title: 'Corporate Gifting',
        description: 'Unique and artistic gifts for businesses'
    }
];

export const pageContent = {
    hero: {
        title: "Art & Craft",
        subtitle: "Crafted with Care, Powered by Hope!",
        backgroundImage: "/images/event/event-4.jpeg",
        buttonText: "Explore Gallery"
    },
    creativeExpression: {
        heading: "Creative Expression",
        description: `The Art and Craft Department of Koshish is dedicated to nurturing creativity 
            and self-expression through hands-on artistic activities. 
            It focuses on engaging children in various art and craft-making sessions 
            where they learn new skills while creating beautiful handmade products.`,
        note: "These beautiful creations are made by our dedicated volunteers and talented kids.",
        artFormsHeading: "Art Forms We Explore",
        illustration: "/images/arts/intro-section-illustration1.png"
    },
    gallery: {
        heading: "Our Gallery",
        counterPrefix: "We have made ",
        counterSuffix: " products since our inception",
        targetCount: 1253
    },
    community: {
        heading: "Join Our Creative Community"
    },
    cta: {
        heading: "Start Your Creative Journey",
        description: `Whether you're an experienced artist or just beginning your creative journey, 
            our doors are open to all who wish to explore the world of arts and crafts.`,
        buttonText: "Join Now",
        buttonLink: "https://docs.google.com/forms/d/e/1FAIpQLSd091F7yX0SJMDXT_eLybLfdX69u54_kKmCAwFaqCqXjuo-Dw/viewform"
    }
};
