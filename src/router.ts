import { Router } from 'express';

const router = Router();

router.get('/test', (req, res) => {
    res.send(200);
});

export default router;
