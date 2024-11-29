import { $http } from "@/http/ofetch";


export const loginApi = async (data: any) => {
  return $http('/api/login/', {
    method: 'POST',
    body: data,
  });
}
export const registerApi = async (data: any) => {
  return $http('/api/register/', {
    method: 'POST',
    body: data,
  });
}
export const updateActive = async (data: string, userId: number) => {
  return $http(`/api/users/${userId}/`, {
    method: 'PUT',
    body: { 
      is_verified: true,
      fullname: data,
     }
  });
  }