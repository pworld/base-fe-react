import { API_BASE_URL } from '@/config/env';
import { axiosInstance } from '@/utility';

export interface FileUploadResponseType {
  message: string,
  status: string,
  status_code: number,
  data: {
    file_name: string,
    file_path: string,
  }
}

export async function fileUpload(file: any, url?: string): Promise<FileUploadResponseType['data']> {
  const _url = url ?? `${API_BASE_URL}/files/upload`;
  const formData = new FormData();
  formData.append('file', file);

  return new Promise((resolve, reject) => {
    axiosInstance.post<FileUploadResponseType>(_url, formData).then(response => {
      if (response?.data?.data) {
        resolve(response.data.data);
      } else {
        throw new Error(response?.data?.message);
      }
    }).catch(e => {
      console.error('upload failed', e);
      reject(e);
    });
  });
}