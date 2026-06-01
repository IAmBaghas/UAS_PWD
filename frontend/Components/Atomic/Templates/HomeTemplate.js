import { header } from '../Organisms/Header.js';
import { hero } from '../Organisms/Hero.js';
import { statsBar } from '../Organisms/StatsBar.js';
import { programsSection } from '../Organisms/ProgramsSection.js';
import { whyChooseSection } from '../Organisms/WhyChooseSection.js';
import { newsSection } from '../Organisms/NewsSection.js';
import { ctaSection } from '../Organisms/CtaSection.js';
import { footer } from '../Organisms/Footer.js';
import { mobileBottomNav } from '../Organisms/MobileBottomNav.js';

export const homeTemplate = () => {
  return `
    ${header()}
    <main>
      ${hero()}
      ${statsBar()}
      ${programsSection()}
      ${whyChooseSection()}
      ${newsSection()}
      ${ctaSection()}
    </main>
    ${footer()}
    ${mobileBottomNav()}
  `;
};
