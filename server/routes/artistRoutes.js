import express from 'express';
import { getArtists, createArtist, updateArtist } from '../controllers/artistController.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getArtists);
router.post('/', upload.single('imageFile'), createArtist);
router.put('/:id', upload.single('imageFile'), updateArtist);

export default router;
