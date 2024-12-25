import { $Fetch, ofetch } from "ofetch";

export const $http: $Fetch = ofetch.create({
  baseURL: 'https://81f2-14-245-67-148.ngrok-free.app',
  retry: false
});

export const $httpcamera: $Fetch = ofetch.create({
  baseURL: 'https://fd13-34-90-141-8.ngrok-free.app',
  retry: false,
});
