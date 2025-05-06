import express, { Request, Response } from 'express';
import { upsertUser } from '../services/userService';

const router = express.Router();

router.post('/', (req: Request, res: Response) => {
    const { userName, language } = req.body;

    if (!userName) {
        res.status(400).json({ message: 'Missing userName' });
        return;
    }

    const data = upsertUser(userName, language);
    res.json(data);
});

export default router;
