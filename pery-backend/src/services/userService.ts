import { createHash } from 'crypto';
import { userStorage, UserStorageData } from '../storage/userStorage';
import { logger } from '../utils/logger';

function hashUsername(userName: string): string {
  return createHash('sha256').update(userName).digest('hex');
}
export function upsertUser(userEmail: string, language: string): UserStorageData {
  const token = hashUsername(userEmail);
  const existingUser = userStorage.get(token);
  if (existingUser) {
    if(existingUser?.language !== language) { 
      userStorage.save(token, { language });
    }
    return existingUser;
  }
  userStorage.save(token, { language });
  logger.info({ token, language, userEmail }, 'Registered user');
  return { token, language };
}

export function getUserDataByToken(token: string): UserStorageData | undefined {
  const userData = userStorage.get(token);
  return userData;
}
