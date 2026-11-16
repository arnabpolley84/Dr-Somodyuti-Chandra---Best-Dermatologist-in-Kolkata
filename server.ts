import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface AppointmentRequest {
  referenceId: string;
  fullName: string;
  phone: string;
  email: string;
  preferredDate: string;
  preferredTime: string;
  concern: string;
  message: string;
  submittedAt: string;
  status: 'pending_confirmation';
}

const appointmentRequests: AppointmentRequest[] = [];

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '1mb' }));

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'clinic-appointment-api' });
  });

  app.post('/api/appointments', (req, res) => {
    const {
      fullName,
      phone,
      email,
      preferredDate,
      preferredTime,
      concern,
      message,
    } = req.body ?? {};

    const errors: Record<string, string> = {};

    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name (at least 2 characters).';
    }

    const cleanPhone = typeof phone === 'string' ? phone.replace(/[\s\-()+]/g, '') : '';
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
    const record: AppointmentRequest = {
      referenceId,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      preferredDate,
      preferredTime,
      concern,
      message: typeof message === 'string' ? message.trim() : '',
      submittedAt: new Date().toISOString(),
      status: 'pending_confirmation',
    };

    appointmentRequests.push(record);

    res.status(201).json({
      ok: true,
      status: 'pending_confirmation',
      referenceId: record.referenceId,
      submittedAt: record.submittedAt,
      message:
        'Your appointment request has been received. Please note that consultation timings are subject to confirmation by the clinic desk at Wizderm Speciality Skin and Hair Clinic.',
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, '..', 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
