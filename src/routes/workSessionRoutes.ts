import { Router } from 'express';
import { startWorkSession, endWorkSession, getWorkSessions } from '../controllers/workSessionController';

const router = Router();

router.post('/start', startWorkSession);
router.post('/end', endWorkSession);
router.get('/:userId', getWorkSessions);

export default router;
