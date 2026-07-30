import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import artistRoutes from './routes/artistRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import styleRoutes from './routes/styleRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import instagramRoutes from './routes/instagramRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Serve uploaded static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// REST API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/artists', artistRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/styles', styleRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/instagram', instagramRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', studio: 'Ink Art Tattoo Studio API', timestamp: new Date() });
});

app.use(errorHandler);

export default app;
