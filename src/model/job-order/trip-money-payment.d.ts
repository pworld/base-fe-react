import { FormInstance } from "antd/es/form";

export interface IJobOrderTripMoneyPaymentDetail {
  job_order_number?: string;
  driver_full_name?: string;
  driver_phone_number?: string;
  vehicle_plate_number?: string;
  origin_city_name?: string;
  destination_city_name?: string;
  departure_date_time?: Date;
  arrival_date_time?: Date;
  realization_amount?: number;
  realized_amount_diff?: number;
  row_version?: string;
  driver_id?: string
  is_realized?: boolean;
  realized_date?: Date;
  realized_amount?: number;
  driver_employee_number?: string;
  trip_expense_amount?: number;
  trip_expense_paid_amount?: number;
  trip_expense_unpaid_amount?: number;
  job_order_id?: string;
  driver_bank_account_number?: string;
  driver_bank_account_owner_name?: string;
  driver_bank_id?: string;
  driver_bank_name?: string;
  status?: string;
  driver_balance?: number;
}

export interface IJobOrderTripMoneyPaymentForm {
  form: FormInstance;
  detailData?: IJobOrderTripMoneyPaymentDetail;
  tripExpenseItemsData: [];
}
