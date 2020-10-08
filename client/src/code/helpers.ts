export const removeArrayDuplicatesByProp = (arr: Array<any>, keyProps: Array<string>): any => {
  return Object.values(
    arr.reduce((uniqueMap, entry) => {
      const key = keyProps.map(k => entry[k]).join('|');
      if (!(key in uniqueMap)) uniqueMap[key] = entry;
      return uniqueMap;
    }, {}),
  );
};

export const removeArrayDuplicates = (actualArr: Array<any>) => {
  return actualArr.filter((item, index) => {
    if (actualArr.indexOf(item) == index) {
      return item;
    }
  });
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

export const getPercents = (value: number, count: number) => {
  return Math.floor((value / count) * 100);
};

export const sumArrayProps = (array: Array<any>, key: string) => {
  return array.reduce((a, b) => a + (b[key] || 0), 0);
};
