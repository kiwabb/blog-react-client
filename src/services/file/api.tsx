import {request} from "@umijs/max";

export default function uploadFile(file:FormData,
                                   options?: { [key: string]: any }) {
  return request<SYSTEM.OptionalResult<FILE.FileUploadResult>>('/api-oss/files', {
    method: 'POST',
    data: file,
    ...(options || {}),
  })
}