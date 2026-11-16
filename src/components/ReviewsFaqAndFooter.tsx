import React, { useState } from 'react';
import {
  Star,
  Quote,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Phone,
  MapPin,
  Calendar,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import {
  CLINIC_INFO,
  FAQ_ITEMS,
  GOOGLE_REVIEWS,
  NAV_ITEMS,
  TREATMENT_CATEGORIES,
} from '../data/clinicData';
import { TypedText } from './TypedText';

interface ReviewsFaqAndFooterProps {
  onBookClick: () => void;
  onSelectTreatment: (concernValue: string) => void;
}

export const ReviewsFaqAndFooter: React.FC<ReviewsFaqAndFooterProps> = ({
  onBookClick,
  onSelectTreatment,
}) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const prevReview = () => {
    setActiveSlide((prev) =>
      prev === 0 ? GOOGLE_REVIEWS.length - 1 : prev - 1
    );
  };

  const nextReview = () => {
    setActiveSlide((prev) =>
      prev === GOOGLE_REVIEWS.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      {/* Section 14: Patient Testimonials and Google Reviews */}
      <section id="reviews" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#0F4C54] mb-2">
                <TypedText text="Verified Google Listing Feedback" />
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0B2E33] text-balance mb-3">
                <TypedText text="Patient Testimonials & Google Reviews" />
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-sm text-[#3D5255]">
                <div className="flex items-center gap-1 text-[#C49A5B]" aria-hidden="true">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current opacity-85" />
                </div>
                <span className="font-semibold text-[#0B2E33] tabular-nums">
                  <TypedText text={`${CLINIC_INFO.rating} / 5 Google Rating`} />
                </span>
                <span aria-hidden="true" className="text-[#C49A5B]">
                  ·
                </span>
                <span className="tabular-nums">
                  <TypedText text={`${CLINIC_INFO.reviewCount} Google Reviews`} />
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <a
                href={CLINIC_INFO.mapsDirectionsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[42px] px-4 py-2 bg-[#EDF3F3] hover:bg-[#DCE5E5] text-[#0B2E33] text-xs sm:text-sm font-semibold rounded-md inline-flex items-center gap-2 transition-colors whitespace-nowrap"
              >
                <TypedText text="View Google Listing" singleLine />
                <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Desktop 3-Card Grid + Mobile Slider */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {GOOGLE_REVIEWS.map((review) => (
              <blockquote
                key={review.id}
                className="bg-[#F6F8F8] border border-[#DCE5E5] rounded-xl p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <Quote
                      className="w-6 h-6 text-[#C49A5B]"
                      aria-hidden="true"
                    />
                    <div
                      className="flex items-center gap-0.5 text-[#C49A5B]"
                      aria-label="5 star rating"
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </div>
                  </div>
                  <p className="font-display text-xl text-[#0B2E33] leading-relaxed mb-6">
                    <TypedText text={`"${review.quote}"`} />
                  </p>
                </div>
                <footer className="pt-4 border-t border-[#DCE5E5] text-xs font-medium text-[#4A5D60]">
                  <TypedText text={review.sourceLabel} />
                </footer>
              </blockquote>
            ))}
          </div>

          {/* Mobile Testimonial Slider */}
          <div className="md:hidden">
            <blockquote className="bg-[#F6F8F8] border border-[#DCE5E5] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <Quote className="w-6 h-6 text-[#C49A5B]" aria-hidden="true" />
                <div className="flex items-center gap-0.5 text-[#C49A5B]" aria-hidden="true">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </div>
              </div>
              <p className="font-display text-lg text-[#0B2E33] leading-relaxed mb-5">
                <TypedText text={`"${GOOGLE_REVIEWS[activeSlide].quote}"`} />
              </p>
              <div className="pt-3 border-t border-[#DCE5E5] flex items-center justify-between">
                <span className="text-xs font-medium text-[#4A5D60]">
                  <TypedText text={GOOGLE_REVIEWS[activeSlide].sourceLabel} />
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Previous review"
                    onClick={prevReview}
                    className="w-10 h-10 rounded-full border border-[#DCE5E5] bg-white flex items-center justify-center text-[#0B2E33] cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next review"
                    onClick={nextReview}
                    className="w-10 h-10 rounded-full border border-[#DCE5E5] bg-white flex items-center justify-center text-[#0B2E33] cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Section 15: Frequently Asked Questions */}
      <section
        id="faqs"
        className="py-16 sm:py-20 bg-[#F6F8F8] border-t border-[#DCE5E5]"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#0F4C54] mb-2">
              <TypedText text="Patient Information" />
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0B2E33] text-balance mb-3">
              <TypedText text="Frequently Asked Questions" />
            </h2>
            <p className="text-[#4A5D60] text-base leading-relaxed">
              <TypedText text="Helpful medical guidance on skin, hair, and scheduling your consultation at Wizderm Speciality Skin and Hair Clinic." />
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={item.question}
                  className="bg-white border border-[#DCE5E5] rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full min-h-[56px] px-5 sm:px-6 py-4 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0F4C54]"
                  >
                    <span className="font-display text-base sm:text-lg font-semibold text-[#0B2E33]">
                      <TypedText text={item.question} />
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#0F4C54] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-[#3D5255] leading-relaxed border-t border-[#EDF3F3]">
                      <TypedText text={item.answer} immediate />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 16: Footer */}
      <footer className="bg-[#0B2E33] text-white pt-14 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/15">
            {/* Brand & Doctor Info */}
            <div className="lg:col-span-4 space-y-4">
              <div>
                <h3 className="font-display text-2xl font-semibold text-white">
                  <TypedText text={CLINIC_INFO.doctorName} />
                </h3>
                <p className="text-sm text-[#E8D5B5] mt-1">
                  <TypedText
                    text={`${CLINIC_INFO.bengaliName} · ${CLINIC_INFO.specialization}`}
                  />
                </p>
              </div>
              <p className="text-sm text-[#C7D7D8] leading-relaxed">
                <TypedText text={CLINIC_INFO.clinicName} />
              </p>
              <p className="text-xs text-[#A9BFC1] leading-relaxed">
                <TypedText text={CLINIC_INFO.timingsNote} />
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onBookClick}
                  className="min-h-[42px] px-5 py-2.5 bg-[#C49A5B] hover:bg-[#B4894A] text-[#0B2E33] text-sm font-semibold rounded-md inline-flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <TypedText text="Book Appointment" singleLine />
                </button>
              </div>
            </div>

            {/* Quick Navigation Links */}
            <div className="lg:col-span-2">
              <h4 className="font-display text-base font-semibold text-white mb-4">
                <TypedText text="Quick Links" />
              </h4>
              <ul className="space-y-2.5 text-sm text-[#C7D7D8]">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="hover:text-[#E8D5B5] transition-colors whitespace-nowrap"
                    >
                      <TypedText text={item.label} singleLine />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Consultation Categories */}
            <div className="lg:col-span-3">
              <h4 className="font-display text-base font-semibold text-white mb-4">
                <TypedText text="Consultations" />
              </h4>
              <ul className="space-y-2.5 text-sm text-[#C7D7D8]">
                {TREATMENT_CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <button
                      type="button"
                      onClick={() => onSelectTreatment(cat.concernValue)}
                      className="text-left hover:text-[#E8D5B5] transition-colors cursor-pointer"
                    >
                      <TypedText text={cat.title} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Clinic Address & Contact */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="font-display text-base font-semibold text-white">
                <TypedText text="Clinic Contact" />
              </h4>
              <div className="flex items-start gap-2.5 text-sm text-[#C7D7D8]">
                <MapPin
                  className="w-4 h-4 text-[#E8D5B5] mt-1 shrink-0"
                  aria-hidden="true"
                />
                <span className="leading-relaxed">
                  <TypedText text={CLINIC_INFO.address} />
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-white font-semibold tabular-nums">
                <Phone
                  className="w-4 h-4 text-[#E8D5B5] shrink-0"
                  aria-hidden="true"
                />
                <a href={CLINIC_INFO.phoneHref} className="hover:text-[#E8D5B5]">
                  <TypedText text={CLINIC_INFO.phoneDisplay} />
                </a>
              </div>
              <div>
                <a
                  href={CLINIC_INFO.mapsDirectionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#E8D5B5] hover:underline whitespace-nowrap"
                >
                  <TypedText text="Google Maps Directions" singleLine />
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A9BFC1]">
            <p>
              <TypedText
                text={`© ${new Date().getFullYear()} ${CLINIC_INFO.doctorName} · ${CLINIC_INFO.clinicName}. All rights reserved.`}
              />
            </p>
            <p>
              <TypedText text={CLINIC_INFO.locationShort} />
            </p>
          </div>
        </div>
      </footer>

      {/* Compact Floating WhatsApp & Call Actions (Respects viewport budget) */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
        <a
          href={CLINIC_INFO.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="h-11 px-3.5 rounded-full bg-[#0F4C54] hover:bg-[#0B393F] text-white shadow-lg border border-white/20 inline-flex items-center gap-2 text-xs font-semibold transition-transform hover:scale-[1.03] whitespace-nowrap"
        >
          <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
        <a
          href={CLINIC_INFO.phoneHref}
          aria-label={`Call ${CLINIC_INFO.phoneDisplay}`}
          className="h-11 px-3.5 rounded-full bg-[#C49A5B] hover:bg-[#B4894A] text-[#0B2E33] shadow-lg inline-flex items-center gap-2 text-xs font-semibold transition-transform hover:scale-[1.03] whitespace-nowrap"
        >
          <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span className="hidden sm:inline">Call Now</span>
        </a>
      </div>
    </>
  );
};
