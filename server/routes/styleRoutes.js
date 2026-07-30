import express from 'express';
import { getStyles, createStyle, updateStyle, deleteStyle } from '../controllers/styleController.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/', getStyles);
router.post('/', upload.single('imageFile'), createStyle);
router.put('/:id', upload.single('imageFile'), updateStyle);
router.delete('/:id', deleteStyle);

export default router;
