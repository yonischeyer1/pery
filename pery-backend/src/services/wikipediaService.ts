import axios from 'axios';
import { getUserDataByToken } from './userService';
import { cache } from '../utils/cache';
import { logger } from '../utils/logger';

export async function getIntroduction(
  articleName: string,
  token?: string,
  acceptLang?: string
) {
  const userData = getUserDataByToken(token as string);
  const preferredLanguage = (token && userData?.language as string) || (acceptLang?.split(',')[0]) || 'en';

  const tryFetch = async (lang: string): Promise<any | null> => {
    const cacheKey = `${articleName}:${lang}`;
    const cached = cache.get(cacheKey);
    if (cached) return cached;

    const url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${articleName}`;
    try {
      const response = await axios.get(url);
      const intro = response.data.extract;

      const result = {
        scrapeDate: Date.now(),
        articleName,
        introduction: intro
      };

      cache.set(cacheKey, result);
      return result;
    } catch (err: any) {
      logger.warn({ lang, articleName, err: err?.response?.status || err.message }, `Failed fetching article in '${lang}'`);
      return null;
    }
  };

  // First attempt with preferred language
  const result = await tryFetch(preferredLanguage);

  // If failed, fall back to English
  if (!result && preferredLanguage !== 'en') {
    return await tryFetch('en') ?? Promise.reject(new Error('Failed to fetch article in any language.'));
  }

  // Return result or error
  if (!result) throw new Error('Failed to fetch article in any language.');
  return result;
}
