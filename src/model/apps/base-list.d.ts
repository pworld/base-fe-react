import { IWidgetData } from "@/components/widget/widget";
import { CrudSorting } from "@refinedev/core";
import { FormInstance } from "antd";

export interface IBaseList {
  columns: IBaseColumns[];
  resource: string;
  isWidget?: boolean;
  widgetData?: IWidgetData[];
  moreFilter?: ReactNode;
  isShowPagination?: boolean;
  additionalFilter?: ReactNode;
  initialSearchKey?: string;
  searchKeyModeOptions?: { label: string, value: string }[];
  isShowSearchFilter?: boolean;
  defaultFilterBehavior?: "merge" | "replace";
  paginationMode?: "off" | "server" | "client";
  paginationSize?: number;
  recordIdField?: string;
  showActionTable?: boolean;
  actionTableProps?: IBaseListActionButton;
  scroll?: { x?: number, y?: number };
  sort?: CrudSortingl;
  isShowCreateButton?: boolean;
  wording?: {
    createButton?: string
  },
}

export interface IBaseListActionButton {
  /** Custom edit URL */
  editUrl?: string;

  /** Custom show URL */
  showUrl?: string;

  /** Custom delete URL */
  deleteUrl?: url;
}

export interface IBaseColumns {
  title: string;
  dataIndex: string;
  render?: (value: any, record: any, index: number) => React.ReactNode;
  // isActionTable?: boolean;
  width?: number | string;
  elipsis?: boolean
  align?: AlignType | string;
  className?: string;
  onCell?: (record: any) => any
}

export interface IMultiFilter {
  field: string;
  value: any;
}
