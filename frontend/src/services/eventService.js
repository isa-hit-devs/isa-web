import postService from './postService';

export const eventService = {
  /**
   * Fetches events saved in the backend post system with category='Events'
   * @param {Object} params
   * @param {number} [params.page=1]
   * @param {number} [params.limit=10]
   */
  getEventPosts: async ({ page = 1, limit = 10 } = {}) => {
    return await postService.getPosts({ category: 'Events', page, limit });
  },

  /**
   * Get featured upcoming and past chapter events for rich presentation
   */
  getFeaturedEvents: () => {
    return [
      {
        id: 'auto-con-2025',
        title: 'Annual Automation & Instrumentation Conclave',
        tagline: 'Future of Industry 4.0, IoT & Smart Instrumentation',
        category: 'Flagship Summit',
        date: 'October 15, 2025',
        time: '10:00 AM - 5:00 PM IST',
        location: 'Main Auditorium, Haldia Institute of Technology',
        mode: 'In-Person',
        status: 'Upcoming',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
        description: 'Join industry veterans, automation researchers, and faculty leaders for keynotes, live DCS demonstrations, and student project exhibitions.',
        highlights: [
          'Keynote from ISA District Leaders',
          'PLC & SCADA Hands-on Lab Session',
          'Networking Lunch with Alumni in Core Automation',
          'Certificate of Participation'
        ]
      },
      {
        id: 'plc-scada-workshop',
        title: 'Industrial PLC & SCADA Hands-On Bootcamp',
        tagline: 'Practical training on Siemens & Allen Bradley systems',
        category: 'Technical Workshop',
        date: 'November 05, 2025',
        time: '2:00 PM - 6:00 PM IST',
        location: 'Instrumentation Lab 3, HIT',
        mode: 'Hands-on Lab',
        status: 'Upcoming',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
        description: 'A 2-day intensive bootcamp designed to help students master ladder logic programming, industrial sensor interfacing, and HMI design.',
        highlights: [
          'Live ladder logic debugging',
          'Hardware sensor interfacing',
          'Real-time industrial plant simulation'
        ]
      },
      {
        id: 'hack-automation-2025',
        title: 'HackAuto: 24-Hour IoT & Automation Hackathon',
        tagline: 'Build solutions for smart cities, energy monitoring & robotics',
        category: 'Hackathon',
        date: 'December 12-13, 2025',
        time: '24 Hours',
        location: 'HIT Central Computer Center',
        mode: 'Hybrid',
        status: 'Upcoming',
        image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
        description: 'Compete in teams of 2-4 to build working hardware/software prototypes for industrial automation, smart agriculture, and biomedical sensing.',
        highlights: [
          'Cash prizes & direct internship referrals',
          'Mentorship from top tech leads',
          'Hardware component kits provided'
        ]
      }
    ];
  }
};

export default eventService;
