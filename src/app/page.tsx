import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { GlobalSearch } from '@/components/home/GlobalSearch';
import { GatewayCards } from '@/components/home/GatewayCards';
import { PopularUnis } from '@/components/home/PopularUnis';
import { ComparePromo } from '@/components/home/ComparePromo';
import { HomeAdmissionSection } from '@/components/home/HomeAdmissionSection';
import { HomeSchoolsSection } from '@/components/home/HomeSchoolsSection';
import { HomeMajorsSection } from '@/components/home/HomeMajorsSection';
import { HomeScholarshipsSection } from '@/components/home/HomeScholarshipsSection';
import { HomeNewsSection } from '@/components/home/HomeNewsSection';
import { HomeCalendarSection } from '@/components/home/HomeCalendarSection';
import { WhyAltanBosgo } from '@/components/home/WhyAltanBosgo';
import { TrustSection } from '@/components/home/TrustSection';
import { FinalCTA } from '@/components/home/FinalCTA';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. Global Search */}
      <GlobalSearch />

      {/* 4. “Та юу хайж байна?” 4 Large Cards */}
      <GatewayCards />

      {/* 5. Popular Universities */}
      <PopularUnis />

      {/* 6. University Comparison Preview */}
      <ComparePromo />

      {/* 7. Admission Information */}
      <HomeAdmissionSection />

      {/* 8. Schools Preview */}
      <HomeSchoolsSection />

      {/* 9. Majors Preview */}
      <HomeMajorsSection />

      {/* 10. Scholarships Preview */}
      <HomeScholarshipsSection />

      {/* 11. Latest Education News */}
      <HomeNewsSection />

      {/* 12. Admission Calendar */}
      <HomeCalendarSection />

      {/* 13. Why Altan Bosgo? */}
      <WhyAltanBosgo />

      {/* 14. Trust Section (Verified Sources) */}
      <TrustSection />

      {/* 15. Final CTA */}
      <FinalCTA />
    </div>
  );
}
