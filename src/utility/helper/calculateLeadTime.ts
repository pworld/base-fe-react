import { useFileTranslate } from "./translate";

const IN_MINUTES = {
  Hour: 60,
  Day: 1440
} as const;

/**
 * Calculate days, hours, and minutes into just minutes
 * @returns
 */
export function calculateLeadTime(minutes: number, hours: number = 0, days: number = 0): number {
  const hoursInMinutes = hours * IN_MINUTES.Hour;
  const daysInMinutes = days * IN_MINUTES.Day;
  return minutes + hoursInMinutes + daysInMinutes;
}

/**
 * Returns days, hours, and minutes from just minutes
 * @returns
 */
export function fromLeadTime(leadTime: number): {
  days: number;
  hours: number;
  minutes: number;
} {
  const days = Math.floor(leadTime / IN_MINUTES.Day);
  const hours = Math.floor((leadTime - days * IN_MINUTES.Day) / IN_MINUTES.Hour);
  const minutes = leadTime - days * IN_MINUTES.Day - hours * IN_MINUTES.Hour;
  return { days, hours, minutes };
}

/**
 * Return formated text to handle Lead Time
 * @param value Total lead time in minutes
 * @returns formated lead time text
 */
export function formatLeadTime(value: number): string {
  const leadTimeDetail = fromLeadTime(value);
  let result = "";

  if(leadTimeDetail.days > 0) result += `${leadTimeDetail.days} Hari `
  if(leadTimeDetail.hours > 0) result += `${leadTimeDetail.hours} Jam `
  if(leadTimeDetail.minutes > 0) result += `${leadTimeDetail.minutes} Menit`

  return result === "" ? "-" : result;
}
