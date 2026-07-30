import express from 'express';
import { getGallery, createGalleryItem, updateGalleryItem, deleteGalleryItem } from '../controllers/galleryController.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getGallery);
router.post('/', upload.single('imageFile'), createGalleryItem);
router.put('/:id', upload.single('imageFile'), updateGalleryItem);
router.delete('/:id', deleteGalleryItem);

export default router;
