import React from 'react';
import BodyScrollAnimSection from '../components/sections/BodyScrollAnimSection';
import IntroSection from '../components/sections/IntroSection';
import FeaturedArtistsSection from '../components/sections/FeaturedArtistsSection';
import StyleGuideSection from '../components/sections/StyleGuideSection';
import PortfolioMasonrySection from '../components/sections/PortfolioMasonrySection';
import ExperienceSection from '../components/sections/ExperienceSection';
import InstagramFeedSection from '../components/sections/InstagramFeedSection';
import BookingCTASection from '../components/sections/BookingCTASection';

export default function Home() {
  return (
    <div className="space-y-0">
      <BodyScrollAnimSection />
      {/* <IntroSection /> */}
      {/* <FeaturedArtistsSection /> */}
      <ExperienceSection />
      <PortfolioMasonrySection />
      <StyleGuideSection />
      <InstagramFeedSection />
      {/* <FAQSection /> */}
      <BookingCTASection />
    </div>
  );
}

