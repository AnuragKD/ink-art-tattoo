import express from 'express';
import { getInstagramFeed, createInstagramPost, updateInstagramPost, deleteInstagramPost } from '../controllers/instagramController.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getInstagramFeed);
router.post('/', upload.single('imageFile'), createInstagramPost);
router.put('/:id', upload.single('imageFile'), updateInstagramPost);
router.delete('/:id', deleteInstagramPost);

export default router;
