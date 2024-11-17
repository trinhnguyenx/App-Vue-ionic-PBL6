import { $http } from "@/http/ofetch";

export const loginApi = async (data: any) => {
  return $http('/api/login/', {
    method: 'POST',
    body: data,
  });
}