// Pathshala Page Data

import { postion } from "../types/enums";

export const hero = {
  title: "Pathshala Department",
  subtitle: "Nurturing Young Minds, Building Better Futures",
  backgroundImage: "/images/event/event-2.jpg",
  buttonText: "Learn More"
};

export const carouselImages = [
  "/images/arts/our_products1.jpeg",
  "/images/arts/our_products2.jpeg",
  "/images/arts/our_products3.jpeg",
  "/images/arts/our_products4.jpeg",
  "/images/arts/our_products5.jpeg"
];

export const educationalApproach = {
  heading: "Our Educational Approach",
  description: `At Pathshala, we believe in providing holistic education that goes beyond textbooks. 
    Our dedicated teachers focus on developing:`,
  focusAreas: [
    {
      icon: "fas fa-brain",
      text: "Critical thinking and problem-solving skills"
    },
    {
      icon: "fas fa-palette",
      text: "Creative expression and artistic abilities"
    },
    {
      icon: "fas fa-book",
      text: "Strong foundation in core subjects"
    },
    {
      icon: "fas fa-heart",
      text: "Character development and values"
    }
  ],
  images: [
    "/images/kids/bharti.jpeg",
    "/images/kids/ramesh.jpeg"
  ]
};

export const testimonials = [
  {
    quote: "Every child deserves a chance to shine, and every effort we make brings them closer to their dreams",
    author: "Anisha Bharti",
    image: "/images/kids/arjun.jpeg",
    imagePosition: postion.left
  },
  {
    quote: "Before we ask children what they want to become, we must first teach them how to dream.",
    author: "Md Qasim",
    image: "/images/kids/arjun.jpeg",
    imagePosition: postion.right
  },
  {
    quote: "We don't just teach...we listen, guide and grow together.",
    author: "Ainakshi",
    image: "/images/kids/arjun.jpeg",
    imagePosition: postion.left
  },
  {
    quote: "Devil is the biggest teacher... It will come at your worst phase and will teach you the toughest lessons of life... Angels might come or not but Devil will.",
    author: "Amit Raj Singh",
    image: "/images/kids/arjun.jpeg",
    imagePosition: postion.right
  }
];

export const programs = [
  {
    icon: "fas fa-graduation-cap",
    title: "Primary Education",
    description: "Foundation courses for children aged 6–10 years"
  },
  {
    icon: "fas fa-chalkboard-teacher",
    title: "After-School Support",
    description: "Homework help and additional learning support"
  },
  {
    icon: "fas fa-cogs",
    title: "Skill Development",
    description: "Special courses focusing on practical skills"
  }
];

export const impactStats = [
  {
    value: "200+",
    label: "Students Enrolled",
    icon: "fas fa-user-graduate",
    animated: false
  },
  {
    value: "15",
    label: "Dedicated Teachers",
    icon: "fas fa-chalkboard-teacher",
    animated: false
  },
  {
    value: "90%",
    label: "Success Rate",
    icon: "fas fa-chart-line",
    animated: false
  }
];

export const cta = {
  heading: "Join Our Community",
  description: `Whether you are learning your first alphabet or advancing toward higher studies, 
    Pathshala opens its doors to all who seek the light of education.`,
  buttonText: "Join Now",
  buttonLink: "https://docs.google.com/forms/d/e/1FAIpQLSd091F7yX0SJMDXT_eLybLfdX69u54_kKmCAwFaqCqXjuo-Dw/viewform"
};
