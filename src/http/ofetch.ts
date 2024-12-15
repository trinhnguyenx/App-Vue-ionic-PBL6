import { $Fetch, ofetch } from "ofetch";

export const $http: $Fetch = ofetch.create({
  baseURL: 'https://f333-14-245-67-148.ngrok-free.app',
  retry: false
});

export const $httpcamera: $Fetch = ofetch.create({
  baseURL: 'https://d4a3-2001-ee1-db07-ab40-a5d2-f74f-69e2-d2b6.ngrok-free.app',
  retry: false,
});
