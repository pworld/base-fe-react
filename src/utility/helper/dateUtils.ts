import dayjs from 'dayjs';

export const NULL_DATE = '0001-01-01T00:00:00Z';

export function isValidDateString(date: string) {
  // return date?.length ? true : false && date !== '0001-01-01T00:00:00Z';
  if(date?.length && date !== NULL_DATE) {
    return true
  } else {
    return false
  }
}

export function transformStringToDate(date: string) {
  if (isValidDateString(date)) return dayjs(date);
  return null;
}

export function transformDateToPayload(date: dayjs.Dayjs | null, withTime = false) {
  if (date) {
    return withTime ? date.toISOString() : date.format('YYYY-MM-DD').concat('T00:00:00Z');
  }
  return NULL_DATE;
}