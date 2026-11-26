export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  originalPrice: string;
  rating: number;
  reviewsCount: number;
  duration: string;
  level: string;
  badge?: string;
  imageSrc: string;
  imageAlt: string;
  modulesCount: number;
  whatYouWillLearn: string[];
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  courseTaken: string;
}

export const COURSES_DATA: Course[] = [
  {
    id: 'be10x-ai',
    title: 'BE10X AI Career Accelerator',
    subtitle: 'Become the AI-powered professional every company wants to hire.',
    description: 'Master AI tools, ChatGPT, and automated workflows to 10x your career growth and productivity.',
    price: '₹299',
    originalPrice: '₹2,999',
    rating: 4.9,
    reviewsCount: 840,
    duration: '6 Hours',
    level: 'Beginner to Advanced',
    badge: 'BESTSELLER',
    imageSrc: '/IMG_20261125_141613.jpg',
    imageAlt: 'BE10X AI Career Accelerator course',
    modulesCount: 8,
    whatYouWillLearn: [
      'Master advanced AI prompting and workplace automation',
      'Save 10+ hours every week using ChatGPT & Claude',
      'Build professional presentations and reports instantly',
      'Position yourself as an indispensable AI professional',
    ],
  },
  {
    id: 'first-crore',
    title: 'How to Make Your First 1 Crore',
    subtitle: 'The ultimate blueprint for wealth building and business scaling.',
    description: 'Learn the exact financial strategies, scaling principles, and mindset shifts required to hit your first 1 Crore milestone.',
    price: '₹499',
    originalPrice: '₹4,999',
    rating: 5.0,
    reviewsCount: 420,
    duration: '10 Hours',
    level: 'Advanced',
    badge: 'FLAGSHIP',
    imageSrc: '/IMG_20261125_141623.jpg',
    imageAlt: 'How to Make Your First 1 Crore course',
    modulesCount: 9,
    whatYouWillLearn: [
      'Foundational wealth accumulation frameworks',
      'High-margin business model design and execution',
      'Capital allocation and smart investment principles',
      'Scaling cash flow from zero to 1 Crore',
    ],
  },
  {
    id: 'editing-masterclass',
    title: 'The Editing Masterclass (Editing Skool)',
    subtitle: 'Professional video editing, motion design, and retention secrets.',
    description: 'Master professional video editing from industry experts. Learn Premiere Pro, cutting techniques, and viral storytelling.',
    price: '₹299',
    originalPrice: '₹2,499',
    rating: 4.9,
    reviewsCount: 670,
    duration: '9 Hours',
    level: 'All Levels',
    badge: 'POPULAR',
    imageSrc: '/IMG_20261125_141635.jpg',
    imageAlt: 'The Editing Masterclass course',
    modulesCount: 11,
    whatYouWillLearn: [
      'Professional Adobe Premiere Pro & CapCut workflow',
      'Editing videos for maximum viewer retention',
      'Sound design, color grading, and dynamic transitions',
      'Creating viral reels, shorts, and YouTube videos',
    ],
  },
  {
    id: 'python-programming',
    title: 'Python Programming Course',
    subtitle: 'Zero to hero Python programming and automation scripts.',
    description: 'Master Python programming from scratch. Learn syntax, data structures, and how to write powerful automation scripts.',
    price: '₹399',
    originalPrice: '₹3,499',
    rating: 4.9,
    reviewsCount: 910,
    duration: '12 Hours',
    level: 'Beginner',
    badge: 'BESTSELLER',
    imageSrc: '/IMG_20261125_141645.jpg',
    imageAlt: 'Python Programming Course',
    modulesCount: 14,
    whatYouWillLearn: [
      'Python syntax, loops, functions, and data structures',
      'Writing custom automation scripts for daily tasks',
      'Working with APIs, JSON files, and databases',
      'Building complete real-world projects from scratch',
    ],
  },
  {
    id: 'google-ads',
    title: 'Google Ads Training from Scratch',
    subtitle: 'Master search, display, and performance max campaigns.',
    description: 'Learn how to setup, optimize, and scale profitable Google Ads campaigns to drive high-intent leads and sales.',
    price: '₹349',
    originalPrice: '₹3,499',
    rating: 4.8,
    reviewsCount: 520,
    duration: '8 Hours',
    level: 'Intermediate',
    badge: 'HIGH DEMAND',
    imageSrc: '/IMG_20261125_141702.jpg',
    imageAlt: 'Google Ads Training from Scratch course',
    modulesCount: 10,
    whatYouWillLearn: [
      'Setting up Google Ads accounts and tracking pixels',
      'Keyword research and high-converting search campaigns',
      'Optimizing cost-per-click (CPC) and Quality Score',
      'Scaling campaigns for maximum Return on Ad Spend (ROAS)',
    ],
  },
  {
    id: 'income-growth',
    title: 'Income Growth & Wealth Blueprint',
    subtitle: 'Scale your total monthly income from ₹0 to ₹25L+.',
    description: 'Transform your earning potential with proven income-scaling frameworks, high-income skill acquisition, and financial execution.',
    price: '₹349',
    originalPrice: '₹2,999',
    rating: 4.8,
    reviewsCount: 430,
    duration: '7 Hours',
    level: 'All Levels',
    badge: 'ESSENTIAL',
    imageSrc: '/IMG_20261125_141653.jpg',
    imageAlt: 'Income Growth & Wealth Blueprint course',
    modulesCount: 8,
    whatYouWillLearn: [
      'Transitioning from low-income to high-income skillsets',
      'Negotiating premium rates and closing high-ticket offers',
      'Building multiple income streams for financial security',
      'Scaling personal income metrics month over month',
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'BE10X AI Career Accelerator ne mera career poori tarah transform kar diya. Ab mai har kaam minutes me kar leta hu!',
    name: 'Sameer Khan',
    role: 'Software Engineer',
    courseTaken: 'BE10X AI Career Accelerator',
  },
  {
    quote: 'Google Ads Training aur Crore Blueprint dekhne ke baad mere business ka revenue 4x ho gaya. Price sirf ₹349 hai!',
    name: 'Neha Gupta',
    role: 'Founder',
    courseTaken: 'Google Ads Training from Scratch',
  },
  {
    quote: 'The Editing Masterclass aur Python Course dono hi ekdam professional hai. Market me isse sasta aur behtar course kahin nahi milega.',
    name: 'Rahul Sharma',
    role: 'Freelancer',
    courseTaken: 'The Editing Masterclass (Editing Skool)',
  },
];

export const ABOUT_TEXT = `MAFIA COURSES is India's premier digital learning platform built to provide 6,000+ top-tier, premium courses at unbeatable cheap prices. The 6 featured masterclasses on the homepage are just the beginning—our full vault spans AI, Ads, Business, Editing, Finance, Trading, E-Commerce, and Programming so you can perform better than anyone else in the market. Message us on Telegram (@MRMAFIA0007) to get access to any course you want.`;
