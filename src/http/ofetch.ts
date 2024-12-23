import { $Fetch, ofetch } from "ofetch";

export const $http: $Fetch = ofetch.create({
  baseURL: 'https://122a-2001-ee0-4b43-4a0-2cf5-13d7-977b-9365.ngrok-free.app',
  retry: false
});

export const $httpcamera: $Fetch = ofetch.create({
  baseURL: 'https://76ca-14-191-241-109.ngrok-free.app',
  retry: false,
});
