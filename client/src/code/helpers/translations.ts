import { translates } from '../../translations/en';

/**
 * Translation helper
 */
export const t = (key: string): string => {
  return translates[key] || 'Missing translations!';
};
