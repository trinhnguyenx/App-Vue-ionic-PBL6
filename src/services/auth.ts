import { $http } from "@/http/ofetch";
import { INotification} from '@/type/auth';


export const loginApi = async (data: any) => {
  return $http("/api/login/", {
    method: "POST",
    body: data,
  });
};
export const registerApi = async (data: any) => {
  return $http("/api/register/", {
    method: "POST",
    body: data,
  });
};
export const updateActive = async (data: string, userId: number) => {
  return $http(`/api/users/${userId}/`, {
    method: "PUT",
    body: {
      is_verified: true,
      fullname: data,
    },
  });
};

export const getBhyt = async (userId: number) => {
  return $http(`/api/v1/bhyt/?user_id=${userId}`, {
    method: "GET",
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'User-Agent': 'Custom User-Agent',    
    },
  });
};

export const getGplx = async (userId: number) => {
  return $http(`/api/v1/gplx/?user_id=${userId}`, {
    method: "GET",
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'User-Agent': 'Custom User-Agent',    
    },  });
};

export const getCccd = async (userId: number) => {
  return $http(`/api/v1/cccd/?user_id=${userId}`, {
    method: "GET",
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'User-Agent': 'Custom User-Agent',    
    },
  });
};

export const getQrcode = async (userId: number) => {
  return $http(`/api/qrcode/?id_qrcode=${userId}`, {
    method: "GET",
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'User-Agent': 'Custom User-Agent',    
    },
    responseType: 'blob',
  });
};

export const getNoti = async (userId:number) => {
  return $http(`/api/notification/?user_id=${userId}`, {
    method: "GET",
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'User-Agent': 'Custom User-Agent',    
    },
  });
};
export const PutNoti = async (NotiId:string) => {
  return $http(`/api/notification/${NotiId}/`, {
    method: "PUT",
    body: {
      is_new: false,
    },
    headers: {
      'ngrok-skip-browser-warning': 'true',
      'User-Agent': 'Custom User-Agent',    
    },
  });
};