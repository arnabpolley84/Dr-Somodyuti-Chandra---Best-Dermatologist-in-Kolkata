import React from 'react';
import { Phone, Calendar, Star, MapPin } from 'lucide-react';
import { CLINIC_INFO, IMAGES } from '../data/clinicData';
import { TypedText } from './TypedText';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  onBookClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onBookClick }) => {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#F6F8F8] border-b border-[#DCE5E5]"
    >
      {/* Subtle architectural clinic backdrop */}
      <div className="absolute inset-0 pointer-events-none">
        <ResilientImage
          src={IMAGES.heroClinic}
          alt="Serene dermatology clinic interior"
          loading="eager"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFFFFF] via-[#FFFFFF]/92 to-[#EDF3F3]/85" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Doctor & Campaign Copy */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm font-semibold tracking-wide text-[#0F4C54] mb-3">
              <TypedText
                text={CLINIC_INFO.professionalTitle}
                immediate
                delay={40}
              />
              <span aria-hidden="true" className="text-[#C49A5B]">
                ·
              </span>
              <TypedText
                text={CLINIC_INFO.specialization}
                immediate
                delay={140}
              />
              <span aria-hidden="true" className="text-[#C49A5B]">
                ·
              </span>
              <TypedText
                text={CLINIC_INFO.bengaliName}
                immediate
                delay={220}
              />
            </div>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-[50px] font-semibold leading-[1.14] tracking-tight text-[#0B2E33] text-balance mb-5">
              <TypedText
                text="Expert Skin & Hair Care with Dr. Somodyuti Chandra"
                immediate
                delay={80}
              />
            </h1>

            <p className="text-base sm:text-lg text-[#3D5255] leading-relaxed max-w-2xl mb-7">
              <TypedText
                text="Personalized dermatological care for healthier skin, stronger hair, and greater confidence."
                immediate
                delay={220}
              />
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 w-full sm:w-auto">
              <button
                type="button"
                onClick={onBookClick}
                className="min-h-[46px] px-6 py-3 bg-[#0F4C54] hover:bg-[#0B393F] text-white text-sm sm:text-base font-semibold rounded-md inline-flex items-center justify-center gap-2 transition-colors shadow-sm whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F4C54]"
              >
                <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
                <TypedText text="Book Appointment" immediate singleLine delay={260} />
              </button>

              <a
                href={CLINIC_INFO.phoneHref}
                className="min-h-[46px] px-6 py-3 bg-white hover:bg-[#EDF3F3] text-[#0B2E33] border border-[#0F4C54]/30 text-sm sm:text-base font-semibold rounded-md inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F4C54]"
              >
                <Phone className="w-4 h-4 text-[#0F4C54] shrink-0" aria-hidden="true" />
                <TypedText
                  text={`Call Now – ${CLINIC_INFO.phoneDisplay}`}
                  immediate
                  singleLine
                  delay={320}
                />
              </a>
            </div>

            {/* Clean Unboxed Trust Metadata Strip */}
            <div className="w-full pt-6 border-t border-[#DCE5E5] grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="flex items-start gap-2.5">
                <div className="flex items-center gap-0.5 text-[#C49A5B] mt-0.5 shrink-0" aria-hidden="true">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current opacity-85" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[#0B2E33] tabular-nums">
                    <TypedText text={`${CLINIC_INFO.rating} / 5 Google Rating`} immediate delay={360} />
                  </div>
                  <div className="text-xs text-[#4A5D60] tabular-nums">
                    <TypedText text={`${CLINIC_INFO.reviewCount} Patient Reviews`} immediate delay={410} />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2 flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#0F4C54] mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <div className="text-sm font-semibold text-[#0B2E33]">
                    <TypedText text={CLINIC_INFO.clinicName} immediate delay={380} />
                  </div>
                  <div className="text-xs text-[#4A5D60]">
                    <TypedText text={CLINIC_INFO.locationShort} immediate delay={440} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Doctor Portrait Frame (Preserves 3:4 natural proportions) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[340px] sm:max-w-[370px] bg-white border border-[#DCE5E5] rounded-xl p-3 shadow-sm">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-[#EDF3F3]">
                <ResilientImage
                  src={IMAGES.doctorPrimary}
                  fallbackSrc={IMAGES.consultationOverview}
                  alt="Dr. Somodyuti Chandra, Dermatologist in Kolkata"
                  loading="eager"
                  className="w-full h-full object-cover object-top"
                  fallbackLabel="Dr. Somodyuti Chandra"
                />
              </div>
              <div className="pt-3.5 pb-1.5 px-1 flex items-center justify-between gap-2">
                <div>
                  <p className="font-display text-lg font-semibold text-[#0B2E33]">
                    <TypedText text={CLINIC_INFO.doctorName} immediate delay={280} />
                  </p>
                  <p className="text-xs text-[#4A5D60]">
                    <TypedText
                      text={`${CLINIC_INFO.specialization} · ${CLINIC_INFO.locationShort}`}
                      immediate
                      delay={350}
                    />
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#0F4C54] tabular-nums whitespace-nowrap shrink-0">
                  <TypedText text={`${CLINIC_INFO.rating} ★ (${CLINIC_INFO.reviewCount})`} immediate singleLine delay={400} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
