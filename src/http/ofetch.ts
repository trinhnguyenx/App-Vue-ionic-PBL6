import { $Fetch, ofetch } from "ofetch";

export const $http: $Fetch = ofetch.create({
  baseURL: 'https://5171-14-245-67-148.ngrok-free.app',
  retry: false
});

export const $httpcamera: $Fetch = ofetch.create({
  baseURL: 'https://e5ee-14-191-240-180.ngrok-free.app',
  retry: false,
});
