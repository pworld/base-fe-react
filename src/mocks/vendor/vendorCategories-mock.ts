import { IAPIResponse, IAPIResponseData, IGetListResponse } from "@/model/apps/api";
import { IVendorCategoryDataResponse } from "@/model/vendor/vendor-categories";

// Combining all mock data into a single exportable constant
export const mockVendorCategories = {
  createVendorCategories: {
    data: { data_id: "6bee39b5-03ec-4765-8585-017eb6d59dd1" },
    message: "ok",
    status: "ok",
    status_code: 20,
  } as IAPIResponseData<IVendorCategoryDataResponse>,

  getListVendorCategories: {
    data: {
      data: [
        {
          vendor_category_id: "68fdfc2b-954a-4e8d-b879-6319a49224dd",
          vendor_category_name: "Bengkel1",
          note: "",
          is_active: true,
          is_deleted: false,
          created_user_id: "3f9532db-fd51-4b42-9461-ea9257e6c2b9",
          created_time_utc: "2024-04-28T16:49:23.977293Z",
          updated_user_id: "3f9532db-fd51-4b42-9461-ea9257e6c2b9",
          updated_time_utc: "2024-04-28T16:49:23.977293Z",
          row_version: "39a056cb-1c8c-43df-a176-235e8e8431e0",
        },
        {
          vendor_category_id: "9e43ff7b-3886-4ac6-9887-121613feeaba",
          vendor_category_name: "Bengkel 2",
          note: "Bengkel 2",
          is_active: true,
          is_deleted: false,
          created_user_id: "3f9532db-fd51-4b42-9461-ea9257e6c2b9",
          created_time_utc: "2024-05-02T10:07:31.782497Z",
          updated_user_id: "3f9532db-fd51-4b42-9461-ea9257e6c2b9",
          updated_time_utc: "2024-05-02T10:07:31.782497Z",
          row_version: "49d0aad1-6019-4980-a895-f0585e500b91",
        },
      ],
      total_rows: 2,
      limit: 10,
      offset: 0,
      page: 1,
    },
    message: "ok",
    status_code: 200,
    status: "ok"
  } as unknown as IGetListResponse,

  getOneVendorCategories: {
    data: {
      vendor_category_id: "68fdfc2b-954a-4e8d-b879-6319a49224dd",
      vendor_category_name: "Bengkel",
      note: "",
      is_active: true,
      is_deleted: false,
      created_user_id: "3f9532db-fd51-4b42-9461-ea9257e6c2b9",
      created_time_utc: "2024-04-28T16:49:23.977293Z",
      updated_user_id: "3f9532db-fd51-4b42-9461-ea9257e6c2b9",
      updated_time_utc: "2024-04-28T16:49:23.977293Z",
      row_version: "39a056cb-1c8c-43df-a176-235e8e8431e0",
      message: "ok",
      status_code: 200,
      status: "ok"
    },
    status: 200,
    statusText: "",
    headers: {
      "content-length": "461",
      "content-type": "application/json"
    },
    config: {},
    request: {}
  } as unknown as IAPIResponse,

  updateVendorCategories: {
    data: {
      vendor_category_id: "68fdfc2b-954a-4e8d-b879-6319a49224dd",
      vendor_category_name: "Bengkel Updated",
      note: "",
      is_active: true,
      is_deleted: false,
      created_user_id: "3f9532db-fd51-4b42-9461-ea9257e6c2b9",
      created_time_utc: "2024-04-28T16:49:23.977293Z",
      updated_user_id: "3f9532db-fd51-4b42-9461-ea9257e6c2b9",
      updated_time_utc: "2024-05-03T12:00:00.000Z",
      row_version: "4e5f6ab2-9821-43e5-9821-235e8e8431e0"
    },
    message: "ok",
    status_code: 200,
    status: 200,
    statusText: "",
    headers: {
      "content-length": "461",
      "content-type": "application/json"
    },
    config: {},
    request: {}
  } as unknown as IAPIResponse,

  // Mock data for deleting vendor categories
  deleteVendorCategories: {
    data: {
      data_id: "6bee39b5-03ec-4765-8585-017eb6d59dd1"
    },
    message: "ok",
    status_code: 20,
    status: 200,
    statusText: "",
    headers: {
      "content-length": "106",
      "content-type": "application/json"
    },
    config: {},
    request: {}
  } as unknown as IAPIResponseData<IVendorCategoryDataResponse>,

  // Mock data for get Many vendor categories
  getManyVendorCategories: {
    data: {
      data: [
        {
          vendor_category_id: "68fdfc2b-954a-4e8d-b879-6319a49224dd",
          vendor_category_name: "Bengkel1",
          note: "",
          is_active: true,
          is_deleted: false,
          created_user_id: "3f9532db-fd51-4b42-9461-ea9257e6c2b9",
          created_time_utc: "2024-04-28T16:49:23.977293Z",
          updated_user_id: "3f9532db-fd51-4b42-9461-ea9257e6c2b9",
          updated_time_utc: "2024-04-28T16:49:23.977293Z",
          row_version: "39a056cb-1c8c-43df-a176-235e8e8431e0",
        },
        {
          vendor_category_id: "9e43ff7b-3886-4ac6-9887-121613feeaba",
          vendor_category_name: "Bengkel 2",
          note: "Bengkel 2",
          is_active: true,
          is_deleted: false,
          created_user_id: "3f9532db-fd51-4b42-9461-ea9257e6c2b9",
          created_time_utc: "2024-05-02T10:07:31.782497Z",
          updated_user_id: "3f9532db-fd51-4b42-9461-ea9257e6c2b9",
          updated_time_utc: "2024-05-02T10:07:31.782497Z",
          row_version: "49d0aad1-6019-4980-a895-f0585e500b91",
        },
      ],
      total_rows: 2,
      limit: 10,
      offset: 0,
      page: 1,
    },
    message: "ok",
    status_code: 200,
    status: "ok"
  } as unknown as IGetListResponse,
}