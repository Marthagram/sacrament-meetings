
import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-05-03',
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{ description: 'Sustaining of new Primary president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Youth Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Davis',
    announcements: ['Ward temple night: May 10']
  },
  // ... add remaining records

  {
    id: 2,
    date: '2026-11-15',
    meetingType: 'testimony',
    presiding: 'Bishop David Okafor',
    conducting: 'Sister Ruth Ibrahim',
    announcements: ['Fast Sunday - please remember fast offerings'],
    openingHymn: { number: 1, title: 'The Morning Breaks' },
    openingPrayer: 'Brother Daniel Adebayo',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 173, title: 'While of These Emblems We Partake' },
    speakers: [
      { name: 'Congregation', topic: 'Bearing of Testimonies', type: 'speaker' },
    ],
    closingHymn: { number: 304, title: 'Teach Me to Walk in the Light' },
    closingPrayer: 'Sister Esther Okonkwo',
  },
  {
    id: 3,
    date: '2026-11-22',
    meetingType: 'stake',
    presiding: 'President Michael Mensah',
    conducting: 'President Michael Mensah',
    announcements: ['Stake Conference - Saturday session 5pm, Sunday session 10am'],
    openingHymn: { number: 5, title: 'High on the Mountain Top' },
    openingPrayer: 'Sister Faith Adeleke',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 175, title: 'O God, the Eternal Father' },
    speakers: [
      { name: 'President Michael Mensah', topic: 'Gathering Israel', type: 'speaker' },
      { name: 'Sister Joy Mensah', topic: 'Covenant Keeping', type: 'speaker' },
      { name: 'Stake Choir', topic: 'Come, Come, Ye Saints', type: 'musical-number' },
    ],
    closingHymn: { number: 292, title: 'O My Father' },
    closingPrayer: 'Elder Thomas Brown',
  },
  {
    id: 4,
    date: '2026-11-29',
    meetingType: 'regular',
    presiding: 'Bishop David Okafor',
    conducting: 'Brother James Adeyemi',
    announcements: ['Ward Christmas party Dec 12'],
    openingHymn: { number: 30, title: 'Come, Come, Ye Saints' },
    openingPrayer: 'Sister Hannah Musa',
    wardBusiness: [
      { description: 'Sustain Brother Joseph Danjuma as Young Men President' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 181, title: 'Jesus of Nazareth, Savior and King' },
    speakers: [
      { name: 'Brother Caleb Okoro', topic: 'Service to Others', type: 'speaker' },
      { name: 'Sister Lydia Paul', topic: 'The Power of Prayer', type: 'speaker' },
    ],
    closingHymn: { number: 85, title: 'How Firm a Foundation' },
    closingPrayer: 'Brother Isaac Bello',
  },
  {
    id: 5,
    date: '2026-12-06',
    meetingType: 'general',
    presiding: 'Bishop David Okafor',
    conducting: 'Sister Ruth Ibrahim',
    announcements: ['General Conference viewing in chapel'],
    openingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    openingPrayer: 'Brother Emmanuel Nwosu',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 172, title: 'In Humility, Our Savior' },
    speakers: [
      { name: 'Broadcast Speaker', topic: 'General Conference Session', type: 'speaker' },
    ],
    closingHymn: { number: 3, title: 'Now Let Us Rejoice' },
    closingPrayer: 'Sister Mary Eze',
  },
  {
    id: 6,
    date: '2026-12-13',
    meetingType: 'regular',
    presiding: 'Bishop David Okafor',
    conducting: 'Brother James Adeyemi',
    openingHymn: { number: 208, title: 'Love at Home' },
    openingPrayer: 'Sister Grace Nwosu',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 170, title: 'God, Our Father, Hear Us Pray' },
    speakers: [
      { name: 'Sister Naomi Adeyemi', topic: 'Strengthening Families', type: 'speaker' },
      { name: 'Youth Choir', topic: 'Families Can Be Together Forever', type: 'musical-number' },
      { name: 'Brother Aaron Smith', topic: 'Missionary Work', type: 'speaker' },
    ],
    closingHymn: { number: 101, title: 'Guide Us, O Thou Great Jehovah' },
    closingPrayer: 'Brother John Musa',
  },
  {
  id: 7,
  date: '2026-11-01',
  meetingType: 'regular',
  presiding: 'Bishop David Okafor',
  conducting: 'Brother James Adeyemi',
  announcements: ['Welcome to November - ward fast Sunday'],
  openingHymn: { number: 2, title: 'The Spirit of God' },
  openingPrayer: 'Sister Grace Nwosu',
  wardBusiness: [],
  stakeBusiness: false,
  sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
  speakers: [
    { name: 'Sister Lydia Paul', topic: 'Gratitude', type: 'speaker' },
    { name: 'Brother Caleb Okoro', topic: 'Following the Prophet', type: 'speaker' },
  ],
  closingHymn: { number: 85, title: 'How Firm a Foundation' },
  closingPrayer: 'Brother Isaac Bello',
}
];

export function getAllMeetings(){
  return meetings
}


export function getMeetingsByDate(date?: string | null): SacramentMeeting[] {
  if (date) return meetings.filter(m => m.date === date);
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find(m => m.id === id) ?? null;
}