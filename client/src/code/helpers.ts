import { Evaluation } from './interfaces/evaluation';

export const removeArrayDuplicates = (arr: Array<any>, keyProps: Array<string>): Evaluation[] => {
  return Object.values(
    arr.reduce((uniqueMap, entry) => {
      const key = keyProps.map(k => entry[k]).join('|');
      if (!(key in uniqueMap)) uniqueMap[key] = entry;
      return uniqueMap;
    }, {}),
  );
};

export const getDateString = (date: string) => {
  return new Date(date).toDateString();
};

export const getRemainingDays = (date: string): string => {
  const today = new Date();
  const endDate = new Date(date);
  let days = 'days';

  const remainingDays = Math.floor(
    (Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) -
      Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())) /
      (1000 * 60 * 60 * 24),
  );

  if (remainingDays === 1) {
    days = 'day';
  }

  return remainingDays + ' ' + days + ' remaining';
};
