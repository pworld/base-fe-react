export interface IVehicles {
  vehicle_plate_number: string;
  vehicle_type_id: string;
  vehicle_type_name: string;
  driver_id: string;
  driver_full_name: string;
  city_id: string;
  city_name: string;
  dedicate_to_customer_id: string;
  dedicate_to_customer_name: string;
  dedicate_to_customer_start_date: any;
  dedicate_to_customer_end_date: any;
  own_by_vendor_id: string;
  own_by_vendor_name: string;
  vehicle_brand_id: string;
  vehicle_brand_name: string;
  production_year: number;
  odometer: number;
  vin_number: string;
  license_plate_exp_date: any;
  status: string;
  is_active: boolean;
  note: string;
}
