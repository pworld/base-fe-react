export interface IUpdateDriverStatusPayload {
  driver_id?: string;
  employment_contract_end_date?: string;
  employment_contract_start_date?: string;
  employment_type?: string;
  join_date?: string;
  is_blacklist?: boolean;
  release_date?: string;
  release_reason?: string;
  release_type?: string;
  is_suspended?: boolean;
  note?: string;
  row_version?: string;
}
