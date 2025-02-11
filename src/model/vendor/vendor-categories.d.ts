export interface IVendorCategoriesDetail {
    vendor_category_id: string;
    vendor_category_name: string;
    note: string;
    is_active: boolean;
    is_deleted: boolean;
    created_user_id: string;
    created_time_utc: string;
    updated_user_id: string;
    updated_time_utc: string;
    row_version: string;
}

// Interface for VendorCategoryData with data_id
interface IVendorCategoryDataResponse {
    data_id: string;
  }