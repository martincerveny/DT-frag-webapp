import { translates } from '../../translations/en';

export const t = (key: string): string => {
  return translates[key] || 'Missing translations!';
};
