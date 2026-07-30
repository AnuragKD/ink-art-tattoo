import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

const settingsUpload = upload.fields([
  { name: 'introFile', maxCount: 1 },
  { name: 'ethosFile', maxCount: 1 },
  { name: 'contactFile', maxCount: 1 },
  { name: 'ctaFile', maxCount: 1 },
]);

router.get('/', getSettings);
router.put('/', settingsUpload, updateSettings);

export default router;
