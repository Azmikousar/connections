import {
  Home, Compass, Users, Newspaper, MessageCircle, Bell, Building2, Store, Wrench, Target,
  TrendingUp, Sparkles, Briefcase, CalendarDays, GraduationCap, Handshake, Wallet, Gift,
  Crown, Settings, SquarePen, ShoppingBag, CalendarPlus, BookOpen, Megaphone, Search,
} from 'lucide-react';

export const GROUPS = ['Main', 'Business', 'Grow', 'Account'];

// phase = which roadmap phase delivers it. `view` = which screen opens.
export const NAV = [
  { id: 'home', label: 'Home', icon: Home, group: 'Main', phase: 1, text: 'Your personalised overview.' },
  { id: 'explore', label: 'Explore', icon: Compass, group: 'Main', phase: 1, text: 'Discover people, businesses, products and services.' },
  { id: 'network', label: 'Network', icon: Users, group: 'Main', phase: 2, text: 'Grow your professional and personal network.',
    planned: ['Send and accept connection requests', 'People you may know', 'Follow businesses', 'Find experts, investors and co-founders', 'Connection notes and management'] },
  { id: 'feed', label: 'Social Feed', icon: Newspaper, group: 'Main', phase: 2, text: 'Posts, reels, stories and announcements.',
    planned: ['Text, photo, video and reel posts', 'Stories and polls', 'Likes, comments and shares', 'Hashtags and mentions', 'Business announcements'] },
  { id: 'messages', label: 'Messages', icon: MessageCircle, group: 'Main', phase: 2, text: 'Chat with people and businesses.',
    planned: ['One-to-one and group chat', 'Business chat with automated replies', 'Image, file and voice messages', 'Read receipts and typing indicator', 'Share products and services in chat'] },
  { id: 'notifications', label: 'Notifications', icon: Bell, group: 'Main', phase: 2, text: 'All your updates in one place.',
    planned: ['Likes, comments and mentions', 'Connection requests', 'Orders, enquiries and bookings', 'Notification preferences', 'Mark all as read'] },

  { id: 'mybusiness', label: 'My Business', icon: Building2, group: 'Business', phase: 1, text: 'Create and manage your business profiles.',
    planned: ['Create one or many business profiles', 'Logo, cover, hours and service areas', 'Several services under one business', 'Gallery, reviews and team members', 'Public page and QR code'] },
  { id: 'marketplace', label: 'Marketplace', icon: Store, group: 'Business', phase: 3, text: 'Buy and sell physical and digital products.',
    planned: ['Add products with images and variants', 'Stock, pricing and offers', 'Cart, checkout and payments', 'Orders, returns and invoices', 'Seller ratings and reviews'] },
  { id: 'services', label: 'Services', icon: Wrench, group: 'Business', phase: 1, text: 'Offer and discover services of every kind.',
    planned: ['Service categories and subcategories', 'Packages and hourly or fixed pricing', 'Service areas and availability', 'Booking and quote requests', 'Provider verification'] },
  { id: 'leads', label: 'Leads', icon: Target, group: 'Business', phase: 5, text: 'Track customer enquiries and sales.',
    planned: ['Incoming enquiries from every source', 'Statuses: New, Contacted, Qualified, Converted, Lost', 'Follow-up reminders', 'Sales pipeline', 'AI lead scoring'] },
  { id: 'analytics', label: 'Analytics', icon: TrendingUp, group: 'Business', phase: 6, text: 'Performance reports for you and your business.',
    planned: ['Profile views and post reach', 'Store, product and service views', 'Orders and revenue', 'Conversion and lead statistics', 'Sales trends'] },

  { id: 'ai', label: 'AI Hub', icon: Sparkles, group: 'Grow', phase: 4, text: 'AI tools to build, write, sell and plan.',
    planned: ['Business ideas, names and plans', 'Captions, posts and ad copy', 'Customer reply and proposal drafts', 'Meeting and document summaries', 'Resume builder and interview prep'] },
  { id: 'jobs', label: 'Jobs & Careers', icon: Briefcase, group: 'Grow', phase: 5, text: 'Find work or hire talent.',
    planned: ['Full-time, part-time, remote and freelance jobs', 'Applications and resume upload', 'Employer dashboard', 'Job alerts and saved jobs', 'Interview scheduling'] },
  { id: 'events', label: 'Events', icon: CalendarDays, group: 'Grow', phase: 5, text: 'Events, webinars and networking meetups.',
    planned: ['Create online and offline events', 'Free and paid tickets', 'Attendee management and QR check-in', 'Reminders and discussions', 'Post-event feedback'] },
  { id: 'learning', label: 'Learning', icon: GraduationCap, group: 'Grow', phase: 5, text: 'Courses and knowledge to grow your skills.',
    planned: ['Free and paid courses', 'Live and recorded classes', 'Course progress and certificates', 'Instructor profiles', 'Learning communities'] },
  { id: 'partnerships', label: 'Partnerships', icon: Handshake, group: 'Grow', phase: 5, text: 'Find partners, suppliers and investors.',
    planned: ['Find partners and co-founders', 'Suppliers and distributors', 'Investment opportunities', 'Collaboration requests', 'Partner verification'] },

  { id: 'wallet', label: 'Wallet', icon: Wallet, group: 'Account', phase: 6, text: 'Earnings, payments and transactions.',
    planned: ['Balance and transaction history', 'Seller and provider earnings', 'Withdrawals to your bank', 'Invoices and receipts', 'Refund history'] },
  { id: 'referrals', label: 'Referrals', icon: Gift, group: 'Account', phase: 6, text: 'Invite friends and earn rewards.',
    planned: ['Your referral code and link', 'Referral tracking', 'Rewards history', 'Business referral programme'] },
  { id: 'membership', label: 'Membership', icon: Crown, group: 'Account', phase: 6, text: 'Free, Prime and Business Pro plans.',
    planned: ['Plan comparison', 'Upgrade, renew and cancel', 'Invoices and payment history'] },
  { id: 'settings', label: 'Settings', icon: Settings, group: 'Account', phase: 1, text: 'Account, privacy and security.' },
];

