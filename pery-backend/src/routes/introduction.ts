import express from 'express';
import { validateArticleName } from '../middleware/validateArticleName';
import { getIntroduction } from '../services/wikipediaService';

const router = express.Router();

router.get('/:articleName', validateArticleName, async (req, res, next) => {
  try {
    const articleName = req.params.articleName;
    const token = req.header('x-authentication');
    const acceptLang = req.header('accept-language');
    
    const data = await getIntroduction(articleName, token, acceptLang);
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;
