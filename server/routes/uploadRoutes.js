import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';
import { uploadToCloudinary } from '../config/cloudinary.js';

const router = express.Router();

// POST /api/upload - Direct Cloudinary single image upload
router.post('/', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No image file uploaded' });
  }

  try {
    const fileUrl = await uploadToCloudinary(req.file.buffer, 'ink-art-tattoo/uploads');
    return res.json({
      success: true,
      message: 'Image uploaded to Cloudinary successfully',
      url: fileUrl,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
