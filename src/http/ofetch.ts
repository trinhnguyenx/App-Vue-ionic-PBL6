import { $Fetch, ofetch } from "ofetch";

export const $http: $Fetch = ofetch.create({
  baseURL: 'https://5637-2001-ee0-4b43-4a0-b1ad-7575-290e-6ef8.ngrok-free.app',
  retry: false
});

export const $httpcamera: $Fetch = ofetch.create({
  baseURL: 'https://c2f4-34-75-44-203.ngrok-free.app',
  retry: false,
});