export const byId = Object.fromEntries(NAV.map((n) => [n.id, n]));

// Items that open a real screen today
export const LIVE = new Set(['home', 'explore', 'profile', 'settings']);

// "Create" sheet (centre button on mobile)
export const CREATE_ACTIONS = [
  { id: 'post', label: 'Create post', icon: SquarePen, phase: 2 },
  { id: 'product', label: 'Add product', icon: ShoppingBag, phase: 3 },
  { id: 'service', label: 'Add service', icon: Wrench, phase: 1 },
  { id: 'business', label: 'Create business', icon: Building2, phase: 1 },
  { id: 'job', label: 'Post a job', icon: Briefcase, phase: 5 },
  { id: 'event', label: 'Create event', icon: CalendarPlus, phase: 5 },
  { id: 'article', label: 'Publish article', icon: BookOpen, phase: 2 },
  { id: 'ad', label: 'Start advertisement', icon: Megaphone, phase: 6 },
];

// Quick actions on Home
export const QUICK_ACTIONS = [
  { id: 'business', label: 'Create business', icon: Building2, phase: 1 },
  { id: 'product', label: 'Add product', icon: ShoppingBag, phase: 3 },
  { id: 'service', label: 'Add service', icon: Wrench, phase: 1 },
  { id: 'post', label: 'Create post', icon: SquarePen, phase: 2 },
  { id: 'job', label: 'Post a job', icon: Briefcase, phase: 5 },
  { id: 'customers', label: 'Find customers', icon: Search, phase: 1, to: 'explore' },
  { id: 'event', label: 'Create event', icon: CalendarPlus, phase: 5 },
  { id: 'ai', label: 'Ask AI', icon: Sparkles, phase: 4, to: 'ai' },
];

export const CATEGORIES = [
  'Education', 'Technology', 'Health & Wellness', 'Beauty', 'Home Services', 'Professional',
  'Creative', 'Events', 'Business', 'Travel', 'Automotive', 'Logistics', 'Finance',
  'Agriculture', 'Manufacturing', 'Retail',
];

export const DISCOVER_TYPES = [
  { id: 'people', label: 'People', icon: Users },
  { id: 'businesses', label: 'Businesses', icon: Building2 },
  { id: 'products', label: 'Products', icon: ShoppingBag },
  { id: 'services', label: 'Services', icon: Wrench },
  { id: 'freelancers', label: 'Freelancers', icon: Sparkles },
  { id: 'jobs', label: 'Jobs', icon: Briefcase },
  { id: 'events', label: 'Events', icon: CalendarDays },
  { id: 'courses', label: 'Courses', icon: GraduationCap },
];
