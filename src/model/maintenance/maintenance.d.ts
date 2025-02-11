import { FormInstance } from "antd/lib";

export interface IUploadMaintenance {
  onSave: (v) => void;
  form: FormInstance;
  onCancel: () => void;
}

export interface IPhoto {
  description: string;
  file_name: string;
  file_path: string;
}

export interface IDetailMaintenance {
  maintenance_order_number: string;
  maintenance_order_type: string;
  maintenance_order_date: string;
  vendor_name: string;
  vehicle_plate_number: string;
  vehicle_type_name: string;
  vendor_name?: string;
  city_name?: string;
  maintenance_reason?: string;
  maintenance_detail_info?: string;
  status?: string;
}

export interface IServiceItemTable {
  dataSource: any[];
  onClickAdd: () => void;
  onDelete: (record: any, field: string) => void;
  onChangeColumn: (column: string, text: string, record: any, field: string) => void;
  editable: boolean;
}

export interface IServiceItemsModal {
  onCancel: () => void;
  onSave: (records: any[]) => void;
}


