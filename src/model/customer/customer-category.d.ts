export interface ICustomerCategory {
  customer_category_id: number;
  customer_category_name: string;
  is_active: boolean;
}

export interface ICustomerCategoryDetail {
  customer_category_name: string;
  note: string;
  is_active: boolean;
}
