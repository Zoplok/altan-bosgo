import { UNIVERSITIES } from './universities';
import { SCHOOLS } from './schools';
import { MAJORS } from './majors';
import { SCHOLARSHIPS } from './scholarships';
import { NEWS_ARTICLES } from './news';
import { CALENDAR_EVENTS } from './calendar';

export * from './universities';
export * from './schools';
export * from './majors';
export * from './scholarships';
export * from './news';
export * from './calendar';

export function getUniversityById(idOrSlug: string) {
  return UNIVERSITIES.find(
    (u) => u.id === idOrSlug || u.slug === idOrSlug || u.shortName.toLowerCase() === idOrSlug.toLowerCase()
  );
}

export function getSchoolById(id: string) {
  return SCHOOLS.find((s) => s.id === id);
}

export function getMajorById(id: string) {
  return MAJORS.find((m) => m.id === id);
}

export function getScholarshipById(id: string) {
  return SCHOLARSHIPS.find((s) => s.id === id);
}

export function getNewsById(id: string) {
  return NEWS_ARTICLES.find((n) => n.id === id);
}

export function globalSearch(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return { universities: [], schools: [], majors: [], scholarships: [], news: [] };

  const universities = UNIVERSITIES.filter(
    (u) =>
      u.name.toLowerCase().includes(q) ||
      u.shortName.toLowerCase().includes(q) ||
      u.englishName.toLowerCase().includes(q) ||
      u.description.toLowerCase().includes(q) ||
      u.majors.some((m) => m.name.toLowerCase().includes(q))
  );

  const schools = SCHOOLS.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      (s.shortName && s.shortName.toLowerCase().includes(q)) ||
      s.description.toLowerCase().includes(q) ||
      s.district.toLowerCase().includes(q)
  );

  const majors = MAJORS.filter(
    (m) =>
      m.name.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q) ||
      m.careerDirections.some((c) => c.toLowerCase().includes(q))
  );

  const scholarships = SCHOLARSHIPS.filter(
    (s) =>
      s.title.toLowerCase().includes(q) ||
      s.organization.toLowerCase().includes(q) ||
      s.targetAudience.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
  );

  const news = NEWS_ARTICLES.filter(
    (n) =>
      n.title.toLowerCase().includes(q) ||
      n.excerpt.toLowerCase().includes(q) ||
      n.category.toLowerCase().includes(q)
  );

  return { universities, schools, majors, scholarships, news };
}
