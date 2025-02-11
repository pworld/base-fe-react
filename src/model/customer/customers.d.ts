export interface ICustomers {
  address_city_id: string;
  address_city_name: string;
  address_country_id: string;
  address_country_name: string;
  address_latitude: number;
  address_longitude: number;
  address_province_id: string;
  address_province_name: string;
  address_street: string;
  address_street2: string;
  address_subdistrict_id: string;
  address_subdistrict_name: string;
  address_zipcode: string;
  auto_generate_customer_code: boolean;
  bill_on_status: string;
  customer_category_id: string;
  customer_category_name: string;
  customer_code: string;
  customer_name: string;
  email: string;
  note: string;
  phone_number: string;
  term_of_payment_days: number;
  is_active: boolean;
  tax_name: string;
}
