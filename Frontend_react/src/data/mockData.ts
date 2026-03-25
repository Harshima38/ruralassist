// Mock data for GramAI application
export const userData = {
  name: 'Himanshu',
  role: 'District Admin',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLZWhkK9X2mCEKr824cBWeOWu9bzfGCVbubaPFNpi2PcwwOU8LVD5ALDyD3qnzwYzRM3OrexcltWRlpuJ4RycEKUL7g1bisQhhWLJzI5fkIALqt9IiMrGG4oAMO6QGXBkq7ElakcDDbq2sz9ebWOuAef_vrQFgEm6pIo0iOYDkhUC7ibU55VP7yA7BHh2y_xWNSnrYac7OkWN4JiFq1k4ijpEkPi0V92MXv7ulMMuPbdNp2a6VPLE0Z1fZgVPEnAY9K_So-Y1b4H-f',
  village: 'Kishanpura Panchayat',
};

export const alerts = [
  'Fertilizer distribution starts tomorrow at Block A.',
  'Heavy rainfall predicted for North Fields in 48 hours.',
  'New education grant applications open until Friday.',
  'Free health camp scheduled for 15th October.',
];

export const weatherData = {
  temperature: 32,
  condition: 'Partly Cloudy',
  humidity: 45,
  wind: 12,
  icon: 'partly_cloudy_day',
};

export const villageHealthScore = {
  score: 82,
  status: 'Healthy',
  description: 'Village infra and livestock health is',
  highlight: 'Excellent',
  suffix: 'this week.',
};

export const smartSuggestions = [
  {
    id: 1,
    title: 'Water shortage risk detected',
    description: 'Village tank levels are at 15%. Action recommended for Block B farmers.',
    icon: 'water_damage',
    badge: 'Urgent',
    badgeColor: 'error',
    action: 'Take Action',
  },
  {
    id: 2,
    title: 'PM Kisan Installment Due',
    description: 'Update your bank details to receive the 14th installment by Oct 20th.',
    icon: 'paid',
    badge: 'Financial',
    badgeColor: 'tertiary',
    action: 'Update Now',
  },
];

export const communityEvents = [
  {
    id: 1,
    title: 'Sustainable Farming Workshop',
    tag: 'Event',
    tagColor: 'primary',
    date: 'Oct 12',
    meta: '45 Attending',
    metaIcon: 'group',
    dateIcon: 'calendar_today',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvQWngS5Egu1v8ll3Ugbyj9NEary0CwBK8Vv00Fd-W0c4ATvv7pLAYz6Af75peJ4J0SdavT8JhkkYtIao8Et9NtuND0DYpEI7N7oV-vYcmgsL-G5aUZqmUe136lMp3u7wrMdxbb89z3_oZ2MTjv1XUUm7A_YnxBURS_qESWUsj1jzbAJ2tH9vveXa5o9vnVmI3-RCyzyIWDk8cb-TzTovvGGWR5EFQxMGDodGMrmhrTHgnuDZRIZbviclSfoJD2eS_FCBD00tJJMuo',
  },
  {
    id: 2,
    title: 'New Panchayat Hall Inaugurated',
    tag: 'Local News',
    tagColor: 'secondary',
    date: '2h ago',
    meta: '12 Comments',
    metaIcon: 'chat_bubble',
    dateIcon: 'history',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDD5fGyLsfIUC7nO8MC-0_2eziDerPo5C9jC_pEDODYngkxC4dB8h8UTBY4vTFMDllY1ysJe_Z6h7GJlHkrjIeXsYNsuaUwjh1wkcAkLTOUATtEF_auVj3QhoQF0vP64RBO-er1l4C2wfZAkpHQTzSocwlq4j88sdqfcO9l_kAiweUd6Q1XtaA0FwfKVlQyROtuAXKKZ2MeLsHbGz1mcSIHpDr_RZgFgZMKLQIBvD3kspD4qLLVsUfYbhl4XluoXEfRgZdJQopNCb-u',
  },
  {
    id: 3,
    title: 'Digital Literacy Drive Results',
    tag: 'Education',
    tagColor: 'tertiary',
    date: 'Top Performer',
    meta: 'Share',
    metaIcon: 'share',
    dateIcon: 'star',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7TZkoVB5mSv7cktRKZ4UpPJDtRPR_qat1aruDQ1kAhmlNA-KXGDeaBKgvgpyyCRGQk8h4dyC1S7nQ29T3WSh40Jc5mfRj6XeDVrnEgFQhELyWB5Dw7x4vxx4d7pK0SGYCARx2lkVxJY_5FwqMYgB6HSY3osSFDOjMb6cnOcdPQIzrItVroz0o1jdjfqz7OrExdJddrOWVvq7rlmnOfM0ujai41mz5CfEU2cgv0yUiZkhBpiDgnhP29csY1OeHDj2ABiEOYUXo1duN',
  },
];

export const adminStats = [
  { label: 'Active Requests', value: 1482, change: '+12% vs LW', icon: 'description', color: 'emerald', progress: 74 },
  { label: 'Funds Allocated', value: '₹4.2 Cr', change: 'Budget Utilization', icon: 'payments', color: 'amber', progress: 0 },
];

export const developmentTrendData = [
  { month: 'Jan', infrastructure: 60, economic: 45 },
  { month: 'Feb', infrastructure: 45, economic: 55 },
  { month: 'Mar', infrastructure: 85, economic: 70 },
  { month: 'Apr', infrastructure: 55, economic: 50 },
  { month: 'May', infrastructure: 95, economic: 80 },
  { month: 'Jun', infrastructure: 70, economic: 65 },
  { month: 'Jul', infrastructure: 80, economic: 75 },
];

export const geoIssues = [
  { id: 1, lat: 25.1492, lng: 73.5873, label: 'Broken Borewell', severity: 'warning' },
  { id: 2, lat: 25.1510, lng: 73.5900, label: 'Illegal Encroachment', severity: 'critical' },
];

export const recentActivity = [
  { id: 1, text: 'Bridge repair tender approved', time: '24 minutes ago • Public Works', icon: 'done_all', color: 'emerald' },
  { id: 2, text: 'New grievance: Water Supply', time: '1 hour ago • Ward 3 Residents', icon: 'warning', color: 'amber' },
  { id: 3, text: 'New citizen registration', time: '3 hours ago • Digital Literacy Cell', icon: 'person_add', color: 'slate' },
];

export const issueCategories = [
  { id: 'road', label: 'Road Fix', icon: 'edit_road' },
  { id: 'water', label: 'Water Leak', icon: 'water_drop' },
  { id: 'power', label: 'Power Cut', icon: 'bolt' },
  { id: 'waste', label: 'Waste Info', icon: 'delete_sweep' },
];

export const voiceSuggestions = [
  { icon: 'agriculture', label: 'Crop Insurance Status' },
  { icon: 'water_drop', label: 'Irrigation Subsidy' },
  { icon: 'description', label: 'Apply for Pan Card' },
];

export const sidebarNav = [
  { icon: 'home', label: 'Home', path: '/' },
  { icon: 'location_city', label: 'My Village', path: '#' },
  { icon: 'description', label: 'Applications', path: '#' },
  { icon: 'storefront', label: 'Markets', path: '#' },
  { icon: 'settings', label: 'Settings', path: '#' },
];

export const topNavLinks = [
  { label: 'Dashboard', path: '/' },
  { label: 'Services', path: '/report' },
  { label: 'Grievances', path: '#' },
  { label: 'Community', path: '#' },
];
