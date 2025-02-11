export interface IAPIResponse {
  data: IAPIResponseData;
  status: number;
  statusText: string;
  headers: {
    "content-length": string;
    "content-type": string;
  };
  config: {
    transitional: {
      silentJSONParsing: boolean;
      forcedJSONParsing: boolean;
      clarifyTimeoutError: boolean;
    };
    adapter: string[];
    transformRequest: (null)[];
    transformResponse: (null)[];
    timeout: number;
    xsrfCookieName: string;
    xsrfHeaderName: string;
    maxContentLength: number;
    maxBodyLength: number;
    env: {};
    headers: {
      Accept: string;
      "Content-Type": (null);
      Authorization: string;
    };
    baseURL: string;
    method: string;
    url: string;
  };
  request: {};
}

// Interface for IAPIResponseData data structure
export interface IAPIResponseData<TData extends BaseRecord = BaseRecord> {
  data: TData;
  message: string;
  status: string;
  status_code: number;
}

interface IAPIResponseDataList<TData extends BaseRecord = BaseRecord> {
  data: TData[];
  total_rows: number;
  limit: number;
  offset: number;
  page: number;
}

export interface APIDatabaseGenerate {
  created_user_id: string;
  created_time_utc: string;
  updated_user_id: string;
  updated_time_utc: string;
  row_version: string;
}

// Interface for GetListResponse using the IAPIResponseData generic
interface IGetListResponse extends IAPIResponseData<IAPIResponseDataList<VendorCategory>> {}
