import { $http, $httpcamera } from "@/http/ofetch";
import {
  ICardBHYTCreate,
  ICardCCCDCreate,
  ICardGPLXCreate,
  ICardBHYT,
  ICardGPLX
} from "@/type/card";

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
export const saveCCCD = async (data: ICardCCCDCreate) => {
  return $http("/api/v1/cccd/", {
    method: "POST",
    body: data,
  });
};
export const updateCCCD = async (data: ICardCCCDCreate, uuid: string) => {
  return $http(`/api/v1/cccd/${uuid}/`, {
    method: "PUT",
    body: data,
  });
};
export const saveGPLX = async (data: ICardGPLXCreate) => {
  return $http("/api/v1/gplx/", {
    method: "POST",
    body: data,
  });
};
export const updateGPLX = async (data: ICardGPLX, uuid: string) => {
  return $http(`/api/v1/gplx/${uuid}/`, {
    method: "PUT",
    body: data,
  });
};
export const updateActiveGPLX = async (userId: number) => {
  return $http(`/api/users/${userId}/`, {
    method: "PUT",
    body: {
      is_gplx: true,
    },
  });
};
export const saveBHYT = async (data: ICardBHYTCreate) => {
  return $http("/api/v1/bhyt/", {
    method: "POST",
    body: data,
  });
};
export const updateBHYT = async (data: ICardBHYT, uuid: string) => {
  return $http(`/api/v1/bhyt/${uuid}/`, {
    method: "PUT",
    body: data,
  });
};
export const updateActiveBHYT = async (userId: number) => {
  return $http(`/api/users/${userId}/`, {
    method: "PUT",
    body: {
      is_bhyt: true,
    },
  });
};

export const updloadImages = async (data: any) => {
  return $httpcamera("/process-image", {
    method: "POST",
    body: data,
  });
};
