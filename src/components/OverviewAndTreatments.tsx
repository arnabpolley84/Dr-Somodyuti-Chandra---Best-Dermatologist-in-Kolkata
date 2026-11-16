import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { IMAGES, TREATMENT_CATEGORIES } from '../data/clinicData';
import { TypedText } from './TypedText';
import { ResilientImage } from './ResilientImage';

interface OverviewAndTreatmentsProps {
  onSelectTreatment: (concernValue: string) => void;
}

export const OverviewAndTreatments: React.FC<OverviewAndTreatmentsProps> = ({
  onSelectTreatment,
}) => {
  return (
    <>
      {/* Section 3: Introduction / Treatment Overview */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[#DCE5E5] bg-[#F6F8F8]">
                <ResilientImage
                  src={IMAGES.consultationOverview}
                  alt="Dermatological consultation desk and clinical skin care preparation"
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#0F4C54] mb-2">
                <TypedText text="Clinical Dermatology & Trichology Overview" />
              </p>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0B2E33] text-balance leading-snug mb-5">
                <TypedText text="Personalized Dermatology Care for Your Skin & Hair" />
              </h2>
              <p className="text-[#3D5255] text-base leading-relaxed mb-4">
                <TypedText text="Skin and hair concerns rarely have a single cause. Environmental humidity, seasonal changes, stress, nutritional balance, and individual genetics all shape how your skin and scalp respond over time. Over-the-counter trial and error often delays real progress or irritates sensitive skin." />
              </p>
              <p className="text-[#3D5255] text-base leading-relaxed mb-6">
                <TypedText text="At Wizderm Speciality Skin and Hair Clinic in Jodhpur Park, Dr. Somodyuti Chandra focuses on careful clinical evaluation and individualized treatment planning—so every patient receives clear answers, realistic expectations, and attentive medical care." />
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-7">
                {[
                  'Dedicated one-on-one clinical assessment',
                  'Individualized skin and scalp guidance',
                  'Clear explanations for every patient query',
                  'Structured follow-up care in Kolkata',
                ].map((point) => (
                  <div key={point} className="flex items-start gap-2.5">
                    <CheckCircle2
                      className="w-4 h-4 text-[#0F4C54] mt-1 shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-sm font-medium text-[#132325]">
                      <TypedText text={point} />
                    </span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => onSelectTreatment('General Skin Care Consultation')}
                className="min-h-[44px] px-6 py-2.5 bg-[#0F4C54] hover:bg-[#0B393F] text-white text-sm font-semibold rounded-md inline-flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F4C54]"
              >
                <TypedText text="Schedule a Consultation" singleLine />
                <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Dermatology Treatments */}
      <section
        id="treatments"
        className="py-16 sm:py-20 bg-[#F6F8F8] border-y border-[#DCE5E5]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#0F4C54] mb-2">
              <TypedText text="Consultation Categories" />
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0B2E33] text-balance mb-3">
              <TypedText text="Comprehensive Skin & Hair Consultations" />
            </h2>
            <p className="text-[#4A5D60] text-base leading-relaxed">
              <TypedText text="Explore dedicated dermatological consultation areas offered by Dr. Somodyuti Chandra at Wizderm Speciality Skin and Hair Clinic." />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {TREATMENT_CATEGORIES.map((item) => (
              <article
                key={item.id}
                className="group bg-white border border-[#DCE5E5] rounded-xl overflow-hidden flex flex-col transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-[#EDF3F3]">
                  <ResilientImage
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-semibold text-[#0F4C54] tracking-wide mb-1.5">
                    <TypedText text={item.focusLabel} />
                  </span>
                  <h3 className="font-display text-xl font-semibold text-[#0B2E33] leading-snug mb-2.5">
                    <TypedText text={item.title} />
                  </h3>
                  <p className="text-sm text-[#4A5D60] leading-relaxed mb-6 flex-1">
                    <TypedText text={item.description} />
                  </p>
                  <button
                    type="button"
                    onClick={() => onSelectTreatment(item.concernValue)}
                    className="min-h-[42px] w-full px-4 py-2.5 bg-[#EDF3F3] hover:bg-[#0F4C54] text-[#0B2E33] hover:text-white text-sm font-semibold rounded-md inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F4C54]"
                  >
                    <TypedText text="Book Consultation" singleLine />
                    <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
