import _ from 'underscore';
import { Evaluation } from '../interfaces/evaluation';
import moment from 'moment';

/**
 * Remove duplicates from array by property
 */
export const removeArrayDuplicatesByProp = (arr: Array<any>, keyProps: Array<string>): any => {
  return Object.values(
    arr.reduce((uniqueMap, entry) => {
      const key = keyProps.map(k => entry[k]).join('|');
      if (!(key in uniqueMap)) uniqueMap[key] = entry;
      return uniqueMap;
    }, {}),
  );
};

/**
 * Make groupBy by groups
 */
export const getGroupByGroups = (tests: Evaluation[]): Array<string> => {
  return Object.keys(_.groupBy(tests, 'group'));
};

/**
 * Return locale date string
 */
export const getDateString = (date: string) => {
  return new Date(date).toLocaleDateString();
};

/**
 * Return remaining days by date
 */
export const getRemainingDays = (date: string): string => {
  const today = new Date();
  const endDate = new Date(date);
  let days = 'days';

  const remainingDays = Math.round(
    (Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) -
      Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())) /
      (1000 * 60 * 60 * 24),
  );

  if (remainingDays === 1) {
    days = 'day';
  }

  return remainingDays + ' ' + days + ' remaining';
};

/**
 * Get percent by from value anx max value
 */
export const getPercents = (value: number, count: number) => {
  return Math.round((value / count) * 100);
};

/**
 * Make a sum of array property
 */
export const sumArrayProps = (array: Array<any>, key: string) => {
  return array.reduce((a, b) => a + (b[key] || 0), 0);
};

/**
 * Return file extension from string
 */
export const getFileExtension = (file: string): string => {
  const dotIndex = file.lastIndexOf('.');
  return file.substring(dotIndex + 1, file.length);
};

/**
 * Return day of week by number
 */
export const getDayOfWeek = (dayNumber: number): string => {
  return moment()
    .weekday(dayNumber)
    .format('dddd');
};
