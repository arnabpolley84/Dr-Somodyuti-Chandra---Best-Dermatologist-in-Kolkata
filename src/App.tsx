/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { OverviewAndTreatments } from './components/OverviewAndTreatments';
import { WhyChooseAndConcerns } from './components/WhyChooseAndConcerns';
import { ProcessAndShowcase } from './components/ProcessAndShowcase';
import { ClinicDoctorAndBooking } from './components/ClinicDoctorAndBooking';
import { ReviewsFaqAndFooter } from './components/ReviewsFaqAndFooter';
import { TREATMENT_CATEGORIES } from './data/clinicData';

export default function App() {
  const [selectedConcern, setSelectedConcern] = useState<string>(
    TREATMENT_CATEGORIES[0].concernValue
  );

  const scrollToBooking = () => {
    const el = document.getElementById('appointment-booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTreatment = (concernValue: string) => {
    setSelectedConcern(concernValue);
    scrollToBooking();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#132325]">
      <Header onBookClick={scrollToBooking} />

      <main className="flex-1">
        <HeroSection onBookClick={scrollToBooking} />

        <OverviewAndTreatments onSelectTreatment={handleSelectTreatment} />

        <WhyChooseAndConcerns onSelectTreatment={handleSelectTreatment} />

        <ProcessAndShowcase
          onBookClick={scrollToBooking}
          onSelectTreatment={handleSelectTreatment}
        />

        <ClinicDoctorAndBooking selectedConcern={selectedConcern} />

        <ReviewsFaqAndFooter
          onBookClick={scrollToBooking}
          onSelectTreatment={handleSelectTreatment}
        />
      </main>
    </div>
  );
}
