import { $Fetch, ofetch } from "ofetch";

export const $http: $Fetch = ofetch.create({
  baseURL: 'https://b4d6-2405-4802-69b9-2b60-ed52-3fbc-4f17-8345.ngrok-free.app/',
  retry: false,
});