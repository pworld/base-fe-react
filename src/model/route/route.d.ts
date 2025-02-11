export interface IAllowanceTable {
  dataSource: any[];
  onClickAdd?: () => void;
  onDelete: (record: any, field: string) => void;
  onChangeColumn: (column: string, text: string, record: any, field: string) => void;
  editable: boolean;
}

export interface IAllowanceModal {
  onCancel: () => void;
  onSave: (records: any[]) => void;
}

export interface IRouteDetail {
  origin_city_name: string;
  destination_city_name: string;
  vehicle_type_name: string;
  lead_time: number | any;
  return_lead_time: number | any;
  note: string;
  driver_note: string;
  is_active: boolean;
  description: string;
  row_version: string;
}