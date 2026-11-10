export interface CertificateData {
  participantName: string;
  email: string;
  phone: string;
  domain: string;
  role: string;
  eventName: string;
  startDate: string;
  endDate: string;
  issueDate: string;
  organization: string;
  certificateType: 'hackathon' | 'internship' | 'participation' | 'excellence';
  certificateId: string;
}

export const CERTIFICATE_TYPES = [
  { value: 'hackathon', label: 'Hackathon Winner' },
  { value: 'internship', label: 'Internship Completion' },
  { value: 'participation', label: 'Participation' },
  { value: 'excellence', label: 'Excellence Award' },
] as const;

export const DOMAINS = [
  'Web Development',
  'Mobile Development',
  'AI / Machine Learning',
  'Data Science',
  'Cybersecurity',
  'Cloud Computing',
  'Blockchain',
  'IoT',
  'UI/UX Design',
  'DevOps',
  'Full Stack Development',
  'Other',
];

export const ROLES = [
  'Participant',
  'Winner',
  'Runner Up',
  'Mentor',
  'Organizer',
  'Intern',
  'Team Lead',
  'Speaker',
  'Judge',
];
