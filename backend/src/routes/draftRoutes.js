import { Router } from 'express';
import { submitDraft } from '../controllers/draftController.js';
import { upload } from '../middleware/upload.js';

const router = Router();

// POST /api/drafts - Submit a new draft
router.post('/', upload.single('pdf'), submitDraft);

export default router;