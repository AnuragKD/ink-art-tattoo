import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import IntroSection from '../components/sections/IntroSection';
import FeaturedArtistsSection from '../components/sections/FeaturedArtistsSection';
import StyleGuideSection from '../components/sections/StyleGuideSection';
import PortfolioMasonrySection from '../components/sections/PortfolioMasonrySection';
import ExperienceSection from '../components/sections/ExperienceSection';
import InstagramFeedSection from '../components/sections/InstagramFeedSection';
import FAQSection from '../components/sections/FAQSection';
import BookingCTASection from '../components/sections/BookingCTASection';

export default function Home() {
  return (
    <div className="space-y-0">
      <HeroSection />
      <IntroSection />
      <FeaturedArtistsSection />
      <StyleGuideSection />
      <PortfolioMasonrySection />
      <ExperienceSection />
      <InstagramFeedSection />
      {/* <FAQSection /> */}
      <BookingCTASection />
    </div>
  );
}
