import { $http } from "@/http/ofetch";

export const getAllTimelines = async () => {
  return $http('/timelines', {
    method: 'GET',
  });
}

export const getTimeLine = async (id: string) => {
  return $http(`/timelines/${id}`, {
    method: 'GET',
  });
}

export const createTimeline = async (data: any) => {
  return $http('/timelines/generate', {
    method: 'POST',
    body: {
      data: data,
    },
  });
}

export const getImageFromDestination = async (destination: string) => {
  return $http(`/get-images`, {
    baseURL: 'https://api.unlockscan.site',
    method: 'GET',
    query: {
      destination: destination,
    },
  });
}

export const voteTimeline = async (id: string, data: string) => {
  return $http(`/timelines/${id}/vote`, {
    method: 'POST',
    body: {
      vote: data,
    },
  });
}
