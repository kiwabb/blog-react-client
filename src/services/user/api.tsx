import {request} from "@umijs/max";


export async function login(
  body: USER.LoginUser,
  options?: { [key: string]: any }
) {
  // 将请求体编码为表单格式
  const formData = new URLSearchParams();
  Object.entries(body).forEach(([key, value]) => {
    formData.append(key, value);
  });
  formData.append('grant_type', 'password_code');
  return request<SYSTEM.OptionalResult<USER.LoginResult>>('/api-uaa/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: formData.toString(),
    ...(options || {}),
  });
}

export default function getUserInfo(options?: { [key: string]: any }) {
  return request<SYSTEM.OptionalResult<USER.User>>('/api-user/user/current', {
    method: 'GET',
    ...(options || {}),
  })
}