import React, { useEffect, useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Calendar,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Loader2,
} from 'lucide-react';
import {
  CLINIC_INFO,
  IMAGES,
  TREATMENT_CATEGORIES,
} from '../data/clinicData';
import { TypedText } from './TypedText';
import { ResilientImage } from './ResilientImage';

interface ClinicDoctorAndBookingProps {
  selectedConcern: string;
}

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  concern: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  preferredDate?: string;
  preferredTime?: string;
  concern?: string;
}

interface SubmissionSuccess {
  referenceId: string;
  message: string;
  fullName: string;
  preferredDate: string;
  preferredTime: string;
  concern: string;
}

export const ClinicDoctorAndBooking: React.FC<ClinicDoctorAndBookingProps> = ({
  selectedConcern,
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState<FormState>({
    fullName: '',
    phone: '',
    email: '',
    preferredDate: '',
    preferredTime: 'Morning (10:00 AM – 1:00 PM)',
    concern: selectedConcern || TREATMENT_CATEGORIES[0].concernValue,
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<SubmissionSuccess | null>(null);

  useEffect(() => {
    if (selectedConcern) {
      setForm((prev) => ({ ...prev, concern: selectedConcern }));
    }
  }, [selectedConcern]);

  const validateClient = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name (at least 2 characters).';
    }
    const cleanPhone = form.phone.replace(/[\s\-()+]/g, '');
    if (!/^\d{10,15}$/.test(cleanPhone)) {
      nextErrors.phone = 'Please enter a valid 10-digit phone number.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!form.preferredDate) {
      nextErrors.preferredDate = 'Please select your preferred date.';
    } else if (form.preferredDate < todayStr) {
      nextErrors.preferredDate = 'Preferred date cannot be in the past.';
    }
    if (!form.preferredTime) {
      nextErrors.preferredTime = 'Please choose a preferred time window.';
    }
    if (!form.concern) {
      nextErrors.concern = 'Please select a skin or hair concern.';
    }
    return nextErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    const clientErrors = validateClient();
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        if (data.errors) {
          setErrors(data.errors);
        }
        setServerError(
          data.message || 'Unable to submit your request. Please check the form fields.'
        );
        return;
      }

      setSubmitted({
        referenceId: data.referenceId,
        message: data.message,
        fullName: form.fullName.trim(),
        preferredDate: form.preferredDate,
        preferredTime: form.preferredTime,
        concern: form.concern,
      });
    } catch {
      setServerError(
        'We could not reach the clinic booking server right now. Please call 094331 69186 directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToBooking = () => {
    const el = document.getElementById('appointment-booking');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Section 11: Clinic Information and Location */}
      <section
        id="contact-location"
        className="py-16 sm:py-20 bg-[#F6F8F8] border-b border-[#DCE5E5]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#0F4C54] mb-2">
              <TypedText text="Visit the Clinic" />
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0B2E33] text-balance">
              <TypedText text="Clinic Information & Location" />
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Info Card + Interior Photo */}
            <div className="lg:col-span-5 bg-white border border-[#DCE5E5] rounded-xl overflow-hidden flex flex-col">
              <div className="aspect-[4/3] w-full overflow-hidden bg-[#EDF3F3]">
                <ResilientImage
                  src={IMAGES.clinicInterior}
                  alt="Wizderm Speciality Skin and Hair Clinic interior"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-5">
                <div className="space-y-4">
                  <h3 className="font-display text-2xl font-semibold text-[#0B2E33]">
                    <TypedText text={CLINIC_INFO.clinicName} />
                  </h3>

                  <div className="flex items-start gap-3">
                    <MapPin
                      className="w-5 h-5 text-[#0F4C54] mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <div className="text-sm text-[#3D5255] leading-relaxed">
                      <p>
                        <TypedText text={CLINIC_INFO.shortAddress} />
                      </p>
                      <p className="text-xs text-[#4A5D60] mt-1 font-medium">
                        <TypedText text={`Google Maps Plus Code: ${CLINIC_INFO.plusCode}`} />
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone
                      className="w-5 h-5 text-[#0F4C54] shrink-0"
                      aria-hidden="true"
                    />
                    <a
                      href={CLINIC_INFO.phoneHref}
                      className="text-sm font-semibold text-[#0B2E33] hover:text-[#0F4C54] tabular-nums"
                    >
                      <TypedText text={`Phone: ${CLINIC_INFO.phoneDisplay}`} />
                    </a>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock
                      className="w-5 h-5 text-[#0F4C54] mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <p className="text-sm text-[#4A5D60]">
                      <TypedText text={CLINIC_INFO.timingsNote} />
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={CLINIC_INFO.mapsDirectionsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-h-[44px] px-4 py-2.5 bg-[#0F4C54] hover:bg-[#0B393F] text-white text-sm font-semibold rounded-md inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                  >
                    <Navigation className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <TypedText text="Get Directions" singleLine />
                  </a>
                  <a
                    href={CLINIC_INFO.phoneHref}
                    className="flex-1 min-h-[44px] px-4 py-2.5 bg-[#EDF3F3] hover:bg-[#DCE5E5] text-[#0B2E33] text-sm font-semibold rounded-md inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <TypedText text="Call Clinic" singleLine />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Interactive Google Map */}
            <div className="lg:col-span-7 bg-white border border-[#DCE5E5] rounded-xl overflow-hidden flex flex-col min-h-[380px]">
              <iframe
                title="Wizderm Speciality Skin and Hair Clinic Location Map"
                src={CLINIC_INFO.mapsEmbedSrc}
                className="w-full flex-1 min-h-[360px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="px-5 py-3.5 bg-white border-t border-[#DCE5E5] flex flex-wrap items-center justify-between gap-2 text-xs text-[#4A5D60]">
                <span>
                  <TypedText text={`${CLINIC_INFO.locationShort} · ${CLINIC_INFO.plusCode}`} />
                </span>
                <a
                  href={CLINIC_INFO.mapsDirectionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#0F4C54] hover:underline whitespace-nowrap"
                >
                  <TypedText text="Open in Google Maps" singleLine />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 12: Meet the Doctor */}
      <section id="meet-doctor" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Supplied Images with exact preserved aspect ratios */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-12 lg:grid-cols-1 gap-5 items-center">
              <div className="sm:col-span-7 lg:col-span-1 max-w-[300px] mx-auto w-full bg-[#F6F8F8] border border-[#DCE5E5] rounded-xl p-2.5">
                <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-[#EDF3F3]">
                  <ResilientImage
                    src={IMAGES.doctorPrimary}
                    fallbackSrc={IMAGES.consultationOverview}
                    alt="Dr. Somodyuti Chandra portrait"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>

              <div className="sm:col-span-5 lg:col-span-1 max-w-[300px] mx-auto w-full bg-[#F6F8F8] border border-[#DCE5E5] rounded-xl p-2.5">
                <div className="aspect-[3/2] w-full overflow-hidden rounded-lg bg-[#EDF3F3]">
                  <ResilientImage
                    src={IMAGES.doctorSecondary}
                    fallbackSrc={IMAGES.clinicInterior}
                    alt="Dr. Somodyuti Chandra at Wizderm Speciality Skin and Hair Clinic"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#0F4C54] mb-2">
                <TypedText text="Meet the Doctor" />
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#0B2E33] mb-2">
                <TypedText text={CLINIC_INFO.doctorName} />
              </h2>
              <p className="text-lg font-medium text-[#0F4C54] mb-2">
                <TypedText text={CLINIC_INFO.bengaliName} />
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-semibold text-[#4A5D60] mb-6">
                <span>
                  <TypedText text={CLINIC_INFO.professionalTitle} />
                </span>
                <span aria-hidden="true" className="text-[#C49A5B]">
                  ·
                </span>
                <span>
                  <TypedText text={CLINIC_INFO.specialization} />
                </span>
                <span aria-hidden="true" className="text-[#C49A5B]">
                  ·
                </span>
                <span>
                  <TypedText text={CLINIC_INFO.clinicName} />
                </span>
              </div>

              <p className="text-base text-[#3D5255] leading-relaxed mb-4">
                <TypedText text="Dr. Somodyuti Chandra provides dedicated dermatological consultations at Wizderm Speciality Skin and Hair Clinic in Jodhpur Park, Kolkata. Patients appreciate her calm bedside manner, thorough explanations, and willingness to address every query with patience and clarity." />
              </p>
              <p className="text-base text-[#3D5255] leading-relaxed mb-7">
                <TypedText text="Whether you are seeking guidance for persistent hair fall, acne and post-acne marks, facial pigmentation, or general skin wellness, each appointment is structured around understanding your skin and scalp needs individually." />
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={scrollToBooking}
                  className="min-h-[44px] px-6 py-2.5 bg-[#0F4C54] hover:bg-[#0B393F] text-white text-sm font-semibold rounded-md inline-flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <TypedText text="Request Consultation" singleLine />
                </button>
                <a
                  href={CLINIC_INFO.phoneHref}
                  className="min-h-[44px] px-6 py-2.5 bg-[#EDF3F3] hover:bg-[#DCE5E5] text-[#0B2E33] text-sm font-semibold rounded-md inline-flex items-center gap-2 transition-colors whitespace-nowrap"
                >
                  <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <TypedText text={CLINIC_INFO.phoneDisplay} singleLine />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 13: Appointment Booking */}
      <section
        id="appointment-booking"
        className="py-16 sm:py-20 bg-[#EDF3F3]/60 border-y border-[#DCE5E5]"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#0F4C54] mb-2">
              <TypedText text="Schedule Your Visit" />
            </p>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#0B2E33] text-balance mb-3">
              <TypedText text="Book a Dermatologist Consultation" />
            </h2>
            <p className="text-[#4A5D60] text-base leading-relaxed">
              <TypedText text="Submit your preferred consultation details below. Please contact the clinic at 094331 69186 to confirm final consultation timings." />
            </p>
          </div>

          <div className="bg-white border border-[#DCE5E5] rounded-2xl p-6 sm:p-10 shadow-sm">
            {submitted ? (
              <div className="text-center py-6 max-w-xl mx-auto">
                <div className="w-14 h-14 rounded-full bg-[#EDF3F3] text-[#0F4C54] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" aria-hidden="true" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#0B2E33] mb-2">
                  <TypedText text="Appointment Request Submitted" immediate />
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#0F4C54] mb-4 tabular-nums">
                  <TypedText
                    text={`Reference ID: ${submitted.referenceId} · Status: Pending Clinic Confirmation`}
                    immediate
                  />
                </p>
                <p className="text-sm sm:text-base text-[#3D5255] leading-relaxed mb-6">
                  <TypedText text={submitted.message} immediate />
                </p>

                <div className="bg-[#F6F8F8] border border-[#DCE5E5] rounded-xl p-4 text-left text-sm text-[#3D5255] space-y-1.5 mb-6">
                  <div>
                    <span className="font-semibold text-[#0B2E33]">Patient:</span>{' '}
                    {submitted.fullName}
                  </div>
                  <div>
                    <span className="font-semibold text-[#0B2E33]">Concern:</span>{' '}
                    {submitted.concern}
                  </div>
                  <div className="tabular-nums">
                    <span className="font-semibold text-[#0B2E33]">Preferred Date & Time:</span>{' '}
                    {submitted.preferredDate} · {submitted.preferredTime}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={CLINIC_INFO.phoneHref}
                    className="min-h-[44px] px-5 py-2.5 bg-[#0F4C54] hover:bg-[#0B393F] text-white text-sm font-semibold rounded-md inline-flex items-center gap-2 transition-colors whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <TypedText text={`Call ${CLINIC_INFO.phoneDisplay}`} immediate singleLine />
                  </a>
                  <a
                    href={CLINIC_INFO.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] px-5 py-2.5 bg-[#EDF3F3] hover:bg-[#DCE5E5] text-[#0B2E33] text-sm font-semibold rounded-md inline-flex items-center gap-2 transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                    <TypedText text="Message on WhatsApp" immediate singleLine />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(null);
                      setForm((prev) => ({ ...prev, message: '' }));
                    }}
                    className="min-h-[44px] px-4 py-2.5 text-sm font-semibold text-[#0F4C54] hover:underline cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {serverError && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{serverError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-semibold text-[#0B2E33] mb-1.5"
                    >
                      <TypedText text="Full Name *" />
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={form.fullName}
                      onChange={(e) => {
                        setForm({ ...form, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                      }}
                      placeholder="Enter your full name"
                      className="w-full min-h-[44px] px-3.5 py-2.5 text-sm text-[#132325] bg-[#F6F8F8] border border-[#DCE5E5] rounded-md focus:outline-none focus:border-[#0F4C54] focus:bg-white"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-700">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-[#0B2E33] mb-1.5"
                    >
                      <TypedText text="Phone Number *" />
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => {
                        setForm({ ...form, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      placeholder="e.g., 98300 12345"
                      className="w-full min-h-[44px] px-3.5 py-2.5 text-sm text-[#132325] bg-[#F6F8F8] border border-[#DCE5E5] rounded-md focus:outline-none focus:border-[#0F4C54] focus:bg-white"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-700">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-[#0B2E33] mb-1.5"
                    >
                      <TypedText text="Email Address *" />
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => {
                        setForm({ ...form, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="you@example.com"
                      className="w-full min-h-[44px] px-3.5 py-2.5 text-sm text-[#132325] bg-[#F6F8F8] border border-[#DCE5E5] rounded-md focus:outline-none focus:border-[#0F4C54] focus:bg-white"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-700">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="concern"
                      className="block text-sm font-semibold text-[#0B2E33] mb-1.5"
                    >
                      <TypedText text="Skin / Hair Concern *" />
                    </label>
                    <select
                      id="concern"
                      value={form.concern}
                      onChange={(e) => setForm({ ...form, concern: e.target.value })}
                      className="w-full min-h-[44px] px-3.5 py-2.5 text-sm text-[#132325] bg-[#F6F8F8] border border-[#DCE5E5] rounded-md focus:outline-none focus:border-[#0F4C54] focus:bg-white"
                    >
                      {TREATMENT_CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.concernValue}>
                          {cat.title}
                        </option>
                      ))}
                      <option value="Other Skin or Hair Concern">
                        Other Skin or Hair Concern
                      </option>
                    </select>
                    {errors.concern && (
                      <p className="mt-1 text-xs text-red-700">{errors.concern}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="preferredDate"
                      className="block text-sm font-semibold text-[#0B2E33] mb-1.5"
                    >
                      <TypedText text="Preferred Appointment Date *" />
                    </label>
                    <input
                      id="preferredDate"
                      type="date"
                      required
                      min={todayStr}
                      value={form.preferredDate}
                      onChange={(e) => {
                        setForm({ ...form, preferredDate: e.target.value });
                        if (errors.preferredDate)
                          setErrors({ ...errors, preferredDate: undefined });
                      }}
                      className="w-full min-h-[44px] px-3.5 py-2.5 text-sm text-[#132325] bg-[#F6F8F8] border border-[#DCE5E5] rounded-md focus:outline-none focus:border-[#0F4C54] focus:bg-white"
                    />
                    {errors.preferredDate && (
                      <p className="mt-1 text-xs text-red-700">{errors.preferredDate}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="preferredTime"
                      className="block text-sm font-semibold text-[#0B2E33] mb-1.5"
                    >
                      <TypedText text="Preferred Time Window *" />
                    </label>
                    <select
                      id="preferredTime"
                      value={form.preferredTime}
                      onChange={(e) =>
                        setForm({ ...form, preferredTime: e.target.value })
                      }
                      className="w-full min-h-[44px] px-3.5 py-2.5 text-sm text-[#132325] bg-[#F6F8F8] border border-[#DCE5E5] rounded-md focus:outline-none focus:border-[#0F4C54] focus:bg-white"
                    >
                      <option value="Morning (10:00 AM – 1:00 PM)">
                        Morning (10:00 AM – 1:00 PM)
                      </option>
                      <option value="Afternoon (1:00 PM – 4:30 PM)">
                        Afternoon (1:00 PM – 4:30 PM)
                      </option>
                      <option value="Evening (4:30 PM – 8:00 PM)">
                        Evening (4:30 PM – 8:00 PM)
                      </option>
                    </select>
                    {errors.preferredTime && (
                      <p className="mt-1 text-xs text-red-700">{errors.preferredTime}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold text-[#0B2E33] mb-1.5"
                  >
                    <TypedText text="Message (Optional)" />
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Briefly describe your concern or preferred timing notes"
                    className="w-full px-3.5 py-2.5 text-sm text-[#132325] bg-[#F6F8F8] border border-[#DCE5E5] rounded-md focus:outline-none focus:border-[#0F4C54] focus:bg-white"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-[#4A5D60]">
                    <TypedText text="Submitting sends a consultation request; final slot confirmation is provided by the clinic desk." />
                  </p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-h-[46px] px-7 py-3 bg-[#0F4C54] hover:bg-[#0B393F] disabled:opacity-60 text-white text-sm sm:text-base font-semibold rounded-md inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F4C54]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <Calendar className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <TypedText text="Submit Appointment Request" singleLine />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
