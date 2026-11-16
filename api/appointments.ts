import type { IncomingMessage, ServerResponse } from 'http';

interface VercelRequest extends IncomingMessage {
  body?: Record<string, unknown>;
}

interface VercelResponse extends ServerResponse {
  status: (code: number) => VercelResponse;
  json: (data: unknown) => void;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ ok: false, message: 'Method Not Allowed' });
    return;
  }

  let body: Record<string, unknown> = req.body ?? {};
  if (!req.body) {
    const chunks: Buffer[] = [];
    for await (const chunk of req) {
      chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    const raw = Buffer.concat(chunks).toString('utf8');
    try {
      body = raw ? JSON.parse(raw) : {};
    } catch {
      res.status(400).json({ ok: false, message: 'Invalid JSON payload.' });
      return;
    }
  }

  const {
    fullName,
    phone,
    email,
    preferredDate,
    preferredTime,
    concern,
  } = body;

  const errors: Record<string, string> = {};

  if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  const cleanPhone =
    typeof phone === 'string' ? phone.replace(/[\s\-()+]/g, '') : '';
  if (!cleanPhone || !/^\d{10,15}$/.test(cleanPhone)) {
    errors.phone = 'Please enter a valid 10-digit contact number.';
  }

  if (
    !email ||
    typeof email !== 'string' ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  ) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!preferredDate || typeof preferredDate !== 'string') {
    errors.preferredDate = 'Please select a preferred appointment date.';
  } else {
    const selected = new Date(`${preferredDate}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(selected.getTime()) || selected < today) {
      errors.preferredDate = 'Preferred date cannot be in the past.';
    }
  }

  if (!preferredTime || typeof preferredTime !== 'string') {
    errors.preferredTime = 'Please select a preferred time window.';
  }

  if (!concern || typeof concern !== 'string') {
    errors.concern = 'Please choose your primary skin or hair concern.';
  }

  if (Object.keys(errors).length > 0) {
    res.status(400).json({
      ok: false,
      message: 'Please review the highlighted fields before submitting.',
      errors,
    });
    return;
  }

  const referenceId = `WIZ-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  res.status(201).json({
    ok: true,
    status: 'pending_confirmation',
    referenceId,
    submittedAt: new Date().toISOString(),
    message:
      'Your appointment request has been received. Please note that consultation timings are subject to confirmation by the clinic desk at Wizderm Speciality Skin and Hair Clinic.',
  });
}
