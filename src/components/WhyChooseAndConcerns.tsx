import React, { useState } from 'react';
import {
  UserCheck,
  HeartHandshake,
  Sparkles,
  ClipboardList,
  Stethoscope,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { COMMON_CONCERNS, WHY_CHOOSE_ITEMS } from '../data/clinicData';
import { TypedText } from './TypedText';
import { ResilientImage } from './ResilientImage';

interface WhyChooseAndConcernsProps {
  onSelectTreatment: (concernValue: string) => void;
}

const ICON_MAP = {
  'user-check': UserCheck,
  heart: HeartHandshake,
  sparkles: Sparkles,
  clipboard: ClipboardList,
  stethoscope: Stethoscope,
  'map-pin': MapPin,
};

export const WhyChooseAndConcerns: React.FC<WhyChooseAndConcernsProps> = ({
  onSelectTreatment,
}) => {
  const [activeConcernId, setActiveConcernId] = useState<string>(
    COMMON_CONCERNS[0].id
  );

  const activeConcern =
    COMMON_CONCERNS.find((c) => c.id === activeConcernId) ?? COMMON_CONCERNS[0];

  return (
    <>
      {/* Section 5: Why Choose Dr. Somodyuti Chandra? */}
      <section id="why-choose" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#0F4C54] mb-2">
              <TypedText text="Patient-Centered Approach" />
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0B2E33] text-balance mb-3">
              <TypedText text="Why Choose Dr. Somodyuti Chandra?" />
            </h2>
            <p className="text-[#4A5D60] text-base leading-relaxed">
              <TypedText text="Thoughtful clinical attention built around listening carefully, addressing your questions, and tailoring care to your skin and hair." />
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_CHOOSE_ITEMS.map((item) => {
              const IconComponent = ICON_MAP[item.iconName];
              return (
                <div
                  key={item.number}
                  className="bg-[#F6F8F8] border border-[#DCE5E5] rounded-xl p-6 transition-all duration-200 hover:bg-white hover:shadow-sm"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-lg bg-[#0F4C54] text-white flex items-center justify-center shrink-0">
                      <IconComponent className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="font-display text-xl font-semibold text-[#C49A5B] tabular-nums">
                      <TypedText text={item.number} />
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[#0B2E33] mb-2">
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

      {/* Section 6: Common Skin & Hair Concerns */}
      <section className="py-16 sm:py-20 bg-[#EDF3F3]/60 border-y border-[#DCE5E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-10">
            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#0F4C54] mb-2">
              <TypedText text="Understanding Your Concerns" />
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0B2E33] text-balance mb-3">
              <TypedText text="Common Skin & Hair Concerns" />
            </h2>
            <p className="text-[#4A5D60] text-base leading-relaxed">
              <TypedText text="Select a concern below to understand common signs and how a structured dermatological consultation can help." />
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Interactive Concern Tabs */}
            <div className="lg:col-span-5 flex flex-col gap-2.5">
              {COMMON_CONCERNS.map((concern) => {
                const isActive = concern.id === activeConcern.id;
                return (
                  <button
                    key={concern.id}
                    type="button"
                    onClick={() => setActiveConcernId(concern.id)}
                    className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F4C54] ${
                      isActive
                        ? 'bg-[#0F4C54] text-white border-[#0F4C54] shadow-sm'
                        : 'bg-white text-[#132325] border-[#DCE5E5] hover:border-[#0F4C54]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-display text-base sm:text-lg font-semibold">
                        <TypedText text={concern.title} />
                      </span>
                      <ArrowRight
                        className={`w-4 h-4 shrink-0 transition-transform ${
                          isActive ? 'text-[#C49A5B] translate-x-0.5' : 'text-[#4A5D60]'
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Concern Detail & Image Panel */}
            <div className="lg:col-span-7 bg-white border border-[#DCE5E5] rounded-xl overflow-hidden flex flex-col">
              <div className="aspect-[16/9] w-full overflow-hidden bg-[#EDF3F3]">
                <ResilientImage
                  src={activeConcern.image}
                  alt={activeConcern.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-[#0B2E33] mb-3">
                    <TypedText text={activeConcern.title} />
                  </h3>
                  <p className="text-sm sm:text-base font-medium text-[#0F4C54] mb-3 leading-relaxed">
                    <TypedText text={activeConcern.summary} />
                  </p>
                  <p className="text-sm sm:text-base text-[#4A5D60] leading-relaxed mb-6">
                    <TypedText text={activeConcern.details} />
                  </p>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => onSelectTreatment('General Skin Care Consultation')}
                    className="min-h-[44px] px-5 py-2.5 bg-[#0F4C54] hover:bg-[#0B393F] text-white text-sm font-semibold rounded-md inline-flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F4C54]"
                  >
                    <TypedText text="Discuss This Concern" singleLine />
                    <ArrowRight className="w-4 h-4 shrink-0" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
