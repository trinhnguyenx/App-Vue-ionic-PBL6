import { $Fetch, ofetch } from "ofetch";

export const $http: $Fetch = ofetch.create({
  baseURL: 'https://ff47-116-105-174-150.ngrok-free.app',
  retry: false,
});

export const $httpcamera: $Fetch = ofetch.create({
  baseURL: 'https://2aeb-116-105-174-150.ngrok-free.app',
  retry: false,
});
