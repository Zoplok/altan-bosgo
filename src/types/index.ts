export type VerificationStatus = 'VERIFIED' | 'NEEDS_REVIEW' | 'UPDATING';

export interface VerificationInfo {
  status: VerificationStatus;
  sourceName: string;
  sourceUrl: string;
  lastUpdated: string;
  notes?: string;
}

export interface UniversityMajor {
  id: string;
  name: string;
  facultyName: string;
  degree: 'Бакалавр' | 'Магистр' | 'Доктор';
  durationYears: number;
  examSubjects: string[];
  thresholdScore: number | string;
  creditPrice: number;
  annualTuition: number;
  notes?: string;
  lastUpdated: string;
  sourceUrl: string;
  verifiedStatus: VerificationStatus;
}

export interface UniversityFaculty {
  id: string;
  name: string;
  description?: string;
  majorsCount: number;
}

export interface UniversityScholarship {
  name: string;
  organization: string;
  coverage: string;
  eligibility: string;
  deadline?: string;
}

export interface UniversityDormitory {
  available: boolean;
  capacity?: number;
  feePerMonth: string;
  conditions: string;
  applicationDeadline?: string;
}

export interface UniversityAdmission {
  requirements: string[];
  applicationDates: { label: string; date: string }[];
  requiredDocuments: string[];
  entranceExams: string[];
  procedure: string[];
  admissionWebsite: string;
  notes?: string;
}

export interface University {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  englishName: string;
  logo: string;
  coverImage?: string;
  location: string;
  city: string;
  district?: string;
  type: 'Төрийн' | 'Хувийн' | 'Хамтарсан';
  foundedYear: number;
  studentCount: number;
  programCount: number;
  facultyCount: number;
  rankingText?: string;
  accreditation: string;
  website: string;
  admissionWebsite: string;
  phone: string;
  email: string;
  description: string;
  highlightScores: {
    minScore: number;
    avgScore: number;
  };
  tuitionSummary: {
    creditPrice: number;
    annualTuitionFrom: number;
    annualTuitionTo: number;
    currency: string;
  };
  verification: VerificationInfo;
  faculties: UniversityFaculty[];
  majors: UniversityMajor[];
  admission: UniversityAdmission;
  scholarships: UniversityScholarship[];
  dormitory: UniversityDormitory;
  faqs?: { question: string; answer: string }[];
}

export interface School {
  id: string;
  name: string;
  shortName?: string;
  type: 'Улсын' | 'Хувийн' | 'Гүнзгийрүүлсэн' | 'Олон улсын';
  levels: ('Бага' | 'Дунд' | 'Ахлах')[];
  city: string;
  district: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  foundedYear: number;
  studentCount: number;
  description: string;
  clubs: string[];
  events: { title: string; date: string; description?: string }[];
  announcements: { title: string; date: string }[];
  image: string;
  verification: VerificationInfo;
}

export interface Major {
  id: string;
  name: string;
  category: string;
  description: string;
  requiredExams: string[];
  durationYears: number;
  careerDirections: string[];
  relatedMajorIds: string[];
  offeringUniversityIds: string[];
  trendScore?: number;
}

export interface Scholarship {
  id: string;
  title: string;
  organization: string;
  category: 'Дотоод' | 'Гадаад' | 'Их сургуулийн' | 'Ахлах ангийн' | 'Сурагчийн' | 'Оюутны';
  targetAudience: string;
  coverage: string;
  requirements: string[];
  deadline: string;
  applyUrl: string;
  featured?: boolean;
  verification: VerificationInfo;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: 'Их, дээд сургууль' | 'ЕБС' | 'Элсэлт' | 'Тэтгэлэг' | 'Шалгалт' | 'Уралдаан' | 'Сургалт' | 'Бусад';
  date: string;
  author: string;
  image: string;
  excerpt: string;
  content: string;
  sourceName: string;
  sourceUrl: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  category: 'ЭЕШ' | 'Их сургууль' | 'Тэтгэлэг' | 'Сургууль';
  startDate: string;
  endDate?: string;
  description: string;
  status: 'UPCOMING' | 'ACTIVE' | 'COMPLETED';
  officialUrl?: string;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: 'STUDENT' | 'UNIVERSITY_STUDENT' | 'PARENT' | 'OTHER';
  educationLevel: string;
  schoolOrUni?: string;
  gradeOrYear?: string;
  savedUniversities: string[];
  savedMajors: string[];
  savedScholarships: string[];
  createdAt: string;
}
