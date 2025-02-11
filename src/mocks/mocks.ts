import { mockVendorCategories } from "./vendor/vendorCategories-mock";

/**
 * To Use this mockUp Functions, pay attention to resources and action name. For Example:
 * const mockVendorCategories = {
 * createVendorCategories: {
 * 
 * VendorCategories is from Resources
 * create is from actions
 * 
 * To use dynamic mockup, modify mockDataProvider.ts as needed
 */
export const initMockData:any = {
    ...mockVendorCategories
  };