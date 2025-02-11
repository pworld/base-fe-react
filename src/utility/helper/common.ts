import dayjs from "dayjs";
import { NULL_DATE } from "./dateUtils";

export const NULL_UUID = "00000000-0000-0000-0000-000000000000"

/**
 * Returns the input string if it has a length, otherwise returns a dash (-).
 * @param s - The input string.
 * @returns s or a dash (-).
 */
export function text(s: string | null | undefined) {
  if (s?.length) return s;
  else return "-";
}

/**
 * Returns number into Rupiah formatted string
 * @param n - The input number
 */
export function convertNumberIntoRupiah(n: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
}).format(n).replace("Rp","").replace(",00", "");
}

/**
 * Returns number into Currency formatted string
 * @param n - The input number
 */
export function convertNumberToCurrency(n: number): string {
  return new Intl.NumberFormat().format(n);
}

/**
 * Return true if UUID is not null
 */
export function isValidUUID(target: string): boolean {
  if(target === NULL_UUID) {
    return false
  } else {
    return true
  }
}

/**
 * let resource = "vendor-categories";
 * let formattedResource = formatResourceName(resource, "getList");
 *  Outputs: "getListVendorCategories"
 */
export function formatResourceName(input:string, prefix:string) {
  const inputSplit = input.split('/')[0];
  return prefix + inputSplit
      .split('-') // Split by hyphen to handle kebab-case
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each segment
      .join(''); // Rejoin the segments into a single string
}
