import React, { useRef } from 'react';
import {
  MessageSquare,
  SearchCheck,
  FileText,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Phone,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import {
  BEFORE_AFTER_SHOWCASE,
  CLINIC_INFO,
  CONDITIONS_ADDRESSED,
  CONSULTATION_STEPS,
} from '../data/clinicData';
import { TypedText } from './TypedText';
import { ResilientImage } from './ResilientImage';

interface ProcessAndShowcaseProps {
  onBookClick: () => void;
  onSelectTreatment: (concernValue: string) => void;
}

const STEP_ICONS = [MessageSquare, SearchCheck, FileText, CalendarCheck];

export const ProcessAndShowcase: React.FC<ProcessAndShowcaseProps> = ({
  onBookClick,
  onSelectTreatment,
}) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const scrollCarousel = (direction: 'prev' | 'next') => {
    if (!carouselRef.current) return;
    const distance = 320;
    carouselRef.current.scrollBy({
      left: direction === 'next' ? distance : -distance,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {/* Section 7: Step-by-Step Consultation Process */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#0F4C54] mb-2">
              <TypedText text="How Your Visit Works" />
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0B2E33] text-balance mb-3">
              <TypedText text="Step-by-Step Consultation Process" />
            </h2>
            <p className="text-[#4A5D60] text-base leading-relaxed">
              <TypedText text="A calm, structured four-step clinical journey from your first discussion to ongoing skin and hair guidance." />
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONSULTATION_STEPS.map((item, idx) => {
              const StepIcon = STEP_ICONS[idx] ?? MessageSquare;
              return (
                <div
                  key={item.step}
                  className="relative bg-[#F6F8F8] border border-[#DCE5E5] rounded-xl p-6 flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                >
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-full bg-[#0F4C54] text-white flex items-center justify-center shrink-0">
                      <StepIcon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="font-display text-2xl font-semibold text-[#C49A5B] tabular-nums">
                      <TypedText text={item.step} />
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[#0B2E33] mb-2.5 leading-snug">
                    <TypedText text={item.title} />
                  </h3>
                  <p className="text-sm text-[#4A5D60] leading-relaxed">
                    <TypedText text={item.description} />
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 8: Before & After Results (Honest, Non-Fabricated Clinical Presentation) */}
      <section className="py-16 sm:py-20 bg-[#F6F8F8] border-y border-[#DCE5E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#0F4C54] mb-2">
                <TypedText text="Clinical Care Documentation" />
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0B2E33] text-balance mb-3">
                <TypedText text="Before & After Care Perspective" />
              </h2>
              <p className="text-[#4A5D60] text-base leading-relaxed">
                <TypedText text="Structured dermatological follow-up focuses on steady, measurable improvement over time rather than overnight promises." />
              </p>
            </div>
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-[#3D5255] bg-white border border-[#DCE5E5] rounded-lg px-4 py-3 max-w-md">
              <ShieldCheck
                className="w-4 h-4 text-[#0F4C54] mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <span>
                <TypedText text="To protect patient privacy, verified clinical photographs are shared strictly in-clinic during your consultation." />
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {BEFORE_AFTER_SHOWCASE.map((card) => (
              <div
                key={card.id}
                className="bg-white border border-[#DCE5E5] rounded-xl overflow-hidden flex flex-col"
              >
                <div className="px-6 py-4 bg-[#0B2E33] text-white flex items-center justify-between gap-2">
                  <span className="font-display text-lg font-semibold">
                    <TypedText text={card.category} />
                  </span>
                  <span className="text-xs text-[#E8D5B5] whitespace-nowrap shrink-0">
                    <TypedText text="In-Clinic Review" singleLine />
                  </span>
                </div>

                {/* Structured Before & After Comparison Frames */}
                <div className="grid grid-cols-2 divide-x divide-[#DCE5E5] border-b border-[#DCE5E5]">
                  <div className="p-4 bg-[#F6F8F8]">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#4A5D60] mb-2">
                      <TypedText text="Before Assessment" />
                    </div>
                    <div className="aspect-[4/3] rounded-lg border border-dashed border-[#B7C7C9] bg-white flex flex-col items-center justify-center p-3 text-center mb-3">
                      <span className="text-xs font-semibold text-[#0B2E33] mb-1">
                        <TypedText text="Baseline Clinical Photo" />
                      </span>
                      <span className="text-[11px] text-[#4A5D60]">
                        <TypedText text="Archived for patient privacy" />
                      </span>
                    </div>
                    <p className="text-xs text-[#3D5255] leading-relaxed">
                      <TypedText text={card.beforeSummary} />
                    </p>
                  </div>

                  <div className="p-4 bg-white">
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#0F4C54] mb-2">
                      <TypedText text="After Care Goal" />
                    </div>
                    <div className="aspect-[4/3] rounded-lg border border-dashed border-[#0F4C54]/35 bg-[#EDF3F3]/60 flex flex-col items-center justify-center p-3 text-center mb-3">
                      <span className="text-xs font-semibold text-[#0F4C54] mb-1">
                        <TypedText text="Follow-Up Progress" />
                      </span>
                      <span className="text-[11px] text-[#3D5255]">
                        <TypedText text="Reviewed at clinic visit" />
                      </span>
                    </div>
                    <p className="text-xs text-[#3D5255] leading-relaxed">
                      <TypedText text={card.afterGoal} />
                    </p>
                  </div>
                </div>

                <div className="px-6 py-4 bg-white flex items-center justify-between gap-3">
                  <span className="text-xs text-[#4A5D60]">
                    <TypedText text={card.note} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 9: Conditions We Help Address */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#0F4C54] mb-2">
                <TypedText text="Areas of Dermatological Focus" />
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0B2E33] text-balance">
                <TypedText text="Conditions We Help Address" />
              </h2>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                aria-label="Scroll conditions left"
                onClick={() => scrollCarousel('prev')}
                className="w-11 h-11 rounded-full border border-[#DCE5E5] bg-white hover:bg-[#EDF3F3] text-[#0B2E33] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F4C54]"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Scroll conditions right"
                onClick={() => scrollCarousel('next')}
                className="w-11 h-11 rounded-full border border-[#DCE5E5] bg-white hover:bg-[#EDF3F3] text-[#0B2E33] flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F4C54]"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div
            ref={carouselRef}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth"
          >
            {CONDITIONS_ADDRESSED.map((condition) => (
              <div
                key={condition.title}
                className="min-w-[260px] sm:min-w-[290px] max-w-[300px] snap-start bg-[#F6F8F8] border border-[#DCE5E5] rounded-xl overflow-hidden flex flex-col shrink-0 group transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#EDF3F3]">
                  <ResilientImage
                    src={condition.image}
                    alt={condition.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[#0B2E33] mb-1.5 leading-snug">
                      <TypedText text={condition.title} />
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4A5D60] leading-relaxed mb-4">
                      <TypedText text={condition.subtitle} />
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectTreatment(condition.concernValue)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F4C54] hover:text-[#0B2E33] whitespace-nowrap cursor-pointer"
                  >
                    <TypedText text="Book Consultation" singleLine />
                    <ArrowRight className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 10: Strong Call-to-Action Banner */}
      <section className="py-16 sm:py-20 bg-[#0B2E33] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#E8D5B5] mb-3">
            <TypedText text={CLINIC_INFO.clinicName} />
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[42px] font-semibold leading-tight text-balance mb-4">
            <TypedText text="Take the First Step Towards Healthier Skin & Hair" />
          </h2>
          <p className="text-base sm:text-lg text-[#D5E3E4] max-w-2xl mx-auto leading-relaxed mb-8">
            <TypedText text="Schedule a consultation with Dr. Somodyuti Chandra at Wizderm Speciality Skin and Hair Clinic, Kolkata." />
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onBookClick}
              className="min-h-[46px] px-7 py-3 bg-[#C49A5B] hover:bg-[#B4894A] text-[#0B2E33] text-sm sm:text-base font-semibold rounded-md inline-flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
              <TypedText text="Book Appointment" singleLine />
            </button>
            <a
              href={CLINIC_INFO.phoneHref}
              className="min-h-[46px] px-7 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white text-sm sm:text-base font-semibold rounded-md inline-flex items-center gap-2 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
              <TypedText
                text={`Call Now – ${CLINIC_INFO.phoneDisplay}`}
                singleLine
              />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
