import axios from "axios"
import {
  interceptRequest,
  interceptRequestError,
  interceptResponse,
  interceptResponseError,
} from "./interceptors"

const $http = axios.create({
  baseURL: import.meta.env.VITE_SERVICE,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, PUT, GET, OPTIONS, DELETE",
    "Access-Control-Allow-Headers": "*",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
})
$http.interceptors.request.use(interceptRequest, interceptRequestError)
$http.interceptors.response.use(interceptResponse, interceptResponseError)

const $httpDownload = axios.create({
  baseURL: import.meta.env.VITE_SERVICE,
  responseType: "blob",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, PUT, GET, OPTIONS, DELETE",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Expose-Headers": "Content-Disposition",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
})
$httpDownload.interceptors.request.use(interceptRequest, interceptRequestError)
$httpDownload.interceptors.response.use(
  interceptResponse,
  interceptResponseError
)

export { axios, $http, $httpDownload }
