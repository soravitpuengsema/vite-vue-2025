/* eslint-disable @typescript-eslint/no-explicit-any */
import { Notify } from "quasar"
import router from "@/router"
import store from "@/store"

export function interceptRequest(request) {
  request.headers = {
    Authorization: "Bearer " + store.state.accessTokenKey,
    "x-auth-user": store.state.userCode || "",
    "x-auth-role": store.state.roleCode || "",
    "x-current-locale": store.state.locale || "th",
  }
  return request
}

export function interceptRequestError(error) {
  return Promise.reject(error)
}

export function interceptResponse(response) {
  const responseType = response.config.responseType
  if (responseType === "blob") {
    // download file
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement("a")
    const filename = response.headers["content-disposition"]
      .split(";")
      .find((s) => s.includes("filename"))
      .split("=")[1]
      .replace(/"/g, "")
    link.href = url
    link.setAttribute("download", decodeURIComponent(filename))
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
  return response
}

export function interceptResponseError(error) {
  const errorCode = error.code
  const responseMsg = error.response?.data?.message
  const status = error.response?.status
  if (status == 401) {
    console.log("401", responseMsg)
    if (responseMsg) {
      Notify.create({
        type: "negative",
        message: "ERROR " + errorCode,
        caption: responseMsg,
        position: "top",
        timeout: 5000,
      })
    }
  } else {
    if (
      ["INVALID_REFRESH_TOKEN", "REFRESH_TOKEN_EXPIRED"].indexOf(responseMsg) >
      -1
    ) {
      console.log(">-1", responseMsg)
      router.push("/login")
    } else {
      console.log("<1", responseMsg)
      Notify.create({
        type: "negative",
        message: "ERROR " + status,
        caption: responseMsg || "Unknown error",
        position: "top",
        timeout: 5000,
      })
    }
  }
  return
}
